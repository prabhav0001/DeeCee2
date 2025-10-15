/**
 * Appointment Service - Backend Integration
 * Handles appointment booking, email notifications, and data persistence
 */

import { Appointment } from "@/app/types";

// Email service configuration
const EMAIL_SERVICE_URL = process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || "/api/send-email";
const APPOINTMENT_API_URL = process.env.NEXT_PUBLIC_APPOINTMENT_API_URL || "/api/appointments";

/**
 * Send appointment confirmation email
 * @param appointment - Appointment details
 * @returns Promise with success status
 */
export const sendAppointmentConfirmation = async (appointment: Appointment): Promise<{ success: boolean; message?: string }> => {
  try {
    // Format the email content
    const emailData = {
      to: appointment.email,
      subject: `Appointment Confirmation - ${appointment.id}`,
      html: generateEmailHTML(appointment),
      text: generateEmailText(appointment),
    };

    // In production, this would call your email API
    // For now, we'll simulate the API call
    const response = await fetch(EMAIL_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    console.log("✅ Email sent successfully to:", appointment.email);
    return { success: true, message: "Confirmation email sent successfully" };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    // Don't fail the appointment booking if email fails
    return { success: false, message: "Appointment confirmed, but email notification failed" };
  }
};

/**
 * Save appointment to backend/database
 * @param appointment - Appointment details
 * @returns Promise with saved appointment data
 */
export const saveAppointment = async (appointment: Appointment): Promise<{ success: boolean; data?: Appointment; message?: string }> => {
  try {
    // In production, this would save to your database via API
    const response = await fetch(APPOINTMENT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error("Failed to save appointment");
    }

    const data = await response.json();
    console.log("✅ Appointment saved to database:", data);
    return { success: true, data, message: "Appointment saved successfully" };
  } catch (error) {
    console.error("❌ Appointment save failed:", error);
    // For now, save to localStorage as fallback
    saveToLocalStorage(appointment);
    return { success: true, data: appointment, message: "Appointment saved locally" };
  }
};

/**
 * Fetch all appointments from backend
 * @returns Promise with appointments array
 */
export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch(APPOINTMENT_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    console.error("❌ Failed to fetch appointments:", error);
    // Fallback to localStorage
    return getFromLocalStorage();
  }
};

/**
 * Cancel an appointment
 * @param appointmentId - Appointment ID to cancel
 * @returns Promise with success status
 */
export const cancelAppointment = async (appointmentId: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${APPOINTMENT_API_URL}/${appointmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to cancel appointment");
    }

    console.log("✅ Appointment cancelled:", appointmentId);
    return { success: true, message: "Appointment cancelled successfully" };
  } catch (error) {
    console.error("❌ Failed to cancel appointment:", error);
    return { success: false, message: "Failed to cancel appointment" };
  }
};

// ============ Helper Functions ============

/**
 * Generate HTML email template
 */
const generateEmailHTML = (appointment: Appointment): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">DEECEE HAIR</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Premium Hair Extensions</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          <div style="background: #dcfce7; border-left: 4px solid #16a34a; padding: 16px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #15803d; margin: 0 0 8px 0; font-size: 20px;">✓ Appointment Confirmed!</h2>
            <p style="color: #166534; margin: 0; font-size: 14px;">Your appointment has been successfully booked.</p>
          </div>

          <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Appointment Details</h3>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Appointment ID</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${appointment.id}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${appointment.service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Date</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${new Date(appointment.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Time</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${appointment.time}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">Location</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${appointment.location}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Customer Name</td>
              <td style="padding: 12px 0; color: #1f2937; font-weight: 600; text-align: right; font-size: 14px;">${appointment.name}</td>
            </tr>
          </table>

          ${appointment.notes ? `
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; font-weight: 600;">Your Notes:</p>
            <p style="margin: 0; color: #1f2937; font-size: 14px;">${appointment.notes}</p>
          </div>
          ` : ''}

          <div style="background: #dbeafe; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
              <strong>Important:</strong> Please arrive 10 minutes before your scheduled time.
              If you need to reschedule or cancel, please contact us at least 24 hours in advance.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="tel:+916376482804" style="display: inline-block; background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(225, 29, 72, 0.3);">
              Contact Us
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px; font-weight: 600;">DEECEE HAIR</p>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">Swastik Tower, Jhunjhunu, Rajasthan</p>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">Phone: +91 63764 82804</p>
          <p style="margin: 0; color: #6b7280; font-size: 13px;">Email: sumiteximjjn@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate plain text email
 */
const generateEmailText = (appointment: Appointment): string => {
  return `
DEECEE HAIR - APPOINTMENT CONFIRMATION

Your appointment has been successfully confirmed!

Appointment Details:
-------------------
Appointment ID: ${appointment.id}
Service: ${appointment.service}
Date: ${new Date(appointment.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${appointment.time}
Location: ${appointment.location}
Customer Name: ${appointment.name}
Phone: ${appointment.phone}
${appointment.notes ? `\nNotes: ${appointment.notes}` : ''}

IMPORTANT: Please arrive 10 minutes before your scheduled time.
If you need to reschedule or cancel, please contact us at least 24 hours in advance.

Contact Us:
-----------
Phone: +91 63764 82804
Email: sumiteximjjn@gmail.com
Address: Swastik Tower, Jhunjhunu, Rajasthan

Thank you for choosing DEECEE HAIR!
  `;
};

/**
 * Save to localStorage as fallback
 */
const saveToLocalStorage = (appointment: Appointment): void => {
  try {
    const existing = localStorage.getItem("deecee_appointments");
    const appointments: Appointment[] = existing ? JSON.parse(existing) : [];
    appointments.push(appointment);
    localStorage.setItem("deecee_appointments", JSON.stringify(appointments));
    console.log("✅ Appointment saved to localStorage");
  } catch (error) {
    console.error("❌ localStorage save failed:", error);
  }
};

/**
 * Get from localStorage
 */
const getFromLocalStorage = (): Appointment[] => {
  try {
    const stored = localStorage.getItem("deecee_appointments");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("❌ localStorage read failed:", error);
    return [];
  }
};

/**
 * Add appointment to Google Calendar (optional)
 */
export const addToGoogleCalendar = (appointment: Appointment): string => {
  const startDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatDateTime = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `DEECEE HAIR - ${appointment.service}`,
    dates: `${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}`,
    details: `Service: ${appointment.service}\nLocation: ${appointment.location}\nPhone: ${appointment.phone}\n${appointment.notes ? `Notes: ${appointment.notes}` : ''}`,
    location: `DEECEE HAIR, ${appointment.location}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
