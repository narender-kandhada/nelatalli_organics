import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight, 
  Package, 
  Truck, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { cn } from '@/src/lib/utils';

const revenueData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 950 },
  { name: 'Jul', value: 850 },
  { name: 'Aug', value: 1000 },
];

const statusData = [
  { name: 'Delivered', value: 72, color: '#271310' },
  { name: 'Processing', value: 18, color: '#725a39' },
  { name: 'Cancelled', value: 10, color: '#d3c3c0' },
];

const recentOrders = [
  { id: '#98321', customer: 'Ananya Sharma', initials: 'AS', total: '₹4,250', status: 'Delivered', date: '24 Oct, 2023' },
  { id: '#98320', customer: 'Rohan Kapoor', initials: 'RK', total: '₹1,120', status: 'Processing', date: '24 Oct, 2023' },
  { id: '#98319', customer: 'Meera Das', initials: 'MD', total: '₹8,400', status: 'Pending', date: '23 Oct, 2023' },
  { id: '#98318', customer: 'Vikram Jha', initials: 'VJ', total: '₹550', status: 'Delivered', date: '23 Oct, 2023' },
];

const lowStockAlerts = [
  { name: 'Organic Neem Honey', category: 'Pantry', stock: 3 },
  { name: 'Hand-pressed Walnut Oil', category: 'Oils', stock: 2 },
  { name: 'A2 Gir Cow Ghee', category: 'Dairy', stock: 5 },
];

const topProducts = [
  { name: 'Wild Forest Honey', sold: 840, percentage: 95 },
  { name: 'Turmeric Root Powder', sold: 720, percentage: 82 },
  { name: 'Himalayan Rock Salt', sold: 650, percentage: 70 },
  { name: 'Cold Pressed Coconut Oil', sold: 510, percentage: 58 },
];

export function DashboardScreen() {
  return (
    <div className="p-8 space-y-10">
      {/* StatCards Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[
          { label: 'Total Revenue', value: '₹1.2M', trend: '+12%', color: 'bg-surface-container-lowest' },
          { label: 'Total Orders', value: '4.5k', trend: '+8%', color: 'bg-surface-container-lowest' },
          { label: 'Total Products', value: '120', trend: null, color: 'bg-surface-container-lowest' },
          { label: 'Total Users', value: '2.8k', trend: '+15%', color: 'bg-surface-container-lowest' },
          { label: 'Low Stock', value: '15', trend: null, color: 'bg-error-container text-on-error-container' },
          { label: 'Pending Orders', value: '42', trend: null, color: 'bg-tertiary-container text-white' },
        ].map((stat, i) => (
          <div key={i} className={cn("p-6 rounded-xl border border-outline-variant/15 flex flex-col gap-2 shadow-sm", stat.color)}>
            <span className={cn("text-xs uppercase font-bold tracking-wider", stat.trend ? "text-secondary" : "opacity-80")}>
              {stat.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl font-bold">{stat.value}</span>
              {stat.trend && <span className="text-xs text-green-600 font-bold">{stat.trend}</span>}
            </div>
          </div>
        ))}
      </section>

      {/* Bento Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Line Chart Area */}
        <div className="lg:col-span-8 bg-surface-container-low p-8 rounded-xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">Revenue Over Time</h2>
              <p className="text-sm text-secondary font-bold">Financial performance for the current quarter</p>
            </div>
            <select className="bg-white border-none ring-1 ring-outline-variant/20 rounded-full text-xs px-4 py-2 font-bold focus:ring-secondary">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d3c3c0" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#725a39' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(39, 19, 16, 0.05)' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#271310" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Area */}
        <div className="lg:col-span-4 bg-surface-container-high p-8 rounded-xl flex flex-col">
          <h2 className="text-2xl font-serif font-bold mb-6">Orders by Status</h2>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="relative w-48 h-48 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-serif font-bold">4.5k</span>
                <span className="text-[10px] uppercase tracking-tighter text-secondary font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-3">
              {statusData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-bold">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section: Table & Alerts */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Recent Orders</h2>
            <button className="text-secondary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">
                  <th className="pb-4 font-bold">Order ID</th>
                  <th className="pb-4 font-bold">Customer</th>
                  <th className="pb-4 font-bold text-right">Total</th>
                  <th className="pb-4 font-bold text-center">Status</th>
                  <th className="pb-4 font-bold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="border-b border-outline-variant/5 last:border-0 hover:bg-surface-container-low transition-colors">
                    <td className="py-5 font-bold text-primary">{order.id}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-surface-container-high text-[10px] flex items-center justify-center font-bold">
                          {order.initials}
                        </div>
                        <span className="font-bold">{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-5 text-right font-serif">{order.total}</td>
                    <td className="py-5 text-center">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold",
                        order.status === 'Delivered' ? "bg-green-100 text-green-700" : 
                        order.status === 'Processing' ? "bg-secondary-container text-on-secondary-container" : 
                        "bg-tertiary-container text-white"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 text-right text-secondary font-bold">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock & Top Products */}
        <div className="space-y-8">
          {/* Low Stock Alerts */}
          <div className="bg-error-container/20 rounded-xl p-8 border border-error/10 flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-error">
              <AlertTriangle size={20} />
              <h2 className="text-2xl font-serif font-bold">Low Stock Alerts</h2>
            </div>
            <div className="space-y-4">
              {lowStockAlerts.map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{alert.name}</span>
                    <span className="text-[10px] uppercase text-on-surface-variant">Category: {alert.category}</span>
                  </div>
                  <span className="text-error font-bold text-sm">{alert.stock} left</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 bg-error text-white rounded-full text-sm font-bold hover:bg-error/90 transition-all">
              Reorder All
            </button>
          </div>

          {/* Top 5 Products */}
          <div className="bg-surface-container-low p-8 rounded-xl flex flex-col">
            <h2 className="text-xl font-serif font-bold mb-6">Top 5 Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-secondary uppercase">
                    <span>{product.name}</span>
                    <span>{product.sold} sold</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
