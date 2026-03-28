import useSWR from 'swr';
import { fetcher, FetchResponse } from '@/lib/fetcher';
import { useStore } from '@/lib/contexts/StoreContext';

interface OverviewData {
  revenue: { today: number; week: number; month: number };
  eventCounts: Record<string, number>;
  conversionRate: number;
  timeSeries: Array<{ hour: string; count: number; event_type: string }>;
}

interface TopProduct {
  product_id: string;
  product_name: string;
  total_revenue: number;
  purchase_count: number;
}

interface RecentEvent {
  event_id: string;
  store_id: string;
  event_type: string;
  timestamp: string;
  data: Record<string, any>;
}

interface LiveVisitors {
  activeVisitors: number;
}

export function useOverview(startDate?: string, endDate?: string) {
  const { storeId } = useStore();
  const params = new URLSearchParams();
  if (startDate) params.set('startDate', startDate);
  if (endDate) params.set('endDate', endDate);
  const query = params.toString();
  const url = `/analytics/overview${query ? `?${query}` : ''}`;

  return useSWR<FetchResponse<OverviewData>>([url, storeId], fetcher, {
    refreshInterval: 30000, 
    revalidateOnFocus: true,
  });
}

export function useTopProducts() {
  const { storeId } = useStore();
  return useSWR<FetchResponse<TopProduct[]>>(['/analytics/top-products', storeId], fetcher, {
    refreshInterval: 60000,
  });
}

export function useRecentActivity() {
  const { storeId } = useStore();
  return useSWR<FetchResponse<RecentEvent[]>>(['/analytics/recent-activity', storeId], fetcher, {
    refreshInterval: 10000,
  });
}

export function useLiveVisitors() {
  const { storeId } = useStore();
  return useSWR<FetchResponse<LiveVisitors>>(['/analytics/live-visitors', storeId], fetcher, {
    refreshInterval: 15000,
  });
}
