'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import Pusher from 'pusher-js';
import { PUSHER_CONFIG } from '@/lib/config';
import { useStore } from '@/lib/contexts/StoreContext';

interface PusherEvent {
  event_id: string;
  store_id: string;
  event_type: string;
  timestamp: string;
  data: Record<string, any>;
}

export function usePusher(onNewEvent?: (event: PusherEvent) => void) {
  const { storeId } = useStore();
  const pusherRef = useRef<Pusher | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleNewEvent = useCallback(
    (data: PusherEvent) => {
      onNewEvent?.(data);
    },
    [onNewEvent],
  );

  useEffect(() => {
    if (!PUSHER_CONFIG.key) {
      console.log('Pusher not configured — real-time updates disabled');
      return;
    }

    const pusher = new Pusher(PUSHER_CONFIG.key, {
      cluster: PUSHER_CONFIG.cluster,
    });

    pusherRef.current = pusher;

    const channelName = `store-${storeId}`;
    const channel = pusher.subscribe(channelName);

    channel.bind('new-event', handleNewEvent);

    pusher.connection.bind('connected', () => setIsConnected(true));
    pusher.connection.bind('disconnected', () => setIsConnected(false));

    return () => {
      channel.unbind('new-event', handleNewEvent);
      pusher.unsubscribe(channelName);
      pusher.disconnect();
    };
  }, [handleNewEvent, storeId]);

  return { isConnected };
}
