import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { productsApi, type ProductBrief } from '../api';
import { FEATURED_PRODUCTS } from '../constants';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductBrief[]>([]);

  useEffect(() => {
    productsApi.getFeatured()
      .then(setProducts)
      .catch(() => setProducts(FEATURED_PRODUCTS.map(p => ({ id: p.id, title: p.title, price: p.price, rating: 5, image: p.image, category: p.category }))));
  }, []);

  return (
    <section className="py-20 md:py-24 container mx-auto px-6 md:px-12">
      <div className="text-center mb-16">
        <span className="text-xs font-label tracking-[0.4em] uppercase text-secondary font-bold">The Apothecary's Choice</span>
        <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mt-4">Featured Products</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-lowest p-6 rounded-2xl editorial-shadow group"
          >
            <div className="relative bg-surface-variant rounded-xl overflow-hidden mb-6 aspect-square inner-glow">
              <img 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={product.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors">
                  <Heart size={16} />
                </button>
              </div>
            </div>
            <span className="text-[10px] font-label tracking-widest uppercase text-secondary-fixed-dim bg-secondary/10 px-2 py-1 rounded">
              {product.category}
            </span>
            <h3 className="font-headline text-xl font-bold text-primary mt-3 mb-2">{product.title}</h3>
            <p className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</p>
            <button className="mt-6 w-full py-3 border border-primary text-primary font-label text-[10px] md:text-xs tracking-widest uppercase rounded-lg hover:bg-primary hover:text-on-primary transition-all font-bold">
              Add to Basket
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
