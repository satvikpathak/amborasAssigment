import { IsString, IsOptional, IsObject, IsIn } from 'class-validator';

export class CreateEventDto {
  @IsString()
  event_id: string;

  @IsString()
  store_id: string;

  @IsString()
  @IsIn([
    'page_view',
    'add_to_cart',
    'remove_from_cart',
    'checkout_started',
    'purchase',
  ])
  event_type: string;

  @IsOptional()
  @IsString()
  timestamp?: string;

  @IsObject()
  data: Record<string, any>;
}
