"use client"

import React, { useState, useEffect, useMemo } from "react";
import { User, Mail, Phone, MapPin, Package, Heart, Lock, Edit2, Save, X, ShoppingBag, Calendar, CheckCircle2, Truck, CreditCard, LogOut } from "lucide-react";
import { useAuth } from './AuthContext';
import { Order, Address, ProfileTab } from "./types";
import { FormInput } from "./components";
import { useFormValidation } from "./hooks";

type ProfilePageProps = {
  onNavigateToLogin: () => void;
};

export default function ProfilePage({ onNavigateToLogin }: ProfilePageProps): React.ReactElement {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigateToLogin();
    }
  }, [isAuthenticated, onNavigateToLogin]);

  const [editProfile, setEditProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Update editProfile when user changes
  useEffect(() => {
    if (user) {
      setEditProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // Orders State
  const [orders] = useState<Order[]>([
    { id: "ORD001", date: "2024-01-15", total: 5999, status: "Delivered", items: 2, trackingId: "TRK123456" },
    { id: "ORD002", date: "2024-01-20", total: 3499, status: "Shipped", items: 1, trackingId: "TRK789012" },
    { id: "ORD003", date: "2024-01-25", total: 7998, status: "Processing", items: 3 },
  ]);

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "ADD001",
      name: user?.name || "User",
      phone: user?.phone || "",
      addressLine1: "123, MG Road",
      addressLine2: "Near City Mall",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true
    },
    {
      id: "ADD002",
      name: user?.name || "User",
      phone: user?.phone || "",
      addressLine1: "456, Park Street",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      isDefault: false
    }
  ]);

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Wishlist State
  const [wishlistItems] = useState([
    { id: 1, name: "Silky Straight Extensions", price: 2999, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Wavy Luxe Hair", price: 3499, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80" },
  ]);

  const formErrors = useFormValidation(editProfile);

  const passwordErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (passwordData.currentPassword && passwordData.currentPassword.length < 6) e.currentPassword = "Password too short";
    if (passwordData.newPassword && passwordData.newPassword.length < 6) e.newPassword = "Password must be at least 6 characters";
    if (passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword) e.confirmPassword = "Passwords don't match";
    return e;
  }, [passwordData]);

  const handleSaveProfile = () => {
    if (Object.keys(formErrors).length === 0) {
      updateUser(editProfile);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setEditProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(passwordErrors).length === 0 && passwordData.currentPassword && passwordData.newPassword) {
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleLogout = () => {
    logout();
    onNavigateToLogin();
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-700";
      case "Shipped": return "bg-blue-100 text-blue-700";
      case "Processing": return "bg-yellow-100 text-yellow-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const TabButton = ({ tab, icon: Icon, label }: { tab: ProfileTab; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left ${
        activeTab === tab
          ? "bg-rose-600 text-white shadow-lg"
          : "text-gray-700 hover:bg-rose-50"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  if (!user || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        {showSuccess && (
          <div className="mb-6 flex items-center gap-4 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <span className="text-sm sm:text-base">Changes saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-rose-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
                <p className="text-xs text-gray-500 mt-2">Member since {user.joinedDate}</p>
              </div>
              <div className="space-y-2">
                <TabButton tab="profile" icon={User} label="Profile" />
                <TabButton tab="orders" icon={Package} label="Orders" />
                <TabButton tab="addresses" icon={MapPin} label="Addresses" />
                <TabButton tab="security" icon={Lock} label="Security" />
                <TabButton tab="wishlist" icon={Heart} label="Wishlist" />

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left text-red-600 hover:bg-red-50 mt-4 border-t border-gray-200 pt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Full Name"
                      value={isEditing ? editProfile.name : user.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      error={isEditing ? formErrors.name : undefined}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      value={isEditing ? editProfile.email : user.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                      error={isEditing ? formErrors.email : undefined}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      value={isEditing ? editProfile.phone : user.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                      error={isEditing ? formErrors.phone : undefined}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Member Since"
                      value={user.joinedDate}
                      onChange={() => {}}
                      disabled={true}
                    />
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-rose-50 rounded-xl">
                              <ShoppingBag className="w-6 h-6 text-rose-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{order.items} item(s)</p>
                              {order.trackingId && (
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <Truck className="w-3 h-3" />
                                  Tracking: {order.trackingId}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                            <button className="text-rose-600 text-sm font-medium hover:underline">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                    <button className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition text-sm font-medium">
                      + Add New Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-xl p-4 relative">
                        {address.isDefault && (
                          <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900">{address.name}</h3>
                          <p className="text-sm text-gray-600 mt-2">{address.addressLine1}</p>
                          {address.addressLine2 && <p className="text-sm text-gray-600">{address.addressLine2}</p>}
                          <p className="text-sm text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                            <Phone className="w-3 h-3" />
                            {address.phone}
                          </p>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-xs text-rose-600 hover:underline font-medium"
                            >
                              Set as Default
                            </button>
                          )}
                          <button className="text-xs text-gray-600 hover:underline font-medium">Edit</button>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-xs text-red-600 hover:underline font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                    <FormInput
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      error={passwordErrors.currentPassword}
                      placeholder="Enter current password"
                    />
                    <FormInput
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      error={passwordErrors.newPassword}
                      placeholder="Enter new password"
                    />
                    <FormInput
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      error={passwordErrors.confirmPassword}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="submit"
                      className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition shadow-lg"
                      disabled={Object.keys(passwordErrors).length > 0 || !passwordData.currentPassword || !passwordData.newPassword}
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">My Wishlist ({wishlistItems.length})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
                          <p className="text-rose-600 font-bold mb-3">₹{item.price.toLocaleString()}</p>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-rose-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-rose-700 transition">
                              Add to Cart
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                              <X className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
