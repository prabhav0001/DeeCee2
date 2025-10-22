"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin } from '@/app/types';
import { auth, db } from '@/app/config/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type AdminAuthContextType = {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAdminRole: (userId: string) => Promise<Admin | null>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

type AdminAuthProviderProps = {
  children: ReactNode;
};

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user has admin role in Firestore
  const checkAdminRole = async (userId: string): Promise<Admin | null> => {
    try {
      const adminDocRef = doc(db, 'admins', userId);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        const data = adminDoc.data();
        return {
          id: userId,
          email: data.email,
          name: data.name,
          role: data.role || 'admin',
          createdAt: data.createdAt || new Date().toISOString(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return null;
    }
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    if (!isClient) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        // Check if this user is an admin
        const adminData = await checkAdminRole(firebaseUser.uid);

        if (adminData) {
          setAdmin(adminData);
          setIsAuthenticated(true);

          // Store in localStorage for persistence
          if (typeof window !== 'undefined') {
            localStorage.setItem('deecee_admin', JSON.stringify(adminData));
          }
        } else {
          // User is authenticated but not an admin
          setAdmin(null);
          setIsAuthenticated(false);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('deecee_admin');
          }
        }
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('deecee_admin');
        }
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isClient]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check if this user is an admin
      const adminData = await checkAdminRole(userCredential.user.uid);

      if (!adminData) {
        // User exists but is not an admin
        await signOut(auth);
        return {
          success: false,
          message: 'Unauthorized: You do not have admin access'
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Admin login error:', error);

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

  const logout = async () => {
    try {
      await signOut(auth);
      setAdmin(null);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('deecee_admin');
      }
    } catch (error) {
      console.error('Admin logout error:', error);
      throw error;
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAdminRole,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
