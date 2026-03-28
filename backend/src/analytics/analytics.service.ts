import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.module';
import type { NeonQueryFunction } from '@neondatabase/serverless';

@Injectable()
export class AnalyticsService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL = 2000; // 2 seconds "fresh" window
  private STALE_TTL = 60000; // 60 seconds "stale" window (return stale + refresh bg)

  constructor(
    @Inject(DATABASE_CONNECTION) private readonly sql: NeonQueryFunction<false, false>,
  ) {}

  async getOverview(storeId: string, startDate?: string, endDate?: string) {
    const cacheKey = `${storeId}-${startDate || 'default'}-${endDate || 'default'}`;
    const cached = this.cache.get(cacheKey);
    const nowTime = Date.now();
    
    // 1. Fresh Hit: return immediately (< 50ms)
    if (cached && (nowTime - cached.timestamp < this.CACHE_TTL)) {
      return cached.data;
    }

    // 2. Stale Hit: return stale immediately AND refresh in background
    if (cached && (nowTime - cached.timestamp < this.STALE_TTL)) {
      // Trigger background refresh without awaiting
      this.refreshOverview(cacheKey, storeId, startDate, endDate).catch(console.error);
      return cached.data;
    }

    // 3. Cache Miss or Very Stale: Fresh fetch
    return this.refreshOverview(cacheKey, storeId, startDate, endDate);
  }

  private async refreshOverview(cacheKey: string, storeId: string, startDate?: string, endDate?: string) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const nowISO = now.toISOString();

    const rangeStart = startDate || monthStart;
    const rangeEnd = endDate || nowISO;

    // CONSOLIDATED SINGLE QUERY (ONE ROUND-TRIP)
    const [summary] = await this.sql`
      WITH revenue_data AS (
        SELECT 
          COALESCE(SUM(CASE WHEN timestamp >= ${todayStart} THEN CAST(data->>'amount' AS DECIMAL) ELSE 0 END), 0) as today,
          COALESCE(SUM(CASE WHEN timestamp >= ${weekStart} THEN CAST(data->>'amount' AS DECIMAL) ELSE 0 END), 0) as week,
          COALESCE(SUM(CASE WHEN timestamp >= ${monthStart} THEN CAST(data->>'amount' AS DECIMAL) ELSE 0 END), 0) as month
        FROM events
        WHERE store_id = ${storeId} 
          AND event_type = 'purchase'
          AND timestamp >= ${monthStart}
      ),
      event_metrics AS (
        SELECT 
          event_type, 
          COUNT(*)::int as count
        FROM events
        WHERE store_id = ${storeId} AND timestamp >= ${rangeStart} AND timestamp <= ${rangeEnd}
        GROUP BY event_type
      ),
      conversion_metrics AS (
        SELECT
          COUNT(*) FILTER (WHERE event_type = 'purchase')::int as purchases,
          COUNT(*) FILTER (WHERE event_type = 'page_view')::int as page_views
        FROM events
        WHERE store_id = ${storeId} AND timestamp >= ${rangeStart} AND timestamp <= ${rangeEnd}
      ),
      time_series_metrics AS (
        SELECT
          date_trunc('hour', timestamp) as hour,
          COUNT(*)::int as count,
          event_type
        FROM events
        WHERE store_id = ${storeId} AND timestamp >= ${rangeStart} AND timestamp <= ${rangeEnd}
        GROUP BY hour, event_type
        ORDER BY hour ASC
      )
      SELECT 
        (SELECT row_to_json(revenue_data.*) FROM revenue_data) as revenue,
        (SELECT COALESCE(json_object_agg(event_type, count), '{}'::json) FROM event_metrics) as event_counts,
        (SELECT row_to_json(conversion_metrics.*) FROM conversion_metrics) as conversion,
        (SELECT COALESCE(json_agg(time_series_metrics.*), '[]'::json) FROM time_series_metrics) as time_series;
    `;

    const revenue = summary.revenue || { today: 0, week: 0, month: 0 };
    const conv = summary.conversion || { purchases: 0, page_views: 0 };
    const conversionRate = conv.page_views > 0 ? ((conv.purchases / conv.page_views) * 100).toFixed(2) : '0.00';

    const result = {
      revenue: {
        today: parseFloat(revenue.today) || 0,
        week: parseFloat(revenue.week) || 0,
        month: parseFloat(revenue.month) || 0,
      },
      eventCounts: summary.event_counts || {},
      conversionRate: parseFloat(conversionRate),
      timeSeries: summary.time_series || [],
    };

    this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  }

  async getTopProducts(storeId: string) {
    const cacheKey = `top-products-${storeId}`;
    const cached = this.cache.get(cacheKey);
    const nowTime = Date.now();

    if (cached && (nowTime - cached.timestamp < this.CACHE_TTL)) {
      return cached.data;
    }

    if (cached && (nowTime - cached.timestamp < this.STALE_TTL)) {
      this.refreshTopProducts(cacheKey, storeId).catch(console.error);
      return cached.data;
    }

    return this.refreshTopProducts(cacheKey, storeId);
  }

  private async refreshTopProducts(cacheKey: string, storeId: string) {
    const rows = await this.sql`
      SELECT
         data->>'product_id' as product_id,
         data->>'product_name' as product_name,
         COALESCE(SUM(CAST(data->>'amount' AS DECIMAL)), 0) as total_revenue,
         COUNT(*)::int as purchase_count
       FROM events
       WHERE store_id = ${storeId}
         AND event_type = 'purchase'
         AND data->>'product_id' IS NOT NULL
       GROUP BY data->>'product_id', data->>'product_name'
       ORDER BY total_revenue DESC
       LIMIT 10`;

    const result = rows.map((r: any) => ({
      product_id: r.product_id,
      product_name: r.product_name,
      total_revenue: parseFloat(r.total_revenue),
      purchase_count: r.purchase_count,
    }));

    this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  }

  async getRecentActivity(storeId: string) {
    return this.sql`
      SELECT event_id, store_id, event_type, timestamp, data
       FROM events
       WHERE store_id = ${storeId}
       ORDER BY timestamp DESC
       LIMIT 20`;
  }

  async getLiveVisitors(storeId: string) {
    const cacheKey = `live-visitors-${storeId}`;
    const LIVE_TTL = 2000;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < LIVE_TTL) {
      return cached.data;
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const result = await this.sql`
      SELECT COUNT(*)::int as active_visitors
       FROM events
       WHERE store_id = ${storeId}
         AND event_type = 'page_view'
         AND timestamp >= ${fiveMinutesAgo}`;

    const data = { activeVisitors: result[0]?.active_visitors || 0 };
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }
}
