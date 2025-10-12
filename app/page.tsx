"use client"

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
// Router functionality handled with native History API
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, CreditCard, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, FileText, Package, Gift, Sparkles, Pause, Play, VolumeX, Volume2 } from "lucide-react";
import ShopPage from './shop';
import ProductPage from './product';
import CartPage from './cart';
import ContactPage from './contact';
import AppointmentPage from './appointment';
import TermsPage from './terms';
import ProfilePage from './profile';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import VerificationPage from './VerificationPage';
import { AuthProvider, useAuth } from './AuthContext';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isMans?: boolean;
};

type CartItem = {
  product: Product;
  color: string;
  size: string;
  quantity: number;
};

type Appointment = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

type Page = "home" | "shop" | "product" | "cart" | "contact" | "appointment" | "terms" | "profile";

type ReelVideo = {
  id: number;
  src: string;
  description: string;
};

const products: Product[] = [
  { id: 1, name: "Silky Straight Extensions", price: 2999, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Blonde", "Auburn"], sizes: ['14"', '18"', '22"', '26"'], category: "straight", isBestseller: true },
  { id: 2, name: "Wavy Luxe Hair", price: 3499, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Honey Blonde"], sizes: ['16"', '20"', '24"'], category: "wavy", isNew: true },
  { id: 3, name: "Curly Dream Extensions", price: 3999, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Dark Brown", "Chestnut"], sizes: ['14"', '18"', '22"'], category: "curly", isBestseller: true },
  { id: 4, name: "Body Wave Premium", price: 3299, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Blonde", "Red"], sizes: ['18"', '22"', '26"'], category: "wavy", isNew: true },
  { id: 5, name: "Deep Wave Collection", price: 3799, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Ombre"], sizes: ['16"', '20"', '24"'], category: "wavy" },
  { id: 6, name: "Kinky Straight Wings", price: 3599, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Dark Brown"], sizes: ['14"', '18"', '22"'], category: "straight" },
  { id: 7, name: "Mens Premium Hair Toppers", price: 4999, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Gray"], sizes: ["S", "M", "L"], category: "mans", isBestseller: true, isMans: true },
  { id: 8, name: "Mens Hair Replacement System", price: 5999, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80", colors: ["Black", "Brown", "Blonde"], sizes: ["S", "M", "L"], category: "mans", isNew: true, isMans: true },
];

const promoMessages = [
  { text: "Sign up and Get 5% OFF on your 1st order", icon: Gift },
  { text: "COD AVAILABLE", icon: Package },
  { text: "Free Shipping on Orders Above ₹5000", icon: Truck },
  { text: "Premium Quality Hair Extensions", icon: Sparkles },
];

const heroSlides = [
  { image: "/hero1.jpg", title: "Luxurious Hair", subtitle: "Extensions", description: "Transform your look with our premium collection" },
  { image: "/hero2.jpg", title: "Natural Beauty", subtitle: "Redefined", description: "100% human hair for the perfect blend" },
  { image: "/hero3.jpg", title: "Premium Quality", subtitle: "Guaranteed", description: "Silky smooth textures that last" },
  { image: "/hero4.jpg", title: "Your Style", subtitle: "Elevated", description: "From straight to curly, we have it all" },
  { image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1920&q=80", title: "Confidence", subtitle: "Unleashed", description: "Feel beautiful every single day" },
];

const reelsVideos: ReelVideo[] = [
  { id: 1, src: "/videos/reel1.mp4", description: "Silky Straight Transformation" },
  { id: 2, src: "/videos/reel2.mp4", description: "Wavy Hair Styling Tips" },
  { id: 3, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", description: "Curly Hair Care Routine" },
  { id: 4, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", description: "Deep Wave Extensions Look" },
];

const PromoSlider = () => {
  const trackMessages = useMemo(() => {
    const arr: typeof promoMessages = [];
    for (let i = 0; i < 3; i++) arr.push(...promoMessages);
    return arr;
  }, []);

  return (
    <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 py-3 overflow-hidden relative w-full">
      <div className="relative overflow-hidden w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {trackMessages.map((msg, idx) => {
            const Icon = msg.icon;
            return (
              <span key={idx} className="text-xs sm:text-sm font-medium text-white mx-6 sm:mx-10 inline-flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {msg.text}
              </span>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

const IconButton = ({ icon: Icon, onClick, badge }: { icon: any; onClick?: () => void; badge?: number }) => (
  <button onClick={onClick} className="p-2 text-gray-700 hover:text-rose-600 transition-all duration-300 relative group">
    <Icon className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">{badge}</span>
    )}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="text-center px-4 group">
    <div className="bg-gradient-to-br from-rose-100 to-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
      <Icon className="w-8 h-8 text-rose-600" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600">{description}</p>
  </div>
);

const VideoReelCard = ({ video }: { video: ReelVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
      setIsPlaying(true);
      setIsMuted(true);
    }
  }, [video.src]);

  return (
    <div className="relative w-full h-[32rem] rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover transition-opacity duration-700"
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition mr-2"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleMute(); }}
          className="p-3 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-sm font-medium">
        {video.description}
      </div>
    </div>
  );
};

function DeeceeHairApp(): React.ReactElement {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // Sync current page with URL pathname on mount and pathname changes
  useEffect(() => {
    const routeToPage: Record<string, Page> = {
      '/': 'home',
      '/shop': 'shop',
      '/cart': 'cart',
      '/contact': 'contact',
      '/appointment': 'appointment',
      '/product': 'product',
      '/terms': 'terms',
      '/profile': 'profile'
    };

    const page = routeToPage[window.location.pathname] || 'home';
    setCurrentPage(page);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const routeToPage: Record<string, Page> = {
        '/': 'home',
        '/shop': 'shop',
        '/cart': 'cart',
        '/contact': 'contact',
        '/appointment': 'appointment',
        '/product': 'product',
        '/terms': 'terms',
        '/profile': 'profile'
      };

      const page = routeToPage[window.location.pathname] || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((page: Page, category = "all") => {
    // Check if trying to access profile without login
    if (page === "profile" && !isAuthenticated) {
      setShowLogin(true);
      return;
    }

    setCurrentPage(page);
    setFilterCategory(category);
    setMobileMenuOpen(false);

    // Update URL based on page without navigation
    const pageRoutes: Record<Page, string> = {
      home: '/',
      shop: '/shop',
      cart: '/cart',
      contact: '/contact',
      appointment: '/appointment',
      product: '/product',
      terms: '/terms',
      profile: '/profile'
    };

    // Use history API to update URL without triggering navigation
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', pageRoutes[page]);
    }
  }, [isAuthenticated]);

  const addToCart = useCallback(() => {
    if (!selectedProduct || !selectedColor || !selectedSize) {
      if (typeof window !== 'undefined') {
        alert("Please select color and size");
      }
      return;
    }

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === selectedProduct.id && item.color === selectedColor && item.size === selectedSize);
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1 };
        return newCart;
      } else {
        return [...prevCart, { product: selectedProduct, color: selectedColor, size: selectedSize, quantity: 1 }];
      }
    });

    if (typeof window !== 'undefined') {
      alert("Added to cart!");
    }
  }, [selectedProduct, selectedColor, selectedSize]);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setCart((prevCart) => prevCart.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, []);

  const Header = useCallback(() => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md backdrop-blur-sm bg-white/90">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigateTo("home")} className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              <span className="text-xl sm:text-2xl font-bold text-rose-600 select-none">DEECEE</span>
              <span className="text-xl sm:text-2xl font-light text-gray-800 select-none">HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-6 ml-8">
              {["Shop", "Bestsellers", "New Arrivals"].map((item) => (
                <button key={item} onClick={() => navigateTo("shop")} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                  {item}
                </button>
              ))}
              <button onClick={() => { setFilterCategory("mans"); setCurrentPage("shop"); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                Mans Collection
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                Our Boutiques
              </button>
              <button onClick={() => navigateTo("appointment")} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                Book Appointment
              </button>
              <button onClick={() => navigateTo("contact")} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                Contact Us
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <IconButton icon={Heart} />
              <IconButton
                icon={User}
                onClick={() => {
                  if (isAuthenticated) {
                    navigateTo("profile");
                  } else {
                    setShowLogin(true);
                  }
                }}
              />
            </div>
            <IconButton icon={Search} onClick={() => setSearchOpen((v) => !v)} />
            <IconButton icon={ShoppingCart} onClick={() => navigateTo("cart")} badge={cart.length} />
            <button onClick={() => setMobileMenuOpen((v) => !v)} className="lg:hidden p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="pb-4">
            <input type="text" placeholder="Search for products..." className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
          </div>
        )}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-3">
            <button onClick={() => {
              if (isAuthenticated) {
                navigateTo("profile");
              } else {
                setShowLogin(true);
              }
              setMobileMenuOpen(false);
            }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              My Profile
            </button>
            {["Shop", "Bestsellers", "New Arrivals"].map((item) => (
              <button key={item} onClick={() => { navigateTo("shop"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
                {item}
              </button>
            ))}
            <button onClick={() => { setFilterCategory("mans"); setCurrentPage("shop"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              Mans Collection
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              Our Boutiques
            </button>
            <button onClick={() => { navigateTo("appointment"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              Book Appointment
            </button>
            <button onClick={() => { navigateTo("contact"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              Contact Us
            </button>
            <button onClick={() => { navigateTo("terms"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
              Terms & Conditions
            </button>
          </nav>
        </div>
      )}
    </header>
  ), [cart.length, mobileMenuOpen, navigateTo, searchOpen, isAuthenticated]);

  const HomePage = useCallback(() => (
    <div className="w-full overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/40 via-transparent to-rose-600/40"></div>
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="transform transition-all duration-700">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {heroSlides[currentSlide].title}
              <span className="block text-2xl sm:text-3xl lg:text-5xl mt-2 font-light">{heroSlides[currentSlide].subtitle}</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto px-4">
              {heroSlides[currentSlide].description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button onClick={() => navigateTo("shop")} className="bg-white text-rose-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
              Shop Collection
            </button>
            <button onClick={() => navigateTo("appointment")} className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition transform hover:scale-105 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" /> Book Consultation
            </button>
          </div>
        </div>
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition z-30">
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)} className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition z-30">
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-6 sm:w-8" : "bg-white/50 hover:bg-white/70"}`} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <FeatureCard icon={Truck} title="Free Shipping" description="On orders above ₹5000" />
            <FeatureCard icon={Shield} title="100% Authentic" description="Premium quality guaranteed" />
            <FeatureCard icon={CreditCard} title="COD Available" description="Cash on delivery option" />
            <FeatureCard icon={Star} title="5% Off" description="On your first order" />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Featured Collections</h2>
          <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4">Discover our premium hair extensions in various textures to match your style</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { type: "Straight", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=400&q=80" },
              { type: "Wavy", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80" },
              { type: "Curly", image: "/hero3.jpg" },
            ].map((item) => (
              <div key={item.type} className="group cursor-pointer" onClick={() => { setFilterCategory(item.type.toLowerCase()); setCurrentPage("shop"); }}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img src={item.image} alt={item.type} className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.type} Extensions</h3>
                    <button className="text-white underline hover:no-underline text-sm sm:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Mans Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">Premium hair solutions designed specifically for men</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {products.filter(p => p.isMans).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => { setSelectedProduct(product); setSelectedColor(""); setSelectedSize(""); setCurrentPage("product"); }}>
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 truncate">{product.name}</h3>
                    <p className="text-white text-lg font-semibold mb-2">₹{product.price.toLocaleString()}</p>
                    <button className="text-white underline hover:no-underline text-sm sm:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => { setFilterCategory("mans"); setCurrentPage("shop"); }}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              View All Mans Products
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">Style Inspiration & Reels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {reelsVideos.map((video) => (
              <VideoReelCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-rose-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Priya S.", review: "Amazing quality! The hair extensions blend perfectly with my natural hair." },
              { name: "Anjali M.", review: "Best purchase ever! The texture is so soft and natural looking." },
              { name: "Neha K.", review: "Excellent service and the hair quality is outstanding. Highly recommend!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex mb-4">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />))}</div>
                <p className="text-gray-700 mb-4 italic text-sm sm:text-base">\"{testimonial.review}\"</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ), [currentSlide, navigateTo]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <PromoSlider />
      <Header />
      <main className="w-full overflow-x-hidden">
        {currentPage === "home" && <HomePage />}
        {currentPage === "shop" && (
          <ShopPage
            products={products}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onProductClick={(product) => {
              setSelectedProduct(product);
              setSelectedColor("");
              setSelectedSize("");
              setCurrentPage("product");
            }}
          />
        )}
        {currentPage === "product" && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            onAddToCart={addToCart}
            onBackToShop={() => setCurrentPage("shop")}
          />
        )}
        {currentPage === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onContinueShopping={() => navigateTo("shop")}
          />
        )}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "appointment" && (
          <AppointmentPage
            appointments={appointments}
            setAppointments={setAppointments}
            onNavigateHome={() => navigateTo("home")}
          />
        )}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "profile" && <ProfilePage onNavigateToLogin={() => setShowLogin(true)} />}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <LoginPage
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          onLoginSuccess={() => {
            setShowLogin(false);
            setCurrentPage("profile");
          }}
          onNeedsVerification={() => {
            setShowVerification(true);
          }}
        />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <SignupPage
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          onSignupSuccess={() => {
            setShowSignup(false);
            setShowVerification(true);
          }}
        />
      )}

      {/* Verification Modal */}
      {showVerification && (
        <VerificationPage
          onClose={() => setShowVerification(false)}
          onVerificationSuccess={() => {
            setShowVerification(false);
            setCurrentPage("profile");
          }}
        />
      )}

      <footer className="bg-gray-900 text-white py-8 sm:py-12 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-bold text-rose-600 select-none">DEECEE</span>
              <span className="text-xl sm:text-2xl font-light text-white select-none"> HAIR</span>
              <p className="text-gray-400 text-sm mt-2">Premium quality hair extensions for the modern woman.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button className="hover:text-white transition focus:outline-none">About Us</button></li>
                <li><button onClick={() => navigateTo("shop")} className="hover:text-white transition focus:outline-none">Shop</button></li>
                <li><button onClick={() => navigateTo("contact")} className="hover:text-white transition focus:outline-none">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Customer Service</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button className="hover:text-white transition focus:outline-none">Shipping Info</button></li>
                <li><button className="hover:text-white transition focus:outline-none">Returns</button></li>
                <li><button className="hover:text-white transition focus:outline-none">FAQ</button></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><button onClick={() => navigateTo("terms")} className="hover:text-white transition focus:outline-none">Terms & Conditions</button></li>
                <li><button className="hover:text-white transition focus:outline-none">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs sm:text-sm text-gray-400 select-none">&copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// AuthProvider
export default function DeeceeHair(): React.ReactElement {
  return (
    <AuthProvider>
      <DeeceeHairApp />
    </AuthProvider>
  );
}
