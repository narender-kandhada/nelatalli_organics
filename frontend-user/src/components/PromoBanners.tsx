import { motion } from 'motion/react';
import honeyImg from '../assets/honey.png';
import gheeImg from '../assets/ghee.png';
import spinachImg from '../assets/spinach.png';

const BANNERS = [
  {
    title: 'Fresh Forest Honey',
    image: honeyImg,
    color: 'from-primary/80',
  },
  {
    title: 'Pure A2 Cow Ghee',
    image: gheeImg,
    color: 'from-secondary/80',
  },
  {
    title: 'Organic Green Harvest',
    image: spinachImg,
    color: 'from-tertiary/80',
  },
];

export default function PromoBanners() {
  return (
    <section className="py-16 md:py-20 container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {BANNERS.map((banner, idx) => (
          <motion.div 
            key={banner.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative group h-[350px] md:h-[400px] rounded-3xl overflow-hidden editorial-shadow"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              src={banner.image}
              alt={banner.title}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${banner.color} via-primary/20 to-transparent p-8 md:p-10 flex flex-col justify-end items-start text-on-primary`}>
              <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">{banner.title}</h3>
              <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-lg text-[10px] md:text-xs font-label tracking-widest uppercase font-bold hover:scale-105 transition-transform">
                Shop Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
