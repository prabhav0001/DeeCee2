"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { useAdminAuth } from '@/app/contexts/AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Calendar,
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Clock,
  Shield,
} from 'lucide-react';
import { AdminDashboardTab, AdminStats } from '@/app/types';
import UserManagement from '@/app/components/admin/UserManagement';
import AppointmentManagement from '@/app/components/admin/AppointmentManagement';
import ProductManagement from '@/app/components/admin/ProductManagement';

type AdminDashboardPageProps = {
  onLogout: () => void;
};

export default function AdminDashboardPage({ onLogout }: AdminDashboardPageProps) {
  const { admin, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminDashboardTab>('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch admin stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );

  const OverviewTab = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          <p className="mt-4 text-gray-600">Loading statistics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={Users}
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              trend="+12%"
              color="bg-blue-500"
            />
            <StatCard
              icon={ShoppingBag}
              title="Total Orders"
              value={stats.totalOrders.toLocaleString()}
              trend="+8%"
              color="bg-purple-500"
            />
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString()}`}
              trend="+23%"
              color="bg-green-500"
            />
            <StatCard
              icon={Package}
              title="Total Products"
              value={stats.totalProducts.toLocaleString()}
              color="bg-orange-500"
            />
            <StatCard
              icon={Clock}
              title="Pending Orders"
              value={stats.pendingOrders.toLocaleString()}
              color="bg-yellow-500"
            />
            <StatCard
              icon={CheckCircle}
              title="Completed Orders"
              value={stats.completedOrders.toLocaleString()}
              color="bg-emerald-500"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New order placed</p>
                    <p className="text-sm text-gray-500">Order #12345</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New user registered</p>
                    <p className="text-sm text-gray-500">user@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">New appointment booked</p>
                    <p className="text-sm text-gray-500">Consultation service</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-rose-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
                <p className="text-xs text-gray-500">DEECEE HAIR</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{admin?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{admin?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-4 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-rose-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'products'
                      ? 'bg-rose-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-rose-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'users'
                      ? 'bg-rose-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-rose-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Appointments
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            <div style={{ display: activeTab === 'overview' ? 'block' : 'none' }}>
              <OverviewTab />
            </div>
            <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
              <ProductManagement />
            </div>
            <div style={{ display: activeTab === 'orders' ? 'block' : 'none' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders Management</h2>
              <div className="bg-white rounded-xl shadow-md p-6">
                <p className="text-gray-600">Order management features coming soon...</p>
              </div>
            </div>
            <div style={{ display: activeTab === 'users' ? 'block' : 'none' }}>
              <UserManagement />
            </div>
            <div style={{ display: activeTab === 'appointments' ? 'block' : 'none' }}>
              <AppointmentManagement />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
