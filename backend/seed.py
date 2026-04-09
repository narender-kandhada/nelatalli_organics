"""
Seed script — populates the database with Nelatalli Organics product data.
Images are served from /static/images/ by the backend.
Run once: python seed.py
"""

from database import engine, SessionLocal, Base
from models import Category, Product, BlogPost, User, Order, OrderItem
from auth import hash_password
from datetime import datetime, timezone

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Image base path — served via FastAPI static files
IMG = "/static/images"

# ─────────────────────── Clear existing data ───────────────────────
print("🌱 Clearing existing data...")
db.query(OrderItem).delete()
db.query(Order).delete()
db.query(User).delete()
db.query(BlogPost).delete()
db.query(Product).delete()
db.query(Category).delete()
db.commit()

# ─────────────────────── Categories ───────────────────────────────
print("📦 Seeding categories...")
categories_data = [
    {"slug": "grains", "name": "Grains & Millets", "count_label": "Native Varieties",
     "image": f"{IMG}/jowar.png", "highlight": False,
     "icon": f"{IMG}/jowar.png", "product_count": 7},
    {"slug": "produce", "name": "Fresh Produce", "count_label": "Farm to Home",
     "image": f"{IMG}/tomato.png", "highlight": False,
     "icon": f"{IMG}/tomato.png", "product_count": 7},
    {"slug": "dairy", "name": "Dairy & Essentials", "count_label": "Grass-Fed Purity",
     "image": f"{IMG}/ghee.png", "highlight": True,
     "icon": f"{IMG}/ghee.png", "product_count": 4},
    {"slug": "pantry", "name": "Pantry & Pickles", "count_label": "Traditional Recipes",
     "image": f"{IMG}/honey.png", "highlight": False,
     "icon": f"{IMG}/honey.png", "product_count": 2},
]

cat_map = {}
for c in categories_data:
    cat = Category(**c)
    db.add(cat)
    db.flush()
    cat_map[c["name"]] = cat.id

# ─────────────────────── Products ─────────────────────────────────
print("🛒 Seeding products...")

featured_slugs = {"organic-ghee", "organic-honey", "organic-brown-rice", "organic-tomatoes"}
top_selling_slugs = {"organic-ghee", "organic-honey"}
recently_added_slugs = {"organic-red-rice", "organic-pickles"}
top_rated_slugs = {"organic-spinach", "organic-apples"}

