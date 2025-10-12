"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Smartphone, CheckCircle2, X, RefreshCw } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

type VerificationPageProps = {
  onClose: () => void;
  onVerificationSuccess: () => void;
};

export default function VerificationPage({ onClose, onVerificationSuccess }: VerificationPageProps) {
  const { pendingVerification, verifyEmail, verifyMobile, resendEmailOTP, resendMobileOTP, completeSignup } = useAuth();

  const [emailOTP, setEmailOTP] = useState(['', '', '', '', '', '']);
  const [mobileOTP, setMobileOTP] = useState(['', '', '', '', '', '']);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailResendTimer, setEmailResendTimer] = useState(30);
  const [mobileResendTimer, setMobileResendTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  // Email Resend Timer
  useEffect(() => {
    if (emailResendTimer > 0) {
      const timer = setTimeout(() => setEmailResendTimer(emailResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailResendTimer]);

  // Mobile Resend Timer
  useEffect(() => {
    if (mobileResendTimer > 0) {
      const timer = setTimeout(() => setMobileResendTimer(mobileResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [mobileResendTimer]);

  const handleOTPChange = (index: number, value: string, type: 'email' | 'mobile') => {
    if (!/^\d*$/.test(value)) return;

    if (type === 'email') {
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
    } else {
      const newOTP = [...mobileOTP];
      newOTP[index] = value;
      setMobileOTP(newOTP);
      setMobileError('');

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`mobile-otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-verify when all digits entered
      if (newOTP.every(digit => digit !== '') && !mobileVerified) {
        handleVerifyMobile(newOTP.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent, type: 'email' | 'mobile') => {
    if (e.key === 'Backspace' && index > 0) {
      const currentValue = type === 'email' ? emailOTP[index] : mobileOTP[index];
      if (!currentValue) {
        const prevInput = document.getElementById(`${type}-otp-${index - 1}`);
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

      // If both verified, complete signup
      if (mobileVerified) {
        completeSignup();
        onVerificationSuccess();
      }
    } else {
      setEmailError('Invalid OTP. Please try again.');
      setEmailOTP(['', '', '', '', '', '']);
      document.getElementById('email-otp-0')?.focus();
    }
  };

  const handleVerifyMobile = async (otp: string) => {
    setIsLoading(true);
    const success = await verifyMobile(otp);
    setIsLoading(false);

    if (success) {
      setMobileVerified(true);
      setMobileError('');

      // If both verified, complete signup
      if (emailVerified) {
        completeSignup();
        onVerificationSuccess();
      }
    } else {
      setMobileError('Invalid OTP. Please try again.');
      setMobileOTP(['', '', '', '', '', '']);
      document.getElementById('mobile-otp-0')?.focus();
    }
  };

  const handleResendEmailOTP = async () => {
    await resendEmailOTP();
    setEmailResendTimer(30);
    setEmailOTP(['', '', '', '', '', '']);
    setEmailError('');
  };

  const handleResendMobileOTP = async () => {
    await resendMobileOTP();
    setMobileResendTimer(30);
    setMobileOTP(['', '', '', '', '', '']);
    setMobileError('');
  };

  if (!pendingVerification) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Account</h2>
          <p className="text-gray-600 mt-2">We've sent verification codes to your email and mobile</p>
        </div>

        {/* Email Verification */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${emailVerified ? 'bg-green-100' : 'bg-rose-50'}`}>
              <Mail className={`w-5 h-5 ${emailVerified ? 'text-green-600' : 'text-rose-600'}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Email Verification</h3>
              <p className="text-sm text-gray-600">{pendingVerification.email}</p>
            </div>
            {emailVerified && <CheckCircle2 className="w-6 h-6 text-green-600" />}
          </div>

          {!emailVerified && (
            <>
              <p className="text-sm text-gray-600 mb-4">Enter 6-digit OTP sent to your email</p>

              <div className="flex gap-2 justify-center mb-4">
                {emailOTP.map((digit, index) => (
                  <input
                    key={index}
                    id={`email-otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value, 'email')}
                    onKeyDown={(e) => handleKeyDown(index, e, 'email')}
                    disabled={emailVerified || isLoading}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none transition-all disabled:bg-gray-100"
                  />
                ))}
              </div>

              {emailError && (
                <p className="text-red-600 text-sm mb-4 text-center">{emailError}</p>
              )}

              <div className="text-center">
                {emailResendTimer > 0 ? (
                  <p className="text-sm text-gray-500">Resend OTP in {emailResendTimer}s</p>
                ) : (
                  <button
                    onClick={handleResendEmailOTP}
                    className="text-sm text-rose-600 hover:underline font-medium flex items-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend Email OTP
                  </button>
                )}
              </div>
            </>
          )}

          {emailVerified && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-green-700 font-medium">Email Verified Successfully! ✓</p>
            </div>
          )}
        </div>

        {/* Mobile Verification */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${mobileVerified ? 'bg-green-100' : 'bg-rose-50'}`}>
              <Smartphone className={`w-5 h-5 ${mobileVerified ? 'text-green-600' : 'text-rose-600'}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Mobile Verification</h3>
              <p className="text-sm text-gray-600">{pendingVerification.phone}</p>
            </div>
            {mobileVerified && <CheckCircle2 className="w-6 h-6 text-green-600" />}
          </div>

          {!mobileVerified && (
            <>
              <p className="text-sm text-gray-600 mb-4">Enter 6-digit OTP sent to your mobile</p>

              <div className="flex gap-2 justify-center mb-4">
                {mobileOTP.map((digit, index) => (
                  <input
                    key={index}
                    id={`mobile-otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value, 'mobile')}
                    onKeyDown={(e) => handleKeyDown(index, e, 'mobile')}
                    disabled={mobileVerified || isLoading}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-rose-500 focus:outline-none transition-all disabled:bg-gray-100"
                  />
                ))}
              </div>

              {mobileError && (
                <p className="text-red-600 text-sm mb-4 text-center">{mobileError}</p>
              )}

              <div className="text-center">
                {mobileResendTimer > 0 ? (
                  <p className="text-sm text-gray-500">Resend OTP in {mobileResendTimer}s</p>
                ) : (
                  <button
                    onClick={handleResendMobileOTP}
                    className="text-sm text-rose-600 hover:underline font-medium flex items-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend Mobile OTP
                  </button>
                )}
              </div>
            </>
          )}

          {mobileVerified && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-green-700 font-medium">Mobile Verified Successfully! ✓</p>
            </div>
          )}
        </div>

        {emailVerified && mobileVerified && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-xl p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-900 mb-2">Account Verified!</h3>
            <p className="text-green-700 text-sm">Redirecting you to your profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}
