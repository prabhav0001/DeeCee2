"use client"

import React from "react";
import { X } from "lucide-react";
import { FormInputProps } from "@/app/types";

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
