import { motion } from 'motion/react';
import { ChevronRight, CreditCard, MapPin, CheckCircle, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, type FormEvent } from 'react';
import { addressesApi, paymentMethodsApi, cartApi, ordersApi, getAuthToken, type Address, type PaymentMethod, type CartItem } from '../api';

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate('/login?redirect=/checkout');
      return;
    }
    Promise.all([
      addressesApi.getAll().then(setAddresses).catch(()=>[]),
      paymentMethodsApi.getAll().then(setPaymentMethods).catch(()=>[]),
      cartApi.getAll().then(setCartItems).catch(()=>[])
    ]).finally(() => {
      setLoading(false);
    });
  }, [navigate]);

  useEffect(() => {
    if (addresses.length > 0 && selectedAddressId === null) {
      setSelectedAddressId(addresses.find(a => a.is_default)?.id || addresses[0].id);
    }
    if (paymentMethods.length > 0 && selectedPaymentId === null) {
      setSelectedPaymentId(paymentMethods.find(a => a.is_default)?.id || paymentMethods[0].id);
    }
  }, [addresses, paymentMethods, selectedAddressId, selectedPaymentId]);

  if (loading) {
    return <div className="text-center py-40">Loading checkout...</div>;
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="text-center py-40 bg-surface min-h-screen">
        <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="px-6 py-2 bg-primary text-on-primary rounded font-bold">Go Shop</button>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const shipping = 50.0;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return alert("Please select a shipping address.");
    if (!selectedPaymentId) return alert("Please select a payment method.");
    
    setPlacingOrder(true);
    try {
      await ordersApi.place();
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } catch {
      alert("Failed to place order.");
      setPlacingOrder(false);
    }
  };

  const handleAddNewAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddingAddress(true);
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
      setAddresses(prev => [...prev, added]);
      setSelectedAddressId(added.id);
      setShowAddressForm(false);
    } catch {
      alert("Failed to save new address.");
    } finally {
      setIsAddingAddress(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8">
        <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: 'spring', bounce: 0.5}}>
          <CheckCircle className="text-green-500 mx-auto w-24 h-24 mb-6" />
        </motion.div>
        <h1 className="text-3xl font-headline font-bold text-primary mb-2">Order Confirmed!</h1>
        <p className="text-primary/60 text-lg text-center mb-8">Thank you for your purchase. We are redirecting you to your dashboard.</p>
        <button onClick={() => navigate('/profile')} className="px-6 py-3 bg-secondary text-white rounded-lg font-bold">View My Orders</button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface min-h-screen pb-20"
    >
      <div className="bg-surface-container-low py-4 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-sm font-label text-primary/60">
          <Link to="/cart" className="hover:text-secondary transition-colors">Cart</Link>
          <ChevronRight size={14} />
          <span className="text-secondary font-bold">Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Shipping */}
          <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-outline-variant text-primary/40'}`}>1</div>
                <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2"><MapPin size={20}/> Shipping Address</h2>
              </div>
              {addresses.length > 0 && !showAddressForm && (
                <button onClick={() => setShowAddressForm(true)} className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline">
                  Add New
                </button>
              )}
            </div>

            {showAddressForm || addresses.length === 0 ? (
              <form onSubmit={handleAddNewAddress} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-1">
                    <label className="text-xs font-bold text-primary/60 block mb-1">Address Label</label>
                    <input name="title" required placeholder="Home, Work, etc." className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="text-xs font-bold text-primary/60 block mb-1">Full Name</label>
                    <input name="full_name" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-primary/60 block mb-1">Street Address</label>
                    <input name="street" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">City</label>
                    <input name="city" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">State</label>
                    <input name="state" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">ZIP Code</label>
                    <input name="zip_code" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-primary/60 block mb-1">Phone</label>
                    <input name="phone" required className="w-full p-2 border border-outline-variant/20 rounded bg-white" />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input type="checkbox" name="is_default" id="is_default" className="w-4 h-4" />
                    <label htmlFor="is_default" className="text-sm text-primary/80">Set as default address</label>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <button 
                    type="submit" 
                    disabled={isAddingAddress}
                    className="px-6 py-2 bg-primary text-on-primary rounded font-bold text-sm disabled:opacity-50"
                  >
                    {isAddingAddress ? 'Saving...' : 'Save and Use Address'}
                  </button>
                  {addresses.length > 0 && (
                    <button type="button" onClick={() => setShowAddressForm(false)} className="text-sm font-bold text-primary/60 hover:text-primary">Cancel</button>
                  )}
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map(a => (
                  <div key={a.id} 
                    onClick={() => setSelectedAddressId(a.id)}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedAddressId === a.id ? 'border-secondary bg-secondary/5 shadow-inner' : 'border-outline-variant/20 hover:border-primary/40'}`}
                  >
                    <div className="font-bold text-primary flex items-center justify-between">
                      <span>{a.title}</span>
                      {a.is_default && <span className="text-[10px] bg-secondary/20 text-secondary px-2 rounded">DEFAULT</span>}
                    </div>
                    <div className="text-sm mt-2 text-primary/80">{a.full_name}</div>
                    <div className="text-xs text-primary/60 mt-1">{a.street}, {a.city}, {a.state} {a.zip_code}</div>
                  </div>
                ))}
              </div>
            )}
            {step === 1 && !showAddressForm && addresses.length > 0 && (
              <button 
                onClick={() => setStep(2)} 
                className="mt-6 px-6 py-2 bg-primary text-on-primary rounded font-bold text-sm hover:bg-primary/90 transition-all shadow-md"
              >
                Continue to Payment
              </button>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-outline-variant text-primary/40'}`}>2</div>
              <h2 className="text-xl font-headline font-bold text-primary flex items-center gap-2"><CreditCard size={20}/> Payment Method</h2>
            </div>
            {paymentMethods.length === 0 ? (
              <p className="text-sm text-primary/60 mb-4">No payment methods found. Add one in your profile.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paymentMethods.map(p => (
                  <div key={p.id} 
                    onClick={() => setSelectedPaymentId(p.id)}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${selectedPaymentId === p.id ? 'border-secondary bg-secondary/5' : 'border-outline-variant/20 hover:border-primary/40'}`}
                  >
                    <div className="font-bold text-primary">{p.provider} {p.is_default && <span className="text-[10px] ml-2 bg-secondary/20 text-secondary px-2 rounded">DEFAULT</span>}</div>
                    <div className="text-sm mt-2 text-primary/80 font-mono">**** **** **** {p.card_number_last4}</div>
                    <div className="text-xs text-primary/60 mt-1">{p.card_holder_name} (Exp: {p.expiry_month}/{p.expiry_year})</div>
                  </div>
                ))}
              </div>
            )}
            {step === 2 && <button onClick={() => setStep(3)} className="mt-6 px-6 py-2 bg-primary text-on-primary rounded font-bold text-sm">Continue to Review</button>}
          </div>

        </div>

        {/* Order Summary Sidebar */}
        <div className={`lg:col-span-1 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
          <div className="bg-surface-container-high p-8 rounded-3xl sticky top-24">
            <h3 className="font-headline text-2xl font-bold text-primary mb-6 flex items-center gap-2"><Package size={24}/> Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-outline-variant/20 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-bold text-primary truncate max-w-[150px]">{item.product.title}</p>
                      <p className="text-xs text-primary/60">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 text-sm text-primary/80 mb-6 pb-6 border-b border-outline-variant/20">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (5%):</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span>₹{shipping.toFixed(2)}</span></div>
            </div>
            <div className="flex justify-between font-bold text-xl text-primary mb-8">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button 
              disabled={step !== 3 || placingOrder}
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-secondary text-white rounded-xl font-bold tracking-widest uppercase disabled:opacity-50 hover:bg-secondary/90 transition-all shadow-lg"
            >
              {placingOrder ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
