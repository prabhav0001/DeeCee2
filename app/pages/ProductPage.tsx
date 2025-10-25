"use client"

import React, { useState, useRef, useEffect } from "react";
import { Product } from "@/app/types";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Heart } from "lucide-react";

type ProductPageProps = {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  onAddToCart: () => void;
  onBackToShop: () => void;
  convertPrice: (price: number) => string;
  isInWishlist?: boolean;
  onToggleWishlist?: (product: Product) => void;
};

export default function ProductPage({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  onAddToCart,
  onBackToShop,
  convertPrice,
  isInWishlist = false,
  onToggleWishlist
}: ProductPageProps): React.ReactElement {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Create array of images - if product has images array, use it, otherwise use main image twice
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image];

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 5));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
    resetZoom();
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    resetZoom();
  };

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (!showZoomModal) {
      resetZoom();
    }
  }, [showZoomModal]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!showZoomModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowZoomModal(false);
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showZoomModal, zoomLevel]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button onClick={onBackToShop} className="mb-6 text-rose-600 hover:underline focus:outline-none rounded">
        ← Back to Shop
      </button>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-10">
        {/* Product Images Section */}
        <div className="w-full md:w-1/2">
          {/* Main Image Display with Zoom */}
          <div
            className="mb-4 rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer aspect-video"
            onClick={() => setShowZoomModal(true)}
          >
            <img
              src={productImages[selectedImageIndex]}
              alt={`${product.name} - View ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Zoom Icon Indicator */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-3">
              <ZoomIn className="w-5 h-5" />
              <span className="text-sm font-medium">Click to Zoom</span>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 gap-4">
            {productImages.slice(0, 2).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`rounded-xl overflow-hidden transition-all duration-300 aspect-video ${
                  selectedImageIndex === index
                    ? 'ring-4 ring-rose-600 shadow-xl transform scale-105'
                    : 'ring-2 ring-gray-200 hover:ring-rose-300 shadow-md'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 truncate">{product.name}</h1>
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <p className="text-rose-600 text-3xl font-extrabold">{convertPrice(product.price)}</p>
            <p className="text-gray-400 line-through text-xl">{convertPrice(product.price * 1.5)}</p>
            <span className="text-sm font-semibold bg-green-500 text-white px-3 py-1.5 rounded-lg">50% OFF</span>
          </div>

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

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onAddToCart}
              className="bg-rose-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-rose-700 transition shadow-lg flex-1 min-w-[200px]"
            >
              Add to Cart
            </button>
            {onToggleWishlist && (
              <button
                onClick={() => onToggleWishlist(product)}
                className={`px-6 py-3 rounded-2xl font-semibold transition shadow-lg flex items-center gap-2 ${
                  isInWishlist
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-600' : ''}`} />
                {isInWishlist ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Zoom Modal */}
      {showZoomModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setShowZoomModal(false)}
        >
          {/* Zoom Container - Contained Size */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowZoomModal(false)}
              className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition z-20 shadow-lg"
              aria-label="Close zoom view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Zoom Controls */}
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition shadow-lg"
                aria-label="Zoom in"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition shadow-lg"
                aria-label="Zoom out"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition shadow-lg"
                aria-label="Reset zoom"
                title="Reset (0)"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Previous Button */}
            {productImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition z-10 shadow-lg"
                aria-label="Previous image"
                title="Previous (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Button */}
            {productImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full transition z-10 shadow-lg"
                aria-label="Next image"
                title="Next (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Zoomable Image Container */}
            <div
              className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing bg-gray-50"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={productImages[selectedImageIndex]}
                alt={`${product.name} - Zoomed View ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain transition-transform duration-200 select-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
                draggable={false}
              />
            </div>

            {/* Info Bar at Bottom */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3 z-20 px-3">
              {/* Image Counter */}
              <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                {selectedImageIndex + 1} / {productImages.length}
              </div>
              {/* Zoom Level */}
              <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                {Math.round(zoomLevel * 100)}%
              </div>
              {/* Instructions */}
              <div className="hidden sm:block bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs shadow-lg">
                Scroll/Drag • +/- keys
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
