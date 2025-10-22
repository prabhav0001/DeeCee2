# Firebase Admin SDK Setup Guide

To fetch real users from Firebase Authentication, you need to set up Firebase Admin SDK with a service account.

## Step 1: Get Firebase Service Account

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: "DeeCee Hair"
3. **Click Settings (gear icon)** → **Project Settings**
4. **Navigate to "Service Accounts" tab**
5. **Click "Generate new private key"** button
6. **Download the JSON file** (keep it secure!)

## Step 2: Add Environment Variables

Open your `.env.local` file and add these variables:

```env
# Existing Firebase Client Config (already set)
NEXT_PUBLIC_FIREBASE_API_KEY=your_existing_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_existing_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_existing_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_existing_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_existing_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_existing_app_id

# NEW: Firebase Admin SDK (add these)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

## Step 3: Extract from Service Account JSON

The downloaded JSON file looks like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  ...
}
```

**Copy these values:**
- `client_email` → `FIREBASE_CLIENT_EMAIL`
- `private_key` → `FIREBASE_PRIVATE_KEY` (keep the quotes and newlines)

## Step 4: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## Step 5: Test

Navigate to admin dashboard users page:
http://localhost:3000/admin/dashboard → Click "Users" tab

You should now see real users from Firebase Authentication!

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env.local` to git
- Never share your private key publicly
- Keep the service account JSON file secure
- Add `.env.local` to `.gitignore` (already done)

---

## Alternative: Simple Approach (if service account setup is complex)

If you want to avoid Firebase Admin SDK for now, you can:
1. Store user data in Firestore during signup
2. Fetch from Firestore `users` collection instead
3. Update the API to use client SDK (already configured)

Let me know if you need help with the alternative approach!
