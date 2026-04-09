import { motion } from 'motion/react';
import { Heart, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { wishlistApi, getAuthToken, type WishlistItem } from '../api';
import { ALL_PRODUCTS } from '../constants';

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!getAuthToken();

  useEffect(() => {
    if (!isLoggedIn) {
      // Fallback: show first 2 products as mock wishlist
      setItems(ALL_PRODUCTS.slice(0, 2).map((p, i) => ({
        id: i + 1,
        product: { id: p.id, title: p.title, price: p.price, rating: p.rating, image: p.image, category: p.category },
        created_at: new Date().toISOString(),
      })));
      setLoading(false);
      return;
    }
    wishlistApi.getAll()
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleRemove = async (productId: number) => {
    if (!isLoggedIn) {
      setItems(prev => prev.filter(i => i.id !== productId));
      return;
    }
    try {
      await wishlistApi.remove(productId);
      setItems(prev => prev.filter(i => i.product.id !== String(productId)));
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface min-h-screen"
    >
      {/* Breadcrumbs */}
      <div className="bg-surface-container-low py-4 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-sm font-label text-primary/60">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-secondary font-bold">Wishlist</span>
        </div>
      </div>

      <section className="py-12 md:py-20 container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="font-headline text-4xl md:text-5xl text-primary font-bold tracking-tighter">
              Your <span className="italic font-light text-secondary">Favorites</span>
            </h1>
            <p className="text-on-surface-variant text-lg">Items you've saved for later.</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-lg text-primary/40">Loading wishlist...</p>
            </div>
          ) : items.length > 0 ? (
            <div className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-primary/60 text-[10px] font-label tracking-widest uppercase">
                      <th className="px-8 py-4">Product</th>
                      <th className="px-8 py-4">Price</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {items.map((item) => (
                      <tr key={item.id} className="group hover:bg-surface-container-lowest transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-white editorial-shadow flex-shrink-0">
                              <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <h3 className="font-headline text-lg font-bold text-primary">{item.product.title}</h3>
                              <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">{item.product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-lg font-bold text-primary">₹{item.product.price.toFixed(2)}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-[10px] font-label font-bold tracking-widest uppercase text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-secondary/90 transition-all">
                              <ShoppingCart size={14} /> Add
                            </button>
                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="p-2 text-primary/40 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container-low rounded-3xl editorial-shadow space-y-6">
              <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto text-primary/20">
                <Heart size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-2xl font-bold text-primary">Your wishlist is empty</h3>
                <p className="text-on-surface-variant">Start adding items you love to your favorites!</p>
              </div>
              <Link to="/products" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
