import React from 'react';
import { motion } from 'motion/react';
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight, Clock, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi, ordersApi, addressesApi, paymentMethodsApi, getAuthToken, clearAuthToken, type UserProfile, type Order, type Address, type PaymentMethod } from '../api';

import logoImg from '../assets/logo.png';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());

  const [activeTab, setActiveTab] = useState('Dashboard');

  // Form toggles
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // User form
  const [userForm, setUserForm] = useState({ name: '', phone: '', address: '' });
  
  // Refresh on mount
  useEffect(() => {
    if (!getAuthToken()) return;
    usersApi.getProfile()
      .then(u => {
        setUser(u);
        setUserForm({ name: u.name, phone: u.phone, address: u.address });
      })
      .catch((err) => {
        if (err.status === 401) {
          clearAuthToken();
          setIsLoggedIn(false);
          navigate('/login');
        }
      });
    ordersApi.getAll().then(setOrders).catch(() => {});
    addressesApi.getAll().then(setAddresses).catch(() => {});
    paymentMethodsApi.getAll().then(setPaymentMethods).catch(() => {});
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    setIsLoggedIn(false);
    setUser(null);
    setOrders([]);
    navigate('/');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await usersApi.updateProfile(userForm);
      setUser(updated);
      alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleAddAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      title: fd.get('title') as string,
      full_name: fd.get('full_name') as string,
      street: fd.get('street') as string,
      city: fd.get('city') as string,
      state: fd.get('state') as string,
      zip_code: fd.get('zip_code') as string,
      phone: fd.get('phone') as string,
      is_default: fd.get('is_default') === 'on',
    };
    try {
      const added = await addressesApi.add(data);
      setAddresses(prev => data.is_default ? [added, ...prev.map(a => ({...a, is_default: false}))] : [...prev, added]);
      setShowAddressForm(false);
    } catch {
      alert('Failed to add address');
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await addressesApi.remove(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch {
      alert('Failed to delete address');
    }
  };

  const handleAddPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      provider: fd.get('provider') as string,
      card_number_last4: (fd.get('card_number') as string).slice(-4),
      expiry_month: fd.get('expiry_month') as string,
      expiry_year: fd.get('expiry_year') as string,
      card_holder_name: fd.get('card_holder_name') as string,
      is_default: fd.get('is_default') === 'on',
    };
    try {
      const added = await paymentMethodsApi.add(data);
      setPaymentMethods(prev => data.is_default ? [added, ...prev.map(p => ({...p, is_default: false}))] : [...prev, added]);
      setShowPaymentForm(false);
    } catch {
      alert('Failed to add payment method');
    }
  };

  const handleDeletePayment = async (id: number) => {
    try {
      await paymentMethodsApi.remove(id);
      setPaymentMethods(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete payment method');
    }
  };

  const displayUser = user || {
    name: 'Raj Rajendar',
    email: 'rajrajendar331@gmail.com',
    phone: '+91 90304 14241',
    address: '45, Green Valley, Bangalore, KA',
    avatar: logoImg,
    member_since: 'October 2024',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface min-h-screen"
    >
      <div className="bg-surface-container-low py-4 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-sm font-label text-primary/60">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-secondary font-bold">Account</span>
        </div>
      </div>

      <section className="py-12 md:py-20 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                <img src={displayUser.avatar} alt={displayUser.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h2 className="font-headline text-2xl font-bold text-primary">{displayUser.name}</h2>
                <p className="text-xs font-label text-primary/40 uppercase tracking-widest">Member since {displayUser.member_since}</p>
              </div>
            </div>

            <nav className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
              {[
                { name: 'Dashboard', icon: User },
                { name: 'My Orders', icon: Package },
                { name: 'Addresses', icon: MapPin },
                { name: 'Payment Methods', icon: CreditCard },
                { name: 'Account Settings', icon: Settings },
                { name: 'Logout', icon: LogOut, danger: true, action: handleLogout },
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => item.action ? item.action() : setActiveTab(item.name)}
                  className={`w-full flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all border-l-4 ${
                    activeTab === item.name 
                      ? 'bg-surface-container-high border-secondary text-secondary' 
                      : 'border-transparent text-primary/60 hover:bg-surface-container-high hover:text-primary'
                  } ${item.danger ? 'hover:text-red-500' : ''}`}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {activeTab === 'Dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow flex items-center gap-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-label text-primary/40 uppercase tracking-widest">Total Orders</p>
                      <p className="text-2xl font-bold text-primary">{orders.length}</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow flex items-center gap-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-label text-primary/40 uppercase tracking-widest">Addresses</p>
                      <p className="text-2xl font-bold text-primary">{addresses.length}</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow flex items-center gap-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-label text-primary/40 uppercase tracking-widest">Cards Saved</p>
                      <p className="text-2xl font-bold text-primary">{paymentMethods.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow space-y-8">
                  <h3 className="font-headline text-2xl font-bold text-primary border-b border-outline-variant/10 pb-4">Account Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Full Name</label>
                      <p className="text-lg font-bold text-primary">{displayUser.name}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Email Address</label>
                      <p className="text-lg font-bold text-primary">{displayUser.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Phone Number</label>
                      <p className="text-lg font-bold text-primary">{displayUser.phone || 'Not set'}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Default Address</label>
                      <p className="text-lg font-bold text-primary">{displayUser.address || 'Not set'}</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('Account Settings')} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
                    Edit Profile
                  </button>
                </div>
              </>
            )}

            {activeTab === 'My Orders' && (
              <div className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
                <div className="px-8 py-6 border-b border-outline-variant/10">
                  <h3 className="font-headline text-2xl font-bold text-primary">Order History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-high text-primary/60 text-[10px] font-label tracking-widest uppercase">
                        <th className="px-8 py-4">Order ID</th>
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4">Total</th>
                        <th className="px-8 py-4 text-right">Items</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {orders.length === 0 ? (
                        <tr><td colSpan={5} className="px-8 py-12 text-center text-primary/40 font-label">No orders found.</td></tr>
                      ) : orders.map((order) => (
                        <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                          <td className="px-8 py-6 font-bold text-primary">{order.order_number}</td>
                          <td className="px-8 py-6 text-sm text-primary/60">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] font-label font-bold tracking-widest uppercase px-2 py-1 rounded ${
                              order.status === 'Delivered' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 font-bold text-primary">₹{order.total.toFixed(2)}</td>
                          <td className="px-8 py-6 text-right text-sm text-primary/60">
                            {order.items.length} items
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Addresses' && (
              <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow space-y-8">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <h3 className="font-headline text-2xl font-bold text-primary">Saved Addresses</h3>
                  <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-secondary font-bold text-sm flex items-center gap-2 hover:underline">
                    <Plus size={16} /> Add New
                  </button>
                </div>
                
                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="bg-surface-container-high p-6 rounded-2xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">Title (Home, Work)</label><input required name="title" className="w-full p-2 rounded border" defaultValue="Home"/></div>
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">Full Name</label><input required name="full_name" className="w-full p-2 rounded border" /></div>
                      <div className="col-span-2"><label className="text-xs font-bold text-primary/60 block mb-1">Street Address</label><input required name="street" className="w-full p-2 rounded border" /></div>
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">City</label><input required name="city" className="w-full p-2 rounded border" /></div>
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">State</label><input required name="state" className="w-full p-2 rounded border" /></div>
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">ZIP Code</label><input required name="zip_code" className="w-full p-2 rounded border" /></div>
                      <div><label className="text-xs font-bold text-primary/60 block mb-1">Phone</label><input required name="phone" className="w-full p-2 rounded border" /></div>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="is_default" /> Set as default address
                    </label>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 font-bold text-sm">Cancel</button>
                      <button type="submit" className="bg-primary text-on-primary px-4 py-2 rounded font-bold text-sm">Save Address</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.length === 0 ? <p className="text-sm text-primary/40 col-span-2">No addresses saved yet.</p> : addresses.map(addr => (
                    <div key={addr.id} className="border border-outline-variant/20 rounded-2xl p-6 relative">
                      {addr.is_default && <span className="absolute top-4 right-4 text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-1 rounded">DEFAULT</span>}
                      <h4 className="font-bold text-lg text-primary">{addr.title}</h4>
                      <p className="text-sm text-primary/80 mt-2">{addr.full_name}</p>
                      <p className="text-sm text-primary/60">{addr.street}, {addr.city}</p>
                      <p className="text-sm text-primary/60">{addr.state} {addr.zip_code}</p>
                      <p className="text-sm text-primary/60">Phone: {addr.phone}</p>
                      <button onClick={() => handleDeleteAddress(addr.id)} className="mt-4 text-red-500 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Payment Methods' && (
              <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow space-y-8">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <h3 className="font-headline text-2xl font-bold text-primary">Payment Methods</h3>
                  <button onClick={() => setShowPaymentForm(!showPaymentForm)} className="text-secondary font-bold text-sm flex items-center gap-2 hover:underline">
                    <Plus size={16} /> Add New
                  </button>
                </div>

                {showPaymentForm && (
                  <form onSubmit={handleAddPayment} className="bg-surface-container-high p-6 rounded-2xl space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-primary/60 block mb-1">Provider (e.g. Visa)</label>
                        <input required name="provider" className="w-full p-2 rounded border" placeholder="Visa" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-primary/60 block mb-1">Card Holder Name</label>
                        <input required name="card_holder_name" className="w-full p-2 rounded border" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-primary/60 block mb-1">Card Number</label>
                        <input required name="card_number" className="w-full p-2 rounded border" placeholder="**** **** **** 1234" minLength={16} maxLength={16} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-primary/60 block mb-1">Expiry Month</label>
                        <input required name="expiry_month" className="w-full p-2 rounded border" placeholder="MM" minLength={2} maxLength={2} />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-primary/60 block mb-1">Expiry Year</label>
                        <input required name="expiry_year" className="w-full p-2 rounded border" placeholder="YYYY" minLength={4} maxLength={4} />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="is_default" /> Set as default method
                    </label>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" onClick={() => setShowPaymentForm(false)} className="px-4 py-2 font-bold text-sm">Cancel</button>
                      <button type="submit" className="bg-primary text-on-primary px-4 py-2 rounded font-bold text-sm">Save Card</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.length === 0 ? <p className="text-sm text-primary/40 col-span-2">No payment methods saved.</p> : paymentMethods.map(pm => (
                    <div key={pm.id} className="border border-outline-variant/20 rounded-2xl p-6 relative">
                      {pm.is_default && <span className="absolute top-4 right-4 text-[10px] bg-secondary/10 text-secondary font-bold px-2 py-1 rounded">DEFAULT</span>}
                      <h4 className="font-bold text-lg text-primary uppercase">{pm.provider}</h4>
                      <p className="text-sm text-primary/80 mt-2 font-mono">**** **** **** {pm.card_number_last4}</p>
                      <p className="text-xs text-primary/60 mt-1">Expires: {pm.expiry_month}/{pm.expiry_year}</p>
                      <p className="text-xs text-primary/60 mt-1">{pm.card_holder_name}</p>
                      <button onClick={() => handleDeletePayment(pm.id)} className="mt-4 text-red-500 text-xs font-bold flex items-center gap-1 hover:underline">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Account Settings' && (
              <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow space-y-8">
                <h3 className="font-headline text-2xl font-bold text-primary border-b border-outline-variant/10 pb-4">Personal Information</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">Full Name</label>
                    <input 
                      required 
                      className="w-full p-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:border-secondary" 
                      value={userForm.name}
                      onChange={e => setUserForm({...userForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">Phone Number</label>
                    <input 
                      className="w-full p-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:border-secondary" 
                      value={userForm.phone}
                      onChange={e => setUserForm({...userForm, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">Fallback Address (Used if no saved addresses)</label>
                    <textarea 
                      className="w-full p-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:border-secondary" 
                      rows={3}
                      value={userForm.address}
                      onChange={e => setUserForm({...userForm, address: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </section>
    </motion.div>
  );
}
