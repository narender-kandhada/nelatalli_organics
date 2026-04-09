import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import honeyImg from '../assets/honey.png';
import milletsImg from '../assets/millets_hero.png';
import spicesImg from '../assets/spices_hero.png';

const slides = [
  {
    id: 1,
    badge: "Pure & Healthy",
    title: "Pure & Healthy",
    italicTitle: "Organic Products",
    description: "Discover a range of the best quality organic products, chemical-free and sustainably sourced directly from our farms to your doorstep.",
    buttonText: "Explore Collection",
    image: honeyImg,
    alt: "Organic Honey"
  },
  {
    id: 2,
    badge: "Tradition in Every Grain",
    title: "The Magic of",
    italicTitle: "Ancient Millets",
    description: "Experience the nutritional power of our hand-picked millets and grains, cultivated with care for a healthier, traditional lifestyle.",
    buttonText: "Shop Grains",
    image: milletsImg,
    alt: "Organic Millets"
  },
  {
    id: 3,
    badge: "Sustainably Sourced",
    title: "Artisanal",
    italicTitle: "Kitchen Staples",
    description: "From stone-ground spices to wood-pressed oils, bring the essence of pure organic living to your daily cooking and nutrition.",
    buttonText: "View Pantry",
    image: spicesImg,
    alt: "Artisanal Spices"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-[600px] md:h-[819px] flex items-center overflow-hidden bg-surface-container-low">
      <div className="grain-overlay absolute inset-0 z-0"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 py-12 md:py-0 h-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full"
          >
            <div className="space-y-6 md:space-y-8">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container text-[10px] md:text-xs font-label tracking-[0.2em] uppercase rounded-full"
              >
                {slide.badge}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-tight font-extrabold tracking-tighter"
              >
                {slide.title} <br/> 
                <span className="italic font-light text-secondary">{slide.italicTitle}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed"
              >
                {slide.description}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4"
              >
                <button className="bg-primary text-on-primary px-8 md:px-10 py-3 md:py-4 rounded-lg font-label font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary-container transition-all editorial-shadow">
                  {slide.buttonText}
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group h-full flex items-center justify-center"
            >
              <div className="absolute -inset-4 bg-secondary-container/20 blur-3xl rounded-full opacity-50"></div>
              <img 
                alt={slide.alt} 
                className="relative z-10 w-full max-h-[500px] md:max-h-[600px] object-cover rounded-2xl editorial-shadow transition-transform duration-700 group-hover:scale-[1.02]" 
                src={slide.image}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1 transition-all duration-300 rounded-full ${current === idx ? 'w-12 md:w-16 bg-primary' : 'w-4 md:w-6 bg-primary/20 hover:bg-primary/40'}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
