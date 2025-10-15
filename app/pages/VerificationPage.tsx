"use client"

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, X, RefreshCw } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

type VerificationPageProps = {
  onClose: () => void;
  onVerificationSuccess: () => void;
};

export default function VerificationPage({ onClose, onVerificationSuccess }: VerificationPageProps) {
  const { pendingVerification, resendEmailOTP, completeSignup, checkEmailVerification } = useAuth();

  const [emailVerified, setEmailVerified] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(30);
  const [isChecking, setIsChecking] = useState(false);

  // Email Resend Timer
  useEffect(() => {
    if (emailResendTimer > 0) {
      const timer = setTimeout(() => setEmailResendTimer(emailResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailResendTimer]);

  const handleCheckVerification = async () => {
    setIsChecking(true);
    const isVerified = await checkEmailVerification();
    setIsChecking(false);

    if (isVerified) {
      setEmailVerified(true);

      // Complete signup and redirect
      setTimeout(() => {
        completeSignup();
        onVerificationSuccess();
      }, 1500);
    } else {
      if (typeof window !== 'undefined') {
        alert('Email not verified yet. Please check your inbox and click the verification link.');
      }
    }
  };

  const handleResendEmailOTP = async () => {
    const success = await resendEmailOTP();
    if (success) {
      setEmailResendTimer(30);
    }
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
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">We've sent a verification link to your email</p>
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
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-4">
                <p className="text-xs sm:text-sm text-blue-800">
                  📧 <strong>Check your email inbox</strong> and click the verification link to verify your account.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Don't forget to check your spam folder if you don't see the email.
                </p>
              </div>

              <button
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="w-full bg-rose-600 text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isChecking ? 'Checking...' : 'I\'ve Verified My Email'}
              </button>

              <div className="text-center">
                {emailResendTimer > 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500">Resend email in {emailResendTimer}s</p>
                ) : (
                  <button
                    onClick={handleResendEmailOTP}
                    className="text-xs sm:text-sm text-rose-600 hover:underline font-medium flex items-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                    Resend Verification Email
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

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Having trouble? Contact support at support@deeceehair.com
          </p>
        </div>
      </div>
    </div>
  );
}
