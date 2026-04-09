import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24 bg-surface-container-high relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <Quote className="mx-auto text-secondary-container/60" size={64} />
          <h2 className="font-headline text-3xl md:text-4xl italic text-primary leading-relaxed">
            "The purity of their products is unmatched. Every jar feels like a gift from nature itself. The Ghee has transformed my kitchen rituals."
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-secondary mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-secondary text-secondary" />
              ))}
            </div>
            <p className="font-label tracking-widest uppercase text-primary font-bold">Anitha Devi</p>
            <p className="text-sm text-on-surface-variant italic">Healthy Living Enthusiast</p>
          </div>
        </motion.div>
      </div>
      {/* Decorative Grain/Parchment feel */}
      <div className="absolute inset-0 bg-[#f8f3ec] opacity-50 mix-blend-multiply pointer-events-none"></div>
    </section>
  );
}
