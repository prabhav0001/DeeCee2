# DEECEE HAIR - Premium Hair Extensions E-Commerce

A modern, full-featured e-commerce web application for premium hair extensions built with Next.js 15, React 19, and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🌟 Features

- **Single-Page Application (SPA)**: Smooth navigation using History API
- **SEO Optimized**: Full SEO implementation with structured data, sitemap, robots.txt
  - ✅ Open Graph & Twitter Card metadata
  - ✅ JSON-LD structured data (Organization, WebSite)
  - ✅ Auto-generated sitemap with product pages
  - ✅ Security headers and performance optimization
  - ✅ PWA manifest for mobile installation
- **Firebase Authentication**: Secure email authentication with real email verification
- **Password Reset**: Forgot password functionality with Firebase email reset
- **Product Catalog**: Browse straight, wavy, curly, and men's hair extensions
- **Shopping Cart**: Full cart management with quantity controls
- **Wishlist Feature**: Save favorite products with Firestore cloud persistence
  - ✅ Add/remove from shop and product pages
  - ✅ Heart icon visual indicators
  - ✅ Profile page wishlist management
  - ✅ Auto-sync across devices
- **User Profile**: Manage profile, orders, addresses, and wishlist
- **Appointment Booking**: Schedule consultations with backend integration
  - ✅ Email confirmations with professional HTML templates (SendGrid)
  - ✅ Google Calendar integration
  - ✅ Real-time slot availability
- **Admin Panel**: Secure admin dashboard with separate authentication
  - ✅ Role-based access control (admin, superadmin)
  - ✅ Dashboard with statistics overview
  - ✅ Protected routes with Firestore verification
  - ✅ Manage products, orders, users, and appointments
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Beautiful components with Lucide React icons
- **Backend Integration**: API routes for appointments and email notifications

## 📁 Project Structure

```
app/
├── api/                     # API routes (Next.js Route Handlers)
│   ├── admin/
│   │   └── stats/
│   │       └── route.ts    # Admin statistics API
│   ├── appointments/
│   │   └── route.ts        # Appointment CRUD API
│   └── send-email/
│       └── route.ts        # SendGrid email API
├── components/
│   └── common/              # Reusable UI components
│       ├── FormInput.tsx
│       ├── FilterButton.tsx
│       ├── IconButton.tsx
│       ├── FeatureCard.tsx
│       ├── PromoSlider.tsx
│       └── index.ts         # Barrel export
├── config/
│   └── firebase.ts          # Firebase configuration
├── pages/                   # Page components
│   ├── ShopPage.tsx
│   ├── ProductPage.tsx
│   ├── CartPage.tsx
│   ├── ContactPage.tsx
│   ├── AppointmentPage.tsx  # With backend integration
│   ├── ProfilePage.tsx
│   ├── AboutUsPage.tsx
│   ├── TermsPage.tsx
│   ├── PrivacyPolicyPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   ├── VerificationPage.tsx
│   ├── AdminLoginPage.tsx   # Admin login
│   └── AdminDashboardPage.tsx # Admin dashboard
├── services/
│   └── appointmentService.ts # Backend integration service
├── contexts/
│   ├── AuthContext.tsx      # Firebase authentication context
│   └── AdminAuthContext.tsx # Admin authentication context
├── hooks/
│   └── use-form-validation.ts  # Form validation hooks
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   └── adminSetup.ts        # Admin setup utilities
├── constants/
│   └── products.ts          # Product data and constants
├── layout.tsx               # Root layout
├── page.tsx                 # Main SPA controller
└── globals.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Deepak5310/DeeCee2.git
   cd DeeCee2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup Firebase Authentication**:

   See **[FIREBASE_QUICKSTART.md](FIREBASE_QUICKSTART.md)** for a 5-minute setup guide, or **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** for detailed instructions.

   Quick setup:
   - Create Firebase project at https://console.firebase.google.com/
   - Enable Email/Password authentication
   - Copy your Firebase config
   - Create `.env.local` file (use `.env.example` as template)
   - Add your Firebase credentials

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build for production with Turbopack
npm start      # Start production server
```

## 🏗️ Architecture

### Navigation System

This app uses a **custom SPA navigation** system instead of Next.js file-based routing:

- **State-driven routing**: Navigation managed via `currentPage` state in `app/page.tsx`
- **History API**: Uses `window.history.pushState` for browser history
- **Route mapping**: Centralized route configuration in `app/page.tsx`

### Authentication

- **Firebase Authentication**: Production-ready authentication system
- **Email Verification**: Real email verification with Firebase
- **Secure Password Storage**: Firebase handles password hashing
- **Protected Routes**: Profile page requires authentication
- **Session Management**: Firebase manages user sessions automatically

🔐 **Setup Required**: See [FIREBASE_QUICKSTART.md](FIREBASE_QUICKSTART.md) for authentication setup.

### State Management

- **React Context**: Authentication state via `AuthContext`
- **Local State**: Cart, appointments, and UI state in `page.tsx`
- **Firebase Firestore**: User addresses stored in cloud database
- **localStorage**: Cart data and session persistence

