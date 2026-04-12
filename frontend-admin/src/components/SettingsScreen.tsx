import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Database,
  Mail,
  Lock,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  LogOut,
  Trash2,
  Download,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'general' | 'appearance' | 'data';

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [accentColor, setAccentColor] = useState('#271310');
  const [isCompact, setIsCompact] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'general', label: 'General', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data', icon: Database },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Public Profile</h3>
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-surface-container-high overflow-hidden border-4 border-white shadow-sm">
                <img 
                  src="https://picsum.photos/seed/admin/200/200" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="bg-surface-container-low text-primary px-4 py-2 rounded-full text-xs font-bold border border-outline-variant/15 hover:bg-surface-container-high transition-all">
                Change Avatar
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Full Name</label>
                <input 
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary transition-all" 
                  defaultValue="Narender Kandhada"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Display Name</label>
                <input 
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary transition-all" 
                  defaultValue="Narender"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-secondary transition-all" 
                    defaultValue="n.kandhada@nelatalli.com"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Bio</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary transition-all h-24 resize-none" 
                  defaultValue="Senior Editorial Curator at Nelatalli Organics. Passionate about sustainable agriculture and botanical heritage."
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </section>
        );

      case 'notifications':
        return (
          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-8">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Notification Preferences</h3>
            
            <div className="space-y-6">
              {[
                { title: 'Email Notifications', desc: 'Receive daily summaries and order alerts via email.', enabled: true },
                { title: 'Desktop Alerts', desc: 'Get real-time browser notifications for new orders.', enabled: false },
                { title: 'Newsletter', desc: 'Stay updated with our seasonal botanical reports.', enabled: true },
                { title: 'Inventory Alerts', desc: 'Notify when products reach low stock thresholds.', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="max-w-md">
                    <p className="text-sm font-bold text-primary">{item.title}</p>
                    <p className="text-xs text-on-surface-variant font-medium">{item.desc}</p>
                  </div>
                  <button 
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      item.enabled ? "bg-primary" : "bg-surface-container-high"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                      item.enabled ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-all">
                <Save size={18} />
                Update Preferences
              </button>
            </div>
          </section>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">Current Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input type="password" title="Current Password" placeholder="••••••••" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-secondary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">New Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input type="password" title="New Password" placeholder="••••••••" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-secondary" />
                  </div>
                </div>
                <button className="bg-surface-container text-primary px-6 py-2.5 rounded-full text-xs font-bold border border-outline-variant/10 hover:bg-surface-container-high transition-all">
                  Update Password
                </button>
              </div>
            </section>

            <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Two-Factor Authentication</h3>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <CheckCircle2 className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="text-sm font-bold text-green-900">2FA is currently enabled</p>
                  <p className="text-xs text-green-700 font-medium">Your account is protected by an additional layer of security.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <Smartphone className="text-secondary" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary">Authenticator App</p>
                  <p className="text-xs text-on-surface-variant font-medium">Google Authenticator, Authy, or Microsoft Authenticator.</p>
                </div>
                <button className="text-error font-bold text-xs hover:underline">Disable</button>
              </div>
            </section>
          </div>
        );

      case 'general':
        return (
          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-8">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">General Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Language</label>
                <select title="Language" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Hindi (हिन्दी)</option>
                  <option>Spanish (Español)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Timezone</label>
                <select title="Timezone" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary">
                  <option>(GMT+05:30) Mumbai, Kolkata</option>
                  <option>(GMT+00:00) London, UTC</option>
                  <option>(GMT-08:00) Pacific Time</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Currency</label>
                <select title="Currency" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Date Format</label>
                <select title="Date Format" className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
              <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-all">
                <Save size={18} />
                Save Preferences
              </button>
            </div>
          </section>
        );

      case 'appearance':
        return (
          <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-8">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Appearance</h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Theme Mode</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: 'Light', icon: Globe },
                    { id: 'dark', label: 'Dark', icon: Globe },
                    { id: 'system', label: 'System', icon: Globe },
                  ].map((t) => (
                    <button 
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all group",
                        theme === t.id ? "border-secondary bg-secondary-container/20" : "border-outline-variant/15 hover:bg-surface-container-low"
                      )}
                    >
                      <div className={cn(
                        "w-full aspect-video rounded-lg transition-all",
                        t.id === 'light' ? "bg-stone-100" : t.id === 'dark' ? "bg-stone-900" : "bg-gradient-to-br from-stone-100 to-stone-900"
                      )} />
                      <span className={cn(
                        "text-xs font-bold",
                        theme === t.id ? "text-secondary" : "text-secondary/60"
                      )}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Accent Color</label>
                <div className="flex gap-4">
                  {['#271310', '#725a39', '#4a5d4e', '#5d4a4a', '#4a4d5d'].map((color) => (
                    <button 
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 shadow-sm ring-1 ring-outline-variant/20 transition-transform hover:scale-110 relative",
                        accentColor === color ? "border-white ring-2 ring-secondary" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    >
                      {accentColor === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle2 size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Compact Mode</p>
                  <p className="text-xs text-on-surface-variant font-medium">Reduce padding and font sizes for high-density views.</p>
                </div>
                <button 
                  onClick={() => setIsCompact(!isCompact)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    isCompact ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    isCompact ? "right-1" : "left-1"
                  )} />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/10 flex justify-end">
              <button 
                onClick={() => {
                  // In a real app, this would update a global context or CSS variables
                  alert(`Appearance saved!\nTheme: ${theme}\nAccent: ${accentColor}\nCompact: ${isCompact}`);
                }}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <Save size={18} />
                Apply Appearance
              </button>
            </div>
          </section>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/15 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-primary border-b border-outline-variant/10 pb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="text-secondary" size={20} />
                    <div>
                      <p className="text-sm font-bold text-primary">Export Your Data</p>
                      <p className="text-xs text-on-surface-variant font-medium">Download a copy of your inventory and order history.</p>
                    </div>
                  </div>
                  <button className="bg-white text-primary px-4 py-2 rounded-full text-xs font-bold border border-outline-variant/10 hover:bg-surface-container transition-all">
                    Export JSON
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-3">
                    <Trash2 className="text-secondary" size={20} />
                    <div>
                      <p className="text-sm font-bold text-primary">Clear Local Cache</p>
                      <p className="text-xs text-on-surface-variant font-medium">Reset temporary application data and images.</p>
                    </div>
                  </div>
                  <button className="text-secondary font-bold text-xs hover:underline">Clear Cache</button>
                </div>
              </div>
            </section>

            <section className="bg-error-container/10 p-8 rounded-xl border border-error/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-error border-b border-error/10 pb-4">Danger Zone</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">Delete Account</p>
                  <p className="text-xs text-on-surface-variant font-medium">Permanently remove your account and all associated data.</p>
                </div>
                <button className="bg-error text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-error/90 transition-all">
                  Delete Account
                </button>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all",
                activeTab === tab.id ? "bg-primary text-white" : "text-secondary hover:bg-surface-container-low"
              )}
            >
              <div className="flex items-center gap-3">
                <tab.icon size={18} />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight size={14} />}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-outline-variant/10">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-error hover:bg-error-container/10 transition-all">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <div className="md:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
