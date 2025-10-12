"use client"

import React from "react";

export const PromoSlider = ({ messages }: { messages: Array<{ text: string; icon: any }> }) => {
  const trackMessages = React.useMemo(() => {
    const arr: typeof messages = [];
    for (let i = 0; i < 3; i++) arr.push(...messages);
    return arr;
  }, [messages]);

  return (
    <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 py-3 overflow-hidden relative w-full">
      <div className="relative overflow-hidden w-full">
        <div className="flex animate-marquee whitespace-nowrap">
          {trackMessages.map((msg, idx) => {
            const Icon = msg.icon;
            return (
              <span key={idx} className="text-xs sm:text-sm font-medium text-white mx-6 sm:mx-10 inline-flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {msg.text}
              </span>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
