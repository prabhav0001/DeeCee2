# DEECEE HAIR - Premium Hair Extensions E-Commerce

A modern, full-featured e-commerce web application for premium hair extensions built with Next.js 15, React 19, and Tailwind CSS 4.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🌟 Features

- **Single-Page Application (SPA)**: Smooth navigation using History API
- **Firebase Authentication**: Secure email authentication with real email verification
- **Product Catalog**: Browse straight, wavy, curly, and men's hair extensions
- **Shopping Cart**: Full cart management with quantity controls
- **User Profile**: Manage profile, orders, addresses, and wishlist
- **Appointment Booking**: Schedule consultations at various locations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Beautiful components with Lucide React icons

## 📁 Project Structure

```
app/
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
│   ├── AppointmentPage.tsx
│   ├── ProfilePage.tsx
│   ├── AboutUsPage.tsx
│   ├── TermsPage.tsx
│   ├── PrivacyPolicyPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── VerificationPage.tsx
├── contexts/
│   └── AuthContext.tsx      # Firebase authentication context
├── hooks/
│   └── use-form-validation.ts  # Form validation hooks
├── types/
│   └── index.ts             # TypeScript type definitions
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
- **localStorage**: User data and session persistence

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

- **[FIREBASE_QUICKSTART.md](FIREBASE_QUICKSTART.md)**: Quick 5-minute Firebase setup guide
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**: Detailed Firebase authentication setup
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)**: AI coding assistant guide

## 🚧 Roadmap

- [x] Firebase Authentication with email verification
- [ ] Password reset functionality
- [ ] Social authentication (Google, Facebook)
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Order management system
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Search functionality
- [ ] Wishlist persistence
- [ ] Email notifications
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
