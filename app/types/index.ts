// Shared types for the DEECEE HAIR application

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isMans?: boolean;
};

export type CartItem = {
  product: Product;
  color: string;
  size: string;
  quantity: number;
};

export type Appointment = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export type Page = "home" | "shop" | "product" | "cart" | "contact" | "appointment" | "terms" | "privacy" | "about" | "profile";

export type ReelVideo = {
  id: number;
  src: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
};

export type Order = {
  id: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: number;
  trackingId?: string;
};

export type Address = {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export type ProfileTab = "profile" | "orders" | "addresses" | "security" | "wishlist";

// Common form validation patterns
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\d{10}$/;

// Common UI component props
export type FormInputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

export type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

// Form validation helper
export const createFormErrors = (fields: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (fields.name !== undefined && !fields.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (fields.email !== undefined && !EMAIL_REGEX.test(fields.email)) {
    errors.email = "Enter a valid email";
  }

  if (fields.phone !== undefined && !PHONE_REGEX.test(fields.phone.replace(/\D/g, ""))) {
    errors.phone = "Enter a 10-digit phone number";
  }

  if (fields.message !== undefined && fields.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }

  if (fields.password !== undefined && fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (fields.confirmPassword !== undefined && fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};