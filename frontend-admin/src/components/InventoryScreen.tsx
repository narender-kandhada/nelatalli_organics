import React, { useEffect, useState } from 'react';
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
  ChevronDown,
  X,
  Loader2,
  Save
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  inventoryApi,
  AdminProduct,
  CategoryItem,
  ProductCreatePayload,
  ProductUpdatePayload,
} from '@/src/lib/api';

interface ProductFormData {
  title: string;
  sku: string;
  price: string;
  discount_price: string;
  category_id: number;
  stock: string;
  description: string;
  image: string;
}

const emptyForm: ProductFormData = {
  title: '', sku: '', price: '', discount_price: '', category_id: 0, stock: '0', description: '', image: '',
};

export function InventoryScreen() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('In Stock');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, categoryFilter, statusFilter]);

  const loadCategories = async () => {
    try {
      const cats = await inventoryApi.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await inventoryApi.getProducts({
        category: categoryFilter !== 'All Categories' ? categoryFilter : undefined,
        status: statusFilter !== 'In Stock' ? statusFilter : undefined,
        page,
        page_size: 10,
      });
      setProducts(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ ...emptyForm, category_id: categories[0]?.id || 0 });
    setShowModal(true);
  };

  const openEditModal = (product: AdminProduct) => {
    setEditingProduct(product);
    const cat = categories.find(c => c.name === product.category);
    setFormData({
      title: product.name,
      sku: product.sku,
      price: String(product.price),
      discount_price: product.discount_price ? String(product.discount_price) : '',
      category_id: cat?.id || 0,
      stock: String(product.stock),
      description: product.description,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingProduct) {
        const payload: ProductUpdatePayload = {
          title: formData.title,
          sku: formData.sku,
          price: parseFloat(formData.price),
          discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
          category_id: formData.category_id,
          stock: parseInt(formData.stock),
          description: formData.description,
          image: formData.image,
        };
        await inventoryApi.updateProduct(editingProduct.id, payload);
      } else {
        const payload: ProductCreatePayload = {
          title: formData.title,
          sku: formData.sku,
          price: parseFloat(formData.price),
          discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
          category_id: formData.category_id,
          stock: parseInt(formData.stock),
          description: formData.description,
          image: formData.image,
        };
        await inventoryApi.createProduct(payload);
      }
      setShowModal(false);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await inventoryApi.deleteProduct(id);
      loadProducts();
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="p-8 max-w-7xl w-full mx-auto space-y-8">
      {/* Contextual Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-block">
            <select 
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              className="appearance-none bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 pr-10 text-sm font-bold focus:ring-secondary focus:border-secondary transition-all"
            >
              <option>All Categories</option>
              {categories.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
          </div>
          <div className="relative inline-block">
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="appearance-none bg-surface-container-lowest border border-outline-variant/15 rounded-lg px-4 py-2.5 pr-10 text-sm font-bold focus:ring-secondary focus:border-secondary transition-all"
            >
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary" />
          </div>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all"
        >
          <PlusCircle size={20} fill="currentColor" />
          Add Product
        </button>
      </div>

      {/* Product Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/15">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
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
                      <td className="px-6 py-4 text-sm text-right font-bold">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-right text-tertiary-container font-bold">
                        {product.discount_price ? `₹${product.discount_price.toFixed(2)}` : '—'}
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
                          <button 
                            onClick={() => openEditModal(product)}
                            className="p-1 hover:text-secondary transition-colors text-on-surface-variant"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-1 hover:text-error transition-colors text-on-surface-variant"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">No products found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant/10 flex items-center justify-between">
              <p className="text-sm text-on-surface-variant font-bold">
                Showing <span className="font-bold text-primary">{(page - 1) * 10 + 1}</span> to <span className="font-bold text-primary">{Math.min(page * 10, total)}</span> of <span className="font-bold text-primary">{total}</span> products
              </p>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                  <button 
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 rounded-lg font-bold text-sm",
                      p === page ? "bg-primary text-white" : "hover:bg-surface-container-high"
                    )}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 5 && <span className="px-1 text-on-surface-variant">...</span>}
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-surface-container rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Product Name *</label>
                <input 
                  value={formData.title}
                  onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  placeholder="Organic Brown Rice"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">SKU *</label>
                  <input 
                    value={formData.sku}
                    onChange={e => setFormData(f => ({ ...f, sku: e.target.value }))}
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                    placeholder="NEL-GRA-001"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">Category *</label>
                  <select 
                    value={formData.category_id}
                    onChange={e => setFormData(f => ({ ...f, category_id: Number(e.target.value) }))}
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  >
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">Price (₹) *</label>
                  <input 
                    value={formData.price}
                    onChange={e => setFormData(f => ({ ...f, price: e.target.value }))}
                    type="number"
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">Discount (₹)</label>
                  <input 
                    value={formData.discount_price}
                    onChange={e => setFormData(f => ({ ...f, discount_price: e.target.value }))}
                    type="number"
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest">Stock</label>
                  <input 
                    value={formData.stock}
                    onChange={e => setFormData(f => ({ ...f, stock: e.target.value }))}
                    type="number"
                    className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Image URL</label>
                <input 
                  value={formData.image}
                  onChange={e => setFormData(f => ({ ...f, image: e.target.value }))}
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary"
                  placeholder="/static/images/product.png"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                  className="w-full bg-surface-container-low border-none ring-1 ring-outline-variant/15 rounded-lg py-2.5 px-4 text-sm focus:ring-secondary h-24 resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/10 flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-full text-sm font-bold border border-outline-variant/15 hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving || !formData.title || !formData.sku || !formData.price}
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {editingProduct ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
