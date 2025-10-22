/**
 * Admin Products API Route Handler
 * Handles CRUD operations for product management in admin dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Product } from '@/app/types';

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
 * GET /api/admin/products
 * Fetch all products from Firestore
 * Query params: category, search, page, limit
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryFilter = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const db = getFirestore();
    const productsRef = db.collection('products');

    // Fetch all products
    const snapshot = await productsRef.orderBy('id', 'asc').get();

    let products: Product[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: data.id || parseInt(doc.id),
        name: data.name || '',
        price: data.price || 0,
        image: data.image || '',
        images: data.images || [data.image || ''],
        colors: data.colors || [],
        sizes: data.sizes || [],
        category: data.category || '',
        description: data.description || '',
        isBestseller: data.isBestseller || false,
        isNew: data.isNew || false,
        isMans: data.isMans || false,
      });
    });

    // Filter by category
    if (categoryFilter !== 'all') {
      products = products.filter((product) => product.category === categoryFilter);
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower)
      );
    }

    // Calculate statistics
    const stats = {
      total: products.length,
      bestsellers: products.filter((p) => p.isBestseller).length,
      newProducts: products.filter((p) => p.isNew).length,
      categories: [...new Set(products.map((p) => p.category))].length,
    };

    // Pagination
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        products: paginatedProducts,
        stats,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching products:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'price', 'image', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const db = getFirestore();
    const productsRef = db.collection('products');

    // Get the highest product ID
    const snapshot = await productsRef.orderBy('id', 'desc').limit(1).get();
    let newId = 1;
    if (!snapshot.empty) {
      const lastProduct = snapshot.docs[0].data();
      newId = (lastProduct.id || 0) + 1;
    }

    // Prepare product data
    const product: Product = {
      id: newId,
      name: body.name,
      price: parseFloat(body.price),
      image: body.image,
      images: body.images || [body.image],
      colors: body.colors || [],
      sizes: body.sizes || [],
      category: body.category,
      description: body.description || '',
      isBestseller: body.isBestseller || false,
      isNew: body.isNew || false,
      isMans: body.isMans || false,
    };

    // Save to Firestore
    await productsRef.doc(newId.toString()).set(product);

    console.log('✅ Product created in Firestore:', newId);

    return NextResponse.json(
      {
        success: true,
        product,
        message: 'Product created successfully',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/products
 * Update an existing product
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, ...updates } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing productId',
        },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const productRef = db.collection('products').doc(productId.toString());

    // Check if product exists
    const doc = await productRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Update product
    await productRef.update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    console.log('✅ Product updated in Firestore:', productId);

    return NextResponse.json(
      {
        success: true,
        message: 'Product updated successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/products
 * Delete a product
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing product ID',
        },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const productRef = db.collection('products').doc(productId);

    // Check if product exists
    const doc = await productRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    // Delete product
    await productRef.delete();

    console.log('✅ Product deleted from Firestore:', productId);

    return NextResponse.json(
      {
        success: true,
        message: 'Product deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete product',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
