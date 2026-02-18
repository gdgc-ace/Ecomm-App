import type { Product, Order, User } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  products: {
    getAll: () => fetchApi<Product[]>('/products'),
    getById: (id: string) => fetchApi<Product>(`/products/${id}`),
    create: (data: Partial<Product>) => fetchApi<Product>('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Product>) => fetchApi<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => fetchApi<void>(`/products/${id}`, { method: 'DELETE' }),
  },
  orders: {
    getAll: () => fetchApi<Order[]>('/orders'),
    getById: (id: string) => fetchApi<Order>(`/orders/${id}`),
    create: (data: { userId: string; items: { productId: string; quantity: number; price: number }[] }) =>
      fetchApi<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) => fetchApi<Order>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    delete: (id: string) => fetchApi<void>(`/orders/${id}`, { method: 'DELETE' }),
  },
  users: {
    getAll: () => fetchApi<User[]>('/users'),
    getById: (id: string) => fetchApi<User>(`/users/${id}`),
    register: (data: { email: string; name?: string; password: string }) => fetchApi<User>('/users/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) => fetchApi<{ user: User }>('/users/login', { method: 'POST', body: JSON.stringify(data) }),
  },
};
