"use client"

import React, { useState, useEffect } from 'react';
import { Heart, User, Search, ShoppingCart, Menu, X, Star, Truck, Shield, CreditCard, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Calendar, CheckCircle } from 'lucide-react';

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
};

type CartItem = {
  product: Product;
  color: string;
  size: string;
  quantity: number;
};

type AppointmentData = {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const products: Product[] = [
  { id: 1, name: 'Silky Straight Extensions', price: 2999, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Brown', 'Blonde', 'Auburn'], sizes: ['14"', '18"', '22"', '26"'], category: 'straight', isBestseller: true },
  { id: 2, name: 'Wavy Luxe Hair', price: 3499, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Brown', 'Honey Blonde'], sizes: ['16"', '20"', '24"'], category: 'wavy', isNew: true },
  { id: 3, name: 'Curly Dream Extensions', price: 3999, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Dark Brown', 'Chestnut'], sizes: ['14"', '18"', '22"'], category: 'curly', isBestseller: true },
  { id: 4, name: 'Body Wave Premium', price: 3299, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Brown', 'Blonde', 'Red'], sizes: ['18"', '22"', '26"'], category: 'wavy', isNew: true },
  { id: 5, name: 'Deep Wave Collection', price: 3799, image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Brown', 'Ombre'], sizes: ['16"', '20"', '24"'], category: 'wavy' },
  { id: 6, name: 'Kinky Straight Wings', price: 3599, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80', colors: ['Black', 'Dark Brown'], sizes: ['14"', '18"', '22"'], category: 'straight' },
];

const promoMessages = [
  'Sign up and Get 5% OFF on your 1st order',
  'COD AVAILABLE',
  'Free Shipping on Orders Above ₹5000',
  'Premium Quality Hair Extensions',
];

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1920&q=80',
    title: 'Luxurious Hair',
    subtitle: 'Extensions',
    description: 'Transform your look with our premium collection'
  },
  {
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=1920&q=80',
    title: 'Natural Beauty',
    subtitle: 'Redefined',
    description: '100% human hair for the perfect blend'
  },
  {
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80',
    title: 'Premium Quality',
    subtitle: 'Guaranteed',
    description: 'Silky smooth textures that last'
  },
  {
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=80',
    title: 'Your Style',
    subtitle: 'Elevated',
    description: 'From straight to curly, we have it all'
  },
  {
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1920&q=80',
    title: 'Confidence',
    subtitle: 'Unleashed',
    description: 'Feel beautiful every single day'
  }
];

const services = [
  { id: 'consultation', name: 'Hair Consultation', duration: '30 mins', price: 'Free' },
  { id: 'installation', name: 'Extension Installation', duration: '2 hours', price: '₹2000' },
  { id: 'maintenance', name: 'Extension Maintenance', duration: '1 hour', price: '₹1000' },
  { id: 'removal', name: 'Extension Removal', duration: '1 hour', price: '₹800' },
  { id: 'styling', name: 'Hair Styling Session', duration: '1.5 hours', price: '₹1500' },
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

export default function DeeceeHair() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product' | 'cart' | 'contact' | 'appointment'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [promoIndex, setPromoIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appointmentStep, setAppointmentStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const addToCart = () => {
    if (selectedProduct && selectedColor && selectedSize) {
      const existingItem = cart.find(
        (item) =>
          item.product.id === selectedProduct.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item === existingItem
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { product: selectedProduct, color: selectedColor, size: selectedSize, quantity: 1 }]);
      }
      alert('Added to cart!');
    } else {
      alert('Please select color and size');
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(
      cart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const filteredProducts = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);

  const PromoSlider = () => (
    <div className="bg-rose-600 py-2 overflow-hidden relative">
      <div className="animate-pulse text-center">
        <span className="text-sm font-medium text-white mx-8">
          {promoMessages[promoIndex]}
        </span>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={() => { setCurrentPage('home'); setFilterCategory('all'); }} className="flex items-center space-x-2" >
              <span className="text-2xl font-bold text-rose-600">DEECEE</span>
              <span className="text-2xl font-light text-gray-800">HAIR</span>
            </button>
            <nav className="hidden lg:flex space-x-6">
              <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                Shop
              </button>
              <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                Bestsellers
              </button>
              <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                New Arrivals
              </button>
              <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                Our Boutiques
              </button>
              <button onClick={() => { setCurrentPage('appointment'); setAppointmentStep(1); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                Book Appointment
              </button>
              <button onClick={() => { setCurrentPage('contact'); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
                Contact Us
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden lg:block p-2 text-gray-700 hover:text-rose-600 transition">
              <Heart className="w-5 h-5" />
            </button>
            <button className="hidden lg:block p-2 text-gray-700 hover:text-rose-600 transition">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => setSearchOpen(!searchOpen)} className="hidden lg:block p-2 text-gray-700 hover:text-rose-600 transition">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentPage('cart')} className="p-2 text-gray-700 hover:text-rose-600 transition relative">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 py-4 px-4">
          <nav className="flex flex-col space-y-3">
            <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Shop
            </button>
            <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Bestsellers
            </button>
            <button onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              New Arrivals
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Our Boutiques
            </button>
            <button onClick={() => { setCurrentPage('appointment'); setAppointmentStep(1); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Book Appointment
            </button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Rose Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-600/70 via-pink-600/70 to-rose-500/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="transform transition-all duration-700">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {heroSlides[currentSlide].title}
              <span className="block text-3xl lg:text-5xl mt-2 font-light">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); }}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
            >
              Shop Collection
            </button>
            <button
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-rose-600 transition transform hover:scale-105"
            >
              Book Consultation
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹5000</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Authentic</h3>
              <p className="text-sm text-gray-600">Premium quality guaranteed</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">COD Available</h3>
              <p className="text-sm text-gray-600">Cash on delivery option</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">5% Off</h3>
              <p className="text-sm text-gray-600">On your first order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Featured Collections</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Discover our premium hair extensions in various textures to match your style</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { type: 'Straight', image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=400&q=80' },
              { type: 'Wavy', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=400&q=80' },
              { type: 'Curly', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' }
            ].map((item) => (
              <div key={item.type} className="group cursor-pointer" onClick={() => { setFilterCategory(item.type.toLowerCase()); setCurrentPage('shop'); }}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img src={item.image} alt={item.type} className="w-full h-80 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.type} Extensions</h3>
                    <button className="text-white underline hover:no-underline">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Priya S.', review: 'Amazing quality! The hair extensions blend perfectly with my natural hair.' },
              { name: 'Anjali M.', review: 'Best purchase ever! The texture is so soft and natural looking.' },
              { name: 'Neha K.', review: 'Excellent service and the hair quality is outstanding. Highly recommend!' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">\"{testimonial.review}\"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ShopPage = () => {
    const filtered = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop {filterCategory !== 'all' ? `- ${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}` : ''}</h2>

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full border ${filterCategory === 'all' ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterCategory('straight')}
            className={`px-4 py-2 rounded-full border ${filterCategory === 'straight' ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
          >
            Straight
          </button>
          <button
            onClick={() => setFilterCategory('wavy')}
            className={`px-4 py-2 rounded-full border ${filterCategory === 'wavy' ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
          >
            Wavy
          </button>
          <button
            onClick={() => setFilterCategory('curly')}
            className={`px-4 py-2 rounded-full border ${filterCategory === 'curly' ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
          >
            Curly
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition" onClick={() => {
              setSelectedProduct(product);
              setSelectedColor('');
              setSelectedSize('');
              setCurrentPage('product');
            }}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-rose-600 font-bold">₹{product.price}</p>
              {product.isBestseller && <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full">Bestseller</span>}
              {product.isNew && <span className="inline-block mt-2 ml-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">New</span>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProductPage = () => {
    if (!selectedProduct) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setCurrentPage('shop')} className="mb-6 text-rose-600 hover:underline">← Back to Shop</button>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full md:w-1/2 rounded-lg object-cover" />
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
            <p className="text-rose-600 text-2xl font-semibold mb-6">₹{selectedProduct.price}</p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Select Color</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition ${selectedColor === color ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition ${selectedSize === size ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={addToCart}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="bg-rose-100 p-4 rounded-full">
              <Phone className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-rose-100 p-4 rounded-full">
              <Mail className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <p className="text-gray-700">support@deeceehair.com</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-rose-100 p-4 rounded-full">
              <MapPin className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Address</h3>
              <p className="text-gray-700">123 Rose Street, Mumbai, India</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-rose-100 p-4 rounded-full">
              <Clock className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
              <p className="text-gray-700">Mon - Sat: 10:00 AM - 7:00 PM</p>
              <p className="text-gray-700">Sun: Closed</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-rose-600 hover:text-rose-800 transition" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-rose-600 hover:text-rose-800 transition" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-rose-600 hover:text-rose-800 transition" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          {/* Placeholder for Map */}
          <iframe
            title="DEECEE HAIR Location"
            src="https://maps.google.com/maps?q=123%20Rose%20Street%2C%20Mumbai%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="min-h-[400px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );

  const AppointmentPage = () => {
    const handleNext = () => {
      if (appointmentStep === 1 && !appointmentData.service) {
        alert('Please select a service');
        return;
      }
      if (appointmentStep === 2 && (!appointmentData.date || !appointmentData.time)) {
        alert('Please select date and time');
        return;
      }
      if (appointmentStep === 3 && (!appointmentData.name || !appointmentData.email || !appointmentData.phone)) {
        alert('Please fill in all required personal information');
        return;
      }
      setAppointmentStep(appointmentStep + 1);
    };

    const handleBack = () => {
      setAppointmentStep(appointmentStep - 1);
    };

    const handleChange = (field: keyof AppointmentData, value: string) => {
      setAppointmentData({ ...appointmentData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Appointment booked successfully!\n\nDetails:\nService: ${appointmentData.service}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\nName: ${appointmentData.name}\nEmail: ${appointmentData.email}\nPhone: ${appointmentData.phone}\nNotes: ${appointmentData.notes}`);
      setAppointmentStep(1);
      setAppointmentData({ service: '', date: '', time: '', name: '', email: '', phone: '', notes: '' });
      setCurrentPage('home');
    };

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {appointmentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Service</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleChange('service', service.name)}
                    className={`border rounded-lg p-4 text-left transition ${appointmentData.service === service.name ? 'bg-rose-600 text-white border-rose-600' : 'border-gray-300 text-gray-700 hover:bg-rose-100'}`}
                  >
                    <h4 className="font-semibold text-lg">{service.name}</h4>
                    <p className="text-sm">Duration: {service.duration}</p>
                    <p className="text-sm">Price: {service.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {appointmentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Date & Time</h3>
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={appointmentData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  id="time"
                  value={appointmentData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {appointmentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={appointmentData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={appointmentData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={appointmentData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={appointmentData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {appointmentStep === 4 && (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 text-rose-600" size={48} />
              <h3 className="text-2xl font-semibold mb-2">Appointment Confirmed!</h3>
              <p className="mb-4">Thank you for booking with DEECEE HAIR. We look forward to seeing you!</p>
              <button
                type="button"
                onClick={() => { setAppointmentStep(1); setAppointmentData({ service: '', date: '', time: '', name: '', email: '', phone: '', notes: '' }); setCurrentPage('home'); }}
                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
              >
                Back to Home
              </button>
            </div>
          )}

          {appointmentStep !== 4 && (
            <div className="flex justify-between">
              {appointmentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-rose-600 text-rose-600 rounded-lg hover:bg-rose-100 transition"
                >
                  Back
                </button>
              ) : <div />}
              <button
                type={appointmentStep === 3 ? 'submit' : 'button'}
                onClick={appointmentStep !== 3 ? handleNext : undefined}
                className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
              >
                {appointmentStep === 3 ? 'Confirm Appointment' : 'Next'}
              </button>
            </div>
          )}
        </form>
      </div>
    );
  };

  const CartPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-700 mb-4">Your cart is empty.</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border border-gray-200 rounded-lg p-4">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-gray-700">Color: {item.color}</p>
                <p className="text-gray-700">Size: {item.size}</p>
                <p className="text-rose-600 font-semibold">₹{item.product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(index, -1)}
                  className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="ml-4 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-semibold text-gray-900">
            Total: ₹{getTotalPrice()}
          </div>

          <button
            onClick={() => alert('Checkout functionality not implemented.')}
            className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <PromoSlider />
      <Header />
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'appointment' && <AppointmentPage />}
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DEECEE HAIR</h3>
              <p className="text-gray-400 text-sm">Premium quality hair extensions for the modern woman.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition">About Us</button></li>
                <li><button className="hover:text-white transition">Shop</button></li>
                <li><button className="hover:text-white transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition">Shipping Info</button></li>
                <li><button className="hover:text-white transition">Returns</button></li>
                <li><button className="hover:text-white transition">FAQ</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition">Instagram</button></li>
                <li><button className="hover:text-white transition">Facebook</button></li>
                <li><button className="hover:text-white transition">YouTube</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
