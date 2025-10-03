import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, CreditCard, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, Play, Pause, Volume2, VolumeX, Scissors, Award } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: string;
  gender: 'women' | 'men';
  rating: number;
  reviews: number;
  isBestseller?: boolean;
  isNew?: boolean;
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

type Page = 'home' | 'shop' | 'product' | 'cart' | 'contact' | 'appointment' | 'mens';

type ReelVideo = {
  id: number;
  src: string;
  thumbnail: string;
  description: string;
  gender: 'women' | 'men';
};

const products: Product[] = [
  { id: 1, name: 'Silky Straight Extensions', price: 2999, originalPrice: 3499, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80', colors: ['Jet Black', 'Dark Brown', 'Honey Blonde', 'Auburn'], sizes: ['14"', '18"', '22"', '26"'], category: 'straight', gender: 'women', rating: 4.8, reviews: 124, isBestseller: true },
  { id: 2, name: 'Wavy Luxe Hair', price: 3499, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Chocolate Brown', 'Caramel'], sizes: ['16"', '20"', '24"'], category: 'wavy', gender: 'women', rating: 4.9, reviews: 98, isNew: true },
  { id: 3, name: 'Curly Dream Extensions', price: 3999, originalPrice: 4499, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Dark Brown', 'Chestnut'], sizes: ['14"', '18"', '22"'], category: 'curly', gender: 'women', rating: 4.7, reviews: 156, isBestseller: true },
  { id: 4, name: 'Body Wave Premium', price: 3299, image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown', 'Blonde', 'Red'], sizes: ['18"', '22"', '26"'], category: 'wavy', gender: 'women', rating: 4.6, reviews: 87, isNew: true },
  { id: 5, name: 'Deep Wave Collection', price: 3799, image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown', 'Ombre'], sizes: ['16"', '20"', '24"'], category: 'wavy', gender: 'women', rating: 4.8, reviews: 112 },
  { id: 6, name: 'Kinky Straight Wings', price: 3599, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Dark Brown'], sizes: ['14"', '18"', '22"'], category: 'straight', gender: 'women', rating: 4.5, reviews: 76 },
  { id: 7, name: 'Natural Toupee System', price: 4999, originalPrice: 5999, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Dark Brown', 'Grey', 'Salt & Pepper'], sizes: ['Small', 'Medium', 'Large'], category: 'toupee', gender: 'men', rating: 4.9, reviews: 143, isBestseller: true },
  { id: 8, name: 'Short Hair System Pro', price: 3999, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown', 'Grey'], sizes: ['6"', '8"', '10"'], category: 'short', gender: 'men', rating: 4.7, reviews: 89, isNew: true },
  { id: 9, name: 'Medium Length Wig', price: 4499, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown', 'Blonde'], sizes: ['10"', '12"', '14"'], category: 'medium', gender: 'men', rating: 4.6, reviews: 67 },
  { id: 10, name: 'Premium Beard Kit', price: 1999, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown', 'Auburn', 'Grey'], sizes: ['Full Beard', 'Goatee', 'Mustache'], category: 'beard', gender: 'men', rating: 4.8, reviews: 201, isNew: true },
  { id: 11, name: 'Executive Hair Piece', price: 5499, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Dark Brown', 'Light Brown'], sizes: ['Small', 'Medium', 'Large'], category: 'toupee', gender: 'men', rating: 4.9, reviews: 178, isBestseller: true },
  { id: 12, name: 'Textured Top System', price: 3799, image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80', colors: ['Black', 'Brown'], sizes: ['8"', '10"', '12"'], category: 'short', gender: 'men', rating: 4.5, reviews: 92 },
];

const promoMessages = [
  '🎉 Sign up and Get 5% OFF on your 1st order',
  '💳 COD AVAILABLE',
  '🚚 Free Shipping on Orders Above ₹5000',
  '⭐ Premium Quality Hair Extensions',
  '👨 Men\'s Collection Now Available',
];

const reelsVideos: ReelVideo[] = [
  { id: 1, src: '/videos/reel1.mp4', thumbnail: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', description: 'Silky Straight Transformation', gender: 'women' },
  { id: 2, src: '/videos/reel2.mp4', thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80', description: 'Wavy Hair Styling Tips', gender: 'women' },
  { id: 3, src: '/videos/reel3.mp4', thumbnail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80', description: 'Curly Hair Care Routine', gender: 'women' },
  { id: 4, src: '/videos/reel4.mp4', thumbnail: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=400&q=80', description: 'Deep Wave Extensions Look', gender: 'women' },
  { id: 5, src: '/videos/mens1.mp4', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', description: 'Toupee Application Guide', gender: 'men' },
  { id: 6, src: '/videos/mens2.mp4', thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', description: 'Natural Hair System Tips', gender: 'men' },
  { id: 7, src: '/videos/mens3.mp4', thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80', description: 'Beard Extension Tutorial', gender: 'men' },
  { id: 8, src: '/videos/mens4.mp4', thumbnail: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80', description: 'Professional Grooming', gender: 'men' },
];

const PromoSlider = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev <= -600 ? 0 : prev - 1));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap" style={{ transform: `translateX(${offset}px)`, willChange: 'transform' }}>
        {[...promoMessages, ...promoMessages, ...promoMessages].map((msg, idx) => (
          <span key={idx} className="text-sm font-semibold text-white mx-8 select-none">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};

const IconButton = ({ icon: Icon, onClick, badge, label }: { icon: any; onClick?: () => void; badge?: number; label?: string }) => (
  <button
    onClick={onClick}
    className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors duration-200 group"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
        {badge}
      </span>
    )}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="bg-gradient-to-br from-rose-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-rose-600" />
    </div>
    <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="relative overflow-hidden aspect-square">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {product.isBestseller && (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-500 text-white rounded-full shadow-lg">
            <Award className="w-3 h-3" /> Bestseller
          </span>
        )}
        {product.isNew && (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-green-500 text-white rounded-full shadow-lg">
            New
          </span>
        )}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 text-lg truncate" title={product.name}>
        {product.name}
      </h3>
      <div className="flex items-center mt-1">
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={i < Math.round(product.rating) ? 'fill-current' : 'text-yellow-400'} />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
        )}
        <span className="text-rose-600 font-bold text-xl">₹{product.price}</span>
      </div>
    </div>
  </div>
);

const FilterButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-1 ${
      active ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'
    }`}
  >
    {children}
  </button>
);

const FormInput = ({ label, type = 'text', value, onChange, error, placeholder }: { label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder?: string }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-200 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
  </div>
);

const VideoReelCard = ({ video }: { video: ReelVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
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
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg bg-gray-100 group">
      <video
        ref={videoRef}
        src={video.src}
        poster={video.thumbnail}
        loop
        muted={isMuted}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />
      <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="p-3 rounded-full bg-white/40 backdrop-blur-sm text-white hover:bg-white/60 transition mr-2"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black" />}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="p-3 rounded-full bg-white/40 backdrop-blur-sm text-white hover:bg-white/60 transition"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-6 h-6 text-black" /> : <Volume2 className="w-6 h-6 text-black" />}
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium">
        {video.description}
      </div>
    </div>
  );
};

export default function DeeceeHair(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % 5), 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (page: Page, category = 'all') => {
    setCurrentPage(page);
    setFilterCategory(category);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setSelectedProduct(null);
    setSelectedColor('');
    setSelectedSize('');
  };

  const addToCart = () => {
    if (!selectedProduct || !selectedColor || !selectedSize) {
      alert('Please select color and size');
      return;
    }

    const existingItem = cart.find(
      (item) => item.product.id === selectedProduct.id && item.color === selectedColor && item.size === selectedSize
    );

    if (existingItem) {
      setCart(
        cart.map((item) => (item === existingItem ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      setCart([...cart, { product: selectedProduct, color: selectedColor, size: selectedSize, quantity: 1 }]);
    }
    alert('Added to cart!');
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(
      cart.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  };

  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.gender === 'women');
    if (currentPage === 'shop') {
      filtered =
        filterCategory === 'all'
          ? products.filter((p) => p.gender === 'women')
          : products.filter((p) => p.gender === 'women' && p.category === filterCategory);
    } else if (currentPage === 'mens') {
      filtered =
        filterCategory === 'all'
          ? products.filter((p) => p.gender === 'men')
          : products.filter((p) => p.gender === 'men' && p.category === filterCategory);
    }
    return filtered;
  }, [filterCategory, currentPage]);

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigateTo('home')} className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-rose-600">DEECEE</span>
              <span className="text-2xl font-light text-gray-800">HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-8 ml-10 font-semibold text-gray-700">
              {currentPage !== 'mens' && (
                <>
                  <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition">
                    Shop
                  </button>
                  <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition">
                    Bestsellers
                  </button>
                  <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition">
                    New Arrivals
                  </button>
                  <button className="hover:text-rose-600 transition">Our Boutiques</button>
                  <button onClick={() => navigateTo('appointment')} className="hover:text-rose-600 transition">
                    Book Appointment
                  </button>
                  <button onClick={() => navigateTo('contact')} className="hover:text-rose-600 transition">
                    Contact Us
                  </button>
                  <button onClick={() => navigateTo('mens')} className="hover:text-rose-600 transition">
                    Men's
                  </button>
                </>
              )}
              {currentPage === 'mens' && (
                <>
                  <button onClick={() => navigateTo('mens')} className="hover:text-rose-600 transition">
                    Men's
                  </button>
                  <button onClick={() => navigateTo('home')} className="hover:text-rose-600 transition">
                    Women's
                  </button>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden sm:flex items-center space-x-3">
              <IconButton icon={Heart} label="Wishlist" />
              <IconButton icon={User} label="User Account" />
            </div>
            <IconButton icon={Search} onClick={() => setSearchOpen((v) => !v)} label="Search" />
            <IconButton icon={ShoppingCart} onClick={() => navigateTo('cart')} badge={cart.length} label="Cart" />
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-700 hover:text-rose-600 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="py-3">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              aria-label="Search products"
            />
          </div>
        )}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-3 font-semibold text-gray-700">
            {currentPage !== 'mens' && (
              <>
                <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition text-left">
                  Shop
                </button>
                <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition text-left">
                  Bestsellers
                </button>
                <button onClick={() => navigateTo('shop')} className="hover:text-rose-600 transition text-left">
                  New Arrivals
                </button>
                <button className="hover:text-rose-600 transition text-left">Our Boutiques</button>
                <button onClick={() => navigateTo('appointment')} className="hover:text-rose-600 transition text-left">
                  Book Appointment
                </button>
                <button onClick={() => navigateTo('contact')} className="hover:text-rose-600 transition text-left">
                  Contact Us
                </button>
                <button onClick={() => navigateTo('mens')} className="hover:text-rose-600 transition text-left">
                  Men's
                </button>
              </>
            )}
            {currentPage === 'mens' && (
              <>
                <button onClick={() => navigateTo('mens')} className="hover:text-rose-600 transition text-left">
                  Men's
                </button>
                <button onClick={() => navigateTo('home')} className="hover:text-rose-600 transition text-left">
                  Women's
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );

  const HomePage = () => {
    const heroSlides = [
      { image: '/hero1.jpg', title: 'Luxurious Hair', subtitle: 'Extensions', description: 'Transform your look with our premium collection' },
      { image: '/hero2.jpg', title: 'Natural Beauty', subtitle: 'Redefined', description: '100% human hair for the perfect blend' },
      { image: '/hero3.jpg', title: 'Premium Quality', subtitle: 'Guaranteed', description: 'Silky smooth textures that last' },
      { image: '/hero4.jpg', title: 'Your Style', subtitle: 'Elevated', description: 'From straight to curly, we have it all' },
      { image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1920&q=80', title: 'Confidence', subtitle: 'Unleashed', description: 'Feel beautiful every single day' },
    ];

    return (
      <div className="w-full overflow-x-hidden">
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-lg">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              aria-hidden={index !== currentSlide}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-700/60 via-transparent to-rose-700/60 rounded-b-3xl"></div>
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white drop-shadow-lg">
              {heroSlides[currentSlide].title}
              <span className="block text-3xl sm:text-4xl font-light mt-2">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 drop-shadow-md">
              {heroSlides[currentSlide].description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-white text-rose-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transition"
              >
                Shop Collection
              </button>
              <button
                onClick={() => navigateTo('appointment')}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition flex items-center justify-center gap-3"
              >
                <Calendar className="w-6 h-6" /> Book Consultation
              </button>
            </div>
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-rose-600" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-rose-600" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === currentSlide ? 'bg-white w-6 h-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard icon={Truck} title="Free Shipping" description="On orders above ₹5000" />
            <FeatureCard icon={Shield} title="100% Authentic" description="Premium quality guaranteed" />
            <FeatureCard icon={CreditCard} title="COD Available" description="Cash on delivery option" />
            <FeatureCard icon={Award} title="5% Off" description="On your first order" />
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Featured Collections
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Discover our premium hair extensions in various textures to match your style
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { type: 'Straight', image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=600&q=80' },
                { type: 'Wavy', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80' },
                { type: 'Curly', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80' },
              ].map((item) => (
                <div
                  key={item.type}
                  className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg relative"
                  onClick={() => {
                    setFilterCategory(item.type.toLowerCase());
                    setCurrentPage('shop');
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setFilterCategory(item.type.toLowerCase());
                      setCurrentPage('shop');
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={`${item.type} Extensions`}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-extrabold mb-2">{item.type} Extensions</h3>
                    <button className="underline text-lg font-semibold hover:text-rose-400">
                      Shop Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
              Style Inspiration & Reels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {reelsVideos.filter((v) => v.gender === 'women').map((video) => (
                <VideoReelCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-rose-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Priya S.', review: 'Amazing quality! The hair extensions blend perfectly with my natural hair.' },
                { name: 'Anjali M.', review: 'Best purchase ever! The texture is so soft and natural looking.' },
                { name: 'Neha K.', review: 'Excellent service and the hair quality is outstanding. Highly recommend!' },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex mb-4 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
                  <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const ShopPage = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Shop {filterCategory !== 'all' ? `- ${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}` : ''}
      </h2>
      <div className="mb-8 flex flex-wrap gap-4">
        <FilterButton active={filterCategory === 'all'} onClick={() => setFilterCategory('all')}>
          All
        </FilterButton>
        <FilterButton active={filterCategory === 'straight'} onClick={() => setFilterCategory('straight')}>
          Straight
        </FilterButton>
        <FilterButton active={filterCategory === 'wavy'} onClick={() => setFilterCategory('wavy')}>
          Wavy
        </FilterButton>
        <FilterButton active={filterCategory === 'curly'} onClick={() => setFilterCategory('curly')}>
          Curly
        </FilterButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedColor('');
              setSelectedSize('');
              setCurrentPage('product');
            }}
          />
        ))}
      </div>
    </div>
  );

  const MensPage = () => {
    const menHeroSlides = [
      { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80', title: "Men's Collection", subtitle: 'Redefine Yourself', description: 'Premium hair systems designed for modern men' },
      { image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1920&q=80', title: 'Natural Look', subtitle: 'Guaranteed', description: 'Undetectable hair solutions for men' },
      { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1920&q=80', title: 'Professional', subtitle: 'Confidence', description: 'Look your best in every situation' },
    ];

    const [mensSlide, setMensSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => setMensSlide((prev) => (prev + 1) % menHeroSlides.length), 6000);
      return () => clearInterval(interval);
    }, [menHeroSlides.length]);

    const mensFilteredProducts = filterCategory === 'all' ? products.filter((p) => p.gender === 'men') : products.filter((p) => p.gender === 'men' && p.category === filterCategory);
    const mensReels = reelsVideos.filter((r) => r.gender === 'men');

    const mensTestimonials = [
      { name: 'Raj P.', review: 'Excellent quality and natural look. Highly recommend for men!' },
      { name: 'Amit S.', review: 'The beard extension kit changed my grooming game. Great product!' },
      { name: 'Vikram K.', review: 'Professional service and top-notch hair systems.' },
    ];

    return (
      <div className="w-full overflow-x-hidden">
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-lg bg-gray-900 text-white">
          {menHeroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === mensSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url('${slide.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              aria-hidden={index !== mensSlide}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70 rounded-b-3xl"></div>
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 text-center max-w-4xl">
            <h1 className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg">
              {menHeroSlides[mensSlide].title}
              <span className="block text-3xl sm:text-4xl font-light mt-2">
                {menHeroSlides[mensSlide].subtitle}
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl drop-shadow-md">
              {menHeroSlides[mensSlide].description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() => navigateTo('mens')}
                className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transition"
              >
                Shop Men's Collection
              </button>
              <button
                onClick={() => navigateTo('appointment')}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition flex items-center justify-center gap-3"
              >
                <Scissors className="w-6 h-6" /> Book Grooming
              </button>
            </div>
          </div>
          <button
            onClick={() => setMensSlide((prev) => (prev - 1 + menHeroSlides.length) % menHeroSlides.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-rose-600" />
          </button>
          <button
            onClick={() => setMensSlide((prev) => (prev + 1) % menHeroSlides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-rose-600" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
            {menHeroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMensSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  idx === mensSlide ? 'bg-white w-6 h-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-6 text-center">
              Men's Featured Collections
            </h2>
            <p className="text-center text-gray-300 max-w-3xl mx-auto mb-12">
              Explore our premium men's hair systems and grooming products
            </p>
            <div className="mb-8 flex flex-wrap gap-4 justify-center">
              <FilterButton active={filterCategory === 'all'} onClick={() => setFilterCategory('all')}>
                All
              </FilterButton>
              <FilterButton active={filterCategory === 'short'} onClick={() => setFilterCategory('short')}>
                Short Hair
              </FilterButton>
              <FilterButton active={filterCategory === 'medium'} onClick={() => setFilterCategory('medium')}>
                Medium Length
              </FilterButton>
              <FilterButton active={filterCategory === 'toupee'} onClick={() => setFilterCategory('toupee')}>
                Toupees
              </FilterButton>
              <FilterButton active={filterCategory === 'beard'} onClick={() => setFilterCategory('beard')}>
                Beard Extensions
              </FilterButton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mensFilteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedColor('');
                    setSelectedSize('');
                    setCurrentPage('product');
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-10 text-center text-white">
              Men's Style Inspiration & Reels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mensReels.map((video) => (
                <VideoReelCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-10 text-center text-white">
              What Our Male Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Raj P.', review: 'Excellent quality and natural look. Highly recommend for men!' },
                { name: 'Amit S.', review: 'The beard extension kit changed my grooming game. Great product!' },
                { name: 'Vikram K.', review: 'Professional service and top-notch hair systems.' },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex mb-4 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.review}"</p>
                  <p className="font-semibold text-white">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const ProductPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <button
          onClick={() => setCurrentPage(currentPage === 'mens' ? 'mens' : 'shop')}
          className="mb-6 text-rose-600 font-semibold hover:underline"
        >
          ← Back to {currentPage === 'mens' ? "Men's" : 'Shop'}
        </button>
        <div className="flex flex-col md:flex-row gap-12">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full md:w-1/2 rounded-3xl object-cover max-h-[500px]"
          />
          <div className="flex flex-col flex-1">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              {selectedProduct.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(selectedProduct.rating) ? 'fill-current' : 'text-yellow-400'
                    }
                  />
                ))}
              </div>
              <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
            </div>
            <div className="mt-6 flex items-center gap-4">
              {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{selectedProduct.originalPrice}
                </span>
              )}
              <span className="text-rose-600 font-extrabold text-3xl">
                ₹{selectedProduct.price}
              </span>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-gray-700 mb-2">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-1 ${
                      selectedColor === color
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'border-gray-300 text-gray-700 hover:bg-rose-100'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-gray-700 mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-1 ${
                      selectedSize === size
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'border-gray-300 text-gray-700 hover:bg-rose-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="mt-12 bg-rose-600 text-white py-4 rounded-3xl font-semibold text-lg hover:bg-rose-700 transition-shadow shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CartPage = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-700 mb-6">Your cart is empty.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full sm:w-32 h-32 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.product.name}
                </h3>
                <p className="text-gray-600">Color: {item.color}</p>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-rose-600 font-bold text-lg mt-2">
                  ₹{item.product.price} x {item.quantity} = ₹{item.product.price * item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(index)}
                  className="ml-6 text-red-600 hover:underline font-semibold"
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right text-2xl font-extrabold text-gray-900">
            Total: ₹{getTotalPrice()}
          </div>
          <button
            onClick={() => alert('Checkout functionality not implemented.')}
            className="bg-rose-600 text-white px-8 py-4 rounded-3xl font-semibold hover:bg-rose-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );

  // ContactPage and AppointmentPage can be implemented similarly with improved UI and validation

  const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [topic, setTopic] = useState('General Inquiry');
    const [message, setMessage] = useState('');
    const [consent, setConsent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(() => {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = 'Please enter your name';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
      if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) e.phone = 'Enter a 10-digit phone number';
      if (message.trim().length < 10) e.message = 'Message should be at least 10 characters';
      if (!consent) e.consent = 'Please accept to be contacted';
      return e;
    }, [name, email, phone, message, consent]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
        setSubmitted(true);
        setTimeout(() => {
          setName('');
          setEmail('');
          setPhone('');
          setTopic('General Inquiry');
          setMessage('');
          setConsent(false);
          setSubmitted(false);
        }, 3000);
      }
    };

    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Contact Us</h2>
        <p className="text-center text-gray-700 mb-12 max-w-xl mx-auto">
          We'd love to hear from you! Fill out the form and our team will get in touch within 24 hours.
        </p>
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
            Thanks! Your message has been sent. We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
            <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} placeholder="10-digit number" />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Returns & Refunds</option>
                <option>Product Advice</option>
                <option>Partnership</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-200 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message}</p>}
          </div>
          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
            />
            <span>I agree to be contacted by DEECEE HAIR regarding my inquiry.</span>
          </label>
          {errors.consent && <p className="text-red-600 text-xs">{errors.consent}</p>}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-3xl font-semibold hover:bg-rose-700 transition"
            disabled={Object.keys(errors).length > 0}
          >
            Send Message
          </button>
        </form>
      </div>
    );
  };

  const AppointmentPage = () => {
    const [service, setService] = useState('Consultation');
    const [location, setLocation] = useState('Mumbai');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [confirmed, setConfirmed] = useState<Appointment | null>(null);

    const baseSlots = useMemo(() => ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], []);

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

    const available = useMemo(
      () => baseSlots.map((t, i) => ({ time: t, disabled: systemBlocked.has(i) || bookedSlots.has(t) })),
      [baseSlots, systemBlocked, bookedSlots]
    );

    const formErrors = useMemo(() => {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = 'Please enter your name';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
      if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) e.phone = 'Enter a 10-digit phone number';
      if (!date) e.date = 'Select a date';
      if (!selectedTime) e.time = 'Select a time slot';
      return e;
    }, [name, email, phone, date, selectedTime]);

    const handleConfirm = (e: React.FormEvent) => {
      e.preventDefault();
      if (Object.keys(formErrors).length > 0) return;
      const appt: Appointment = { id: `${Date.now()}`, service, location, date, time: selectedTime, name, email, phone, notes: notes.trim() || undefined };
      setAppointments((prev) => [...prev, appt]);
      setConfirmed(appt);
    };

    const resetForm = () => {
      setService('Consultation');
      setLocation('Mumbai');
      setDate(new Date().toISOString().split('T')[0]);
      setSelectedTime('');
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setConfirmed(null);
    };

    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Book an Appointment</h2>
        <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
          Select your service, preferred boutique, and a convenient time. We'll send a confirmation to your email.
        </p>
        {confirmed ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-green-700 bg-green-100 border border-green-300 p-4 rounded-2xl mb-8">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <p className="font-semibold">
                Appointment confirmed! A confirmation has been sent to {confirmed.email}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="font-semibold">Service</p>
                <p>{confirmed.service}</p>
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <p>{confirmed.location}</p>
              </div>
              <div>
                <p className="font-semibold">Date</p>
                <p>{confirmed.date}</p>
              </div>
              <div>
                <p className="font-semibold">Time</p>
                <p>{confirmed.time}</p>
              </div>
              <div>
                <p className="font-semibold">Name</p>
                <p>{confirmed.name}</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>{confirmed.phone}</p>
              </div>
              {confirmed.notes && (
                <div className="md:col-span-2">
                  <p className="font-semibold">Notes</p>
                  <p>{confirmed.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={resetForm}
                className="bg-rose-600 text-white px-8 py-3 rounded-3xl font-semibold hover:bg-rose-700 transition"
              >
                Book Another Appointment
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="border border-gray-300 px-8 py-3 rounded-3xl font-semibold hover:bg-gray-100 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Your Preferences</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option>Consultation</option>
                  <option>Installation</option>
                  <option>Color Match</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSelectedTime('');
                  }}
                  className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-200 ${
                    formErrors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.date && <p className="text-red-600 text-xs mt-1">{formErrors.date}</p>}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Available Time</h3>
              <div className="grid grid-cols-2 gap-4">
                {available.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`px-4 py-2 rounded-2xl border font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-1 ${
                      slot.disabled
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'border-gray-300 text-gray-700 hover:bg-rose-100'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
              {formErrors.time && <p className="text-red-600 text-xs mt-3">{formErrors.time}</p>}
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Your Details</h3>
              <div className="space-y-6">
                <FormInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={formErrors.name} />
                <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={formErrors.email} />
                <FormInput label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" error={formErrors.phone} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-200"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full bg-rose-600 text-white py-3 rounded-3xl font-semibold hover:bg-rose-700 transition"
                disabled={Object.keys(formErrors).length > 0}
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <PromoSlider />
      <Header />
      <main className="w-full overflow-x-hidden">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'appointment' && <AppointmentPage />}
        {currentPage === 'mens' && <MensPage />}
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-rose-600 mb-2">DEECEE HAIR</h3>
            <p className="text-gray-400 max-w-xs">
              Premium quality hair extensions and hair systems for modern women and men.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mens')} className="hover:text-white transition">
                  Men's
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button className="hover:text-white transition">Shipping Info</button>
              </li>
              <li>
                <button className="hover:text-white transition">Returns</button>
              </li>
              <li>
                <button className="hover:text-white transition">FAQ</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button className="hover:text-white transition">Instagram</button>
              </li>
              <li>
                <button className="hover:text-white transition">Facebook</button>
              </li>
              <li>
                <button className="hover:text-white transition">YouTube</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
