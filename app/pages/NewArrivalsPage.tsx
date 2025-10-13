"use client"

import React from "react";
import { Product } from "@/app/types";
import { Sparkles } from "lucide-react";

type NewArrivalsPageProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
  onBackToHome: () => void;
};

export default function NewArrivalsPage({
  products,
  onProductClick,
  onBackToHome
}: NewArrivalsPageProps): React.ReactElement {
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button
        onClick={onBackToHome}
        className="mb-6 text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-600 rounded"
      >
        ← Back to Home
      </button>

      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          New Arrivals
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4 text-base sm:text-lg">
          Discover our latest collection of premium hair extensions
        </p>
      </div>

      {newArrivals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No new arrivals available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3 fill-current" /> New
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-white text-lg font-semibold mb-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
                      >
                        {color}
                      </span>
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                  <button className="text-white underline hover:no-underline text-sm sm:text-base font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* What's New Section */}
      <div className="mt-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          What Makes Our New Collection Special
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white fill-current" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Latest Trends</h3>
            <p className="text-gray-600 text-sm">
              Stay ahead with the newest styles and textures in hair fashion
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Fresh Stock</h3>
            <p className="text-gray-600 text-sm">
              Brand new inventory with the finest quality selection
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Limited Edition</h3>
            <p className="text-gray-600 text-sm">
              Exclusive products available for a limited time only
            </p>
          </div>
        </div>
      </div>

      {/* Early Bird Offer */}
      <div className="mt-8 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          Early Bird Special! 🎉
        </h3>
        <p className="text-white/90 mb-4 text-sm sm:text-base">
          Be among the first to try our new arrivals and get <strong>10% OFF</strong> on your first purchase
        </p>
        <button
          onClick={onBackToHome}
          className="bg-white text-rose-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
