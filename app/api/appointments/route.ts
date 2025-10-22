/**
 * Appointments API Route Handler
 * Handles GET and POST requests for appointments
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
 * GET /api/appointments
 * Fetch all appointments from Firestore
 */
export async function GET(request: NextRequest) {
  try {
    const db = getFirestore();
    const appointmentsRef = db.collection('appointments');
    const snapshot = await appointmentsRef.orderBy('createdAt', 'desc').get();

    const appointments: any[] = [];
    snapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return NextResponse.json(
      {
        success: true,
        appointments: appointments,
        count: appointments.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch appointments',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/appointments
 * Create a new appointment and save to Firestore
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['id', 'service', 'location', 'date', 'time', 'name', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const db = getFirestore();
    const appointmentsRef = db.collection('appointments');

    // Check if time slot is already booked
    const existingSnapshot = await appointmentsRef
      .where('date', '==', body.date)
      .where('location', '==', body.location)
      .where('time', '==', body.time)
      .get();

    if (!existingSnapshot.empty) {
      // Check if it's not the same appointment being updated
      const isBooked = existingSnapshot.docs.some(doc => doc.id !== body.id);
      if (isBooked) {
        return NextResponse.json(
          {
            success: false,
            error: 'This time slot is already booked',
          },
          { status: 409 }
        );
      }
    }

    // Prepare appointment data
    const appointment = {
      service: body.service,
      location: body.location,
      date: body.date,
      time: body.time,
      name: body.name,
      email: body.email,
      phone: body.phone,
      notes: body.notes || '',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Save to Firestore using the provided ID
    await appointmentsRef.doc(body.id).set(appointment);

    console.log('✅ Appointment saved to Firestore:', body.id);

    return NextResponse.json(
      {
        success: true,
        appointment: {
          id: body.id,
          ...appointment,
        },
        message: 'Appointment created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create appointment',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/appointments/[id]
 * Cancel an appointment in Firestore
 */
export async function DELETE(request: NextRequest) {
  try {
    // Extract ID from URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment ID is required',
        },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const appointmentRef = db.collection('appointments').doc(id);

    // Check if appointment exists
    const doc = await appointmentRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment not found',
        },
        { status: 404 }
      );
    }

    // Update status to cancelled instead of deleting
    await appointmentRef.update({
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    });

    console.log('✅ Appointment cancelled in Firestore:', id);

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment cancelled successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to cancel appointment',
      },
      { status: 500 }
    );
  }
}
