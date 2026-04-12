import React, { useEffect, useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { customersApi, AdminCustomer } from '@/src/lib/api';

export function CustomersScreen() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadCustomers();
  }, [page]);

  const loadCustomers = async (searchQuery?: string) => {
    setLoading(true);
    try {
      const res = await customersApi.getCustomers({
        search: searchQuery || search || undefined,
        page,
      });
      setCustomers(res.items);
      setTotal(res.total);
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setPage(1);
      loadCustomers(value);
    }, 400);
    setSearchTimeout(timeout);
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/15 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-secondary transition-all" 
              placeholder="Search customers..." 
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2 px-4 text-sm font-bold focus:ring-secondary">
              <option>All Locations</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest text-center">Orders</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest text-right">Total Spent</th>
                    <th className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-widest">Joined</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-surface-container-low/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary text-sm">
                            {customer.initials}
                          </div>
                          <span className="font-serif font-bold text-primary">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                            <Mail size={12} />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                            <Phone size={12} />
                            {customer.phone || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-secondary font-bold">
                          <MapPin size={14} />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-sm">{customer.orders}</td>
                      <td className="px-6 py-4 text-right font-serif font-bold text-primary">{customer.total_spent}</td>
                      <td className="px-6 py-4 text-sm text-on-surface-variant font-bold">{customer.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">No customers found</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant font-bold">
                Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} customers
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
                  <button 
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 rounded-lg font-bold text-sm",
                      p === page ? "bg-primary text-white" : "hover:bg-surface-container-high"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
