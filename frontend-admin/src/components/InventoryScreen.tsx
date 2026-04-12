import React from 'react';
import { 
  PlusCircle, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  Package, 
  ArrowUp,
  Filter,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Product } from '@/src/types';

const products: Product[] = [
  {
    id: '1',
    name: 'Rosemary Infusion Oil',
    sku: 'NEL-RS-042',
    category: 'Essential Oils',
    price: 34.00,
    discountPrice: 28.90,
    stock: 142,
    status: 'Active',
    image: 'https://picsum.photos/seed/oil/100/100'
  },
  {
    id: '2',
    name: 'Wildflower Cleansing Bar',
    sku: 'NEL-WF-011',
    category: 'Botanical Skincare',
    price: 18.50,
    stock: 12,
    status: 'Low Stock',
    image: 'https://picsum.photos/seed/soap/100/100'
  },
  {
    id: '3',
    name: 'Midnight Calm Tea',
    sku: 'NEL-TE-088',
    category: 'Organic Teas',
    price: 22.00,
    stock: 85,
    status: 'Active',
    image: 'https://picsum.photos/seed/tea/100/100'
  },
  {
    id: '4',
    name: 'Ceramic Mist Diffuser',
    sku: 'NEL-DF-102',
    category: 'Aromatherapy',
    price: 120.00,
    discountPrice: 95.00,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://picsum.photos/seed/diffuser/100/100'
  }
];

export function InventoryScreen() {
  return (
    <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
      {/* Contextual Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-block">
            <select className="appearance-none bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 pr-10 text-sm font-bold focus:ring-secondary focus:border-secondary transition-all">
              <option>All Categories</option>
              <option>Essential Oils</option>
              <option>Botanical Skincare</option>
              <option>Organic Teas</option>
              <option>Aromatherapy</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
          </div>
          <div className="relative inline-block">
            <select className="appearance-none bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 pr-10 text-sm font-bold focus:ring-secondary focus:border-secondary transition-all">
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
          </div>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all">
          <PlusCircle size={20} fill="currentColor" />
          Add Product
        </button>
      </div>

      {/* Product Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/15">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/10">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold">Product</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold">Category</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold text-right">Price</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold text-right">Discount</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold text-center">Stock</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-secondary font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
                        <img 
                          className="w-full h-full object-cover" 
                          src={product.image} 
                          alt={product.name}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-primary">{product.name}</div>
                        <div className="text-xs text-on-surface-variant font-bold">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary font-bold">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-right text-tertiary-container font-bold">
                    {product.discountPrice ? `$${product.discountPrice.toFixed(2)}` : '—'}
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-sm text-center font-bold",
                    product.stock <= 15 && product.stock > 0 ? "text-error" : 
                    product.stock === 0 ? "text-on-surface-variant" : ""
                  )}>
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold",
                      product.status === 'Active' ? "bg-green-100 text-green-800" : 
                      product.status === 'Low Stock' ? "bg-amber-100 text-amber-800" : 
                      "bg-stone-200 text-stone-600"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 hover:text-secondary transition-colors text-on-surface-variant">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-1 hover:text-error transition-colors text-on-surface-variant">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-sm text-on-surface-variant font-bold">
            Showing <span className="font-bold text-primary">1</span> to <span className="font-bold text-primary">4</span> of <span className="font-bold text-primary">56</span> products
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-sm">1</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high font-bold text-sm">2</button>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high font-bold text-sm">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 rounded-lg hover:bg-surface-container-high font-bold text-sm">6</button>
            <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8 flex flex-col justify-center relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-serif text-3xl mb-2 italic">Curated Seasonal Growth</h3>
            <p className="text-secondary max-w-md font-bold">Our botanical inventory is expanding by 24% this quarter with new arrivals from the Southern Highlands.</p>
            <button className="mt-6 flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all">
              View inventory report <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-surface-container rounded-full opacity-50 blur-3xl"></div>
        </div>
        <div className="bg-primary-container text-white rounded-xl p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Package size={32} />
            <span className="text-xs uppercase tracking-tighter text-stone-400 font-bold">Global Stock</span>
          </div>
          <div>
            <div className="font-serif text-5xl font-light">4,281</div>
            <div className="text-xs mt-2 text-stone-400 font-bold flex items-center gap-1">
              <ArrowUp size={14} className="text-green-400" />
              +12% from last month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
