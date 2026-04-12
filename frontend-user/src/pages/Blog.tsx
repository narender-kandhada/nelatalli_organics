import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { blogApi, type BlogPost } from '../api';
import honeyImg from '../assets/honey.png';
import gheeImg from '../assets/ghee.png';
import spinachImg from '../assets/spinach.png';

const FALLBACK_POSTS: BlogPost[] = [
  { id: 1, title: 'The Benefits of Raw Forest Honey', category: 'Wellness', date: 'Oct 12, 2024', image: honeyImg, excerpt: 'Discover why raw honey is more than just a sweetener. From antibacterial properties to seasonal allergy relief.', content: '', is_featured: false },
  { id: 2, title: 'Traditional Ghee Clarification', category: 'Recipes', date: 'Oct 08, 2024', image: gheeImg, excerpt: 'A step-by-step guide to clarifying butter at home using traditional Ayurvedic methods.', content: '', is_featured: false },
  { id: 3, title: 'Sustainable Organic Farming', category: 'Lifestyle', date: 'Oct 01, 2024', image: spinachImg, excerpt: 'How choosing organic supports the earth and ensures the purest produce for your family.', content: '', is_featured: false },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featured, setFeatured] = useState<BlogPost | null>(null);

  useEffect(() => {
    blogApi.getPosts()
      .then(data => {
        const regular = data.filter(p => !p.is_featured);
        const feat = data.find(p => p.is_featured) || null;
        setPosts(regular.length > 0 ? regular : data);
        setFeatured(feat);
      })
      .catch(() => setPosts(FALLBACK_POSTS));

    blogApi.getFeatured()
      .then(setFeatured)
      .catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface"
    >
      {/* Hero Section */}
      <section 
        className="relative py-32 md:py-40 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-neutral-900/60 z-0"></div>
        <div className="grain-overlay absolute inset-0 z-0 opacity-40"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="inline-block px-4 py-1 bg-white text-primary text-[10px] md:text-xs font-label tracking-[0.2em] uppercase rounded-full shadow-lg mb-6">
            The Journal
          </span>
          <h1 className="font-headline text-5xl md:text-7xl text-white font-bold tracking-tighter drop-shadow-lg">
            Organic <br/> 
            <span className="italic font-light text-secondary drop-shadow-md">Journal</span>
          </h1>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
            <div className="h-[400px] md:h-full">
              <img 
                src={featured.image} 
                alt="Featured post" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 space-y-6">
              <span className="text-xs font-label tracking-widest uppercase text-secondary font-bold">Featured Article</span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight">{featured.title}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {featured.excerpt}
              </p>
              <button className="flex items-center gap-2 text-primary font-bold font-label tracking-widest uppercase text-sm group">
                Read More <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Posts */}
      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.filter(p => !p.is_featured).map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer space-y-6"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden editorial-shadow">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-label tracking-widest uppercase text-primary/60">
                  <span className="font-bold text-secondary">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {post.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold font-label tracking-widest uppercase text-xs group">
                  Read Article <ArrowRight className="group-hover:translate-x-2 transition-transform" size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
