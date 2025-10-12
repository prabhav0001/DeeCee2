"use client"

import React from "react";

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
