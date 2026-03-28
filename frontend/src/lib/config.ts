// API and Pusher configuration
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || 'store_001';

export const PUSHER_CONFIG = {
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  page_view: 'Page View',
  add_to_cart: 'Add to Cart',
  remove_from_cart: 'Remove from Cart',
  checkout_started: 'Checkout Started',
  purchase: 'Purchase',
};

export const EVENT_TYPE_COLORS: Record<string, string> = {
  page_view: '#818cf8',
  add_to_cart: '#22d3ee',
  remove_from_cart: '#fb7185',
  checkout_started: '#fbbf24',
  purchase: '#34d399',
};
