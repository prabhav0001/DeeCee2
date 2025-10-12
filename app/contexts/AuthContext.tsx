"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/app/types';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  pendingVerification: { email: string; phone: string; password: string; name: string } | null;
  login: (email: string, password: string) => Promise<{ success: boolean; needsVerification?: boolean; message?: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  verifyEmail: (otp: string) => Promise<boolean>;
  verifyMobile: (otp: string) => Promise<boolean>;
  resendEmailOTP: () => Promise<boolean>;
  resendMobileOTP: () => Promise<boolean>;
  setPendingVerification: (data: { email: string; phone: string; password: string; name: string } | null) => void;
  completeSignup: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

// Helper function to get consistent date format
const getJoinedDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${month} ${year}`;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<{ email: string; phone: string; password: string; name: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Simulated OTP storage (in production, this would be on backend)
  const [emailOTP, setEmailOTP] = useState<string>('');
  const [mobileOTP, setMobileOTP] = useState<string>('');

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load user from localStorage on mount (only on client)
  useEffect(() => {
    if (!isClient) return;

    const storedUser = localStorage.getItem('deecee_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('deecee_user');
      }
    }
  }, [isClient]);

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendEmailOTP = (email: string): string => {
    const otp = generateOTP();
    setEmailOTP(otp);
    console.log(`📧 Email OTP sent to ${email}: ${otp}`);
    // In production: Call backend API to send email
    if (typeof window !== 'undefined') {
      alert(`Email OTP sent to ${email}: ${otp}\n(This is a demo, in production this would be sent via email)`);
    }
    return otp;
  };

  const sendMobileOTP = (phone: string): string => {
    const otp = generateOTP();
    setMobileOTP(otp);
    console.log(`📱 Mobile OTP sent to ${phone}: ${otp}`);
    // In production: Call backend API to send SMS
    if (typeof window !== 'undefined') {
      alert(`Mobile OTP sent to ${phone}: ${otp}\n(This is a demo, in production this would be sent via SMS)`);
    }
    return otp;
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; needsVerification?: boolean; message?: string }> => {
    try {
      if (typeof window === 'undefined') return { success: false, message: 'Client-side only' };

      const storedUsers = localStorage.getItem('deecee_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Check if user is verified
        if (!foundUser.isEmailVerified || !foundUser.isMobileVerified) {
          setPendingVerification({
            email: foundUser.email,
            phone: foundUser.phone,
            password: foundUser.password,
            name: foundUser.name
          });

          // Send OTPs
          if (!foundUser.isEmailVerified) {
            sendEmailOTP(foundUser.email);
          }
          if (!foundUser.isMobileVerified) {
            sendMobileOTP(foundUser.phone);
          }

          return {
            success: false,
            needsVerification: true,
            message: 'Please verify your email and mobile number'
          };
        }

        const userData: User = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
          joinedDate: foundUser.joinedDate,
          isEmailVerified: foundUser.isEmailVerified,
          isMobileVerified: foundUser.isMobileVerified,
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('deecee_user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      if (typeof window === 'undefined') return false;

      const storedUsers = localStorage.getItem('deecee_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const emailExists = users.some((u: any) => u.email === email);
      if (emailExists) {
        return false;
      }

      // Set pending verification data
      setPendingVerification({ email, phone, password, name });

      // Generate and send OTPs
      sendEmailOTP(email);
      sendMobileOTP(phone);

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const completeSignup = () => {
    if (!pendingVerification || typeof window === 'undefined') return;

    const storedUsers = localStorage.getItem('deecee_users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const newUser = {
      id: `user_${Date.now()}`,
      name: pendingVerification.name,
      email: pendingVerification.email,
      phone: pendingVerification.phone,
      password: pendingVerification.password,
      joinedDate: getJoinedDate(),
      isEmailVerified: true,
      isMobileVerified: true,
    };

    users.push(newUser);
    localStorage.setItem('deecee_users', JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      joinedDate: newUser.joinedDate,
      isEmailVerified: true,
      isMobileVerified: true,
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('deecee_user', JSON.stringify(userData));
    setPendingVerification(null);
    setEmailOTP('');
    setMobileOTP('');
  };

  const verifyEmail = async (otp: string): Promise<boolean> => {
    if (otp === emailOTP) {
      // Update user verification status if already exists
      if (pendingVerification && typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('deecee_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const userIndex = users.findIndex((u: any) => u.email === pendingVerification.email);

        if (userIndex !== -1) {
          users[userIndex].isEmailVerified = true;
          localStorage.setItem('deecee_users', JSON.stringify(users));
        }
      }
      return true;
    }
    return false;
  };

  const verifyMobile = async (otp: string): Promise<boolean> => {
    if (otp === mobileOTP) {
      // Update user verification status if already exists
      if (pendingVerification && typeof window !== 'undefined') {
        const storedUsers = localStorage.getItem('deecee_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        const userIndex = users.findIndex((u: any) => u.email === pendingVerification.email);

        if (userIndex !== -1) {
          users[userIndex].isMobileVerified = true;
          localStorage.setItem('deecee_users', JSON.stringify(users));
        }
      }
      return true;
    }
    return false;
  };

  const resendEmailOTP = async (): Promise<boolean> => {
    if (pendingVerification) {
      sendEmailOTP(pendingVerification.email);
      return true;
    }
    return false;
  };

  const resendMobileOTP = async (): Promise<boolean> => {
    if (pendingVerification) {
      sendMobileOTP(pendingVerification.phone);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('deecee_user');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user && typeof window !== 'undefined') {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('deecee_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        pendingVerification,
        login,
        signup,
        logout,
        updateUser,
        verifyEmail,
        verifyMobile,
        resendEmailOTP,
        resendMobileOTP,
        setPendingVerification,
        completeSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
