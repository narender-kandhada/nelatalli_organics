import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { productsApi, type ProductBrief } from '../api';
import { TOP_SELLING, RECENTLY_ADDED, TOP_RATED } from '../constants';

interface ProductItemProps {
  title: string;
  price: number;
  rating: number;
  image: string;
  key?: string | number;
}

function ProductItem({ title, price, rating, image }: ProductItemProps) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
        <img 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
          src={image} 
          alt={title}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-bold text-primary group-hover:text-secondary transition-colors text-sm md:text-base">{title}</h4>
        <div className="flex text-secondary-container my-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < rating ? 'fill-secondary text-secondary' : 'text-outline-variant'} 
            />
          ))}
        </div>
        <p className="text-sm font-bold text-primary">₹{price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default function ProductLists() {
  const [topSelling, setTopSelling] = useState<ProductBrief[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<ProductBrief[]>([]);
  const [topRated, setTopRated] = useState<ProductBrief[]>([]);

  useEffect(() => {
    productsApi.getTopSelling()
      .then(setTopSelling)
      .catch(() => setTopSelling(TOP_SELLING.map(p => ({ ...p, category: '' }))));
    productsApi.getRecentlyAdded()
      .then(setRecentlyAdded)
      .catch(() => setRecentlyAdded(RECENTLY_ADDED.map(p => ({ ...p, category: '' }))));
    productsApi.getTopRated()
      .then(setTopRated)
      .catch(() => setTopRated(TOP_RATED.map(p => ({ ...p, category: '' }))));
  }, []);

  return (
    <section className="py-16 md:py-20 bg-surface-container">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-8 border-b border-primary/10 pb-4">Top Selling</h3>
          <div className="space-y-6">
            {topSelling.map((item) => (
              <ProductItem 
                key={item.id} 
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-8 border-b border-primary/10 pb-4">Recently Added</h3>
          <div className="space-y-6">
            {recentlyAdded.map((item) => (
              <ProductItem 
                key={item.id} 
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-8 border-b border-primary/10 pb-4">Top Rated</h3>
          <div className="space-y-6">
            {topRated.map((item) => (
              <ProductItem 
                key={item.id} 
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
