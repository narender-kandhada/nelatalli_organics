"""
Seed script — populates the database with Nelatalli Organics product data.
Images are served from /static/images/ by the backend.
Run once: python seed.py
"""

from database import engine, SessionLocal, Base
from models import Category, Product, BlogPost, User, Order, OrderItem, SupportTicket
from auth import hash_password
from datetime import datetime, timezone, timedelta
import random

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Image base path — served via FastAPI static files
IMG = "/static/images"

# ─────────────────────── Clear existing data ───────────────────────
print("🌱 Clearing existing data...")
db.query(SupportTicket).delete()
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

# SKU counter per category
sku_counters = {}

products_data = [
    {"slug": "organic-brown-rice", "title": "Organic Brown Rice", "price": 85.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 5, "reviews": 42, "stock": 142, "discount_price": None,
     "description": "Unpolished, nutrient-rich brown rice grown using traditional organic methods. Packed with fiber, minerals, and essential vitamins.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-red-rice", "title": "Organic Red Rice", "price": 95.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.8, "reviews": 28, "stock": 89, "discount_price": 82.00,
     "description": "Native red rice variety, rich in antioxidants and fiber. Sourced directly from organic farmers in Andhra Pradesh.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-jowar", "title": "Organic Jowar (Sorghum)", "price": 65.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 4.5, "reviews": 15, "stock": 200, "discount_price": None,
     "description": "Gluten-free ancient grain, perfect for healthy rotis and porridges. 100% chemical-free.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-bajra", "title": "Organic Bajra (Pearl Millet)", "price": 60.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.7, "reviews": 22, "stock": 175, "discount_price": None,
     "description": "Nutritious pearl millet, ideal for winter diets and energy-rich meals. Organically cultivated.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-ragi", "title": "Organic Ragi (Finger Millet)", "price": 70.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 5, "reviews": 56, "stock": 130, "discount_price": 59.00,
     "description": "Calcium-rich finger millet, a staple for growing children and health enthusiasts.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-tomatoes", "title": "Seasonal Organic Tomatoes", "price": 40.00,
     "category": "Fresh Produce", "image": f"{IMG}/tomato.png",
     "rating": 4.9, "reviews": 112, "stock": 350, "discount_price": None,
     "description": "Sun-ripened, chemical-free tomatoes harvested fresh from our organic fields.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-spinach", "title": "Organic Spinach", "price": 30.00,
     "category": "Fresh Produce", "image": f"{IMG}/spinach.png",
     "rating": 4.8, "reviews": 84, "stock": 8, "discount_price": None,
     "description": "Fresh, leafy greens grown without any synthetic pesticides or fertilizers.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-brinjal", "title": "Organic Brinjal (Eggplant)", "price": 45.00,
     "category": "Fresh Produce", "image": f"{IMG}/brinjal.png",
     "rating": 4.6, "reviews": 37, "stock": 0, "discount_price": None,
     "description": "Tender and flavorful organic brinjals, perfect for traditional curries.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-bananas", "title": "Organic Bananas", "price": 60.00,
     "category": "Fresh Produce", "image": f"{IMG}/bananas.png",
     "rating": 5, "reviews": 156, "stock": 280, "discount_price": None,
     "description": "Naturally ripened, sweet organic bananas, free from ripening chemicals.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-papaya", "title": "Organic Papaya", "price": 80.00,
     "category": "Fresh Produce", "image": f"{IMG}/papaya.png",
     "rating": 4.7, "reviews": 45, "stock": 95, "discount_price": None,
     "description": "Farm-fresh organic papaya, rich in vitamins and natural sweetness.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-apples", "title": "Organic Apples", "price": 180.00,
     "category": "Fresh Produce", "image": f"{IMG}/apples.png",
     "rating": 4.9, "reviews": 92, "stock": 5, "discount_price": 155.00,
     "description": "Crisp and juicy organic apples, sourced from high-altitude organic orchards.", "is_top_rated": False, "asymmetry": True},
    {"slug": "organic-white-rice", "title": "Organic White Rice", "price": 75.00,
     "category": "Grains & Millets", "image": f"{IMG}/jowar.png",
     "rating": 4.6, "reviews": 34, "stock": 220, "discount_price": None,
     "description": "Pure, organic white rice, carefully processed to retain its natural aroma and taste.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-wheat", "title": "Organic Whole Wheat", "price": 55.00,
     "category": "Grains & Millets", "image": f"{IMG}/bajra.png",
     "rating": 4.7, "reviews": 41, "stock": 190, "discount_price": None,
     "description": "Stone-ground whole wheat flour, rich in nutrients and perfect for soft rotis.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-mango", "title": "Organic Mangoes", "price": 250.00,
     "category": "Fresh Produce", "image": f"{IMG}/bananas.png",
     "rating": 5, "reviews": 184, "stock": 0, "discount_price": None,
     "description": "Naturally ripened, carbide-free organic mangoes from Andhra Pradesh.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-butter", "title": "Organic Grass-Fed Butter", "price": 220.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.9, "reviews": 67, "stock": 45, "discount_price": None,
     "description": "Creamy, hand-churned butter from the milk of grass-fed cows.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-curd", "title": "Organic Grass-Fed Curd", "price": 60.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.8, "reviews": 124, "stock": 60, "discount_price": None,
     "description": "Thick, creamy curd made from pure organic milk using traditional cultures.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-ghee", "title": "Organic A2 Ghee", "price": 650.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 5, "reviews": 210, "stock": 3, "discount_price": 599.00,
     "description": "Traditional Bilona method ghee made from the milk of grass-fed A2 cows. Pure, golden, and aromatic.", "is_top_rated": True, "asymmetry": False},
    {"slug": "organic-milk", "title": "Organic Whole Milk", "price": 80.00,
     "category": "Dairy & Essentials", "image": f"{IMG}/ghee.png",
     "rating": 4.8, "reviews": 320, "stock": 100, "discount_price": None,
     "description": "Pure, unadulterated milk from grass-fed cows, delivered fresh daily.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-honey", "title": "Organic Raw Honey", "price": 350.00,
     "category": "Pantry & Pickles", "image": f"{IMG}/honey.png",
     "rating": 5, "reviews": 145, "stock": 7, "discount_price": None,
     "description": "Unfiltered, raw forest honey harvested sustainably from wild beehives. 100% pure.", "is_top_rated": False, "asymmetry": False},
    {"slug": "organic-pickles", "title": "Traditional Organic Pickles", "price": 120.00,
     "category": "Pantry & Pickles", "image": f"{IMG}/honey.png",
     "rating": 4.9, "reviews": 78, "stock": 55, "discount_price": 99.00,
     "description": "Handmade pickles using organic ingredients and traditional sun-drying methods.", "is_top_rated": False, "asymmetry": True},
]

