import applesImg from './assets/apples.png';
import bajraImg from './assets/bajra.png';
import bananasImg from './assets/bananas.png';
import brinjalImg from './assets/brinjal.png';
import gheeImg from './assets/ghee.png';
import honeyImg from './assets/honey.png';
import jowarImg from './assets/jowar.png';
import papayaImg from './assets/papaya.png';
import spinachImg from './assets/spinach.png';
import tomatoImg from './assets/tomato.png';

export const CATEGORIES = [
  {
    id: 'grains',
    title: 'Grains & Millets',
    count: 'Native Varieties',
    image: jowarImg,
  },
  {
    id: 'produce',
    title: 'Fresh Produce',
    count: 'Farm to Home',
    image: tomatoImg,
  },
  {
    id: 'dairy',
    title: 'Dairy & Essentials',
    count: 'Grass-Fed Purity',
    image: gheeImg,
    highlight: true,
  },
  {
    id: 'pantry',
    title: 'Pantry & Pickles',
    count: 'Traditional Recipes',
    image: honeyImg,
  },
];

export const PRODUCT_CATEGORIES = [
  { name: 'Grains & Millets', count: 7 },
  { name: 'Fresh Produce', count: 7 },
  { name: 'Dairy & Essentials', count: 4 },
  { name: 'Pantry & Pickles', count: 2 },
];

export const ALL_PRODUCTS = [
  {
    id: 'organic-brown-rice',
    title: 'Organic Brown Rice',
    price: 85.00,
    category: 'Grains & Millets',
    image: jowarImg,
    rating: 5,
    reviews: 42,
    description: 'Unpolished, nutrient-rich brown rice grown using traditional organic methods. Packed with fiber, minerals, and essential vitamins for a wholesome diet.',
    isTopRated: true
  },
  {
    id: 'organic-red-rice',
    title: 'Organic Red Rice',
    price: 95.00,
    category: 'Grains & Millets',
    image: bajraImg,
    rating: 4.8,
    reviews: 28,
    description: 'Native red rice variety, rich in antioxidants and fiber. Sourced directly from organic farmers in Andhra Pradesh.',
    asymmetry: true
  },
  {
    id: 'organic-jowar',
    title: 'Organic Jowar (Sorghum)',
    price: 65.00,
    category: 'Grains & Millets',
    image: jowarImg,
    rating: 4.5,
    reviews: 15,
    description: 'Gluten-free ancient grain, perfect for healthy rotis and porridges. 100% chemical-free and naturally grown.'
  },
  {
    id: 'organic-bajra',
    title: 'Organic Bajra (Pearl Millet)',
    price: 60.00,
    category: 'Grains & Millets',
    image: bajraImg,
    rating: 4.7,
    reviews: 22,
    description: 'Nutritious pearl millet, ideal for winter diets and energy-rich meals. Organically cultivated without pesticides.'
  },
  {
    id: 'organic-ragi',
    title: 'Organic Ragi (Finger Millet)',
    price: 70.00,
    category: 'Grains & Millets',
    image: bajraImg,
    rating: 5,
    reviews: 56,
    description: 'Calcium-rich finger millet, a staple for growing children and health enthusiasts. Hand-harvested from organic fields.',
    asymmetry: true
  },
  {
    id: 'organic-tomatoes',
    title: 'Seasonal Organic Tomatoes',
    price: 40.00,
    category: 'Fresh Produce',
    image: tomatoImg,
    rating: 4.9,
    reviews: 112,
    description: 'Sun-ripened, chemical-free tomatoes harvested fresh from our organic fields. Pure taste, zero chemicals.'
  },
  {
    id: 'organic-spinach',
    title: 'Organic Spinach',
    price: 30.00,
    category: 'Fresh Produce',
    image: spinachImg,
    rating: 4.8,
    reviews: 84,
    description: 'Fresh, leafy greens grown without any synthetic pesticides or fertilizers. Delivered farm-fresh to your doorstep.',
    isTopRated: true
  },
  {
    id: 'organic-brinjal',
    title: 'Organic Brinjal (Eggplant)',
    price: 45.00,
    category: 'Fresh Produce',
    image: brinjalImg,
    rating: 4.6,
    reviews: 37,
    description: 'Tender and flavorful organic brinjals, perfect for traditional curries and stir-fry dishes.',
    asymmetry: true
  },
  {
    id: 'organic-bananas',
    title: 'Organic Bananas',
    price: 60.00,
    category: 'Fresh Produce',
    image: bananasImg,
    rating: 5,
    reviews: 156,
    description: 'Naturally ripened, sweet organic bananas, free from ripening chemicals. Straight from our partner farms.'
  },
  {
    id: 'organic-papaya',
    title: 'Organic Papaya',
    price: 80.00,
    category: 'Fresh Produce',
    image: papayaImg,
    rating: 4.7,
    reviews: 45,
    description: 'Farm-fresh organic papaya, rich in vitamins and natural sweetness. Grown without any chemical interventions.'
  },
  {
    id: 'organic-apples',
    title: 'Organic Apples',
    price: 180.00,
    category: 'Fresh Produce',
    image: applesImg,
    rating: 4.9,
    reviews: 92,
    description: 'Crisp and juicy organic apples, sourced from high-altitude organic orchards in Himachal Pradesh.',
    asymmetry: true
  },
  {
    id: 'organic-white-rice',
    title: 'Organic White Rice',
    price: 75.00,
    category: 'Grains & Millets',
    image: jowarImg,
    rating: 4.6,
    reviews: 34,
    description: 'Pure, organic white rice, carefully processed to retain its natural aroma and taste. No artificial polishing.'
  },
  {
    id: 'organic-wheat',
    title: 'Organic Whole Wheat',
    price: 55.00,
    category: 'Grains & Millets',
    image: bajraImg,
    rating: 4.7,
    reviews: 41,
    description: 'Stone-ground whole wheat flour, rich in nutrients and perfect for soft rotis. Sourced from organic farms.'
  },
  {
    id: 'organic-mango',
    title: 'Organic Mangoes',
    price: 250.00,
    category: 'Fresh Produce',
    image: bananasImg,
    rating: 5,
    reviews: 184,
    description: 'Naturally ripened, carbide-free organic mangoes from Andhra Pradesh. Bursting with authentic tropical flavor.'
  },
  {
    id: 'organic-butter',
    title: 'Organic Grass-Fed Butter',
    price: 220.00,
    category: 'Dairy & Essentials',
    image: gheeImg,
    rating: 4.9,
    reviews: 67,
    description: 'Creamy, hand-churned butter from the milk of grass-fed cows. Made using traditional village methods.'
  },
  {
    id: 'organic-curd',
    title: 'Organic Grass-Fed Curd',
    price: 60.00,
    category: 'Dairy & Essentials',
    image: gheeImg,
    rating: 4.8,
    reviews: 124,
    description: 'Thick, creamy curd made from pure organic milk using traditional cultures. No added preservatives.'
  },
  {
    id: 'organic-ghee',
    title: 'Organic A2 Ghee',
    price: 650.00,
    category: 'Dairy & Essentials',
    image: gheeImg,
    rating: 5,
    reviews: 210,
    description: 'Traditional Bilona method ghee made from the milk of grass-fed A2 cows. Pure, golden, and aromatic.',
    isTopRated: true
  },
  {
    id: 'organic-milk',
    title: 'Organic Whole Milk',
    price: 80.00,
    category: 'Dairy & Essentials',
    image: gheeImg,
    rating: 4.8,
    reviews: 320,
    description: 'Pure, unadulterated milk from grass-fed cows, delivered fresh daily. No hormones or antibiotics.'
  },
  {
    id: 'organic-honey',
    title: 'Organic Raw Honey',
    price: 350.00,
    category: 'Pantry & Pickles',
    image: honeyImg,
    rating: 5,
    reviews: 145,
    description: 'Unfiltered, raw forest honey harvested sustainably from wild beehives. 100% pure and unpasteurized.'
  },
  {
    id: 'organic-pickles',
    title: 'Traditional Organic Pickles',
    price: 120.00,
    category: 'Pantry & Pickles',
    image: honeyImg,
    rating: 4.9,
    reviews: 78,
    description: 'Handmade pickles using organic ingredients and traditional sun-drying methods. Authentic home flavors.',
    asymmetry: true
  }
];

