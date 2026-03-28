import { API_BASE } from './config';

export interface FetchResponse<T> {
  data: T;
  latency: number;
}

export async function fetcher<T>(args: string | [string, string]): Promise<FetchResponse<T>> {
  const url = typeof args === 'string' ? args : args[0];
  const storeId = typeof args === 'string' ? (localStorage.getItem('amboras_store_id') || 'store_001') : args[1];

  const start = performance.now();
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'x-store-id': storeId,
      'Content-Type': 'application/json',
    },
  });
  const end = performance.now();
  const latency = Math.round(end - start);

  if (!res.ok) {
    const error = new Error('API request failed');
    throw error;
  }

  const data = await res.json();
  return { data, latency };
}