product_idx = 0
for p in products_data:
    category_name = p.pop("category")
    stock = p.pop("stock")
    discount_price = p.pop("discount_price")

    # Generate SKU
    cat_prefix = category_name[:3].upper()
    sku_counters[cat_prefix] = sku_counters.get(cat_prefix, 0) + 1
    sku = f"NEL-{cat_prefix}-{sku_counters[cat_prefix]:03d}"

    product = Product(
        **p,
        sku=sku,
        stock=stock,
        discount_price=discount_price,
        category_id=cat_map[category_name],
        is_featured=p["slug"] in featured_slugs,
        is_top_selling=p["slug"] in top_selling_slugs,
        is_recently_added=p["slug"] in recently_added_slugs,
        in_stock=stock > 0,
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

# ─────────────────────── Admin User ───────────────────────────────
print("👑 Seeding admin user...")
admin_user = User(
    name="Narender Kandhada",
    email="admin@nelatalli.com",
    password_hash=hash_password("admin123"),
    phone="+91 81859 98010",
    address="Thallaguda Village, Ranga Reddy, Hyderabad, Telangana",
    avatar=f"{IMG}/logo.png",
    is_admin=True,
    member_since="October 2024",
)
db.add(admin_user)
db.flush()

# ─────────────────────── Demo Users ───────────────────────────────
print("👤 Seeding demo users...")
demo_users_data = [
    {"name": "Ananya Sharma", "email": "ananya@example.com", "phone": "+91 98765 43210", "address": "Mumbai, MH"},
    {"name": "Rohan Kapoor", "email": "rohan.k@domain.in", "phone": "+91 98234 56789", "address": "Delhi, DL"},
    {"name": "Meera Das", "email": "meera.das@gmail.com", "phone": "+91 99887 76655", "address": "Bangalore, KA"},
    {"name": "Vikram Jha", "email": "vjha@outlook.com", "phone": "+91 91234 56789", "address": "Pune, MH"},
    {"name": "Sanya Malhotra", "email": "sanya.m@example.com", "phone": "+91 98765 00000", "address": "Hyderabad, TS"},
    {"name": "Amara Singh", "email": "amara.s@example.com", "phone": "+91 98765 11111", "address": "Lucknow, UP"},
    {"name": "Vikram Malhotra", "email": "v.malhotra@domain.in", "phone": "+91 98765 22222", "address": "Chandigarh, CH"},
    {"name": "Elena Rodriguez", "email": "elena@rodriguez.com", "phone": "+91 98765 33333", "address": "Goa, GA"},
    {"name": "Karan Johar", "email": "karan.j@bolly.com", "phone": "+91 98765 44444", "address": "Mumbai, MH"},
    {"name": "Priya Patel", "email": "priya.p@gmail.com", "phone": "+91 98765 55555", "address": "Ahmedabad, GJ"},
]

demo_user_ids = []
for idx, u_data in enumerate(demo_users_data):
    u = User(
        name=u_data["name"],
        email=u_data["email"],
        password_hash=hash_password("password123"),
        phone=u_data["phone"],
        address=u_data["address"],
        avatar=f"https://picsum.photos/seed/{u_data['email']}/200/200",
        is_admin=False,
        member_since=f"{'Sep' if idx < 5 else 'Oct'} 2023",
    )
    db.add(u)
    db.flush()
    demo_user_ids.append(u.id)

# ─────────────────────── Demo Orders ──────────────────────────────
print("📋 Seeding demo orders...")

products_list = db.query(Product).all()
statuses = ["Pending", "Confirmed", "Shipped", "Delivered"]
payment_statuses = ["Paid", "Unpaid"]

now = datetime.now(timezone.utc)

for i, user_id in enumerate(demo_user_ids):
    # Each user gets 1-4 orders
    num_orders = random.randint(1, 4)
    for j in range(num_orders):
        order_status = random.choice(statuses)
        pay_status = "Paid" if order_status == "Delivered" else random.choice(payment_statuses)
        order_date = now - timedelta(days=random.randint(1, 90))

        # Pick 1-3 random products
        selected = random.sample(products_list, min(random.randint(1, 3), len(products_list)))
        total = sum(p.price * random.randint(1, 5) for p in selected)

        order = Order(
            order_number=f"#ORD-{9000 + i * 10 + j}",
            user_id=user_id,
            total=round(total, 2),
            status=order_status,
            payment_status=pay_status,
            created_at=order_date,
        )
        db.add(order)
        db.flush()

        for p in selected:
            qty = random.randint(1, 5)
            db.add(OrderItem(
                order_id=order.id,
                product_id=p.id,
                quantity=qty,
                price=p.price,
            ))

db.commit()
db.close()

print("✅ Database seeded successfully!")
print("   - 4 categories")
print("   - 20 products (with SKUs, stock levels, discount prices)")
print("   - 4 blog posts (1 featured)")
print("   - 1 admin user (admin@nelatalli.com / admin123)")
print("   - 10 demo customers with sample orders")
print("   - ~25 sample orders with varied statuses")
