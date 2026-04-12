import React from 'react';
import { 
  Search, 
  Bell, 
  Filter, 
  Calendar, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Truck, 
  Clock,
  CreditCard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Order } from '@/src/types';

const orders: Order[] = [
  {
    id: '#ORD-9021',
    customerName: 'Amara Singh',
    customerEmail: 'amara.s@example.com',
    items: '4x Organic Turmeric, 2x Raw Honey',
    total: 3450,
    status: 'Shipped',
    paymentStatus: 'Paid',
    date: 'Oct 24, 2023',
    initials: 'AS'
  },
  {
    id: '#ORD-9022',
    customerName: 'Vikram Malhotra',
    customerEmail: 'v.malhotra@domain.in',
    items: '1x Hand-Pressed Olive Oil',
    total: 1200,
    status: 'Pending',
    paymentStatus: 'Unpaid',
    date: 'Oct 25, 2023',
    initials: 'VM'
  },
  {
    id: '#ORD-9023',
    customerName: 'Elena Rodriguez',
    customerEmail: 'elena@rodriguez.com',
    items: '3x Heirloom Tomato Seeds',
    total: 850,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    date: 'Oct 25, 2023',
    initials: 'ER'
  },
  {
    id: '#ORD-9024',
    customerName: 'Karan Johar',
    customerEmail: 'karan.j@bolly.com',
    items: '10x Organic Compost Packs',
    total: 5900,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: 'Oct 26, 2023',
    initials: 'KJ'
  }
];

export function OrdersScreen() {
  return (
    <section className="p-8 space-y-8 max-w-[1400px]">
      {/* Filter Bar Section */}
      <div className="bg-surface-container-low rounded-xl p-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-tighter">Status</label>
          <select className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2 px-3 text-sm focus:ring-secondary">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-tighter">Payment Status</label>
          <select className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2 px-3 text-sm focus:ring-secondary">
            <option>All Payments</option>
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Refunded</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-tighter">Date Range</label>
          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-secondary" 
              placeholder="Last 30 days" 
              type="text" 
            />
          </div>
        </div>
        <button className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-bold h-10 hover:opacity-90 transition-all flex items-center gap-2">
          <Filter size={14} />
          Apply Filters
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/15">
        <div className="p-4 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-serif text-lg text-on-surface">Recent Orders</h3>
          <button className="text-secondary font-bold text-xs flex items-center gap-1 hover:underline">
            <Download size={12} />
            Export CSV
          </button>
        </div>
        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent">
          <table className="w-full text-left border-collapse table-fixed min-w-[1000px] lg:min-w-full">
            <thead className="sticky top-0 z-10 bg-surface-container-low shadow-sm">
              <tr className="border-b border-outline-variant/10">
                <th className="w-[10%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest">Order ID</th>
                <th className="w-[18%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest">Customer</th>
                <th className="w-[25%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest">Items</th>
                <th className="w-[12%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">Total (₹)</th>
                <th className="w-[12%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest text-center">Status</th>
                <th className="w-[12%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest text-center">Payment</th>
                <th className="w-[11%] px-4 py-3 text-[10px] font-bold text-secondary uppercase tracking-widest">Date</th>
                <th className="w-[5%] px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 py-3 font-bold text-primary text-xs">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface text-xs truncate">{order.customerName}</span>
                      <span className="text-[10px] text-on-surface-variant truncate">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-on-surface-variant truncate">{order.items}</td>
                  <td className="px-4 py-3 text-xs font-bold text-right">₹{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        order.status === 'Shipped' ? "bg-green-100 text-green-700" :
                        order.status === 'Pending' ? "bg-tertiary-container text-white" :
                        order.status === 'Confirmed' ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        order.paymentStatus === 'Paid' ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
                      )}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-on-surface-variant">{order.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-surface-container rounded-full">
                      <MoreVertical size={14} className="text-on-surface-variant" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard Insight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Daily Fulfillment</h4>
            <p className="font-serif text-3xl font-bold text-primary">84%</p>
            <div className="mt-4 flex items-center gap-2 text-green-700">
              <TrendingUp size={14} />
              <span className="text-xs font-bold">+12% from yesterday</span>
            </div>
          </div>
          <Truck size={120} className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-700 text-primary" />
        </div>
        
        <div className="bg-surface-container-high p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Pending Revenue</h4>
            <p className="font-serif text-3xl font-bold text-primary">₹12,450</p>
            <p className="mt-4 text-xs text-on-surface-variant font-bold">Across 18 unpaid invoices</p>
          </div>
          <CreditCard size={120} className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-700 text-primary" />
        </div>
        
        <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Next Pickup</h4>
            <p className="font-serif text-xl font-bold">Today, 4:30 PM</p>
            <p className="mt-2 text-xs opacity-80 italic font-bold">Curated Logistics Partner</p>
            <button className="mt-6 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors border border-white/20">
              Notify Courier
            </button>
          </div>
          <Clock size={120} className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform duration-700 text-white" />
        </div>
      </div>
    </section>
  );
}
