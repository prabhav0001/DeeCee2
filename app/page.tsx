"use client"

import React, { useState, useEffect } from 'react';
import { Heart, User, Search, ShoppingCart, Menu, X } from 'lucide-react';

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
  'Free Shipping on Orders Above \u20b95000',
  'Premium Quality Hair Extensions',
];

const heroImages = [
  'https://images.unsplash.com/photo-1560069007-67bbe5e4d4f5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1920&q=80',
];

export default function DeeceeHair() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'product' | 'cart' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [promoIndex, setPromoIndex] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="bg-rose-50 py-2 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap">
        <span className="text-sm font-medium text-rose-900 mx-8">
          {promoMessages[promoIndex]}
        </span>
      </div>
      <style jsx>{`\n        @keyframes marquee {\n          0% { transform: translateX(100%); }\n          100% { transform: translateX(-100%); }\n        }\n        .animate-marquee {\n          animation: marquee 15s linear infinite;\n        }\n      `}</style>
    </div>
  );

  const Header = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button onClick={() => { setCurrentPage('home'); setFilterCategory('all'); }} className="flex items-center space-x-2" >
              <img src="/logo.png" alt="Deecee Hair Logo" className="h-15 w-auto" />
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
              <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition">
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
            <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Book Appointment
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-rose-600 transition text-left">
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );

  const HomePage = () => (
    <div>
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `linear-gradient(rgba(244, 63, 94, 0.7), rgba(251, 113, 133, 0.7)), url('${image}')`
            }}
          />
        ))}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                Premium Hair Extensions
              </h1>
              <p className="text-lg lg:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
                Transform your look with our luxurious collection of hair extensions. Quality you can feel, beauty you can see.
              </p>
              <button
                onClick={() => { setCurrentPage('shop'); setFilterCategory('all'); }}
                className="bg-white text-rose-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === heroImageIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Straight', 'Wavy', 'Curly'].map((type) => (
              <div key={type} className="group cursor-pointer" onClick={() => { setFilterCategory(type.toLowerCase()); setCurrentPage('shop'); }}>
                <div className="bg-gray-100 rounded-2xl h-64 mb-4 flex items-center justify-center group-hover:bg-gray-200 transition">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">{type} Extensions</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Premium Quality</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">COD</div>
              <div className="text-gray-700 font-medium">Cash on Delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">5%</div>
              <div className="text-gray-700 font-medium">First Order Discount</div>
            </div>
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
              <p className="text-rose-600 font-bold">\u20b9{product.price}</p>
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
        <button onClick={() => setCurrentPage('shop')} className="mb-6 text-rose-600 hover:underline">\u2190 Back to Shop</button>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full md:w-1/2 rounded-lg object-cover" />
          <div className="flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
            <p className="text-rose-600 text-2xl font-semibold mb-6">\u20b9{selectedProduct.price}</p>

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
      <p className="text-gray-700 mb-8 text-center">
        We'd love to hear from you! Fill out the form below and our team will get in touch with you soon.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Thank you for contacting us!');
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={4}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );

  const CartPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border border-gray-200 rounded-lg p-4">
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                <p className="text-gray-700">Color: {item.color}</p>
                <p className="text-gray-700">Size: {item.size}</p>
                <p className="text-rose-600 font-semibold">\u20b9{item.product.price}</p>
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
            Total: \u20b9{getTotalPrice()}
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
      </main>
      <footer className="bg-rose-50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} DEECEE HAIR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