products_data = [
    {"slug": "organic-brown-rice", "title": "Organic Brown Rice", "price": 85.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 5, "reviews": 42, "description": "Unpolished, nutrient-rich brown rice grown using traditional organic methods. Packed with fiber, minerals, and essential vitamins.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-red-rice", "title": "Organic Red Rice", "price": 95.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.8, "reviews": 28, "description": "Native red rice variety, rich in antioxidants and fiber. Sourced directly from organic farmers in Andhra Pradesh.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-jowar", "title": "Organic Jowar (Sorghum)", "price": 65.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 4.5, "reviews": 15, "description": "Gluten-free ancient grain, perfect for healthy rotis and porridges. 100% chemical-free.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-bajra", "title": "Organic Bajra (Pearl Millet)", "price": 60.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.7, "reviews": 22, "description": "Nutritious pearl millet, ideal for winter diets and energy-rich meals. Organically cultivated.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-ragi", "title": "Organic Ragi (Finger Millet)", "price": 70.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 5, "reviews": 56, "description": "Calcium-rich finger millet, a staple for growing children and health enthusiasts.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-tomatoes", "title": "Seasonal Organic Tomatoes", "price": 40.00,
     "category": "Fresh Produce", "image": f"{IMG}/tomato.png",
     "rating": 4.9, "reviews": 112, "description": "Sun-ripened, chemical-free tomatoes harvested fresh from our organic fields.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-spinach", "title": "Organic Spinach", "price": 30.00,
     "category": "Fresh Produce", "image": f"{IMG}/spinach.png",
     "rating": 4.8, "reviews": 84, "description": "Fresh, leafy greens grown without any synthetic pesticides or fertilizers.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-brinjal", "title": "Organic Brinjal (Eggplant)", "price": 45.00,
     "category": "Fresh Produce", "image": f"{IMG}/brinjal.png",
     "rating": 4.6, "reviews": 37, "description": "Tender and flavorful organic brinjals, perfect for traditional curries.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-bananas", "title": "Organic Bananas", "price": 60.00,
     "category": "Fresh Produce", "image": f"{IMG}/bananas.png",
     "rating": 5, "reviews": 156, "description": "Naturally ripened, sweet organic bananas, free from ripening chemicals.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-papaya", "title": "Organic Papaya", "price": 80.00,
     "category": "Fresh Produce", "image": f"{IMG}/papaya.png",
     "rating": 4.7, "reviews": 45, "description": "Farm-fresh organic papaya, rich in vitamins and natural sweetness.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-apples", "title": "Organic Apples", "price": 180.00,
     "category": "Fresh Produce", "image": f"{IMG}/apples.png",
     "rating": 4.9, "reviews": 92, "description": "Crisp and juicy organic apples, sourced from high-altitude organic orchards.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-white-rice", "title": "Organic White Rice", "price": 75.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 4.6, "reviews": 34, "description": "Pure, organic white rice, carefully processed to retain its natural aroma and taste.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-wheat", "title": "Organic Whole Wheat", "price": 55.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.7, "reviews": 41, "description": "Stone-ground whole wheat flour, rich in nutrients and perfect for soft rotis.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-mango", "title": "Organic Mangoes", "price": 250.00,
     "category": "Fresh Produce", "image": f"{IMG}/bananas.png",
     "rating": 5, "reviews": 184, "description": "Naturally ripened, carbide-free organic mangoes from Andhra Pradesh.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-butter", "title": "Organic Grass-Fed Butter", "price": 220.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.9, "reviews": 67, "description": "Creamy, hand-churned butter from the milk of grass-fed cows.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-curd", "title": "Organic Grass-Fed Curd", "price": 60.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.8, "reviews": 124, "description": "Thick, creamy curd made from pure organic milk using traditional cultures.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-ghee", "title": "Organic A2 Ghee", "price": 650.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 5, "reviews": 210, "description": "Traditional Bilona method ghee made from the milk of grass-fed A2 cows. Pure, golden, and aromatic.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-milk", "title": "Organic Whole Milk", "price": 80.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.8, "reviews": 320, "description": "Pure, unadulterated milk from grass-fed cows, delivered fresh daily.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-honey", "title": "Organic Raw Honey", "price": 350.00,
     "category": "Pantry & Pickles", "image": f"{IMG}/honey.png",
     "rating": 5, "reviews": 145, "description": "Unfiltered, raw forest honey harvested sustainably from wild beehives. 100% pure.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-pickles", "title": "Traditional Organic Pickles", "price": 120.00,
     "category": "Pantry & Pickles", "image": f"{IMG}/honey.png",
     "rating": 4.9, "reviews": 78, "description": "Handmade pickles using organic ingredients and traditional sun-drying methods.", "is_top_rated": False, "asymmetry": True},
]

for p in products_data:
    category_name = p.pop("category")
    product = Product(
        **p,
        category_id=cat_map[category_name],
        is_featured=p["slug"] in featured_slugs,
        is_top_selling=p["slug"] in top_selling_slugs,
        is_recently_added=p["slug"] in recently_added_slugs,
    )
    if p["slug"] in top_rated_slugs:
        product.is_top_rated = True
    db.add(product)

db.flush()

