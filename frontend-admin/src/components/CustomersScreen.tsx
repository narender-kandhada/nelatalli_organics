import React from 'react';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const customers = [
  { id: '1', name: 'Ananya Sharma', email: 'ananya@example.com', phone: '+91 98765 43210', location: 'Mumbai, MH', joined: 'Oct 2023', orders: 12, totalSpent: '₹45,200', initials: 'AS' },
  { id: '2', name: 'Rohan Kapoor', email: 'rohan.k@domain.in', phone: '+91 98234 56789', location: 'Delhi, DL', joined: 'Sep 2023', orders: 8, totalSpent: '₹22,150', initials: 'RK' },
  { id: '3', name: 'Meera Das', email: 'meera.das@gmail.com', phone: '+91 99887 76655', location: 'Bangalore, KA', joined: 'Aug 2023', orders: 15, totalSpent: '₹68,400', initials: 'MD' },
  { id: '4', name: 'Vikram Jha', email: 'vjha@outlook.com', phone: '+91 91234 56789', location: 'Pune, MH', joined: 'Nov 2023', orders: 3, totalSpent: '₹5,550', initials: 'VJ' },
  { id: '5', name: 'Sanya Malhotra', email: 'sanya.m@example.com', phone: '+91 98765 00000', location: 'Hyderabad, TS', joined: 'Oct 2023', orders: 5, totalSpent: '₹12,800', initials: 'SM' },
];

export function CustomersScreen() {
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
                        {customer.phone}
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
                  <td className="px-6 py-4 text-right font-serif font-bold text-primary">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant font-bold">{customer.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-sm text-on-surface-variant font-bold">Showing 1 to 5 of 42 customers</p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high font-bold text-sm">2</button>
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
