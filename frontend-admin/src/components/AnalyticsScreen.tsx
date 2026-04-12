import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { cn } from '@/src/lib/utils';
import {
  analyticsApi,
  AnalyticsOverview,
  SalesDataPoint,
  CategorySalesPoint,
} from '@/src/lib/api';

export function AnalyticsScreen() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [categoryData, setCategoryData] = useState<CategorySalesPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [ov, sd, cd] = await Promise.all([
        analyticsApi.getOverview(),
        analyticsApi.getSales(),
        analyticsApi.getCategories(),
      ]);
      setOverview(ov);
      setSalesData(sd);
      setCategoryData(cd);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !overview) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { label: 'Revenue', value: overview.revenue, trend: overview.revenue_trend, isUp: overview.revenue_is_up, icon: DollarSign },
    { label: 'Orders', value: overview.orders, trend: overview.orders_trend, isUp: overview.orders_is_up, icon: ShoppingCart },
    { label: 'Customers', value: overview.customers, trend: overview.customers_trend, isUp: overview.customers_is_up, icon: Users },
    { label: 'Avg. Order', value: overview.avg_order, trend: overview.avg_order_trend, isUp: overview.avg_order_is_up, icon: TrendingUp },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-low text-primary px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-outline-variant/15">
            <Calendar size={16} />
            Last 7 Days
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm hover:opacity-90 transition-all">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-surface-container-low rounded-lg text-secondary">
                <stat.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold",
                stat.isUp ? "text-green-600" : "text-error"
              )}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="font-serif text-2xl font-bold text-primary">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm h-[400px] flex flex-col">
          <h3 className="font-serif text-xl font-bold mb-6">Sales Performance</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#271310" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#271310" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d3c3c0" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#725a39' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#725a39' }} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#271310" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm h-[400px] flex flex-col">
          <h3 className="font-serif text-xl font-bold mb-6">Orders by Category</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#d3c3c0" opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#725a39' }} width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#725a39" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
