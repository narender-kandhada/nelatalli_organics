import React from 'react';
import { Search, Bell, UserCircle } from 'lucide-react';
import { Screen } from '@/src/types';

interface TopBarProps {
  currentScreen: Screen;
}

export function TopBar({ currentScreen }: TopBarProps) {
  const title = currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1);

  return (
    <header className="bg-surface/85 backdrop-blur-xl sticky top-0 z-40 flex justify-between items-center px-8 h-20 w-full shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="font-serif text-3xl font-bold text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant">
            <Search size={18} />
          </div>
          <input 
            className="bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 rounded-lg py-2 pl-10 pr-4 text-sm w-64 focus:ring-secondary transition-all" 
            placeholder={`Search ${currentScreen}...`}
            type="text"
          />
        </div>
        
        <button className="p-2 text-on-surface hover:bg-surface-container rounded-full transition-all">
          <Bell size={20} />
        </button>
        
        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2"></div>
        
        <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-white">
          <img 
            className="w-full h-full object-cover" 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Admin Profile"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
