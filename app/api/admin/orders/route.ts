/**
 * Admin Orders API Route Handler
 * Handles PUT requests for updating orders (status, tracking)
 * Admin-only endpoint
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
 * PUT /api/admin/orders
 * Update order status and tracking information
 * Admin only
 */
export async function PUT(request: NextRequest) {
  try {
    const db = getFirestore();
    const { orderId, status, trackingId } = await request.json();

    // Validate required fields
    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order ID is required',
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
    }

    if (trackingId !== undefined) {
      updateData.trackingId = trackingId;
    }

    // If status is Delivered, add deliveredAt timestamp
    if (status === 'Delivered') {
      updateData.deliveredAt = new Date().toISOString();
    }

    // Update order in Firestore
    await db.collection('orders').doc(orderId).update(updateData);

    console.log('✅ Order updated successfully:', orderId);

    // TODO: Send status update email to customer
    // TODO: Send SMS notification for status change

    return NextResponse.json(
      {
        success: true,
        message: 'Order updated successfully',
        orderId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update order',
      },
      { status: 500 }
    );
  }
}
