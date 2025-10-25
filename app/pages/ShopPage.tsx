"use client"

import React from "react";
import { Product } from "@/app/types";
import { FilterButton } from "@/app/components/common";
import { Heart } from "lucide-react";

const ProductCard = ({
  product,
  onClick,
  convertPrice,
  isInWishlist,
  onToggleWishlist
}: {
  product: Product;
  onClick: () => void;
  convertPrice: (price: number) => string;
  isInWishlist?: boolean;
  onToggleWishlist?: (product: Product) => void;
}) => (
  <div className="border border-gray-200 rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white group relative">
    <div onClick={onClick} className="cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-video">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
      <div className="flex items-center gap-2 mb-1">
        <p className="text-rose-600 font-bold text-lg">{convertPrice(product.price)}</p>
        <p className="text-gray-400 line-through text-sm">{convertPrice(product.price * 1.5)}</p>
        <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded">50% OFF</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {product.isBestseller && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700 rounded-full">Bestseller</span>}
        {product.isNew && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-100 to-green-50 text-green-700 rounded-full">New</span>}
        {product.isMans && <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full">Mans</span>}
      </div>
    </div>
    {onToggleWishlist && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
        title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${isInWishlist ? 'fill-rose-600 text-rose-600' : 'text-gray-400 hover:text-rose-600'}`}
        />
      </button>
    )}
  </div>
);

type ShopPageProps = {
  products: Product[];
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  onProductClick: (product: Product) => void;
  convertPrice: (price: number) => string;
  wishlistProductIds?: number[];
  onToggleWishlist?: (product: Product) => void;
};

export default function ShopPage({
  products,
  filterCategory,
  setFilterCategory,
  onProductClick,
  convertPrice,
  wishlistProductIds = [],
  onToggleWishlist
}: ShopPageProps): React.ReactElement {
  // Filter products: exclude men's products from women's shop sections
  const filteredProducts = filterCategory === "all"
    ? products.filter((p) => !p.isMans)
    : filterCategory === "mans"
      ? products.filter((p) => p.category === filterCategory)
      : products.filter((p) => p.category === filterCategory && !p.isMans);

  return (
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
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
            convertPrice={convertPrice}
            isInWishlist={wishlistProductIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