### Database

- **Firebase Firestore**: NoSQL cloud database for user data
  - User addresses with CRUD operations
  - Secure data access with Firestore security rules
  - Real-time synchronization across devices

🔥 **Setup Required**: See [FIRESTORE_SETUP.md](FIRESTORE_SETUP.md) for database configuration.

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first CSS framework
- **Geist Font**: Next.js font optimization
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Smooth transitions and hover effects

## 📝 Code Conventions

### File Naming

- **Components**: PascalCase (e.g., `FormInput.tsx`, `ShopPage.tsx`)
- **Hooks**: kebab-case with `use-` prefix (e.g., `use-form-validation.ts`)
- **Types**: `index.ts` in directories
- **Constants**: kebab-case (e.g., `products.ts`)

### Import Paths

Use absolute imports with the `@/app/` alias:

```typescript
// ✅ Correct
import { FormInput } from "@/app/components/common";
import { Product } from "@/app/types";
import { useFormValidation } from "@/app/hooks/use-form-validation";

// ❌ Avoid
import { FormInput } from "../components/common";
import { Product } from "./types";
```

## 🛠️ Development Guide

### Adding a New Page

1. Create component in `app/pages/`:
   ```typescript
   // app/pages/NewPage.tsx
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

2. Add to type definitions in `app/types/index.ts`:
   ```typescript
   export type Page = "home" | "shop" | "new-page" | ...;
   ```

3. Update route maps in `app/page.tsx`:
   ```typescript
   const routeToPage: Record<string, Page> = {
     '/new-page': 'new-page',
     // ...
   };

   const pageRoutes: Record<Page, string> = {
     'new-page': '/new-page',
     // ...
   };
   ```

4. Add conditional rendering in `app/page.tsx`:
   ```typescript
   {currentPage === "new-page" && <NewPage />}
   ```

### Adding a New Component

1. Create component in `app/components/common/`:
   ```typescript
   // app/components/common/NewComponent.tsx
   export const NewComponent = () => {
     return <div>New Component</div>;
   };
   ```

2. Export from barrel file `app/components/common/index.ts`:
   ```typescript
   export { NewComponent } from './NewComponent';
   ```

3. Import and use:
   ```typescript
   import { NewComponent } from "@/app/components/common";
   ```

### Form Validation

Use the built-in validation hooks:

```typescript
import { useFormValidation } from "@/app/hooks/use-form-validation";

const errors = useFormValidation({ name, email, phone });
```

## 📦 Dependencies

### Core
- **Next.js** 15.5.4 - React framework with App Router
- **React** 19.1.0 - UI library
- **React DOM** 19.1.0 - React rendering
- **Firebase** (latest) - Authentication & backend services

### UI
- **Tailwind CSS** 4 - Utility-first CSS framework
- **Lucide React** 0.544.0 - Beautiful icon library

### Development
- **TypeScript** 5 - Type safety
- **@tailwindcss/postcss** 4 - Tailwind PostCSS plugin

## 📚 Documentation

### Getting Started
- **[GETTING_STARTED.md](GETTING_STARTED.md)**: Complete overview and quick start guide

### Firebase Setup
- **[FIREBASE_QUICKSTART.md](FIREBASE_QUICKSTART.md)**: Quick 5-minute Firebase setup guide
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**: Detailed Firebase authentication setup
- **[FIREBASE_CHECKLIST.md](FIREBASE_CHECKLIST.md)**: Interactive setup checklist
- **[PASSWORD_RESET_GUIDE.md](PASSWORD_RESET_GUIDE.md)**: Password reset feature documentation

### Email Integration
- **[SENDGRID_SETUP.md](SENDGRID_SETUP.md)**: SendGrid email setup guide (3 minutes)

### Deployment
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)**: Complete Vercel deployment guide with environment variables

### Troubleshooting
- Check environment variables in `.env.local`
- Ensure Firebase configuration is correct
- Verify SendGrid API key and sender email are set up
- See console logs for debugging

### Development
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)**: AI coding assistant guide

### Admin Panel
- **[ADMIN_SETUP.md](ADMIN_SETUP.md)**: Complete admin panel setup and management guide

## 🚧 Roadmap

- [x] Firebase Authentication with email verification
- [x] Password reset functionality
- [x] Appointment booking with backend integration
- [x] Email confirmations with SendGrid (100 emails/day free)
- [x] Google Calendar integration
- [x] Firebase Firestore for user addresses
- [x] **Wishlist functionality with Firestore persistence**
- [x] **Admin panel with role-based access control**
- [x] **Admin dashboard with statistics overview**
- [ ] Social authentication (Google, Facebook)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Order management system in admin panel
- [ ] Product management in admin panel
- [ ] Product reviews and ratings
- [ ] Search functionality
- [ ] Order history in Firestore
- [ ] Analytics integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Hosting platform

## 📞 Contact

**DEECEE HAIR**
- Email: sumiteximjjn@gmail.com
- Phone: +91 63764 82804
- Location: Swastik Tower, Jhunjhunu, Rajasthan

---

Built with ❤️ using Next.js, React, and Tailwind CSS
