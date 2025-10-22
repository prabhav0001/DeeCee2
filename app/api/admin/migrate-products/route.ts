/**
 * Product Migration API
 * Migrates products from constants/products.ts to Firestore
 * Run this once to populate Firestore with initial products
 */

import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { products } from '@/app/constants/products';

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

/**
 * POST /api/admin/migrate-products
 * Migrate all products from constants to Firestore
 */
export async function POST(request: NextRequest) {
  try {
    const db = getFirestore();
    const productsRef = db.collection('products');
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    // Check if products already exist and migrate
    for (const product of products) {
      try {
        const docRef = productsRef.doc(product.id.toString());
        const doc = await docRef.get();
        
        if (doc.exists) {
          console.log(`Product ${product.id} already exists, skipping...`);
          skippedCount++;
          continue;
        }
        
        // Add product to Firestore
        await docRef.set({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          images: product.images || [product.image],
          colors: product.colors || [],
          sizes: product.sizes || [],
          category: product.category,
          description: product.description || '',
          isBestseller: product.isBestseller || false,
          isNew: product.isNew || false,
          isMans: product.isMans || false,
          createdAt: new Date().toISOString(),
        });
        
        migratedCount++;
        console.log(`✅ Migrated product ${product.id}: ${product.name}`);
      } catch (error) {
        console.error(`Error migrating product ${product.id}:`, error);
      }
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Product migration completed',
        stats: {
          total: products.length,
          migrated: migratedCount,
          skipped: skippedCount,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error during migration:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Migration failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/migrate-products
 * Check migration status
 */
export async function GET(request: NextRequest) {
  try {
    const db = getFirestore();
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    
    return NextResponse.json(
      {
        success: true,
        firestoreCount: snapshot.size,
        constantsCount: products.length,
        needsMigration: snapshot.size < products.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error checking migration status:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check migration status',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
