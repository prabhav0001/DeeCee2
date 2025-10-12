"use client"

import React from "react";

export const FilterButton = ({ active, onClick, children }: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full border text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
      active
        ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white border-rose-600 shadow-lg"
        : "border-gray-300 text-gray-700 hover:bg-rose-50 hover:border-rose-300"
    }`}
  >
    {children}
  </button>
);
