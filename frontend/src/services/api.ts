import type { CatalogResponse, User } from '../types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'include',
    headers: init?.body ? { 'content-type': 'application/json' } : undefined,
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export const api = {
  getTitles: () => request<CatalogResponse>('/api/titles'),

  getMe: () => request<{ user: User | null }>('/api/me'),

  signup: (input: { email: string; password: string; displayName: string }) =>
    request<{ user: User }>('/api/signup', { method: 'POST', body: JSON.stringify(input) }),

  login: (input: { email: string; password: string }) =>
    request<{ user: User }>('/api/login', { method: 'POST', body: JSON.stringify(input) }),

  logout: () => request<{ ok: true }>('/api/logout', { method: 'POST' }),

  getMyList: () => request<{ titleIds: number[] }>('/api/mylist'),

  addToMyList: (titleId: number) =>
    request<{ ok: true }>('/api/mylist', { method: 'POST', body: JSON.stringify({ titleId }) }),

  removeFromMyList: (titleId: number) =>
    request<{ ok: true }>(`/api/mylist?titleId=${titleId}`, { method: 'DELETE' }),
};
