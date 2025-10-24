"use client"

import React, { useEffect, useState, useRef, useCallback } from "react";
// Router functionality handled with native History API
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, ChevronLeft, ChevronRight, Calendar, Pause, Play, VolumeX, Volume2, Sparkles, Instagram, Facebook, Youtube, Mail, MessageCircle, Globe } from "lucide-react";
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AboutUsPage from './pages/AboutUsPage';
import ProfilePage from './pages/ProfilePage';
import BestsellersPage from './pages/BestsellersPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import { Product, CartItem, Appointment, Page, ReelVideo } from './types';
import { IconButton, PromoSlider } from './components/common';
import { products, promoMessages, reelsVideos } from './constants/products';

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
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("INR");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [wishlistProductIds, setWishlistProductIds] = useState<number[]>([]);
  const [profileDefaultTab, setProfileDefaultTab] = useState<"profile" | "orders" | "addresses" | "wishlist" | "security">("profile");

  // Currency data with exchange rates (relative to INR)
  const currencies = {
    INR: { symbol: "₹", rate: 1, name: "India (INR)" },
    USD: { symbol: "$", rate: 0.012, name: "USA (USD)" },
    EUR: { symbol: "€", rate: 0.011, name: "Europe (EUR)" },
    GBP: { symbol: "£", rate: 0.0095, name: "UK (GBP)" },
    AED: { symbol: "د.إ", rate: 0.044, name: "UAE (AED)" },
    AUD: { symbol: "A$", rate: 0.018, name: "Australia (AUD)" },
    CAD: { symbol: "C$", rate: 0.016, name: "Canada (CAD)" },
    SGD: { symbol: "S$", rate: 0.016, name: "Singapore (SGD)" },
  };

  // Function to convert price
  const convertPrice = useCallback((priceInINR: number): string => {
    const converted = priceInINR * currencies[selectedCurrency as keyof typeof currencies].rate;
    return `${currencies[selectedCurrency as keyof typeof currencies].symbol}${Math.round(converted).toLocaleString()}`;
  }, [selectedCurrency]);

  // Handle scroll to hide/show promo slider
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowPromo(false);
      } else {
        setShowPromo(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route mapping constants
  const ROUTE_TO_PAGE: Record<string, Page> = {
    '/': 'home',
    '/shop': 'shop',
    '/cart': 'cart',
    '/checkout': 'checkout',
    '/contact': 'contact',
    '/appointment': 'appointment',
    '/product': 'product',
    '/terms': 'terms',
    '/privacy': 'privacy',
    '/about': 'about',
    '/profile': 'profile',
    '/bestsellers': 'bestsellers',
    '/admin': 'admin-login',
    '/admin/login': 'admin-login',
    '/admin/dashboard': 'admin-dashboard'
  };

  const PAGE_TO_ROUTE: Record<Page, string> = {
    home: '/',
    shop: '/shop',
    cart: '/cart',
    checkout: '/checkout',
    contact: '/contact',
    appointment: '/appointment',
    product: '/product',
    terms: '/terms',
    privacy: '/privacy',
    about: '/about',
    profile: '/profile',
    bestsellers: '/bestsellers',
    'admin-login': '/admin/login',
    'admin-dashboard': '/admin/dashboard'
  };

  // Sync current page with URL pathname on mount
  useEffect(() => {
    const pathname = window.location.pathname;

    // Handle dynamic product routes
    if (pathname.startsWith('/product/')) {
      const productId = pathname.split('/')[2];
      const product = products.find(p => p.id === parseInt(productId));
      if (product) {
        setSelectedProduct(product);
        setCurrentPage('product');
        return;
      }
    }

    // Handle shop category routes
    if (pathname === '/shop/women') {
      setCurrentPage('shop');
      setFilterCategory('all');
      return;
    }
    if (pathname === '/shop/men') {
      setCurrentPage('shop');
      setFilterCategory('mans');
      return;
    }

    const page = ROUTE_TO_PAGE[pathname] || 'home';
    setCurrentPage(page);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;

      // Handle dynamic product routes
      if (pathname.startsWith('/product/')) {
        const productId = pathname.split('/')[2];
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
          setSelectedProduct(product);
          setCurrentPage('product');
          return;
        }
      }

      // Handle shop category routes
      if (pathname === '/shop/women') {
        setCurrentPage('shop');
        setFilterCategory('all');
        return;
      }
      if (pathname === '/shop/men') {
        setCurrentPage('shop');
        setFilterCategory('mans');
        return;
      }

      const page = ROUTE_TO_PAGE[pathname] || 'home';
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
    if (typeof window !== 'undefined') {
      let url = PAGE_TO_ROUTE[page];

      // Handle shop category URLs
      if (page === 'shop') {
        if (category === 'mans') {
          url = '/shop/men';
        } else {
          url = '/shop/women';
        }
      }

      window.history.pushState({}, '', url);
    }
  }, [isAuthenticated]);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor("");
    setSelectedSize("");
    setCurrentPage("product");
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/product/${product.id}`);
    }
  }, []);

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

  // Wishlist functions
  const toggleWishlist = useCallback(async (product: Product) => {
    if (!isAuthenticated || !user?.email) {
      alert('Please login to add items to wishlist');
      setShowLogin(true);
      return;
    }

    const { addToWishlist, removeFromWishlist, getWishlistItemId } = await import('./services/wishlistService');

    const isInWishlist = wishlistProductIds.includes(product.id);

    if (isInWishlist) {
      // Remove from wishlist
      const itemId = await getWishlistItemId(user.email, product.id);
      if (itemId) {
        const success = await removeFromWishlist(itemId);
        if (success) {
          setWishlistProductIds(prev => prev.filter(id => id !== product.id));
          if (typeof window !== 'undefined') {
            alert('Removed from wishlist!');
          }
        }
      }
    } else {
      // Add to wishlist
      const itemId = await addToWishlist(
        user.email,
        product.id,
        product.name,
        product.price,
        product.image,
        product.category
      );
      if (itemId) {
        setWishlistProductIds(prev => [...prev, product.id]);
        if (typeof window !== 'undefined') {
          alert('Added to wishlist! ❤️');
        }
      } else {
        // Already exists
        if (typeof window !== 'undefined') {
          alert('Already in wishlist!');
        }
      }
    }
  }, [isAuthenticated, user, wishlistProductIds]);

  // Load wishlist on auth change
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated && user?.email) {
        const { getUserWishlist } = await import('./services/wishlistService');
        const items = await getUserWishlist(user.email);
        setWishlistProductIds(items.map(item => item.productId));
      } else {
        setWishlistProductIds([]);
      }
    };
    loadWishlist();
  }, [isAuthenticated, user]);

  const Header = useCallback(() => (
    <header className="bg-white border-b border-gray-200 shadow-md backdrop-blur-sm bg-white/95">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center space-x-2 focus:outline-none rounded px-2 py-1 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="text-xl sm:text-2xl font-bold text-rose-600 select-none">DEECEE</span>
              <span className="text-xl sm:text-2xl font-light text-gray-800 select-none">HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-6 ml-8">
              <button
                onClick={() => navigateTo("bestsellers")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                Bestsellers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => navigateTo("shop")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                Shop for Women
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => navigateTo("shop", "mans")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                Shop for Men
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => navigateTo("appointment")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                Book Appointment
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => navigateTo("about")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-all duration-200 focus:outline-none rounded px-3 py-2 relative group hover:scale-105 active:scale-95"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 focus:outline-none group"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium hidden sm:inline">{selectedCurrency}</span>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 animate-slideDown">
                  {Object.entries(currencies).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCurrency(code);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors ${
                        selectedCurrency === code ? 'bg-rose-50 text-rose-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{data.symbol}</span> {data.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-700 hover:text-rose-600 focus:outline-none rounded-lg hover:bg-rose-50 transition-all duration-200 active:scale-90"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 transform rotate-0 transition-transform duration-200" /> : <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-200" />}
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
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4 animate-slideDown">
          <nav className="flex flex-col space-y-3">
            <button onClick={() => {
              if (isAuthenticated) {
                navigateTo("profile");
              } else {
                setShowLogin(true);
              }
              setMobileMenuOpen(false);
            }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              My Profile
            </button>
            <button onClick={() => { navigateTo("bestsellers"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Bestsellers
            </button>
            <button onClick={() => { navigateTo("shop"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Shop for Women
            </button>
            <button onClick={() => { navigateTo("shop", "mans"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Shop for Men
            </button>
            <button onClick={() => { navigateTo("appointment"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Book Appointment
            </button>
            <button onClick={() => { navigateTo("about"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              About Us
            </button>
            <button onClick={() => { navigateTo("contact"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Contact Us
            </button>
            <button onClick={() => { navigateTo("terms"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Terms & Conditions
            </button>
            <button onClick={() => { navigateTo("privacy"); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 text-left focus:outline-none rounded-lg px-4 py-3 active:scale-95 transform">
              Privacy Policy
            </button>
          </nav>
        </div>
      )}
    </header>
  ), [cart.length, mobileMenuOpen, navigateTo, searchOpen, isAuthenticated, selectedCurrency, showCurrencyDropdown]);

  const HomePage = useCallback(() => (
    <div className="w-full">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/videos/hero_promo_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/40 via-transparent to-rose-600/40"></div>
        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="transform transition-all duration-700">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              Premium Hair
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 font-light">Extensions</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Transform your look with our luxurious collection
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button onClick={() => navigateTo("shop")} className="bg-white text-rose-600 px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg text-sm md:text-base">
              Shop Collection
            </button>
            <button onClick={() => navigateTo("appointment")} className="bg-transparent border-2 border-white text-white px-6 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition transform hover:scale-105 flex items-center justify-center gap-2 text-sm md:text-base">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" /> Book Consultation
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Bestsellers</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">Our most loved products, trusted by thousands of customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isBestseller).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-rose-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Bestseller
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <p className="text-white text-base md:text-lg font-semibold mb-1.5 md:mb-2">{convertPrice(product.price)}</p>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigateTo("bestsellers")}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              View All Bestsellers
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">New Arrivals</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">Discover our latest collection of premium hair extensions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isNew).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-green-600 text-white px-2.5 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" /> New
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <p className="text-white text-base md:text-lg font-semibold mb-1.5 md:mb-2">{convertPrice(product.price)}</p>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 text-center">Featured Collections</h2>
          <p className="text-sm md:text-base text-gray-600 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">Discover our premium hair extensions in various textures to match your style</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {[
              { type: "Straight", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/straight-extensions.jpeg" },
              { type: "Wavy", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/wavy-extensions.jpeg" },
              { type: "Curly", image: "https://raw.githubusercontent.com/prabhav0001/deecee-src/refs/heads/main/curly-extensions.jpeg" },
            ].map((item) => (
              <div key={item.type} className="group cursor-pointer" onClick={() => { setFilterCategory(item.type.toLowerCase()); setCurrentPage("shop"); }}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img src={item.image} alt={item.type} className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2">{item.type} Extensions</h3>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Mans Collection</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">Premium hair solutions designed specifically for men</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {products.filter(p => p.isMans).map((product) => (
              <div key={product.id} className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300" onClick={() => handleProductClick(product)}>
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-2 truncate">{product.name}</h3>
                    <p className="text-white text-base md:text-lg font-semibold mb-1.5 md:mb-2">{convertPrice(product.price)}</p>
                    <button className="text-white underline hover:no-underline text-xs sm:text-sm md:text-base">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => { setFilterCategory("mans"); setCurrentPage("shop"); }}
              className="bg-rose-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-rose-700 transition text-sm md:text-base"
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
  ), [navigateTo, convertPrice]);

  // Check if current page is admin page
  const isAdminPage = currentPage === 'admin-login' || currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Fixed Header Wrapper with PromoSlider - Hidden for admin pages */}
      {!isAdminPage && (
        <div className="fixed top-0 left-0 right-0 z-[9999] w-full">
          {/* PromoSlider with smooth transition */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showPromo ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <PromoSlider messages={promoMessages} />
          </div>
          {/* Header always visible */}
          <div className="bg-white shadow-sm">
            <Header />
          </div>
        </div>
      )}
      {/* Dynamic spacer - changes based on promo visibility - Hidden for admin pages */}
      {!isAdminPage && (
        <div className={`transition-all duration-300 ${showPromo ? 'h-28' : 'h-16'}`}></div>
      )}
      <main className="w-full">
        {currentPage === "home" && <HomePage />}
        {currentPage === "shop" && (
          <ShopPage
            products={products}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            onProductClick={handleProductClick}
            convertPrice={convertPrice}
            wishlistProductIds={wishlistProductIds}
            onToggleWishlist={toggleWishlist}
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
            onBackToShop={() => navigateTo("shop")}
            convertPrice={convertPrice}
            isInWishlist={wishlistProductIds.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
          />
        )}
        {currentPage === "cart" && (
          <CartPage
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onContinueShopping={() => navigateTo("shop")}
            onProceedToCheckout={() => {
              if (!isAuthenticated) {
                setShowLogin(true);
              } else {
                navigateTo("checkout");
              }
            }}
            convertPrice={convertPrice}
          />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            cart={cart}
            convertPrice={convertPrice}
            onBackToCart={() => navigateTo("cart")}
            onOrderSuccess={() => {
              setCart([]);
              setProfileDefaultTab("orders");
              navigateTo("profile");
            }}
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
        {currentPage === "privacy" && <PrivacyPolicyPage />}
        {currentPage === "about" && <AboutUsPage />}
        {currentPage === "profile" && (
          <ProfilePage
            onNavigateToLogin={() => setShowLogin(true)}
            onNavigateHome={() => navigateTo("home")}
            defaultTab={profileDefaultTab}
          />
        )}
        {currentPage === "bestsellers" && (
          <BestsellersPage
            products={products}
            onProductClick={handleProductClick}
            onBackToHome={() => navigateTo("home")}
            convertPrice={convertPrice}
          />
        )}
        {currentPage === "admin-login" && (
          <AdminLoginPage
            onLoginSuccess={() => navigateTo("admin-dashboard")}
            onBackToHome={() => navigateTo("home")}
          />
        )}
        {currentPage === "admin-dashboard" && (
          <AdminDashboardPage
            onLogout={() => navigateTo("admin-login")}
          />
        )}
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
          onForgotPassword={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
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

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordPage
          onClose={() => setShowForgotPassword(false)}
          onBackToLogin={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
        />
      )}

      {/* Footer - Hidden for admin pages */}
      {!isAdminPage && (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 sm:py-16 w-full relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl"></div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-rose-600 select-none">DEECEE</span>
                <span className="text-2xl sm:text-3xl font-light text-white select-none ml-2">HAIR</span>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-md leading-relaxed">
                Premium quality hair extensions for the modern woman. Transform your look with our 100% authentic, silky smooth textures.
              </p>
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-400 mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/deeceehairofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                  <a
                    href="https://www.facebook.com/hairdeecee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                  <a
                    href="https://www.youtube.com/@deeceehair"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                  <a
                    href="mailto:info@deeceehairs.com"
                    className="w-10 h-10 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-base sm:text-lg text-white relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-rose-600"></span>
              </h4>
              <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                <li>
                  <button
                    onClick={() => navigateTo("about")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("bestsellers")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Bestsellers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-6 text-base sm:text-lg text-white relative inline-block">
                Legal
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-rose-600"></span>
              </h4>
              <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                <li>
                  <button
                    onClick={() => navigateTo("terms")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("privacy")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("appointment")}
                    className="hover:text-rose-500 hover:translate-x-1 transition-all duration-200 focus:outline-none inline-flex items-center group py-1 active:text-rose-600"
                    type="button"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-rose-600 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-xs sm:text-sm text-gray-400 select-none">
                &copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved. Made with ❤️ for beautiful hair.
              </p>
              <div className="flex items-center space-x-6 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-rose-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-rose-600" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      )}

      {/* Floating WhatsApp Button - Hidden for admin pages */}
      {!isAdminPage && (
        <a
          href="https://wa.me/919351455595"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group animate-bounce hover:animate-none"
          aria-label="Contact us on WhatsApp"
        >
        <svg
          viewBox="0 0 24 24"
          className="w-9 h-9 fill-white group-hover:scale-110 transition-transform"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
      )}
    </div>
  );
}

// AuthProvider with AdminAuthProvider
export default function DeeceeHair(): React.ReactElement {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <DeeceeHairApp />
      </AdminAuthProvider>
    </AuthProvider>
  );
}
