"use client"

import React, { useState, useEffect } from 'react';
import { CartItem, Address } from '@/app/types';
import { useAuth } from '@/app/contexts/AuthContext';
import { getUserAddresses } from '@/app/services/addressService';
import { Package, MapPin, CreditCard, Truck, ChevronLeft, Plus, Edit2 } from 'lucide-react';

type CheckoutPageProps = {
  cart: CartItem[];
  convertPrice: (price: number) => string;
  onBackToCart: () => void;
  onOrderSuccess: () => void;
};

export default function CheckoutPage({
  cart,
  convertPrice,
  onBackToCart,
  onOrderSuccess
}: CheckoutPageProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Razorpay' | 'UPI'>('COD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Load user addresses
  useEffect(() => {
    const loadAddresses = async () => {
      if (user?.email) {
        const userAddresses = await getUserAddresses(user.email);
        setAddresses(userAddresses);

        // Select default address
        const defaultAddr = userAddresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddress(defaultAddr);
        } else if (userAddresses.length > 0) {
          setSelectedAddress(userAddresses[0]);
        }
      }
    };
    loadAddresses();
  }, [user]);

  // Calculate prices
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCharges = subtotal > 5000 ? 0 : 100; // Free shipping above ₹5000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCharges + tax;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    if (!user) {
      alert('Please login to place order');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        userPhone: user.phone,
        items: cart,
        shippingAddress: selectedAddress,
        subtotal,
        shippingCharges,
        tax,
        total,
        paymentMethod,
        status: 'Pending' as const,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' as const : 'Pending' as const,
      };

      // For Razorpay, we'll implement later
      if (paymentMethod === 'Razorpay') {
        // TODO: Integrate Razorpay
        alert('Razorpay integration coming soon! Please use COD for now.');
        setIsProcessing(false);
        return;
      }

      // Create order in Firestore
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        onOrderSuccess();
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBackToCart}
          className="flex items-center text-gray-600 hover:text-rose-600 transition"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Cart
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-rose-600" />
                Delivery Address
              </h2>
              <button
                onClick={() => setShowAddressForm(true)}
                className="text-rose-600 hover:text-rose-700 flex items-center text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add New
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No saved addresses. Please add one to continue.</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition"
                >
                  Add Address
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      selectedAddress?.id === address.id
                        ? 'border-rose-600 bg-rose-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900">{address.name}</p>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {address.addressLine1}
                          {address.addressLine2 && `, ${address.addressLine2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                      <input
                        type="radio"
                        checked={selectedAddress?.id === address.id}
                        onChange={() => setSelectedAddress(address)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-4">
              <CreditCard className="w-5 h-5 mr-2 text-rose-600" />
              Payment Method
            </h2>

            <div className="space-y-3">
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                  />
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('Razorpay')}
                className={`border-2 rounded-lg p-4 cursor-pointer transition opacity-50 ${
                  paymentMethod === 'Razorpay'
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Online Payment</p>
                    <p className="text-sm text-gray-600">UPI, Cards, Net Banking (Coming Soon)</p>
                  </div>
                  <input
                    type="radio"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={() => setPaymentMethod('Razorpay')}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-rose-600" />
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.color} | {item.size}
                    </p>
                    <p className="text-sm text-gray-900 mt-1">
                      {convertPrice(item.product.price)} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 py-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{convertPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shippingCharges === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    convertPrice(shippingCharges)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span className="text-gray-900">{convertPrice(tax)}</span>
              </div>
              {subtotal < 5000 && (
                <div className="flex items-center gap-1 text-xs text-gray-500 pt-2">
                  <Truck className="w-3 h-3" />
                  <span>Add {convertPrice(5000 - subtotal)} more for FREE shipping</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 border-t-2 border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-rose-600">{convertPrice(total)}</span>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !selectedAddress}
              className={`w-full py-3 rounded-lg font-semibold transition shadow-lg ${
                isProcessing || !selectedAddress
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By placing order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
