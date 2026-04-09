import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Share2, Facebook, Twitter, Mail, MessageCircle, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productsApi, cartApi, wishlistApi, getAuthToken, type Product } from '../api';
import { ALL_PRODUCTS } from '../constants';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productsApi.getBySlug(id)
      .then(setProduct)
      .catch(() => {
        const fallback = ALL_PRODUCTS.find(p => p.id === id) || ALL_PRODUCTS[0];
        setProduct(fallback as any);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (!getAuthToken()) {
      alert("Please log in to add items to cart.");
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    try {
      await cartApi.add(product.id, quantity);
      alert('Product added to cart!');
    } catch {
      alert('Failed to add to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    if (!getAuthToken()) {
      alert("Please log in to add items to your wishlist.");
      navigate('/login');
      return;
    }
    setAddingToWishlist(true);
    try {
      await wishlistApi.add(product.id);
      alert('Product added to wishlist!');
    } catch {
      alert('Failed to add to wishlist.');
    } finally {
      setAddingToWishlist(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-400">Loading product...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen"
    >
      {/* Breadcrumbs */}
      <div className="py-4 px-6 md:px-12 border-b border-gray-100">
        <div className="container mx-auto flex items-center gap-2 text-sm text-green-600">
          <Link to="/" className="hover:underline">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to="/products" className="hover:underline">{product.category}</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-500">{product.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-lg overflow-hidden editorial-shadow">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold text-gray-700 tracking-tight">{product.title}</h1>
            
            <div className="text-4xl font-bold text-[#78b14b]">
              ₹{product.price.toFixed(2)}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-green-600 rounded overflow-hidden h-12">
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-none focus:ring-0 text-lg font-bold text-gray-700"
                />
                <div className="flex flex-col border-l border-green-600">
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-2 border-b border-green-600 hover:bg-gray-50 text-green-600"
                  >
                    <span className="material-symbols-outlined text-xs">expand_less</span>
                  </button>
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2 hover:bg-gray-50 text-green-600"
                  >
                    <span className="material-symbols-outlined text-xs">expand_more</span>
                  </button>
                </div>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="bg-[#78b14b] text-white px-8 h-12 rounded font-bold hover:bg-[#6ba042] transition-colors disabled:opacity-50"
              >
                {addingToCart ? 'Adding...' : 'Add to cart'}
              </button>
            </div>

            <button 
              onClick={handleAddToWishlist}
              disabled={addingToWishlist}
              className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all disabled:opacity-50"
            >
              <Heart size={20} className={addingToWishlist ? 'animate-pulse text-red-500' : ''} />
            </button>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-gray-500">
                Category: <span className="text-[#78b14b] hover:underline cursor-pointer">{product.category}</span>
              </p>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-[#25D366] text-white rounded flex items-center justify-center hover:opacity-90"><MessageCircle size={16} /></button>
              <button className="w-8 h-8 bg-[#1877F2] text-white rounded flex items-center justify-center hover:opacity-90"><Facebook size={16} /></button>
              <button className="w-8 h-8 bg-[#1DA1F2] text-white rounded flex items-center justify-center hover:opacity-90"><Twitter size={16} /></button>
              <button className="w-8 h-8 bg-[#0084FF] text-white rounded flex items-center justify-center hover:opacity-90"><Share2 size={16} /></button>
              <button className="w-8 h-8 bg-[#888888] text-white rounded flex items-center justify-center hover:opacity-90"><Mail size={16} /></button>
              <button className="w-8 h-8 bg-[#0077B5] text-white rounded flex items-center justify-center hover:opacity-90"><Plus size={16} /></button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-20 border-t border-gray-100 pt-12">
          <div className="flex gap-12 border-b border-gray-100 mb-8">
            <button className="pb-4 border-b-2 border-[#78b14b] font-bold text-gray-700">Description</button>
            <button className="pb-4 text-gray-400 hover:text-gray-600 transition-colors">Additional information</button>
            <button className="pb-4 text-gray-400 hover:text-gray-600 transition-colors">Reviews ({product.reviews})</button>
          </div>
          <div className="prose max-w-none text-gray-600 leading-relaxed">
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </button>
        <button 
          onClick={() => window.open(`https://wa.me/919030414251?text=${encodeURIComponent(`Hello I want more information about ${product?.title}`)}`, '_blank')}
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        >
          <MessageCircle size={32} />
        </button>
      </div>
    </motion.div>
  );
}
