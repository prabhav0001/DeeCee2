"use client"

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, X } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { EMAIL_REGEX } from '@/app/types';

type LoginPageProps = {
  onClose: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
  onNeedsVerification: () => void;
};

export default function LoginPage({ onClose, onSwitchToSignup, onLoginSuccess, onNeedsVerification }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else if (result.needsVerification) {
      onClose();
      onNeedsVerification();
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 md:p-8 relative max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <LogIn className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-rose-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome Back!</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Login to your DEECEE HAIR account</p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center gap-1.5 sm:gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-rose-600 hover:underline font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-rose-600 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            📧 Email verification required for new accounts
          </p>
        </div>
      </div>
    </div>
  );
}