# ─────────────────────── Blog Posts ───────────────────────────────
print("📝 Seeding blog posts...")
blog_data = [
    {"title": "Why Organic Food is Better for Your Family", "category": "Wellness", "date": "Oct 12, 2024",
     "image": f"{IMG}/spinach.png",
     "excerpt": "Discover why switching to organic food is the best decision for your family's health and the environment.",
     "content": "Organic food is grown without synthetic pesticides, GMOs, or artificial fertilizers. Studies show that organic produce contains higher levels of antioxidants, vitamins, and minerals. By choosing organic, you're not only protecting your family from harmful chemicals but also supporting sustainable farming practices that preserve soil health and biodiversity.", "is_featured": False},
    {"title": "The Golden Secret: Benefits of A2 Ghee", "category": "Recipes", "date": "Oct 08, 2024",
     "image": f"{IMG}/ghee.png",
     "excerpt": "Learn about the incredible health benefits of traditional A2 ghee and how it's made using the ancient Bilona method.",
     "content": "A2 ghee, made from the milk of indigenous cow breeds, is packed with healthy fats, fat-soluble vitamins (A, D, E, K), and CLA (conjugated linoleic acid). The traditional Bilona method involves churning curd to extract butter, then slowly heating it for 12 hours. This process preserves all the beneficial nutrients and gives the ghee its distinctive golden color and nutty aroma.", "is_featured": False},
    {"title": "From Farm to Your Table: Our Promise", "category": "Lifestyle", "date": "Oct 01, 2024",
     "image": f"{IMG}/tomato.png",
     "excerpt": "Take a journey through our organic supply chain — from the farmer's field to your kitchen table.",
     "content": "At Nelatalli Organics, every product tells a story. We work directly with small-scale organic farmers across Andhra Pradesh and southern India. Our products go through rigorous quality checks but minimal processing to preserve their natural goodness. From harvesting to packaging, we ensure that you receive the purest, healthiest organic food possible.", "is_featured": False},
    {"title": "Pure & Healthy Living with Organic Products", "category": "Featured", "date": "Sep 25, 2024",
     "image": f"{IMG}/honey.png",
     "excerpt": "Embrace a healthier lifestyle with Nelatalli Organics — your trusted partner for pure, chemical-free, and sustainably sourced organic products.",
     "content": "At Nelatalli Organics, we believe that pure food leads to a pure life. Our mission is to bring you the finest organic grains, fresh produce, dairy essentials, and pantry staples — all sourced directly from trusted organic farmers. Every product is free from chemicals, preservatives, and artificial additives. Choose organic. Choose healthy. Choose Nelatalli.", "is_featured": True},
]

for b in blog_data:
    db.add(BlogPost(**b))

db.flush()

# ─────────────────────── Demo User & Orders ───────────────────────
print("👤 Seeding demo user...")
demo_user = User(
    name="Narender Kandhada",
    email="narenderkandhada.online@gmail.com",
    password_hash=hash_password("password123"),
    phone="+91 81859 98010",
    address="Thallaguda Village,Ranga Reddy, Hyderabad, Telangana",
    avatar=f"{IMG}/logo.png",
    member_since="October 2024",
)
db.add(demo_user)
db.flush()

ghee = db.query(Product).filter(Product.slug == "organic-ghee").first()
honey = db.query(Product).filter(Product.slug == "organic-honey").first()
spinach = db.query(Product).filter(Product.slug == "organic-spinach").first()

order1 = Order(
    order_number="#NL-8902",
    user_id=demo_user.id,
    total=1240.00,
    status="Delivered",
    created_at=datetime(2024, 10, 5, tzinfo=timezone.utc),
)
db.add(order1)
db.flush()

if ghee:
    db.add(OrderItem(order_id=order1.id, product_id=ghee.id, quantity=1, price=650.00))
if honey:
    db.add(OrderItem(order_id=order1.id, product_id=honey.id, quantity=1, price=350.00))

order2 = Order(
    order_number="#NL-8741",
    user_id=demo_user.id,
    total=895.00,
    status="Processing",
    created_at=datetime(2024, 9, 28, tzinfo=timezone.utc),
)
db.add(order2)
db.flush()

if spinach:
    db.add(OrderItem(order_id=order2.id, product_id=spinach.id, quantity=5, price=30.00))
if ghee:
    db.add(OrderItem(order_id=order2.id, product_id=ghee.id, quantity=1, price=650.00))

db.commit()
db.close()

print("✅ Database seeded successfully!")
print("   - 4 categories")
print("   - 20 products (with real images from /static/images/)")
print("   - 4 blog posts (1 featured)")
print("   - 1 demo user (narenderkandhada.online@gmail.com / password123)")
print("   - 2 sample orders")
