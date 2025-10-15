/**
 * Email API Route Handler
 * Sends appointment confirmation emails via SendGrid
 */

import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: to, subject, html',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.to)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
        },
        { status: 400 }
      );
    }

    // Check if SendGrid is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('⚠️  SENDGRID_API_KEY not configured. Falling back to mock mode.');

      // Mock implementation
      console.log('\n📧 ============ EMAIL NOTIFICATION (MOCK) ============');
      console.log('To:', body.to);
      console.log('Subject:', body.subject);
      console.log('Text Preview:', body.text?.substring(0, 200) + '...');
      console.log('============================================\n');

      return NextResponse.json(
        {
          success: true,
          message: 'Email sent successfully (mock - no SENDGRID_API_KEY)',
          details: {
            to: body.to,
            subject: body.subject,
            sentAt: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    }

    // ============================================
    // PRODUCTION: SendGrid Email Sending
    // ============================================

    // IMPORTANT: This must match your verified sender in SendGrid
    const senderEmail = 'deeceehair0@gmail.com'; // ✅ Your verified email

    // Log for debugging
    console.log('\n🔍 ========== SendGrid Debug Info ==========');
    console.log('API Key exists:', !!process.env.SENDGRID_API_KEY);
    console.log('Sender email:', senderEmail);
    console.log('Recipient email:', body.to);
    console.log('==========================================\n');

    const msg = {
      to: body.to,
      from: senderEmail,
      subject: body.subject,
      text: body.text || 'Appointment Confirmation',
      html: body.html,
    };

    try {
      const response = await sgMail.send(msg);

      console.log('\n✅ ============ EMAIL SENT SUCCESSFULLY ============');
      console.log('To:', body.to);
      console.log('From:', senderEmail);
      console.log('Subject:', body.subject);
      console.log('Response Status:', response[0].statusCode);
      console.log('Sent at:', new Date().toISOString());
      console.log('================================================\n');

      return NextResponse.json(
        {
          success: true,
          message: 'Email sent successfully via SendGrid',
          details: {
            to: body.to,
            from: senderEmail,
            subject: body.subject,
            statusCode: response[0].statusCode,
            sentAt: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    } catch (sendGridError: any) {
      console.error('\n❌ ========== SendGrid Error Details ==========');
      console.error('Full Error:', JSON.stringify(sendGridError, null, 2));
      console.error('Error Code:', sendGridError.code);
      console.error('Error Message:', sendGridError.message);
      console.error('Response Body:', sendGridError.response?.body);
      console.error('Status Code:', sendGridError.response?.statusCode);
      console.error('Headers:', sendGridError.response?.headers);
      console.error('===========================================\n');

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email via SendGrid',
          details: {
            message: sendGridError.message,
            code: sendGridError.code,
            statusCode: sendGridError.response?.statusCode,
            errors: sendGridError.response?.body?.errors || [],
          },
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
