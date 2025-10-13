"use client"

import React from "react";
import { Product } from "@/app/types";

type ProductPageProps = {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  onAddToCart: () => void;
  onBackToShop: () => void;
  convertPrice: (price: number) => string;
};

export default function ProductPage({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  onAddToCart,
  onBackToShop,
  convertPrice
}: ProductPageProps): React.ReactElement {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button onClick={onBackToShop} className="mb-6 text-rose-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-600 rounded">
        ← Back to Shop
      </button>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-10">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-2xl object-cover h-64 sm:h-auto shadow-md" />
        <div className="flex flex-col flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 truncate">{product.name}</h1>
          <p className="text-rose-600 text-2xl font-extrabold mb-8">{convertPrice(product.price)}</p>

          {/* Product Description */}
          {product.description && (
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Product Description</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Select Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all duration-300 ${selectedColor === color ? "bg-rose-600 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-100"}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-full text-sm font-semibold transition-all duration-300 ${selectedSize === size ? "bg-rose-600 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-100"}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button onClick={onAddToCart} className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
