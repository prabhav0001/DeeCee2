/**
 * Orders API Route Handler
 * Handles POST and GET requests for orders
 * Saves to Firestore database
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
 * POST /api/orders
 * Create a new order
 */
export async function POST(request: NextRequest) {
  try {
    const db = getFirestore();
    const orderData = await request.json();

    // Generate order ID
    const orderId = `ORD${Date.now()}`;

    // Prepare order document
    const order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to Firestore
    await db.collection('orders').doc(orderId).set(order);

    console.log('✅ Order created successfully:', orderId);

    // TODO: Send order confirmation email
    // TODO: Send SMS notification

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully',
        orderId: orderId,
        order: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders
 * Fetch user orders or all orders (admin)
 * Query params: userEmail (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const db = getFirestore();
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get('userEmail');

    let query = db.collection('orders').orderBy('createdAt', 'desc');

    // Filter by user email if provided
    if (userEmail) {
      query = query.where('userEmail', '==', userEmail) as any;
    }

    const snapshot = await query.get();

    const orders: any[] = [];
    snapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return NextResponse.json(
      {
        success: true,
        orders: orders,
        count: orders.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
      },
      { status: 500 }
    );
  }
}
