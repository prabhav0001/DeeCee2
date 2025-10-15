/**
 * Appointments API Route Handler
 * Handles GET and POST requests for appointments
 */

import { NextRequest, NextResponse } from 'next/server';

// In production, replace this with actual database
// For now, we'll use in-memory storage (will reset on server restart)
let appointments: any[] = [];

/**
 * GET /api/appointments
 * Fetch all appointments
 */
export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database
    // Example: const appointments = await db.appointments.findMany();

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
 * Create a new appointment
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

    // Check if time slot is already booked
    const isBooked = appointments.some(
      (apt) =>
        apt.date === body.date &&
        apt.location === body.location &&
        apt.time === body.time &&
        apt.id !== body.id
    );

    if (isBooked) {
      return NextResponse.json(
        {
          success: false,
          error: 'This time slot is already booked',
        },
        { status: 409 }
      );
    }

    // Add timestamp
    const appointment = {
      ...body,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // In production, save to database
    // Example: await db.appointments.create({ data: appointment });
    appointments.push(appointment);

    console.log('✅ Appointment created:', appointment.id);

    return NextResponse.json(
      {
        success: true,
        appointment: appointment,
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
 * Cancel an appointment
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

    // Find and remove appointment
    const index = appointments.findIndex((apt) => apt.id === id);

    if (index === -1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment not found',
        },
        { status: 404 }
      );
    }

    // In production, update status in database
    // Example: await db.appointments.update({ where: { id }, data: { status: 'cancelled' } });
    const cancelled = appointments.splice(index, 1)[0];

    console.log('✅ Appointment cancelled:', id);

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment cancelled successfully',
        appointment: cancelled,
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
