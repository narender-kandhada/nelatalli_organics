import { Share2, Instagram, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#271310] text-[#fef9f2] rounded-t-3xl mt-20 pt-16 md:pt-20 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 md:mb-20">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 text-2xl md:text-3xl font-serif text-[#fbdbb0]">
            <Home size={28} />
            <span>Nelatalli Organics</span>
          </Link>
          <p className="text-[#fef9f2]/70 text-sm leading-relaxed max-w-xs font-body">
            Bringing you the finest organic grains, fresh produce, and dairy essentials directly from our trusted farms. Pure, healthy, and chemical-free.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-[#fef9f2]/20 flex items-center justify-center hover:bg-[#fbdbb0] hover:text-[#271310] transition-all" href="#">
              <Share2 size={20} />
            </a>
            <a className="w-10 h-10 rounded-full border border-[#fef9f2]/20 flex items-center justify-center hover:bg-[#fbdbb0] hover:text-[#271310] transition-all" href="#">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-headline text-xl text-[#fbdbb0] mb-8">Shop</h4>
          <ul className="space-y-4 text-sm font-body">
            {[
              { name: 'All Products', path: '/products' },
              { name: 'Best Sellers', path: '/products' },
              { name: 'New Arrivals', path: '/products' },
              { name: 'Gifting', path: '/products' }
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-[#fef9f2]/80 hover:text-[#fbdbb0] transition-colors underline-offset-4 hover:underline">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-xl text-[#fbdbb0] mb-8">Company</h4>
          <ul className="space-y-4 text-sm font-body">
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Sustainability', path: '/about' },
              { name: 'Wholesale', path: '/contact' },
              { name: 'Careers', path: '/about' }
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-[#fef9f2]/80 hover:text-[#fbdbb0] transition-colors underline-offset-4 hover:underline">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-xl text-[#fbdbb0] mb-8">Journal</h4>
          <p className="text-sm text-[#fef9f2]/60 mb-6">Receive apothecary notes and seasonal recipes.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="bg-white/10 border-none rounded-lg py-3 px-4 text-sm w-full focus:ring-1 focus:ring-[#fbdbb0] outline-none" 
              placeholder="Email Address" 
              type="email"
            />
            <button className="bg-[#fbdbb0] text-[#271310] px-4 rounded-lg font-bold hover:bg-[#fbdbb0]/80 transition-colors">
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 border-t border-[#fef9f2]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs tracking-wider text-[#fef9f2]/40 font-label">
        <p>© 2024 Nelatalli Organics. Pure & Healthy Organic Products.</p>
        <div className="flex gap-6 md:gap-8">
          <a className="hover:text-[#fbdbb0]" href="#">Privacy Policy</a>
          <a className="hover:text-[#fbdbb0]" href="#">Terms of Service</a>
          <a className="hover:text-[#fbdbb0]" href="#">Shipping Info</a>
        </div>
      </div>
    </footer>
  );
}
