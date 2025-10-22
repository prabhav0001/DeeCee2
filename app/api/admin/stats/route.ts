/**
 * Admin Stats API Route Handler
 * Handles GET requests for admin dashboard statistics
 * Protected route - requires admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/admin/stats
 * Fetch dashboard statistics for admin
 */
export async function GET(request: NextRequest) {
  try {
    // Return mock statistics for admin dashboard
    // In production, replace with database queries
    const stats = {
      totalUsers: 1247,
      totalOrders: 432,
      totalRevenue: 2845600,
      totalProducts: 45,
      pendingOrders: 23,
      completedOrders: 409,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch statistics',
      },
      { status: 500 }
    );
  }
}
