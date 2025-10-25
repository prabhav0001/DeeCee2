"use client"

import React from "react";
import { Product } from "@/app/types";
import { Star } from "lucide-react";

type BestsellersPageProps = {
  products: Product[];
  onProductClick: (product: Product) => void;
  onBackToHome: () => void;
  convertPrice: (price: number) => string;
};

export default function BestsellersPage({
  products,
  onProductClick,
  onBackToHome,
  convertPrice
}: BestsellersPageProps): React.ReactElement {
  const bestsellers = products.filter(p => p.isBestseller);

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
          Bestsellers
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4 text-base sm:text-lg">
          Our most loved products, trusted by thousands of customers
        </p>
      </div>

      {bestsellers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bestseller products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-current" /> Bestseller
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-white text-lg font-semibold">
                      {convertPrice(product.price)}
                    </p>
                    <p className="text-white/70 line-through text-sm">
                      {convertPrice(product.price * 1.5)}
                    </p>
                    <span className="text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded">50% OFF</span>
                  </div>
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

      {/* Why Choose Our Bestsellers */}
      <div className="mt-16 bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Why Our Bestsellers Stand Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="bg-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Customer Favorite</h3>
            <p className="text-gray-600 text-sm">
              Rated 5 stars by thousands of satisfied customers
            </p>
          </div>
          <div className="text-center">
            <div className="bg-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Premium Quality</h3>
            <p className="text-gray-600 text-sm">
              100% human hair with natural texture and shine
            </p>
          </div>
          <div className="text-center">
            <div className="bg-rose-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Long Lasting</h3>
            <p className="text-gray-600 text-sm">
              Durable quality that lasts for months with proper care
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
