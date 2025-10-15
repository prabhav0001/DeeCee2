/**
 * Address Service - Firebase Firestore Integration
 * Handles CRUD operations for user addresses
 */

import { db } from '@/app/config/firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { Address } from '@/app/types';

const ADDRESSES_COLLECTION = 'addresses';

/**
 * Get all addresses for a user
 */
export const getUserAddresses = async (userEmail: string): Promise<Address[]> => {
  try {
    const addressesRef = collection(db, ADDRESSES_COLLECTION);
    const q = query(addressesRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    const addresses: Address[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      addresses.push({
        id: doc.id,
        name: data.name,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        isDefault: data.isDefault || false,
      });
    });

    return addresses;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};

/**
 * Add a new address
 */
export const addAddress = async (userEmail: string, address: Omit<Address, 'id'>): Promise<string | null> => {
  try {
    const addressId = `ADD${Date.now()}`;
    const addressRef = doc(db, ADDRESSES_COLLECTION, addressId);

    // If this is set as default, update all other addresses to non-default
    if (address.isDefault) {
      await setAllAddressesNonDefault(userEmail);
    }

    await setDoc(addressRef, {
      ...address,
      userEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Address added to Firestore:', addressId);
    return addressId;
  } catch (error) {
    console.error('❌ Error adding address:', error);
    return null;
  }
};

/**
 * Update an existing address
 */
export const updateAddress = async (addressId: string, updates: Partial<Address>): Promise<boolean> => {
  try {
    const addressRef = doc(db, ADDRESSES_COLLECTION, addressId);

    await updateDoc(addressRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Address updated in Firestore:', addressId);
    return true;
  } catch (error) {
    console.error('❌ Error updating address:', error);
    return false;
  }
};

/**
 * Delete an address
 */
export const deleteAddress = async (addressId: string): Promise<boolean> => {
  try {
    const addressRef = doc(db, ADDRESSES_COLLECTION, addressId);
    await deleteDoc(addressRef);

    console.log('✅ Address deleted from Firestore:', addressId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting address:', error);
    return false;
  }
};

/**
 * Set an address as default (and unset others)
 */
export const setDefaultAddress = async (userEmail: string, addressId: string): Promise<boolean> => {
  try {
    // First, set all addresses to non-default
    await setAllAddressesNonDefault(userEmail);

    // Then set the selected address as default
    const addressRef = doc(db, ADDRESSES_COLLECTION, addressId);
    await updateDoc(addressRef, {
      isDefault: true,
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Default address set in Firestore:', addressId);
    return true;
  } catch (error) {
    console.error('❌ Error setting default address:', error);
    return false;
  }
};

/**
 * Helper: Set all user addresses to non-default
 */
const setAllAddressesNonDefault = async (userEmail: string): Promise<void> => {
  try {
    const addressesRef = collection(db, ADDRESSES_COLLECTION);
    const q = query(addressesRef, where('userEmail', '==', userEmail), where('isDefault', '==', true));
    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map((docSnapshot) =>
      updateDoc(docSnapshot.ref, { isDefault: false, updatedAt: serverTimestamp() })
    );

    await Promise.all(updatePromises);
  } catch (error) {
    console.error('❌ Error updating addresses:', error);
  }
};

/**
 * Get a single address by ID
 */
export const getAddressById = async (addressId: string): Promise<Address | null> => {
  try {
    const addressRef = doc(db, ADDRESSES_COLLECTION, addressId);
    const addressDoc = await getDoc(addressRef);

    if (addressDoc.exists()) {
      const data = addressDoc.data();
      return {
        id: addressDoc.id,
        name: data.name,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        isDefault: data.isDefault || false,
      };
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching address:', error);
    return null;
  }
};
