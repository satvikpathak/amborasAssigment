import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.module';
import { PUSHER_CLIENT } from '../pusher/pusher.module';
import { CreateEventDto } from './dto/create-event.dto';
import type { NeonQueryFunction } from '@neondatabase/serverless';
import type Pusher from 'pusher';

@Injectable()
export class EventsService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly sql: NeonQueryFunction<false, false>,
    @Inject(PUSHER_CLIENT) private readonly pusher: Pusher | null,
  ) {}

  async create(dto: CreateEventDto) {
    const timestamp = dto.timestamp || new Date().toISOString();

    await this.sql`
      INSERT INTO events (event_id, store_id, event_type, timestamp, data)
      VALUES (${dto.event_id}, ${dto.store_id}, ${dto.event_type}, ${timestamp}, ${JSON.stringify(dto.data)}::jsonb)`;

    // Trigger real-time update via Pusher
    if (this.pusher) {
      try {
        await this.pusher.trigger(`store-${dto.store_id}`, 'new-event', {
          event_id: dto.event_id,
          store_id: dto.store_id,
          event_type: dto.event_type,
          timestamp,
          data: dto.data,
        });
      } catch (err) {
        console.error('Pusher trigger failed:', err);
      }
    }

    return { success: true, event_id: dto.event_id };
  }
}