export const TOP_SELLING = [
  {
    id: 'organic-ghee',
    title: 'Organic A2 Ghee',
    price: 650.00,
    rating: 5,
    image: gheeImg,
  },
  {
    id: 'organic-honey',
    title: 'Organic Raw Honey',
    price: 350.00,
    rating: 5,
    image: honeyImg,
  },
];

export const RECENTLY_ADDED = [
  {
    id: 'organic-red-rice',
    title: 'Organic Red Rice',
    price: 95.00,
    rating: 5,
    image: bajraImg,
  },
  {
    id: 'organic-pickles',
    title: 'Traditional Organic Pickles',
    price: 120.00,
    rating: 5,
    image: honeyImg,
  },
];

export const TOP_RATED = [
  {
    id: 'organic-spinach',
    title: 'Organic Spinach',
    price: 30.00,
    rating: 5,
    image: spinachImg,
  },
  {
    id: 'organic-apples',
    title: 'Organic Apples',
    price: 180.00,
    rating: 5,
    image: applesImg,
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: 'organic-ghee',
    title: 'Organic A2 Ghee',
    price: 650.00,
    category: 'Dairy & Essentials',
    image: gheeImg,
  },
  {
    id: 'organic-honey',
    title: 'Organic Raw Honey',
    price: 350.00,
    category: 'Pantry & Pickles',
    image: honeyImg,
  },
  {
    id: 'organic-brown-rice',
    title: 'Organic Brown Rice',
    price: 85.00,
    category: 'Grains & Millets',
    image: jowarImg,
  },
  {
    id: 'organic-tomatoes',
    title: 'Organic Tomatoes',
    price: 40.00,
    category: 'Fresh Produce',
    image: tomatoImg,
  },
];
