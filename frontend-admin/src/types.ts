export type Screen = 'login' | 'dashboard' | 'inventory' | 'orders' | 'customers' | 'analytics' | 'settings' | 'support';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: 'Active' | 'Low Stock' | 'Out of Stock';
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: string;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  date: string;
  initials: string;
}
