"use client"

import React from "react";

export const FeatureCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="text-center px-4 group">
    <div className="bg-gradient-to-br from-rose-100 to-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
      <Icon className="w-8 h-8 text-rose-600" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{title}</h3>
    <p className="text-xs sm:text-sm text-gray-600">{description}</p>
  </div>
);

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