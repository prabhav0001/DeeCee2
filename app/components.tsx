"use client"

import React from "react";
import { X } from "lucide-react";
import { FormInputProps } from "./types";

export const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled = false
}: FormInputProps) => (
  <div className="w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      }`}
    />
    {error && (
      <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
        <X className="w-3 h-3" />
        {error}
      </p>
    )}
  </div>
);

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

export const IconButton = ({
  icon: Icon,
  onClick,
  badge
}: {
  icon: any;
  onClick?: () => void;
  badge?: number;
}) => (
  <button
    onClick={onClick}
    className="p-2 text-gray-700 hover:text-rose-600 transition-all duration-300 relative group"
  >
    <Icon className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
        {badge}
      </span>
    )}
  </button>
);