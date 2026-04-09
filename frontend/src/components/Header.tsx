import { Search, ShoppingBag, Menu, Home, ChevronDown, LayoutGrid, Heart, User, LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchApi, cartApi, wishlistApi, getAuthToken, type ProductBrief } from '../api';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductBrief[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  // Poll for cart and wishlist counts to keep them fresh after adding to cart
  useEffect(() => {
    const fetchCounts = () => {
      const hasToken = !!getAuthToken();
      setIsLoggedIn(hasToken);
      if (hasToken) {
        cartApi.getAll().then(items => {
          setCartCount(items.reduce((acc, item) => acc + item.quantity, 0));
        }).catch(() => { });
        wishlistApi.getAll().then(items => {
          setWishlistCount(items.length);
        }).catch(() => { });
      } else {
        setCartCount(0);
        setWishlistCount(0);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 2000); // Poll every 2 seconds to keep it sync
    return () => clearInterval(interval);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    try {
      const results = await searchApi.search(query);
      setSearchResults(results);
      setShowResults(true);
    } catch {
      setSearchResults([]);
    }
  };

  const handleResultClick = (slug: string) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/products/${slug}`);
  };

  return (
    <>
      <header className="relative z-40">
        {/* Top Bar */}
      <div className="bg-surface-container-low py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs font-label tracking-widest uppercase text-primary/70 border-b border-outline-variant/10">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">call</span> +91 90304-14241
          </span>
          <a href="https://maps.app.goo.gl/qjF96cQPEs1CoTio8?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hidden sm:flex hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">location_on</span> Tallaguda,Telangana
          </a>
        </div>
        <div>
          <a>From Our Soil to Your Home</a>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-primary transition-colors" href="#">Store Locator</a>
          <a className="hover:text-primary transition-colors hidden sm:inline" href="#">Track Order</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#F4F1EA] border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-full">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xl md:text-2xl font-serif italic text-primary"
            >
              <Home className="text-primary" size={28} />
              <span className="font-headline font-bold italic tracking-tight">Nelatalli Organics</span>
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-12 relative">
            <div className="relative w-full group">
              <input
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-4 pr-12 text-sm focus:ring-2 focus:ring-secondary/10 transition-all outline-none"
                placeholder="Search for items..."
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-secondary text-on-secondary rounded-md flex items-center justify-center hover:bg-secondary/90 transition-colors">
                <Search size={18} />
              </button>
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50 max-h-80 overflow-y-auto">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item.id)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors text-left"
                  >
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-primary truncate">{item.title}</p>
                      <p className="text-xs text-secondary">₹{item.price.toFixed(2)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            {isLoggedIn ? (
              <Link to="/profile" className="text-primary hover:text-secondary transition-all relative group" title="Account">
                <User size={24} className="group-hover:scale-110 transition-transform" />
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-primary hover:text-secondary transition-all group font-label font-bold text-xs md:text-sm tracking-widest uppercase">
                <LogIn size={18} className="group-hover:-translate-x-1 transition-transform" />
                Sign In
              </Link>
            )}
            <Link to="/wishlist" className="text-primary hover:text-secondary transition-all relative group">
              <Heart size={24} className="group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="text-primary hover:text-secondary transition-all relative group">
              <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
            </Link>
            <button className="md:hidden text-primary">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      </header>

      {/* Navigation Links */}
      <nav className="hidden md:flex justify-center border-b border-outline-variant/10 py-4 bg-[#F4F1EA] sticky top-0 z-50 shadow-md w-full">
        <div className="flex gap-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-headline italic transition-all relative pb-1 ${location.pathname === item.path
                ? 'text-primary border-b-2 border-primary'
                : 'text-primary/60 hover:text-primary'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
