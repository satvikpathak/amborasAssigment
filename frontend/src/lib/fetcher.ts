import { API_BASE } from './config';

export interface FetchResponse<T> {
  data: T;
  latency: number;
}

export async function fetcher<T>(args: string | [string, string]): Promise<FetchResponse<T>> {
  const url = typeof args === 'string' ? args : args[0];
  const storeId = typeof args === 'string' ? (localStorage.getItem('amboras_store_id') || 'store_001') : args[1];

  const start = performance.now();
  
  // Robust URL joining
  const baseUrl = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const path = url.startsWith('/') ? url : `/${url}`;
  const finalUrl = `${baseUrl}${path}`;

  const res = await fetch(finalUrl, {
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
