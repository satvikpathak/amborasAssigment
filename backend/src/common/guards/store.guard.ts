import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';

@Injectable()
export class StoreGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const storeId = request.headers['x-store-id'];
    
    if (!storeId) {
      throw new BadRequestException('x-store-id header is required for multi-tenant isolation');
    }
    
    return true;
  }
}
