import React, { useEffect, useState } from 'react';
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
  CreditCard,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ordersApi, AdminOrder, OrderStats } from '@/src/lib/api';

export function OrdersScreen() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [paymentFilter, setPaymentFilter] = useState('All Payments');
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    loadOrders();
    loadStats();
  }, [page, statusFilter, paymentFilter]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await ordersApi.getOrders({
        status: statusFilter !== 'All Statuses' ? statusFilter : undefined,
        payment_status: paymentFilter !== 'All Payments' ? paymentFilter : undefined,
        page,
      });
      setOrders(res.items);
      setTotal(res.total);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const s = await ordersApi.getStats();
      setStats(s);
    } catch (err) {
      console.error('Failed to load order stats:', err);
    }
  };

  const handleStatusChange = async (orderNumber: string, newStatus: string) => {
    setUpdatingOrder(orderNumber);
    try {
      await ordersApi.updateOrder(orderNumber, { status: newStatus });
      loadOrders();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to update order');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const handlePaymentChange = async (orderNumber: string, newPayment: string) => {
    setUpdatingOrder(orderNumber);
    try {
      await ordersApi.updateOrder(orderNumber, { payment_status: newPayment });
      loadOrders();
      loadStats();
    } catch (err: any) {
      alert(err.message || 'Failed to update payment');
    } finally {
      setUpdatingOrder(null);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="p-6 lg:p-8 space-y-6 w-full">
      {/* Filter Bar Section */}
      <div className="bg-surface-container-low rounded-xl p-5 flex flex-wrap gap-4 items-end w-full">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Status</label>
          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm font-medium focus:ring-secondary"
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Payment Status</label>
          <select 
            value={paymentFilter}
            onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
            className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm font-medium focus:ring-secondary"
          >
            <option>All Payments</option>
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Refunded</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">Date Range</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-secondary" 
              placeholder="Last 30 days" 
              type="text" 
            />
          </div>
        </div>
        <button 
          onClick={() => { loadOrders(); }}
          className="bg-secondary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2"
        >
          <Filter size={16} />
          Apply Filters
        </button>
      </div>

      {/* Data Table Section — Full Width */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/15 w-full">
        <div className="p-5 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-serif text-xl text-on-surface font-bold">Recent Orders ({total})</h3>
          <button className="text-secondary font-bold text-sm flex items-center gap-1.5 hover:underline">
            <Download size={14} />
            Export CSV
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low">
                  <tr className="border-b border-outline-variant/10">
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Order ID</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Items</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Total (₹)</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Payment</th>
                    <th className="px-5 py-4 text-xs font-bold text-secondary uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-5 py-4 font-bold text-primary text-sm">{order.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-on-surface text-sm">{order.customer_name}</span>
                          <span className="text-xs text-on-surface-variant mt-0.5">{order.customer_email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant max-w-[300px] truncate">{order.items}</td>
                      <td className="px-5 py-4 text-sm font-bold text-right font-serif">₹{order.total.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            disabled={updatingOrder === order.id}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none focus:ring-1 focus:ring-secondary cursor-pointer",
                              order.status === 'Delivered' ? "bg-green-100 text-green-700" :
                              order.status === 'Shipped' ? "bg-blue-100 text-blue-700" :
                              order.status === 'Confirmed' ? "bg-amber-100 text-amber-700" :
                              "bg-tertiary-container text-white"
                            )}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center">
                          <select
                            value={order.payment_status}
                            onChange={(e) => handlePaymentChange(order.id, e.target.value)}
                            disabled={updatingOrder === order.id}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border-none focus:ring-1 focus:ring-secondary cursor-pointer",
                              order.payment_status === 'Paid' ? "bg-secondary-container text-on-secondary-container" : 
                              order.payment_status === 'Refunded' ? "bg-amber-100 text-amber-700" :
                              "bg-error-container text-on-error-container"
                            )}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-on-surface-variant font-medium">{order.date}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={7} className="px-5 py-12 text-center text-on-surface-variant text-base">No orders found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 bg-surface-container-low border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-on-surface-variant font-medium">
                Showing <span className="font-bold text-on-surface">{Math.min((page - 1) * pageSize + 1, total)}</span> to <span className="font-bold text-on-surface">{Math.min(page * pageSize, total)}</span> of <span className="font-bold text-on-surface">{total}</span> orders
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg text-xs font-bold hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  First
                </button>
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>
                {getPageNumbers().map((p, idx) => (
                  typeof p === 'number' ? (
                    <button 
                      key={idx}
                      onClick={() => setPage(p)}
                      className={cn(
                        "w-9 h-9 rounded-lg font-bold text-sm transition-all",
                        p === page ? "bg-primary text-white shadow-sm" : "hover:bg-surface-container-high text-on-surface"
                      )}
                    >
                      {p}
                    </button>
                  ) : (
                    <span key={idx} className="px-1 text-on-surface-variant select-none">…</span>
                  )
                ))}
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
                <button 
                  onClick={() => setPage(totalPages)}
                  disabled={page >= totalPages}
                  className="px-3 py-2 rounded-lg text-xs font-bold hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  Last
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Dashboard Insight Cards — Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Daily Fulfillment</h4>
            <p className="font-serif text-4xl font-bold text-primary">{stats ? `${stats.fulfillment_rate}%` : '—'}</p>
            <div className="mt-4 flex items-center gap-2 text-green-700">
              <TrendingUp size={16} />
              <span className="text-sm font-bold">{stats?.fulfillment_trend || '+0%'}</span>
            </div>
          </div>
          <Truck size={120} className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-700 text-primary" />
        </div>
        
        <div className="bg-surface-container-high p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Pending Revenue</h4>
            <p className="font-serif text-4xl font-bold text-primary">₹{stats ? stats.pending_revenue.toLocaleString() : '0'}</p>
            <p className="mt-4 text-sm text-on-surface-variant font-bold">Across {stats?.pending_invoices || 0} unpaid invoices</p>
          </div>
          <CreditCard size={120} className="absolute -right-4 -bottom-4 opacity-5 transform group-hover:scale-110 transition-transform duration-700 text-primary" />
        </div>
        
        <div className="bg-primary text-white p-6 rounded-xl relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Next Pickup</h4>
            <p className="font-serif text-2xl font-bold">Today, 4:30 PM</p>
            <p className="mt-2 text-sm opacity-80 italic font-bold">Curated Logistics Partner</p>
            <button className="mt-6 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors border border-white/20">
              Notify Courier
            </button>
          </div>
          <Clock size={120} className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:scale-110 transition-transform duration-700 text-white" />
        </div>
      </div>
    </section>
  );
}
