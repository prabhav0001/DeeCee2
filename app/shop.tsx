"use client"

import React from "react";

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

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <button onClick={onClick} className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${active ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white border-rose-600 shadow-lg" : "border-gray-300 text-gray-700 hover:bg-rose-50 hover:border-rose-300"}`}>
    {children}
  </button>
);

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

const ProductCard = ({ product, onClick }: ProductCardProps) => (
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

type ShopPageProps = {
  products: Product[];
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  onProductClick: (product: Product) => void;
};

export default function ShopPage({ products, filterCategory, setFilterCategory, onProductClick }: ShopPageProps): React.ReactElement {
  const filteredProducts = filterCategory === "all" ? products : products.filter((p) => p.category === filterCategory);

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
          <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
        ))}
      </div>
    </div>
  );
}
