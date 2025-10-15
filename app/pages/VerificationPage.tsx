"use client"

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, X, RefreshCw } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

type VerificationPageProps = {
  onClose: () => void;
  onVerificationSuccess: () => void;
};

export default function VerificationPage({ onClose, onVerificationSuccess }: VerificationPageProps) {
  const { pendingVerification, verifyEmail, resendEmailOTP, completeSignup } = useAuth();

  const [emailOTP, setEmailOTP] = useState(['', '', '', '', '', '']);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailResendTimer, setEmailResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  // Email Resend Timer
  useEffect(() => {
    if (emailResendTimer > 0) {
      const timer = setTimeout(() => setEmailResendTimer(emailResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailResendTimer]);

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...emailOTP];
    newOTP[index] = value;
    setEmailOTP(newOTP);
    setEmailError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`email-otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when all digits entered
    if (newOTP.every(digit => digit !== '') && !emailVerified) {
      handleVerifyEmail(newOTP.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && index > 0) {
      const currentValue = emailOTP[index];
      if (!currentValue) {
        const prevInput = document.getElementById(`email-otp-${index - 1}`);
        prevInput?.focus();
      }
    }
  };

  const handleVerifyEmail = async (otp: string) => {
    setIsLoading(true);
    const success = await verifyEmail(otp);
    setIsLoading(false);

    if (success) {
      setEmailVerified(true);
      setEmailError('');

      // Complete signup and redirect
      setTimeout(() => {
        completeSignup();
        onVerificationSuccess();
      }, 1500);
    } else {
      setEmailError('Invalid OTP. Please try again.');
      setEmailOTP(['', '', '', '', '', '']);
      document.getElementById('email-otp-0')?.focus();
    }
  };

  const handleResendEmailOTP = async () => {
    await resendEmailOTP();
    setEmailResendTimer(30);
    setEmailOTP(['', '', '', '', '', '']);
    setEmailError('');
  };

  if (!pendingVerification) {
    return null;
  }

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
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-rose-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">We've sent a verification code to your email</p>
        </div>

        {/* Email Verification */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className={`p-2 sm:p-3 rounded-xl ${emailVerified ? 'bg-green-100' : 'bg-rose-50'}`}>
              <Mail className={`w-4 h-4 sm:w-5 sm:h-5 ${emailVerified ? 'text-green-600' : 'text-rose-600'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Email Verification</h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{pendingVerification.email}</p>
            </div>
            {emailVerified && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />}
          </div>

          {!emailVerified && (
            <>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Enter 6-digit OTP sent to your email</p>

              <div className="flex gap-1.5 sm:gap-2 justify-center mb-3 sm:mb-4">
                {emailOTP.map((digit, index) => (
                  <input
                    key={index}
                    id={`email-otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={emailVerified || isLoading}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none transition-all disabled:bg-gray-100"
                  />
                ))}
              </div>

              {emailError && (
                <p className="text-red-600 text-xs sm:text-sm mb-3 sm:mb-4 text-center">{emailError}</p>
              )}

              <div className="text-center">
                {emailResendTimer > 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500">Resend OTP in {emailResendTimer}s</p>
                ) : (
                  <button
                    onClick={handleResendEmailOTP}
                    className="text-xs sm:text-sm text-rose-600 hover:underline font-medium flex items-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                    Resend Email OTP
                  </button>
                )}
              </div>
            </>
          )}

          {emailVerified && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 text-center">
              <p className="text-sm sm:text-base text-green-700 font-medium">Email Verified Successfully! ✓</p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">Redirecting to your profile...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
