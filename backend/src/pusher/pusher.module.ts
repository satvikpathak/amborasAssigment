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
        if (!appId) {
          console.warn('⚠️  Pusher not configured — real-time features disabled');
          return null;
        }
        return new Pusher({
          appId,
          key: configService.getOrThrow<string>('PUSHER_KEY'),
          secret: configService.getOrThrow<string>('PUSHER_SECRET'),
          cluster: configService.get<string>('PUSHER_CLUSTER', 'us2'),
          useTLS: true,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUSHER_CLIENT],
})
export class PusherModule {}
