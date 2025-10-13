"use client"

import React, { useState } from "react";
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Create array of images - if product has images array, use it, otherwise use main image twice
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button onClick={onBackToShop} className="mb-6 text-rose-600 hover:underline focus:outline-none rounded">
        ← Back to Shop
      </button>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-10">
        {/* Product Images Section */}
        <div className="w-full md:w-1/2">
          {/* Main Image Display */}
          <div className="mb-4 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={productImages[selectedImageIndex]}
              alt={`${product.name} - View ${selectedImageIndex + 1}`}
              className="w-full h-[400px] sm:h-[500px] object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 gap-4">
            {productImages.slice(0, 2).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  selectedImageIndex === index
                    ? 'ring-4 ring-rose-600 shadow-xl transform scale-105'
                    : 'ring-2 ring-gray-200 hover:ring-rose-300 shadow-md'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className="w-full h-[120px] sm:h-[150px] object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
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
