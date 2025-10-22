/**
 * Admin Users API Route Handler
 * Handles GET requests for user management in admin dashboard
 *
 * Note: This fetches users from Firestore 'users' collection
 * Users should be created/updated in Firestore during signup
 */

import { NextRequest, NextResponse } from 'next/server';
import { AdminUser } from '@/app/types';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  try {
    // For development: Use client SDK credentials
    // In production, use proper service account
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

/**
 * GET /api/admin/users
 * Fetch all users from Firebase Authentication
 * Query params: search, page, limit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const auth = getAuth();

    // Fetch users from Firebase Auth
    const listUsersResult = await auth.listUsers(1000); // Fetch up to 1000 users

    // Convert Firebase users to AdminUser format
    let allUsers: AdminUser[] = listUsersResult.users.map((userRecord) => ({
      id: userRecord.uid,
      email: userRecord.email || '',
      displayName: userRecord.displayName || null,
      phoneNumber: userRecord.phoneNumber || null,
      photoURL: userRecord.photoURL || null,
      emailVerified: userRecord.emailVerified,
      disabled: userRecord.disabled,
      createdAt: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime || null,
      // TODO: Fetch from Firestore orders collection
      totalOrders: 0,
      totalSpent: 0,
    }));

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(searchLower) ||
          user.displayName?.toLowerCase().includes(searchLower) ||
          user.phoneNumber?.includes(search)
      );
    }

    // Pagination
    const totalUsers = allUsers.length;
    const totalPages = Math.ceil(totalUsers / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        users: paginatedUsers,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching users:', error);

    // If Firebase Admin is not configured, return helpful error
    if (error.code === 'app/invalid-credential') {
      return NextResponse.json(
        {
          success: false,
          error: 'Firebase Admin SDK not configured. Please add service account credentials.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
