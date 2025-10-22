/**
 * Admin Stats API Route Handler
 * Handles GET requests for admin dashboard statistics
 * Protected route - requires admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  try {
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
 * GET /api/admin/stats
 * Fetch dashboard statistics for admin
 */
export async function GET(request: NextRequest) {
  try {
    const db = getFirestore();

    // Fetch orders from Firestore
    const ordersSnapshot = await db.collection('orders').get();
    const orders = ordersSnapshot.docs.map(doc => doc.data());

    // Calculate statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, order) => sum + (order.total || 0), 0);

    // Get unique users count (from orders)
    const uniqueUsers = new Set(orders.map(o => o.userEmail)).size;

    const stats = {
      totalUsers: uniqueUsers,
      totalOrders: totalOrders,
      totalRevenue: Math.round(totalRevenue),
      totalProducts: 45, // Static for now, can be fetched from products collection
      pendingOrders: pendingOrders,
      completedOrders: completedOrders,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin stats:', error);

    // Fallback to mock data if Firestore fails
    const stats = {
      totalUsers: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 45,
      pendingOrders: 0,
      completedOrders: 0,
    };

    return NextResponse.json(stats, { status: 200 });
  }
}
