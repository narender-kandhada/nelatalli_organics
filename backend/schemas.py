from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ──────────────────────────── Category ────────────────────────────

class CategoryOut(BaseModel):
    id: int
    slug: str
    name: str
    count_label: str
    image: str
    highlight: bool
    icon: str
    product_count: int

    class Config:
        from_attributes = True


# ──────────────────────────── Product ─────────────────────────────

class ProductOut(BaseModel):
    id: int
    slug: str
    title: str
    price: float
    category: str = ""
    image: str
    rating: float
    reviews: int
    description: str
    is_top_rated: bool
    is_featured: bool
    is_top_selling: bool
    is_recently_added: bool
    asymmetry: bool
    in_stock: bool

    class Config:
        from_attributes = True


class ProductBrief(BaseModel):
    """Compact product for lists like top-selling, featured, etc."""
    id: str  # slug
    title: str
    price: float
    rating: float
    image: str
    category: str = ""

    class Config:
        from_attributes = True


# ──────────────────────────── Blog ────────────────────────────────

class BlogPostOut(BaseModel):
    id: int
    title: str
    category: str
    date: str
    image: str
    excerpt: str
    content: str
    is_featured: bool

    class Config:
        from_attributes = True


# ──────────────────────────── Contact ─────────────────────────────

class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


class ContactOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Auth / User ─────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""
    address: str = ""


class UserLogin(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = ""
    address: Optional[str] = ""
    avatar: Optional[str] = ""
    member_since: Optional[str] = ""

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    avatar: Optional[str] = None


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ──────────────────────────── Address ─────────────────────────────

class AddressCreate(BaseModel):
    title: str = "Home"
    full_name: str
    street: str
    city: str
    state: str
    zip_code: str
    phone: str = ""
    is_default: bool = False

class AddressUpdate(BaseModel):
    title: Optional[str] = None
    full_name: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    phone: Optional[str] = None
    is_default: Optional[bool] = None

class AddressOut(BaseModel):
    id: int
    title: str
    full_name: str
    street: str
    city: str
    state: str
    zip_code: str
    phone: str
    is_default: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ──────────────────────────── Payment Method ──────────────────────

class PaymentMethodCreate(BaseModel):
    provider: str
    card_number_last4: str
    expiry_month: str
    expiry_year: str
    card_holder_name: str
    is_default: bool = False

class PaymentMethodOut(BaseModel):
    id: int
    provider: str
    card_number_last4: str
    expiry_month: str
    expiry_year: str
    card_holder_name: str
    is_default: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Order ───────────────────────────────

class OrderItemOut(BaseModel):
    id: int
    product_id: int
    product_title: str = ""
    quantity: int
    price: float

    class Config:
        from_attributes = True


class OrderOut(BaseModel):
    id: int
    order_number: str
    total: float
    status: str
    created_at: datetime
    items: list[OrderItemOut] = []

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    """Create order from current cart items."""
    pass


# ──────────────────────────── Wishlist ────────────────────────────

class WishlistAdd(BaseModel):
    product_id: int


class WishlistItemOut(BaseModel):
    id: int
    product: ProductBrief
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Cart ────────────────────────────────

class CartAdd(BaseModel):
    product_id: int
    quantity: int = 1


class CartUpdate(BaseModel):
    quantity: int


class CartItemOut(BaseModel):
    id: int
    product: ProductBrief
    quantity: int

    class Config:
        from_attributes = True


# ══════════════════════════════════════════════════════════════════
#                     ADMIN SCHEMAS
# ══════════════════════════════════════════════════════════════════

# ──────────────────────────── Admin Auth ──────────────────────────

class AdminLoginRequest(BaseModel):
    email: str
    password: str


class AdminTokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
    is_admin: bool = True


# ──────────────────────────── Admin Product ───────────────────────

class AdminProductOut(BaseModel):
    id: int
    name: str
    sku: str
    category: str
    price: float
    discount_price: Optional[float] = None
    stock: int
    status: str  # Active, Low Stock, Out of Stock
    image: str
    slug: str
    description: str

    class Config:
        from_attributes = True


class AdminProductCreate(BaseModel):
    title: str
    sku: str
    slug: str = ""
    price: float
    discount_price: Optional[float] = None
    category_id: int
    image: str = ""
    stock: int = 0
    description: str = ""
    in_stock: bool = True


class AdminProductUpdate(BaseModel):
    title: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None
    discount_price: Optional[float] = None
    category_id: Optional[int] = None
    image: Optional[str] = None
    stock: Optional[int] = None
    description: Optional[str] = None
    in_stock: Optional[bool] = None


# ──────────────────────────── Admin Order ─────────────────────────

class AdminOrderOut(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    items: str
    total: float
    status: str
    payment_status: str
    date: str
    initials: str

    class Config:
        from_attributes = True


class AdminOrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None


# ──────────────────────────── Admin Customer ──────────────────────

class AdminCustomerOut(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    location: str
    joined: str
    orders: int
    total_spent: str
    initials: str

    class Config:
        from_attributes = True


# ──────────────────────────── Dashboard Stats ─────────────────────

class DashboardStatsOut(BaseModel):
    total_revenue: float
    total_orders: int
    total_products: int
    total_users: int
    low_stock_count: int
    pending_orders: int
    revenue_trend: str
    orders_trend: str
    users_trend: str


class RevenueDataPoint(BaseModel):
    name: str
    value: float


class OrderStatusBreakdown(BaseModel):
    name: str
    value: int
    color: str


class TopProductOut(BaseModel):
    name: str
    sold: int
    percentage: int


class LowStockAlert(BaseModel):
    name: str
    category: str
    stock: int


class RecentOrderOut(BaseModel):
    id: str
    customer: str
    initials: str
    total: str
    status: str
    date: str


# ──────────────────────────── Analytics ───────────────────────────

class AnalyticsOverview(BaseModel):
    revenue: str
    revenue_trend: str
    revenue_is_up: bool
    orders: str
    orders_trend: str
    orders_is_up: bool
    customers: str
    customers_trend: str
    customers_is_up: bool
    avg_order: str
    avg_order_trend: str
    avg_order_is_up: bool


class SalesDataPoint(BaseModel):
    name: str
    sales: float
    orders: int


class CategorySalesPoint(BaseModel):
    name: str
    value: int


# ──────────────────────────── Admin Settings ──────────────────────

class AdminProfileUpdate(BaseModel):
    name: Optional[str] = None
    display_name: Optional[str] = None
    email: Optional[str] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None


class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str


class NotificationPreferences(BaseModel):
    email_notifications: bool = True
    desktop_alerts: bool = False
    newsletter: bool = True
    inventory_alerts: bool = True


class GeneralPreferences(BaseModel):
    language: str = "English (US)"
    timezone: str = "(GMT+05:30) Mumbai, Kolkata"
    currency: str = "INR (₹)"
    date_format: str = "DD/MM/YYYY"


# ──────────────────────────── Support ─────────────────────────────

class SupportTicketCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    priority: str = "Medium"


class SupportTicketOut(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    status: str
    priority: str
    created_at: datetime

    class Config:
        from_attributes = True


# ──────────────────────────── Order Stats ─────────────────────────

class OrderStatsOut(BaseModel):
    fulfillment_rate: float
    fulfillment_trend: str
    pending_revenue: float
    pending_invoices: int
