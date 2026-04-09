import { Truck, Leaf, Award, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On all orders over ₹1000' },
  { icon: Leaf, title: '100% Organic', desc: 'Farm Fresh Produce' },
  { icon: Award, title: 'Certified Quality', desc: 'Tested for Purity' },
  { icon: Headphones, title: 'Expert Support', desc: 'Dedicated Customer Support' },
];

export default function FeatureBadges() {
  return (
    <section className="py-12 md:py-16 container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {FEATURES.map((feature, idx) => (
          <motion.div 
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container-low p-6 md:p-8 rounded-xl flex flex-col items-center text-center gap-4 transition-all hover:bg-surface-container-high hover:-translate-y-1"
          >
            <feature.icon className="text-primary" size={32} />
            <h4 className="font-headline text-xl font-bold">{feature.title}</h4>
            <p className="text-sm text-on-surface-variant">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
