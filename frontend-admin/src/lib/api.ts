/**
 * API Client for Nelatalli Organics Admin Panel
 * Handles all communication with the FastAPI backend.
 */

// Get API base URL from environment variable (set in vite.config.ts)
// Default to /api/admin for local development via proxy
const API_BASE = import.meta.env.VITE_API_BASE || '/api/admin';

// ─────────────────── Token Management ───────────────────

export function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setToken(token: string): void {
  localStorage.setItem('admin_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

// ─────────────────── HTTP Helpers ───────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    clearToken();
    window.location.reload();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' });
}

function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

function put<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

function del<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' });
}

// ═══════════════════════════════════════════════════════════
//                      AUTH API
// ═══════════════════════════════════════════════════════════

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
  };
  is_admin: boolean;
}

export async function login(data: LoginPayload): Promise<LoginResponse> {
  const res = await post<LoginResponse>('/auth/login', data);
  setToken(res.access_token);
  return res;
}

export function logout(): void {
  clearToken();
}

// ═══════════════════════════════════════════════════════════
//                    DASHBOARD API
// ═══════════════════════════════════════════════════════════

export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_products: number;
  total_users: number;
  low_stock_count: number;
  pending_orders: number;
  revenue_trend: string;
  orders_trend: string;
  users_trend: string;
}

export interface RevenueDataPoint {
  name: string;
  value: number;
}

export interface OrderStatusBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  initials: string;
  total: string;
  status: string;
  date: string;
}

export interface LowStockAlert {
  name: string;
  category: string;
  stock: number;
}

export interface TopProduct {
  name: string;
  sold: number;
  percentage: number;
}

export const dashboardApi = {
  getStats: () => get<DashboardStats>('/dashboard/stats'),
  getRevenue: () => get<RevenueDataPoint[]>('/dashboard/revenue'),
  getOrderStatus: () => get<OrderStatusBreakdown[]>('/dashboard/order-status'),
  getRecentOrders: () => get<RecentOrder[]>('/dashboard/recent-orders'),
  getLowStock: () => get<LowStockAlert[]>('/dashboard/low-stock'),
  getTopProducts: () => get<TopProduct[]>('/dashboard/top-products'),
};

// ═══════════════════════════════════════════════════════════
//                   INVENTORY API
// ═══════════════════════════════════════════════════════════

export interface AdminProduct {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  discount_price: number | null;
  stock: number;
  status: string;
  image: string;
  slug: string;
  description: string;
}

export interface ProductsResponse {
  items: AdminProduct[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface ProductCreatePayload {
  title: string;
  sku: string;
  slug?: string;
  price: number;
  discount_price?: number | null;
  category_id: number;
  image?: string;
  stock?: number;
  description?: string;
  in_stock?: boolean;
}

export interface ProductUpdatePayload {
  title?: string;
  sku?: string;
  price?: number;
  discount_price?: number | null;
  category_id?: number;
  image?: string;
  stock?: number;
  description?: string;
  in_stock?: boolean;
}

export interface CategoryItem {
  id: number;
  slug: string;
  name: string;
  count_label: string;
  image: string;
  highlight: boolean;
  icon: string;
  product_count: number;
}

export const inventoryApi = {
  getProducts: (params?: { category?: string; status?: string; search?: string; page?: number; page_size?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.page_size) searchParams.set('page_size', String(params.page_size));
    const qs = searchParams.toString();
    return get<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`);
  },
  getCategories: () => get<CategoryItem[]>('/categories'),
  createProduct: (data: ProductCreatePayload) => post<AdminProduct>('/products', data),
  updateProduct: (id: number, data: ProductUpdatePayload) => put<AdminProduct>(`/products/${id}`, data),
  deleteProduct: (id: number) => del<{ status: string }>(`/products/${id}`),
};

// ═══════════════════════════════════════════════════════════
//                     ORDERS API
// ═══════════════════════════════════════════════════════════

export interface AdminOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  items: string;
  total: number;
  status: string;
  payment_status: string;
  date: string;
  initials: string;
}

export interface OrdersResponse {
  items: AdminOrder[];
  total: number;
  page: number;
  page_size: number;
}

export interface OrderStats {
  fulfillment_rate: number;
  fulfillment_trend: string;
  pending_revenue: number;
  pending_invoices: number;
}

export const ordersApi = {
  getOrders: (params?: { status?: string; payment_status?: string; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.payment_status) searchParams.set('payment_status', params.payment_status);
    if (params?.page) searchParams.set('page', String(params.page));
    const qs = searchParams.toString();
    return get<OrdersResponse>(`/orders${qs ? `?${qs}` : ''}`);
  },
  getStats: () => get<OrderStats>('/orders/stats'),
  updateOrder: (orderNumber: string, data: { status?: string; payment_status?: string }) =>
    put<AdminOrder>(`/orders/${encodeURIComponent(orderNumber)}`, data),
};

// ═══════════════════════════════════════════════════════════
//                   CUSTOMERS API
// ═══════════════════════════════════════════════════════════

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  orders: number;
  total_spent: string;
  initials: string;
}

export interface CustomersResponse {
  items: AdminCustomer[];
  total: number;
  page: number;
  page_size: number;
}

export const customersApi = {
  getCustomers: (params?: { search?: string; location?: string; page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.location) searchParams.set('location', params.location);
    if (params?.page) searchParams.set('page', String(params.page));
    const qs = searchParams.toString();
    return get<CustomersResponse>(`/customers${qs ? `?${qs}` : ''}`);
  },
};

// ═══════════════════════════════════════════════════════════
//                   ANALYTICS API
// ═══════════════════════════════════════════════════════════

export interface AnalyticsOverview {
  revenue: string;
  revenue_trend: string;
  revenue_is_up: boolean;
  orders: string;
  orders_trend: string;
  orders_is_up: boolean;
  customers: string;
  customers_trend: string;
  customers_is_up: boolean;
  avg_order: string;
  avg_order_trend: string;
  avg_order_is_up: boolean;
}

export interface SalesDataPoint {
  name: string;
  sales: number;
  orders: number;
}

export interface CategorySalesPoint {
  name: string;
  value: number;
}

export const analyticsApi = {
  getOverview: () => get<AnalyticsOverview>('/analytics/overview'),
  getSales: () => get<SalesDataPoint[]>('/analytics/sales'),
  getCategories: () => get<CategorySalesPoint[]>('/analytics/categories'),
};

// ═══════════════════════════════════════════════════════════
//                    SETTINGS API
// ═══════════════════════════════════════════════════════════

export interface AdminProfile {
  name: string;
  display_name: string;
  email: string;
  bio: string;
  avatar: string;
}

export const settingsApi = {
  getProfile: () => get<AdminProfile>('/settings/profile'),
  updateProfile: (data: Partial<AdminProfile>) => put<AdminProfile>('/settings/profile', data),
  changePassword: (data: { current_password: string; new_password: string }) =>
    put<{ status: string }>('/settings/password', data),
  getNotifications: () => get<Record<string, boolean>>('/settings/notifications'),
  updateNotifications: (data: Record<string, boolean>) => put<Record<string, boolean>>('/settings/notifications', data),
  getGeneral: () => get<Record<string, string>>('/settings/general'),
  updateGeneral: (data: Record<string, string>) => put<Record<string, string>>('/settings/general', data),
};
