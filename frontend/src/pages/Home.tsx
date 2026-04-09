import Hero from '../components/Hero';
import FeatureBadges from '../components/FeatureBadges';
import Categories from '../components/Categories';
import PromoBanners from '../components/PromoBanners';
import ProductLists from '../components/ProductLists';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeatureBadges />
      <Categories />
      <PromoBanners />
      <ProductLists />
      <FeaturedProducts />
      <Testimonials />
    </motion.div>
  );
}
