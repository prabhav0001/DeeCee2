/**
 * Wishlist Service - Firebase Firestore Integration
 *
 * Manages user wishlist items with CRUD operations.
 * Each user's wishlist is stored in Firestore with their email as the identifier.
 */

import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/app/config/firebase';

export type WishlistItem = {
  id: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  addedAt: Date;
};

type FirestoreWishlistItem = {
  userEmail: string;
  productId: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  addedAt: Timestamp;
};

/**
 * Get all wishlist items for a user
 */
export async function getUserWishlist(userEmail: string): Promise<WishlistItem[]> {
  try {
    console.log('📖 Fetching wishlist for:', userEmail);

    const wishlistRef = collection(db, 'wishlists');
    const q = query(wishlistRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    const wishlistItems: WishlistItem[] = querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreWishlistItem;
      return {
        id: doc.id,
        productId: data.productId,
        name: data.name,
        price: data.price,
        image: data.image,
        category: data.category,
        addedAt: data.addedAt?.toDate() || new Date()
      };
    });

    console.log('✅ Wishlist fetched:', wishlistItems.length, 'items');
    return wishlistItems;
  } catch (error) {
    console.error('❌ Error fetching wishlist:', error);
    return [];
  }
}

/**
 * Add product to wishlist
 */
export async function addToWishlist(
  userEmail: string,
  productId: number,
  name: string,
  price: number,
  image: string,
  category?: string
): Promise<string | null> {
  try {
    console.log('➕ Adding to wishlist:', { userEmail, productId, name });

    // Check if already exists
    const existingItems = await getUserWishlist(userEmail);
    const alreadyExists = existingItems.some(item => item.productId === productId);

    if (alreadyExists) {
      console.log('⚠️ Product already in wishlist');
      return null;
    }

    const wishlistRef = collection(db, 'wishlists');
    const docRef = await addDoc(wishlistRef, {
      userEmail,
      productId,
      name,
      price,
      image,
      category,
      addedAt: serverTimestamp()
    });

    console.log('✅ Added to wishlist with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error adding to wishlist:', error);
    return null;
  }
}

/**
 * Remove product from wishlist
 */
export async function removeFromWishlist(wishlistItemId: string): Promise<boolean> {
  try {
    console.log('🗑️ Removing from wishlist:', wishlistItemId);

    const wishlistRef = doc(db, 'wishlists', wishlistItemId);
    await deleteDoc(wishlistRef);

    console.log('✅ Removed from wishlist');
    return true;
  } catch (error) {
    console.error('❌ Error removing from wishlist:', error);
    return false;
  }
}

/**
 * Check if product is in wishlist
 */
export async function isInWishlist(userEmail: string, productId: number): Promise<boolean> {
  try {
    const wishlistItems = await getUserWishlist(userEmail);
    return wishlistItems.some(item => item.productId === productId);
  } catch (error) {
    console.error('❌ Error checking wishlist:', error);
    return false;
  }
}

/**
 * Get wishlist item ID for a product
 */
export async function getWishlistItemId(userEmail: string, productId: number): Promise<string | null> {
  try {
    const wishlistItems = await getUserWishlist(userEmail);
    const item = wishlistItems.find(item => item.productId === productId);
    return item?.id || null;
  } catch (error) {
    console.error('❌ Error getting wishlist item ID:', error);
    return null;
  }
}
