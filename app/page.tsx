"use client"

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, CreditCard, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, Play, Pause, Volume2, VolumeX, Sparkles, Gift, Package, FileText } from "lucide-react";

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

type Page = "home" | "shop" | "product" | "cart" | "contact" | "appointment" | "terms";

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

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <div onClick={onClick} className="border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white group">
    <div className="relative overflow-hidden rounded-xl mb-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
    <p className="text-rose-600 font-bold text-lg">₹{product.price.toLocaleString()}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {product.isBestseller && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700 rounded-full">Bestseller</span>}
      {product.isNew && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full">New</span>}
      {product.isMans && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full">Mans</span>}
    </div>
  </div>
);

const FilterButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${active ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-50 hover:border-rose-300"}`}>
    {children}
  </button>
);

const FormInput = ({ label, type = "text", value, onChange, error, placeholder }: { label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder?: string }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all" />
    {error && <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><X className="w-3 h-3" />{error}</p>}
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

export default function DeeceeHair(): React.ReactElement {
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

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = useCallback((page: Page, category = "all") => {
    setCurrentPage(page);
    setFilterCategory(category);
    setMobileMenuOpen(false);
  }, []);

  const addToCart = useCallback(() => {
    if (!selectedProduct || !selectedColor || !selectedSize) {
      alert("Please select color and size");
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
    alert("Added to cart!");
  }, [selectedProduct, selectedColor, selectedSize]);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setCart((prevCart) => prevCart.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  }, []);

  const getTotalPrice = useCallback(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);

  const filteredProducts = useMemo(() => filterCategory === "all" ? products : products.filter((p) => p.category === filterCategory), [filterCategory]);

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
              <IconButton icon={User} />
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
  ), [cart.length, currentPage, filterCategory, mobileMenuOpen, navigateTo, searchOpen]);

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

  const ShopPage = useCallback(() => (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Shop {filterCategory !== "all" ? `- ${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}` : ""}
      </h2>
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-4">
        <FilterButton active={filterCategory === "all"} onClick={() => setFilterCategory("all")}>All</FilterButton>
        <FilterButton active={filterCategory === "straight"} onClick={() => setFilterCategory("straight")}>Straight</FilterButton>
        <FilterButton active={filterCategory === "wavy"} onClick={() => setFilterCategory("wavy")}>Wavy</FilterButton>
        <FilterButton active={filterCategory === "curly"} onClick={() => setFilterCategory("curly")}>Curly</FilterButton>
        <FilterButton active={filterCategory === "mans"} onClick={() => setFilterCategory("mans")}>Mans</FilterButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => { setSelectedProduct(product); setSelectedColor(""); setSelectedSize(""); setCurrentPage("product"); }} />
        ))}
      </div>
    </div>
  ), [filterCategory, filteredProducts]);

  const ProductPage = useCallback(() => {
    if (!selectedProduct) return null;

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <button onClick={() => setCurrentPage("shop")} className="mb-6 text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
          ← Back to Shop
        </button>
        <div className="flex flex-col md:flex-row gap-8 sm:gap-10">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full md:w-1/2 rounded-2xl object-cover h-64 sm:h-auto shadow-md" />
          <div className="flex flex-col flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 truncate">{selectedProduct.name}</h1>
            <p className="text-rose-600 text-2xl font-extrabold mb-8">₹{selectedProduct.price.toLocaleString()}</p>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.colors.map((color) => (
                  <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all duration-300 ${selectedColor === color ? "bg-rose-600 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-100"}`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all duration-300 ${selectedSize === size ? "bg-rose-600 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-100"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={addToCart} className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg w-full md:w-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }, [selectedProduct, selectedColor, selectedSize, addToCart]);

  const ContactPage = useCallback(() => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [topic, setTopic] = useState("General Inquiry");
    const [message, setMessage] = useState("");
    const [consent, setConsent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(() => {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = "Please enter your name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
      if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit phone number";
      if (message.trim().length < 10) e.message = "Message should be at least 10 characters";
      if (!consent) e.consent = "Please accept to be contacted";
      return e;
    }, [name, email, phone, message, consent]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
        setSubmitted(true);
        setTimeout(() => {
          setName("");
          setEmail("");
          setPhone("");
          setTopic("General Inquiry");
          setMessage("");
          setConsent(false);
        }, 0);
      }
    }, [errors]);

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
        <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base">We'd love to hear from you! Fill out the form and our team will get in touch within 24 hours.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Get in touch</h3>
            <div className="space-y-6 text-sm">
              <a href="tel:+916376482804" className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition">
                <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Phone className="w-5 h-5 text-rose-600" /></span>
                <span className="break-all">+91 63764 82804</span>
              </a>
              <a href="mailto:support@deeceehair.com" className="flex items-center gap-4 text-gray-700 hover:text-rose-600 transition">
                <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Mail className="w-5 h-5 text-rose-600" /></span>
                <span className="break-all">sumiteximjjn@gmail.com</span>
              </a>
              <div className="flex items-start gap-4 text-gray-700">
                <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><MapPin className="w-5 h-5 text-rose-600" /></span>
                <div>Swastik Tower, Joshiyo Ka Gatta.<div className="text-gray-500">Jhunjhunu, Rajasthan</div></div>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <span className="p-3 rounded-full bg-rose-50 flex-shrink-0"><Clock className="w-5 h-5 text-rose-600" /></span>
                <span>Mon-Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="bg-gray-100 rounded-2xl p-6 text-sm text-gray-700">
                <p className="font-semibold mb-2">Response time</p>
                <p>We usually reply within a few hours on business days.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            {submitted && (
              <div className="mb-6 flex items-center gap-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <span className="text-sm sm:text-base">Thanks! Your message has been sent. We'll get back to you soon.</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
                <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" error={errors.phone} />
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                  <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Returns & Refunds</option>
                    <option>Product Advice</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
                {errors.message && <p className="text-red-600 text-xs mt-2 flex items-center gap-1"><X className="w-3 h-3" />{errors.message}</p>}
              </div>
              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                <span>I agree to be contacted by DEECEE HAIR regarding my inquiry.</span>
              </label>
              {errors.consent && <p className="text-red-600 text-xs">{errors.consent}</p>}
              <button type="submit" className="w-full bg-rose-600 text-white py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg" disabled={Object.keys(errors).length > 0 && !submitted}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }, []);

  const AppointmentPage = useCallback(() => {
    const [service, setService] = useState("Consultation");
    const [location, setLocation] = useState("Mumbai");
    const [date, setDate] = useState<string>(() => new Date().toISOString().split("T")[0]);
    const [selectedTime, setSelectedTime] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [confirmed, setConfirmed] = useState<Appointment | null>(null);

    const baseSlots = useMemo(() => ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"], []);

    const systemBlocked = useMemo(() => {
      const s = `${date}-${location}`;
      let hash = 0;
      for (let i = 0; i < s.length; i++) hash = (hash + s.charCodeAt(i) * 17) % 97;
      const idx1 = hash % baseSlots.length;
      const idx2 = (hash + 3) % baseSlots.length;
      return new Set([idx1, idx2]);
    }, [date, location, baseSlots]);

    const bookedSlots = useMemo(() => {
      const set = new Set<string>();
      appointments.filter((a) => a.date === date && a.location === location).forEach((a) => set.add(a.time));
      return set;
    }, [appointments, date, location]);

    const available = useMemo(() => baseSlots.map((t, i) => ({ time: t, disabled: systemBlocked.has(i) || bookedSlots.has(t) })), [baseSlots, systemBlocked, bookedSlots]);

    const formErrors = useMemo(() => {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = "Please enter your name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
      if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) e.phone = "Enter a 10-digit phone number";
      if (!date) e.date = "Select a date";
      if (!selectedTime) e.time = "Select a time slot";
      return e;
    }, [name, email, phone, date, selectedTime]);

    const handleConfirm = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (Object.keys(formErrors).length > 0) return;
      const appt: Appointment = { id: `${Date.now()}`, service, location, date, time: selectedTime, name, email, phone, notes: notes.trim() || undefined };
      setAppointments((prev) => [...prev, appt]);
      setConfirmed(appt);
    }, [formErrors, service, location, date, selectedTime, name, email, phone, notes]);

    const resetForm = useCallback(() => {
      setService("Consultation");
      setLocation("Mumbai");
      setDate(new Date().toISOString().split("T")[0]);
      setSelectedTime("");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setConfirmed(null);
    }, []);

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Book an Appointment</h2>
        <p className="text-gray-700 mb-10 text-center max-w-2xl mx-auto text-sm sm:text-base px-4">Select your service, preferred boutique, and a convenient time. We'll send a confirmation to your email.</p>
        {confirmed ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 text-green-700 bg-green-50 border border-green-200 p-4 rounded-2xl mb-6">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span className="text-sm sm:text-base">Appointment confirmed! A confirmation has been sent to {confirmed.email}.</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-sm text-gray-800">
              <div><p className="font-semibold">Service</p><p className="text-gray-600 truncate">{confirmed.service}</p></div>
              <div><p className="font-semibold">Location</p><p className="text-gray-600 truncate">{confirmed.location}</p></div>
              <div><p className="font-semibold">Date</p><p className="text-gray-600 truncate">{confirmed.date}</p></div>
              <div><p className="font-semibold">Time</p><p className="text-gray-600 truncate">{confirmed.time}</p></div>
              <div><p className="font-semibold">Name</p><p className="text-gray-600 truncate">{confirmed.name}</p></div>
              <div><p className="font-semibold">Phone</p><p className="text-gray-600 truncate">{confirmed.phone}</p></div>
              {confirmed.notes && <div className="md:col-span-2"><p className="font-semibold">Notes</p><p className="text-gray-600 truncate">{confirmed.notes}</p></div>}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={resetForm} className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
                Book Another Appointment
              </button>
              <button onClick={() => setCurrentPage("home")} className="px-6 py-3 rounded-2xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Your Preferences</h3>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                <select value={service} onChange={(e) => setService(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                  <option>Consultation</option>
                  <option>Installation</option>
                  <option>Color Match</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all">
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input type="date" min={new Date().toISOString().split("T")[0]} value={date} onChange={(e) => { setDate(e.target.value); setSelectedTime(""); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
                {formErrors.date && <p className="text-red-600 text-xs mt-2">{formErrors.date}</p>}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Available Time</h3>
              <div className="grid grid-cols-2 gap-3">
                {available.map((slot) => (
                  <button type="button" key={slot.time} disabled={slot.disabled} onClick={() => setSelectedTime(slot.time)} className={`px-4 py-2 rounded-2xl border text-sm font-semibold transition-all duration-300 ${slot.disabled ? "border-gray-200 text-gray-400 cursor-not-allowed" : selectedTime === slot.time ? "border-rose-600 bg-rose-50 text-rose-700 shadow" : "border-gray-300 text-gray-700 hover:bg-rose-50"}`}>
                    {slot.time}
                  </button>
                ))}
              </div>
              {formErrors.time && <p className="text-red-600 text-xs mt-3">{formErrors.time}</p>}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Your Details</h3>
              <div className="space-y-6">
                <FormInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={formErrors.name} />
                <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
                <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" error={formErrors.phone} />
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (optional)</label>
                  <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all" />
                </div>
              </div>
              <button type="submit" className="mt-6 w-full bg-rose-600 text-white py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg" disabled={Object.keys(formErrors).length > 0}>
                Confirm Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }, [appointments]);

  const CartPage = useCallback(() => (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-700 mb-6">Your cart is empty.</p>
          <button onClick={() => navigateTo("shop")} className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {cart.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 rounded-2xl p-6 shadow-sm">
              <img src={item.product.image} alt={item.product.name} className="w-full sm:w-28 h-36 sm:h-28 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6 shadow-md" />
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product.name}</h3>
                <p className="text-gray-700 text-sm">Color: {item.color}</p>
                <p className="text-gray-700 text-sm">Size: {item.size}</p>
                <p className="text-rose-600 font-semibold text-lg">₹{item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto mt-6 sm:mt-0">
                <div className="flex items-center space-x-3">
                  <button onClick={() => updateQuantity(index, -1)} className="px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                    -
                  </button>
                  <span className="px-4 font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)} className="px-3 py-1 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(index)} className="ml-6 text-red-600 hover:underline text-sm font-semibold">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-semibold text-gray-900">Total: ₹{getTotalPrice().toLocaleString()}</div>
          <button onClick={() => alert("Checkout functionality not implemented.")} className="w-full sm:w-auto bg-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  ), [cart, getTotalPrice, navigateTo, removeFromCart, updateQuantity]);

  const TermsPage = useCallback(() => (
  <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-rose-600" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms & Conditions</h1>
      </div>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="space-y-10">
        {/* Shipping Policy */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="w-6 h-6 text-rose-600" />
            SHIPPING POLICY
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped and delivered within 5 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
          </p>
        </section>

        {/* Return and Refund Policy */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-rose-600" />
            RETURN AND REFUND POLICY
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">RETURN POLICY</h3>
              <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <p>
                  We offer return / exchange within the first 7 days from the date of your purchase. If 7 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The purchased item should be unused and in the same condition as you received it</li>
                  <li>The item must have original packaging</li>
                  <li>If the item that you purchased on a sale, then the item may not be eligible for a return / exchange</li>
                </ul>
                <p>
                  Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
                </p>
                <p className="font-medium">
                  All the exchanged/replaced/damaged product will be delivered within 5-7 business days.
                </p>
                <p>
                  You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further, if the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">REFUND POLICY</h3>
              <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <p>
                  This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Cancellations will only be considered if the request is made 7 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.</li>
                  <li>In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 7 days of receipt of products.</li>
                  <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.</li>
                  <li>In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.</li>
                  <li className="font-medium">In case of any refunds approved by SUMIT EXIM, it will take 15 days for the refund to be credited to the original payment mode.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="border-b border-gray-200 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-rose-600" />
            TERMS AND CONDITIONS
          </h2>

          <div className="space-y-4 text-gray-700 text-sm sm:text-base">
            <p>
              This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
            </p>
            <p>
              This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name https://www.deeceehairs.com/ ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
            </p>
            <p>
              Your use of the Platform and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
            </p>
            <p>
              For the purpose of these Terms of Use, wherever the context so requires 'you', 'your' or 'user' shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
            </p>
            <p className="font-semibold uppercase">
              ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
            </p>
            <p>
              The use of Platform and/or availing of our Services is subject to the following Terms of Use:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.</li>
              <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
              <li>Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.</li>
              <li>The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.</li>
              <li>You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.</li>
              <li>You agree to pay us the charges associated with availing the Services.</li>
              <li>You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</li>
              <li>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.</li>
              <li>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.</li>
              <li>You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.</li>
              <li>Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.</li>
              <li>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</li>
              <li>All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.</li>
            </ol>
          </div>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-rose-600" />
            PRIVACY POLICY
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Introduction</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                This Privacy Policy describes how SUMIT EXIM and its affiliates (collectively "SUMIT EXIM, we, our, us") collect, use, share, protect or otherwise process your information/ personal data through our website https://www.deeceehairs.com/ (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Collection</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship and related information provided from time to time. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address. Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s). You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform. We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis. We will also collect your information related to your transactions on Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner's privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information. If you receive an email, a call from a person/association claiming to be SUMIT EXIM seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information. You understand that your access to these products/services may be affected in the event permission is not provided to us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sharing</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment opted by you. These disclosure may be required for us to provide you access to our services and products offered to you, to comply with our legal obligations, to enforce our user agreement, to facilitate our marketing and advertising activities, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal data to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Precautions</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession or whenever you access your account information, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server. However, the transmission of information is not completely secure for reasons beyond our control. By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Deletion and Retention</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                You have an option to delete your account by visiting your profile and settings on our Platform, this action would result in you losing all information related to your account. You may also write to us at the contact information provided below to assist you with these requests. We may in event of any pending grievance, claims, pending shipments or any other services we may refuse or delay deletion of the account. Once the account is deleted, you will lose access to the account. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                You may access, rectify, and update your personal data directly through the functionalities provided on the Platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Consent</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy. You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent that you have already provided by writing to the Grievance Officer at the contact information provided below. Please mention "Withdrawal of consent for processing personal data" in your subject line of your communication. We may verify such requests before acting on our request. However, please note that your withdrawal of consent will not be retrospective and will be in accordance with the Terms of Use, this Privacy Policy, and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, we reserve the right to restrict or deny the provision of our services for which we consider such information to be necessary.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Changes to this Privacy Policy</h3>
              <p className="text-gray-700 text-sm sm:text-base">
                Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert / notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3">
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="text-gray-700"><span className="font-semibold">Email:</span> sumiteximjjn@gmail.com</p>
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> +91 63764 82804</p>
              <p className="text-gray-700"><span className="font-semibold">Address:</span> Swastik Tower, Joshiyo Ka Gatta, Jhunjhunu, Rajasthan</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm sm:text-base italic mt-6">
            By using the DEECEE HAIR website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
), []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <PromoSlider />
      <Header />
      <main className="w-full overflow-x-hidden">
        {currentPage === "home" && <HomePage />}
        {currentPage === "shop" && <ShopPage />}
        {currentPage === "product" && <ProductPage />}
        {currentPage === "cart" && <CartPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "appointment" && <AppointmentPage />}
        {currentPage === "terms" && <TermsPage />}
      </main>
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
