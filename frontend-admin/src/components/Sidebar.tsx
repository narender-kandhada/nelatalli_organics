import React from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Screen } from '@/src/types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Sidebar({ currentScreen, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Leaf },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ] as const;

  return (
    <aside className="hidden md:flex flex-col h-screen sticky left-0 top-0 w-[241px] bg-primary py-6 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=200&h=200&auto=format&fit=crop" 
            alt="Nelatalli Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-serif italic text-white leading-none">Nelatalli</span>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-sans font-semibold">Organics</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as Screen)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 mx-2 rounded-full transition-all group",
              index === 3 ? "w-[221px]" : "w-[220px]",
              currentScreen === item.id 
                ? "bg-tertiary-container text-white scale-95 font-bold" 
                : "text-stone-400 hover:text-white hover:bg-primary-container"
            )}
          >
            <item.icon size={20} className={cn(currentScreen === item.id && "fill-current")} />
            <span className="text-sm font-sans">{item.label}</span>
          </button>
        ))}
      </nav>

      <footer className="mt-auto pt-6 border-t border-white/10">
        <button 
          onClick={() => onNavigate('login')}
          className="w-full text-stone-400 hover:text-white px-6 py-3 transition-colors flex items-center gap-3"
        >
          <LogOut size={20} />
          <span className="text-sm font-sans">Log Out</span>
        </button>
      </footer>
    </aside>
  );
}
