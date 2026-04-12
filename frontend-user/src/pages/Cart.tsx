import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cartApi, type CartItem, getAuthToken } from '../api';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      setLoading(false);
      return;
    }
    cartApi.getAll()
      .then(setCartItems)
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (id: number, quantity: number) => {
    if (quantity <= 0) return handleRemove(id);
    try {
      const updated = await cartApi.update(id, quantity);
      setCartItems(prev => prev.map(item => item.id === id ? updated : item));
    } catch (e) {}
  };

  const handleRemove = async (id: number) => {
    try {
      await cartApi.remove(id);
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (e) {}
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface min-h-screen pb-20"
    >
      <div className="bg-surface-container-low py-4 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-sm font-label text-primary/60">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-secondary font-bold">Shopping Cart</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-12">
        <h1 className="font-headline text-4xl font-bold text-primary mb-8">Your Cart</h1>
        
        {!getAuthToken() ? (
          <div className="bg-surface-container-low p-12 text-center rounded-3xl border border-outline-variant/20">
            <h2 className="text-xl font-bold text-primary mb-4">Please log in to view your cart</h2>
            <button onClick={() => navigate('/login')} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
              Log In
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-20 text-primary/60">Loading cart...</div>
        ) : cartItems.length === 0 ? (
          <div className="bg-surface-container-low p-12 text-center rounded-3xl border border-outline-variant/20">
            <h2 className="text-xl font-bold text-primary mb-4">Your cart is empty</h2>
            <button onClick={() => navigate('/products')} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-3xl relative">
                  <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-2xl" referrerPolicy="no-referrer" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg text-primary">{item.product.title}</h3>
                    <p className="text-sm text-primary/60 mb-4">{item.product.category}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center border border-outline-variant rounded-lg">
                        <button onClick={() => handleUpdate(item.id, item.quantity - 1)} className="p-2 hover:bg-surface-container-low transition-colors"><Minus size={16} /></button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => handleUpdate(item.id, item.quantity + 1)} className="p-2 hover:bg-surface-container-low transition-colors"><Plus size={16} /></button>
                      </div>
                      <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-600 transition-colors p-2" title="Remove">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="font-bold text-xl text-primary sm:text-right w-full sm:w-auto">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-surface-container-low p-8 rounded-3xl sticky top-24 border border-outline-variant/10">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Order Summary</h3>
                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-outline-variant/20">
                  <div className="flex justify-between text-primary/80">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary/80">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary/80">
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary mb-8">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-label font-bold tracking-widest uppercase hover:bg-primary/90 transition-all text-sm"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
