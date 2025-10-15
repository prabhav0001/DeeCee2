"use client"

import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { EMAIL_REGEX } from '@/app/types';

type ForgotPasswordPageProps = {
  onClose: () => void;
  onBackToLogin: () => void;
};

export default function ForgotPasswordPage({ onClose, onBackToLogin }: ForgotPasswordPageProps) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message || 'Failed to send reset email');
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

        {!success ? (
          <>
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-rose-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Reset Password</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Enter your email and we'll send you a password reset link
              </p>
            </div>

            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <button
                onClick={onBackToLogin}
                className="text-xs sm:text-sm text-rose-600 hover:underline font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Back to Login
              </button>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                🔒 Password reset link will be sent to your email
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Check Your Email
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              We've sent a password reset link to:
            </p>

            <p className="text-sm sm:text-base font-semibold text-rose-600 mb-6 sm:mb-8">
              {email}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-6 text-left">
              <p className="text-xs sm:text-sm text-blue-800 mb-2">
                📧 <strong>Next steps:</strong>
              </p>
              <ol className="text-xs sm:text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Check your email inbox</li>
                <li>Click the password reset link</li>
                <li>Enter your new password</li>
                <li>Login with your new password</li>
              </ol>
              <p className="text-xs text-blue-600 mt-2">
                💡 Don't see the email? Check your spam folder
              </p>
            </div>

            <button
              onClick={onBackToLogin}
              className="w-full bg-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-700 transition shadow-lg"
            >
              Back to Login
            </button>

            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
                setError('');
              }}
              className="mt-3 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:underline"
            >
              Resend reset link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
