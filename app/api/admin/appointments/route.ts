/**
 * Admin Appointments API Route Handler
 * Handles GET requests for appointment management in admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Appointment } from '@/app/types';

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
 * GET /api/admin/appointments
 * Fetch all appointments from Firestore
 * Query params: status, search, page, limit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const statusFilter = searchParams.get('status') || 'all';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const db = getFirestore();
    const appointmentsRef = db.collection('appointments');

    // Fetch all appointments
    const snapshot = await appointmentsRef.orderBy('date', 'desc').get();

    let appointments: (Appointment & { status?: string })[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      appointments.push({
        id: doc.id,
        service: data.service || '',
        location: data.location || '',
        date: data.date || '',
        time: data.time || '',
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        notes: data.notes || '',
        status: data.status || 'pending',
      });
    });

    // Filter by status
    if (statusFilter !== 'all') {
      appointments = appointments.filter(
        (apt) => (apt.status || 'pending') === statusFilter
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      appointments = appointments.filter(
        (apt) =>
          apt.name.toLowerCase().includes(searchLower) ||
          apt.email.toLowerCase().includes(searchLower) ||
          apt.phone.includes(search) ||
          apt.service.toLowerCase().includes(searchLower)
      );
    }

    // Calculate statistics
    const stats = {
      total: appointments.length,
      pending: appointments.filter((a) => (a.status || 'pending') === 'pending').length,
      confirmed: appointments.filter((a) => a.status === 'confirmed').length,
      completed: appointments.filter((a) => a.status === 'completed').length,
      cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    };

    // Pagination
    const totalAppointments = appointments.length;
    const totalPages = Math.ceil(totalAppointments / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAppointments = appointments.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        appointments: paginatedAppointments,
        stats,
        pagination: {
          currentPage: page,
          totalPages,
          totalAppointments,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching appointments:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch appointments',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/appointments
 * Update appointment status
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { appointmentId, status } = body;

    if (!appointmentId || !status) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing appointmentId or status',
        },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const appointmentRef = db.collection('appointments').doc(appointmentId);

    await appointmentRef.update({
      status,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment status updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating appointment:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update appointment',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
