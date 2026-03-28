import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { StoreGuard } from '../common/guards/store.guard';
import { StoreId } from '../common/decorators/store-id.decorator';

@Controller('api/v1/analytics')
@UseGuards(StoreGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview(
    @StoreId() storeId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getOverview(
      storeId,
      startDate,
      endDate,
    );
  }

  @Get('top-products')
  async getTopProducts(@StoreId() storeId: string) {
    return this.analyticsService.getTopProducts(storeId);
  }

  @Get('recent-activity')
  async getRecentActivity(@StoreId() storeId: string) {
    return this.analyticsService.getRecentActivity(storeId);
  }

  @Get('live-visitors')
  async getLiveVisitors(@StoreId() storeId: string) {
    return this.analyticsService.getLiveVisitors(storeId);
  }
}
