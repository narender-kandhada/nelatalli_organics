import { motion } from 'motion/react';
import Testimonials from '../components/Testimonials';
import tomatoImg from '../assets/tomato.png';

export default function About() {
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
        className="relative py-32 md:py-48 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000')" }}
      >
        <div className="absolute inset-0 bg-neutral-900/60 z-0"></div>
        <div className="grain-overlay absolute inset-0 z-0 opacity-40"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 text-white">
            <span className="inline-block px-4 py-1 bg-white text-primary text-[10px] md:text-xs font-label tracking-[0.2em] uppercase rounded-full shadow-lg">
              Our Story
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
              Pure & Healthy <br/> 
              <span className="italic font-light text-secondary drop-shadow-md">Organic Living</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-md font-medium">
              Nelatalli Organics is dedicated to bringing you the finest chemical-free products directly from the heart of our farms. We believe that true health starts with what you put on your plate.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">The Natural Way</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Every product in our collection is grown with care, harvested at the peak of freshness, and processed using traditional methods that preserve all natural nutrients. From our sun-ripened tomatoes to our golden forest honey, purity is our only priority.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-headline text-3xl text-secondary font-bold">100%</h4>
                <p className="text-sm font-label tracking-widest uppercase text-primary/70">Natural & Pure</p>
              </div>
              <div>
                <h4 className="font-headline text-3xl text-secondary font-bold">Farm</h4>
                <p className="text-sm font-label tracking-widest uppercase text-primary/70">To Your Doorstep</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary-container/20 blur-3xl rounded-full opacity-50"></div>
            <img 
              src={tomatoImg} 
              alt="Fresh Organic Tomatoes" 
              className="relative z-10 rounded-2xl editorial-shadow w-full h-[500px] object-cover transition-transform hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-surface-container">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Purity', desc: 'No chemicals, no pesticides, no artificial interventions. Just pure nature.' },
              { title: 'Authenticity', desc: 'Traditional farming and processing methods that respect ancient wisdom.' },
              { title: 'Integrity', desc: 'From seed to shelf, we maintain the highest standards of organic integrity.' }
            ].map((value) => (
              <div key={value.title} className="text-center space-y-4">
                <h3 className="font-headline text-2xl font-bold text-secondary">{value.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </motion.div>
  );
}
