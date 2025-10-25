"use client"

import React, { useState, useEffect, useMemo } from "react";
import { User, Mail, Phone, MapPin, Package, Heart, Lock, Edit2, Save, X, ShoppingBag, Calendar, CheckCircle2, Truck, CreditCard, LogOut, Clock } from "lucide-react";
import { useAuth } from '@/app/contexts/AuthContext';
import { Order, Address, ProfileTab, WishlistItem } from "@/app/types";
import { FormInput } from "@/app/components/common";
import { useFormValidation } from "@/app/hooks/use-form-validation";
import {
  getUserAddresses,
  addAddress as addAddressToFirestore,
  deleteAddress as deleteAddressFromFirestore,
  setDefaultAddress as setDefaultAddressInFirestore
} from '@/app/services/addressService';
import {
  getUserWishlist,
  removeFromWishlist
} from '@/app/services/wishlistService';

type ProfilePageProps = {
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
  defaultTab?: ProfileTab;
};

export default function ProfilePage({ onNavigateToLogin, onNavigateHome, defaultTab }: ProfilePageProps): React.ReactElement {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>(defaultTab || "profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

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

  // Orders State - Real orders from user's purchase history
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Addresses State - Load from Firestore
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // Load addresses from Firestore when user changes
  useEffect(() => {
    const loadAddresses = async () => {
      if (user?.email) {
        setLoadingAddresses(true);
        const userAddresses = await getUserAddresses(user.email);
        setAddresses(userAddresses);
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, [user?.email]);

  // Load orders from API when user changes
  useEffect(() => {
    const loadOrders = async () => {
      if (user?.email) {
        setLoadingOrders(true);
        try {
          const response = await fetch(`/api/orders?userEmail=${encodeURIComponent(user.email)}`);
          const data = await response.json();

          if (data.success) {
            setOrders(data.orders || []);
          } else {
            console.error('Failed to fetch orders:', data.error);
            setOrders([]);
          }
        } catch (error) {
          console.error('Error loading orders:', error);
          setOrders([]);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    loadOrders();
  }, [user?.email]);

  // New address form state
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    name: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(passwordErrors).length === 0 && passwordData.currentPassword && passwordData.newPassword) {
      try {
        // Import Firebase auth functions
        const { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } = await import('firebase/auth');
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser || !currentUser.email) {
          setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
          alert('Please login again to change password');
          return;
        }

        // Reauthenticate user with current password
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          passwordData.currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);

        // Update to new password
        await updatePassword(currentUser, passwordData.newPassword);

        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        alert('Password updated successfully! ✅');
      } catch (error: any) {
        console.error('Password update error:', error);
        if (error.code === 'auth/wrong-password') {
          alert('Current password is incorrect');
        } else if (error.code === 'auth/requires-recent-login') {
          alert('Please logout and login again to change password');
        } else {
          alert('Failed to update password. Please try again.');
        }
      }
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user?.email) return;

    const success = await setDefaultAddressInFirestore(user.email, id);
    if (success) {
      // Update local state
      setAddresses(addresses.map(addr => ({ ...addr, isDefault: addr.id === id })));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert('Failed to set default address. Please try again.');
    }
  };

  const deleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    const success = await deleteAddressFromFirestore(id);
    if (success) {
      // Update local state
      setAddresses(addresses.filter(addr => addr.id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert('Failed to delete address. Please try again.');
    }
  };

  // Load Wishlist from Firestore
  const loadWishlist = async () => {
    if (!user?.email) return;

    setWishlistLoading(true);
    try {
      const items = await getUserWishlist(user.email);
      setWishlistItems(items);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Remove from wishlist
  const handleRemoveFromWishlist = async (itemId: string) => {
    const success = await removeFromWishlist(itemId);
    if (success) {
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert('Failed to remove from wishlist. Please try again.');
    }
  };

  // Load wishlist when tab changes to wishlist
  useEffect(() => {
    if (activeTab === 'wishlist' && user?.email) {
      loadWishlist();
    }
  }, [activeTab, user?.email]);

  const addNewAddress = async () => {
    if (!newAddress.addressLine1 || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert('Please fill all required fields');
      return;
    }

    if (!user?.email) {
      alert('User not authenticated');
      return;
    }

    const address: Omit<Address, 'id'> = {
      name: newAddress.name || user.name || '',
      phone: newAddress.phone || user.phone || '',
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2,
      city: newAddress.city,
      state: newAddress.state,
      pincode: newAddress.pincode,
      isDefault: addresses.length === 0 ? true : (newAddress.isDefault || false)
    };

    const addressId = await addAddressToFirestore(user.email, address);

    if (addressId) {
      // Reload addresses from Firestore
      const updatedAddresses = await getUserAddresses(user.email);
      setAddresses(updatedAddresses);

      // Reset form
      setNewAddress({
        name: user.name || '',
        phone: user.phone || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
      setShowAddressForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert('Failed to add address. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    onNavigateHome();
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
                      value={user.email}
                      onChange={() => {}}
                      disabled={true}
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      value={isEditing ? editProfile.phone : (user.phone || addresses.find(addr => addr.isDefault)?.phone || addresses[0]?.phone || '')}
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

                  {!user.phone && addresses.length > 0 && !isEditing && (addresses.find(addr => addr.isDefault)?.phone || addresses[0]?.phone) && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                      ℹ️ Phone number shown from your {addresses.find(addr => addr.isDefault) ? 'default' : 'saved'} address
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                  {loadingOrders ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                      <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
                      <button
                        onClick={() => window.history.back()}
                        className="bg-rose-600 text-white px-6 py-3 rounded-xl hover:bg-rose-700 transition font-medium"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
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
                                  {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{order.items.length} item(s)</p>
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
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderDetails(true);
                                }}
                                className="text-rose-600 text-sm font-medium hover:underline"
                              >
                                View Details →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition text-sm font-medium"
                    >
                      {showAddressForm ? '✕ Cancel' : '+ Add New Address'}
                    </button>
                  </div>

                  {/* Add Address Form */}
                  {showAddressForm && (
                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-rose-200">
                      <h3 className="font-semibold text-gray-900 mb-4">New Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          label="Full Name"
                          value={newAddress.name || ''}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                        <FormInput
                          label="Phone Number"
                          value={newAddress.phone || ''}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          placeholder="Enter phone number"
                        />
                        <div className="md:col-span-2">
                          <FormInput
                            label="Address Line 1 *"
                            value={newAddress.addressLine1 || ''}
                            onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                            placeholder="House no., Building, Street"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <FormInput
                            label="Address Line 2"
                            value={newAddress.addressLine2 || ''}
                            onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                            placeholder="Landmark, Area (Optional)"
                          />
                        </div>
                        <FormInput
                          label="City *"
                          value={newAddress.city || ''}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          placeholder="Enter city"
                        />
                        <FormInput
                          label="State *"
                          value={newAddress.state || ''}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          placeholder="Enter state"
                        />
                        <FormInput
                          label="Pincode *"
                          value={newAddress.pincode || ''}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          placeholder="Enter pincode"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="defaultAddress"
                            checked={newAddress.isDefault || false}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                          />
                          <label htmlFor="defaultAddress" className="text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={addNewAddress}
                        className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition font-medium"
                      >
                        Save Address
                      </button>
                    </div>
                  )}

                  {/* Addresses List */}
                  {loadingAddresses ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading addresses...</p>
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Addresses</h3>
                      <p className="text-gray-600 mb-6">Add your delivery address for faster checkout</p>
                    </div>
                  ) : (
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
                  )}
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

                  {wishlistLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
                      <p className="mt-4 text-gray-600">Loading wishlist...</p>
                    </div>
                  ) : wishlistItems.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
                      <p className="text-gray-600 mb-6">Save your favorite products to buy them later!</p>
                      <button
                        onClick={() => window.location.href = '/shop'}
                        className="bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-700 transition"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="aspect-video overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{item.name}</h3>
                            <p className="text-rose-600 font-bold mb-3">₹{item.price.toLocaleString()}</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  // Will be connected to cart functionality
                                  alert('Add to cart functionality will be connected soon!');
                                }}
                                className="flex-1 bg-rose-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-rose-700 transition"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                title="Remove from wishlist"
                              >
                                <X className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Order Details</h3>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Information</h4>
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <span className="font-semibold">Order ID:</span> {selectedOrder.id}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Date:</span>{' '}
                      {new Date(selectedOrder.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Payment Method:</span> {selectedOrder.paymentMethod}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Payment Status:</span>{' '}
                      <span className={`px-2 py-1 rounded text-sm ${selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status === 'Pending' && <Clock className="w-4 h-4" />}
                        {selectedOrder.status === 'Processing' && <Package className="w-4 h-4" />}
                        {selectedOrder.status === 'Shipped' && <Truck className="w-4 h-4" />}
                        {selectedOrder.status === 'Delivered' && <CheckCircle2 className="w-4 h-4" />}
                        {selectedOrder.status}
                      </span>
                    </div>
                    {selectedOrder.trackingId && (
                      <div className="flex items-center gap-2 text-gray-600 bg-blue-50 p-3 rounded-lg">
                        <Truck className="w-4 h-4" />
                        <div>
                          <p className="text-xs text-gray-500">Tracking ID</p>
                          <p className="text-sm font-semibold">{selectedOrder.trackingId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Shipping Address
                </h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="font-semibold text-gray-900">{selectedOrder.shippingAddress.name}</p>
                  <p className="text-gray-700">{selectedOrder.shippingAddress.phone}</p>
                  <p className="text-gray-700 mt-2">
                    {selectedOrder.shippingAddress.addressLine1}
                    {selectedOrder.shippingAddress.addressLine2 && `, ${selectedOrder.shippingAddress.addressLine2}`}
                  </p>
                  <p className="text-gray-700">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{item.product.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          Color: {item.color} | Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Order Summary</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Charges:</span>
                    <span>₹{selectedOrder.shippingCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Notes</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-4">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
