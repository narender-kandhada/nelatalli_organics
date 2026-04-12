import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { categoriesApi, type Category } from '../api';
import { CATEGORIES } from '../constants';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesApi.getAll()
      .then(setCategories)
      .catch(() => setCategories(CATEGORIES.map((c, i) => ({ id: i + 1, slug: c.id, name: c.title, count_label: c.count, image: c.image, highlight: !!(c as any).highlight, icon: '', product_count: 0 }))));
  }, []);

  return (
    <section className="py-16 md:py-20 bg-surface-container-low">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-label tracking-[0.3em] uppercase text-secondary font-bold">Browse Our Pantry</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold mt-2">Popular Categories</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-full border border-outline-variant/30 hover:border-primary transition-colors">
              <ArrowLeft size={20} />
            </button>
            <button className="p-3 rounded-full border border-outline-variant/30 hover:border-primary transition-colors">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`min-w-[260px] md:min-w-[280px] group cursor-pointer ${
                cat.highlight ? 'border-primary/40 border-2 rounded-[2rem] p-4 bg-surface-container-highest' : ''
              }`}
            >
              <div className="aspect-square bg-surface-variant rounded-2xl overflow-hidden mb-6 editorial-shadow border-2 border-transparent transition-all group-hover:border-primary/20">
                <img 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={cat.image}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-headline text-xl md:text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-on-surface-variant mt-1">{cat.count_label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
