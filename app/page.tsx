"use client"

import React, { useEffect, useState, useCallback, useMemo, useRef, createContext, useContext } from "react";
import { 
  Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, 
  CreditCard, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, 
  Calendar, CheckCircle2, Play, Pause, Volume2, VolumeX, Sparkles, 
  Gift, Package, ArrowRight, ChevronDown, Filter, Grid, List
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  colors: string[];
  sizes: string[];
  category: ProductCategory;
  description?: string;
  features?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
  tags: ProductTag[];
}

type ProductCategory = "straight" | "wavy" | "curly" | "mans";
type ProductTag = "bestseller" | "new" | "sale" | "limited" | "premium";
type PageType = "home" | "shop" | "product" | "cart" | "contact" | "appointment" | "checkout";

interface CartItem {
  id: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
  addedAt: Date;
}

interface Appointment {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  customerInfo: CustomerInfo;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface VideoReel {
  id: number;
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  views?: number;
  likes?: number;
}

interface HeroSlide {
  id: number;
  image: string;
  mobileImage?: string;
  title: string;
  subtitle: string;
  description: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface PromoMessage {
  id: number;
  text: string;
  icon: React.ComponentType<any>;
  link?: string;
}

// ============================================================================
// CONTEXT & STATE MANAGEMENT
// ============================================================================

interface AppState {
  cart: CartItem[];
  wishlist: Product[];
  appointments: Appointment[];
  currentPage: PageType;
  user: CustomerInfo | null;
  isAuthenticated: boolean;
}

interface AppContextType extends AppState {
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => void;
  navigateTo: (page: PageType) => void;
  setUser: (user: CustomerInfo | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

// ============================================================================
// MOCK DATA
// ============================================================================

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silky Straight Premium Extensions",
    price: 2999,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Natural Black", "Dark Brown", "Chocolate", "Honey Blonde"],
    sizes: ['14"', '16"', '18"', '20"', '22"', '24"', '26"'],
    category: "straight",
    description: "Premium quality 100% human hair extensions with natural shine and silky texture.",
    features: ["100% Human Hair", "Tangle-Free", "Heat Resistant up to 180°C", "Can be styled and colored"],
    stock: 25,
    rating: 4.8,
    reviews: 234,
    tags: ["bestseller", "premium"]
  },
  {
    id: 2,
    name: "Beach Wave Luxe Collection",
    price: 3499,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
    colors: ["Natural Black", "Ash Brown", "Caramel", "Platinum"],
    sizes: ['16"', '18"', '20"', '22"', '24"'],
    category: "wavy",
    description: "Beautiful beach wave texture that gives you effortless glamour.",
    stock: 18,
    rating: 4.9,
    reviews: 189,
    tags: ["new", "premium"]
  },
  {
    id: 3,
    name: "Curly Dream Extensions",
    price: 3999,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    colors: ["Jet Black", "Espresso", "Auburn", "Burgundy"],
    sizes: ['14"', '16"', '18"', '20"', '22"'],
    category: "curly",
    description: "Bouncy, defined curls that blend seamlessly with natural hair.",
    stock: 15,
    rating: 4.7,
    reviews: 156,
    tags: ["bestseller", "sale"]
  },
  {
    id: 4,
    name: "Men's Premium Hair System",
    price: 5999,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    colors: ["Natural Black", "Dark Brown", "Medium Brown", "Salt & Pepper"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "mans",
    description: "Undetectable hair replacement system for men. Natural looking and comfortable.",
    stock: 12,
    rating: 4.9,
    reviews: 98,
    tags: ["premium", "new"]
  },
  {
    id: 5,
    name: "Body Wave Elegance",
    price: 3299,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    colors: ["Natural Black", "Chocolate Brown", "Honey Blonde", "Rose Gold"],
    sizes: ['18"', '20"', '22"', '24"', '26"'],
    category: "wavy",
    description: "Luxurious body wave pattern for added volume and movement.",
    stock: 20,
    rating: 4.6,
    reviews: 267,
    tags: ["bestseller"]
  },
  {
    id: 6,
    name: "Deep Wave Collection",
    price: 3799,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80",
    colors: ["Jet Black", "Dark Brown", "Ombre Brown"],
    sizes: ['16"', '18"', '20"', '22"', '24"'],
    category: "wavy",
    description: "Deep, defined waves for a glamorous look.",
    stock: 8,
    rating: 4.8,
    reviews: 145,
    tags: ["sale", "limited"]
  }
];

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1920&q=80",
    title: "Transform Your Look",
    subtitle: "Premium Hair Extensions",
    description: "Discover our collection of 100% human hair extensions",
    cta: { text: "Shop Now", link: "/shop" }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80",
    title: "Natural Beauty",
    subtitle: "Redefined",
    description: "Seamless blend with your natural hair",
    cta: { text: "Explore Collection", link: "/shop" }
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1920&q=80",
    title: "Confidence",
    subtitle: "Unleashed",
    description: "Feel beautiful every single day",
    cta: { text: "Book Consultation", link: "/appointment" }
  }
];

const VIDEO_REELS: VideoReel[] = [
  {
    id: 1,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80",
    title: "Straight Hair Tutorial",
    description: "How to style your straight extensions",
    views: 12500,
    likes: 890
  },
  {
    id: 2,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    title: "Beach Waves",
    description: "Create perfect beach waves",
    views: 8900,
    likes: 567
  }
];

const PROMO_MESSAGES: PromoMessage[] = [
  { id: 1, text: "Get 5% OFF on your first order", icon: Gift },
  { id: 2, text: "Cash on Delivery Available", icon: Package },
  { id: 3, text: "Free Shipping on Orders Above ₹5000", icon: Truck },
  { id: 4, text: "Premium Quality Guaranteed", icon: Sparkles }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
};

// ============================================================================
// COMPONENTS
// ============================================================================

// Promo Banner Component
const PromoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 py-2.5 overflow-hidden">
      <div className="relative flex">
        <div className="animate-scroll flex items-center space-x-8 whitespace-nowrap">
          {[...PROMO_MESSAGES, ...PROMO_MESSAGES, ...PROMO_MESSAGES].map((msg, idx) => {
            const Icon = msg.icon;
            return (
              <span key={idx} className="inline-flex items-center text-white text-sm font-medium">
                <Icon className="w-4 h-4 mr-2" />
                {msg.text}
              </span>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Navigation Header Component
const NavigationHeader: React.FC = () => {
  const { cart, wishlist, navigateTo } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => navigateTo("home")} 
            className="flex items-center space-x-1 focus:outline-none"
          >
            <span className="text-2xl font-bold text-rose-600">DEECEE</span>
            <span className="text-2xl font-light text-gray-800">HAIR</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => navigateTo("shop")}
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              Shop
            </button>
            <div className="relative group">
              <button className="text-gray-700 hover:text-rose-600 font-medium transition-colors flex items-center">
                Collections <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                  Straight Hair
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                  Wavy Hair
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                  Curly Hair
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                  Men's Collection
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("appointment")}
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => navigateTo("contact")}
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-rose-600 transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button className="p-2 text-gray-700 hover:text-rose-600 transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigateTo("cart")}
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 lg:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            <button 
              onClick={() => { navigateTo("shop"); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-rose-600"
            >
              Shop All
            </button>
            <button 
              onClick={() => { navigateTo("appointment"); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-rose-600"
            >
              Book Appointment
            </button>
            <button 
              onClick={() => { navigateTo("contact"); setIsMenuOpen(false); }}
              className="block w-full text-left py-2 text-gray-700 hover:text-rose-600"
            >
              Contact Us
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative h-screen overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      ))}

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            {HERO_SLIDES[currentSlide].title}
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-4">
            {HERO_SLIDES[currentSlide].subtitle}
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {HERO_SLIDES[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo("shop")}
              className="px-8 py-3 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Shop Collection
            </button>
            <button
              onClick={() => navigateTo("appointment")}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            } rounded-full`}
          />
        ))}
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, addToWishlist, navigateTo } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.colors.length > 0 && product.sizes.length > 0) {
      addToCart(product, product.colors[0], product.sizes[0]);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateTo("product")}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.tags.includes("bestseller") && (
            <span className="px-3 py-1 bg-rose-600 text-white text-xs font-semibold rounded-full">
              Bestseller
            </span>
          )}
          {product.tags.includes("new") && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {product.tags.includes("sale") && (
            <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={handleQuickAdd}
            className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-rose-600 hover:text-white transition-colors"
          >
            Quick Add
          </button>
          <button
            onClick={handleWishlist}
            className="p-2 bg-white rounded-full hover:bg-rose-600 hover:text-white transition-colors"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-rose-600">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="mt-2 flex gap-1">
          {product.colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: color.toLowerCase().includes('black') ? '#000' : color.toLowerCase().includes('brown') ? '#8B4513' : '#DDD' }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-sm text-gray-500">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Features Section Component
const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders above ₹5000"
    },
    {
      icon: Shield,
      title: "100% Authentic",
      description: "Premium quality guaranteed"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Multiple payment options"
    },
    {
      icon: Gift,
      title: "Special Offers",
      description: "Exclusive deals for members"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Video Reel Component
const VideoReel: React.FC<{ video: VideoReel }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-100">
      <video
        ref={videoRef}
        src={video.src}
        poster={video.thumbnail}
        className="w-full h-[500px] object-cover"
        loop
        muted={isMuted}
        playsInline
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
        <p className="text-sm text-gray-200">{video.description}</p>
        {video.views && (
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span>{video.views.toLocaleString()} views</span>
            <span>{video.likes?.toLocaleString()} likes</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-2">
          <button
            onClick={togglePlay}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Shop Page Component
const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let products = [...PRODUCTS];
    
    if (selectedCategory !== "all") {
      products = products.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        products = products.filter(p => p.tags.includes("new"));
        break;
    }

    return products;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Shop {selectedCategory !== "all" && `- ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
          </h1>
          
          {/* Filters & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "all"
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategory("straight")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "straight"
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                Straight
              </button>
              <button
                onClick={() => setSelectedCategory("wavy")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "wavy"
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                Wavy
              </button>
              <button
                onClick={() => setSelectedCategory("curly")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "curly"
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                Curly
              </button>
              <button
                onClick={() => setSelectedCategory("mans")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "mans"
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-rose-50'
                }`}
              >
                Men's
              </button>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? 'bg-rose-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? 'bg-rose-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Cart Page Component
const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart, navigateTo } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 299;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigateTo("shop")}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cart.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-rose-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-600 hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 18%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-rose-600">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo("checkout")}
                className="w-full mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigateTo("shop")}
                className="w-full mt-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>

              {shipping > 0 && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Add {formatPrice(5000 - subtotal)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: ''
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <a href="tel:+916376482804" className="flex items-center gap-3 text-gray-700 hover:text-rose-600">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm">+91 63764 82804</p>
                    </div>
                  </a>

                  <a href="mailto:sumiteximjjn@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-rose-600">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm">sumiteximjjn@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm">Swastik Tower, Joshiyo Ka Gatta</p>
                      <p className="text-sm">Jhunjhunu, Rajasthan</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option>General Inquiry</option>
                        <option>Product Information</option>
                        <option>Order Status</option>
                        <option>Returns & Refunds</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-1 mb-4">
              <span className="text-2xl font-bold text-rose-500">DEECEE</span>
              <span className="text-2xl font-light">HAIR</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium quality hair extensions for the modern individual. Transform your look with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => navigateTo("shop")}
                  className="hover:text-white transition-colors"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo("contact")}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button className="hover:text-white transition-colors">
                  Shipping Information
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Size Guide
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Care Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers and updates
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const DeeceeHair: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    cart: [],
    wishlist: [],
    appointments: [],
    currentPage: "home",
    user: null,
    isAuthenticated: false
  });

  const addToCart = useCallback((product: Product, color: string, size: string, quantity = 1) => {
    setAppState(prev => ({
      ...prev,
      cart: [...prev.cart, {
        id: generateId(),
        product,
        color,
        size,
        quantity,
        addedAt: new Date()
      }]
    }));
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setAppState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== itemId)
    }));
  }, []);

  const updateCartQuantity = useCallback((itemId: string, quantity: number) => {
    setAppState(prev => ({
      ...prev,
      cart: prev.cart.map(item => 
        item.id === itemId ? {...item, quantity} : item
      )
    }));
  }, []);

  const clearCart = useCallback(() => {
    setAppState(prev => ({ ...prev, cart: [] }));
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    setAppState(prev => ({
      ...prev,
      wishlist: prev.wishlist.find(p => p.id === product.id) 
        ? prev.wishlist 
        : [...prev.wishlist, product]
    }));
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setAppState(prev => ({
      ...prev,
      wishlist: prev.wishlist.filter(p => p.id !== productId)
    }));
  }, []);

  const bookAppointment = useCallback((appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    setAppState(prev => ({
      ...prev,
      appointments: [...prev.appointments, {
        ...appointment,
        id: generateId(),
        status: 'confirmed',
        createdAt: new Date()
      }]
    }));
  }, []);

  const navigateTo = useCallback((page: PageType) => {
    setAppState(prev => ({ ...prev, currentPage: page }));
    window.scrollTo(0, 0);
  }, []);

  const setUser = useCallback((user: CustomerInfo | null) => {
    setAppState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }));
  }, []);

  const contextValue: AppContextType = {
    ...appState,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    bookAppointment,
    navigateTo,
    setUser
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-white">
        <PromoBanner />
        <NavigationHeader />
        
        <main>
          {appState.currentPage === "home" && (
            <>
              <HeroSection />
              <FeaturesSection />
              <section className="py-16">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Featured Products
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 4).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
              <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                    Style Inspiration
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {VIDEO_REELS.map(video => (
                      <VideoReel key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
          
          {appState.currentPage === "shop" && <ShopPage />}
          {appState.currentPage === "cart" && <CartPage />}
          {appState.currentPage === "contact" && <ContactPage />}
        </main>
        
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default DeeceeHair;
