import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pusher from 'pusher';

export const PUSHER_CLIENT = 'PUSHER_CLIENT';

@Global()
@Module({
  providers: [
    {
      provide: PUSHER_CLIENT,
      useFactory: (configService: ConfigService) => {
        const appId = configService.get<string>('PUSHER_APP_ID');
        const key = configService.get<string>('PUSHER_KEY');
        const secret = configService.get<string>('PUSHER_SECRET');
        const cluster = configService.get<string>('PUSHER_CLUSTER', 'us2');

        if (!appId || !key || !secret) {
          console.warn(
            '⚠️  Pusher not fully configured — real-time features disabled',
          );
          return null;
        }

        return new Pusher({
          appId,
          key,
          secret,
          cluster,
          useTLS: true,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUSHER_CLIENT],
})
export class PusherModule {}
