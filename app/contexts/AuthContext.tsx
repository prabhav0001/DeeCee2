"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/app/types';
import { auth } from '@/app/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  reload
} from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  pendingVerification: { email: string; password: string; name: string } | null;
  login: (email: string, password: string) => Promise<{ success: boolean; needsVerification?: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  verifyEmail: (otp: string) => Promise<boolean>;
  resendEmailOTP: () => Promise<boolean>;
  setPendingVerification: (data: { email: string; password: string; name: string } | null) => void;
  completeSignup: () => void;
  checkEmailVerification: () => Promise<boolean>;
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

// Convert Firebase user to app User type
const convertFirebaseUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    phone: firebaseUser.phoneNumber || '',
    joinedDate: getJoinedDate(),
    isEmailVerified: firebaseUser.emailVerified,
    isMobileVerified: !!firebaseUser.phoneNumber,
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingVerification, setPendingVerification] = useState<{ email: string; password: string; name: string } | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    if (!isClient) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser = convertFirebaseUser(firebaseUser);
        setUser(appUser);
        setIsAuthenticated(true);

        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('deecee_user', JSON.stringify(appUser));
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('deecee_user');
        }
      }
    });

    return () => unsubscribe();
  }, [isClient]);

  const login = async (email: string, password: string): Promise<{ success: boolean; needsVerification?: boolean; message?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        setPendingVerification({
          email: userCredential.user.email || email,
          password,
          name: userCredential.user.displayName || ''
        });

        return {
          success: false,
          needsVerification: true,
          message: 'Please verify your email before logging in'
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        return { success: false, message: 'Invalid email or password' };
      } else if (error.code === 'auth/user-not-found') {
        return { success: false, message: 'No account found with this email' };
      } else if (error.code === 'auth/too-many-requests') {
        return { success: false, message: 'Too many failed attempts. Please try again later.' };
      } else {
        return { success: false, message: 'An error occurred during login' };
      }
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Set pending verification
      setPendingVerification({ email, password, name });

      // Sign out until email is verified
      await signOut(auth);

      if (typeof window !== 'undefined') {
        alert(`Verification email sent to ${email}.\nPlease check your inbox and verify your email.`);
      }

      return true;
    } catch (error: any) {
      console.error('Signup error:', error);

      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        return false;
      }

      return false;
    }
  };

  const completeSignup = () => {
    // This function is called after verification modal
    // The actual email verification happens via Firebase email link
    setPendingVerification(null);
  };

  const verifyEmail = async (otp: string): Promise<boolean> => {
    // Firebase handles email verification via email link
    // This function is kept for compatibility but OTP is not used
    // Users should click the link in their email
    return false;
  };

  const checkEmailVerification = async (): Promise<boolean> => {
    try {
      // If user is already logged in, just reload and check
      if (auth.currentUser) {
        await reload(auth.currentUser);
        return auth.currentUser.emailVerified;
      }

      // If we have pending verification, sign in to check status
      if (pendingVerification) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            pendingVerification.email,
            pendingVerification.password
          );

          // Reload to get the latest verification status
          await reload(userCredential.user);

          const isVerified = userCredential.user.emailVerified;

          // If verified, keep them logged in, otherwise sign them out
          if (!isVerified) {
            await signOut(auth);
          }

          return isVerified;
        } catch (error: any) {
          console.error('Error signing in to check verification:', error);
          return false;
        }
      }

      return false;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  };

  const resendEmailOTP = async (): Promise<boolean> => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        if (typeof window !== 'undefined') {
          alert('Verification email sent! Please check your inbox.');
        }
        return true;
      } else if (pendingVerification) {
        // If user is not logged in but we have pending verification,
        // we need to sign them in first to resend
        const userCredential = await signInWithEmailAndPassword(
          auth,
          pendingVerification.email,
          pendingVerification.password
        );
        await sendEmailVerification(userCredential.user);
        await signOut(auth);

        if (typeof window !== 'undefined') {
          alert('Verification email sent! Please check your inbox.');
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error resending verification email:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('deecee_user');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    if (auth.currentUser && typeof window !== 'undefined') {
      try {
        // Update Firebase profile if name changed
        if (userData.name && userData.name !== auth.currentUser.displayName) {
          await updateProfile(auth.currentUser, {
            displayName: userData.name
          });
        }

        // Update local user state
        const updatedUser = { ...user, ...userData } as User;
        setUser(updatedUser);
        localStorage.setItem('deecee_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user:', error);
      }
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
        resendEmailOTP,
        setPendingVerification,
        completeSignup,
        checkEmailVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
