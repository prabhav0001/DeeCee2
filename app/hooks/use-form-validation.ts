import { useMemo } from "react";
import { createFormErrors } from "@/app/types";

// Custom hook for form validation
export const useFormValidation = (fields: Record<string, any>) => {
  return useMemo(() => createFormErrors(fields), [fields]);
};

// Custom hook for email/phone validation specifically
export const useAuthValidation = (name: string, email: string, phone: string, password?: string, confirmPassword?: string) => {
  return useMemo(() => {
    const fields: Record<string, any> = { name, email, phone };
    if (password !== undefined) fields.password = password;
    if (confirmPassword !== undefined) fields.confirmPassword = confirmPassword;
    return createFormErrors(fields);
  }, [name, email, phone, password, confirmPassword]);
};

// Custom hook for contact form validation
export const useContactValidation = (name: string, email: string, phone: string, message: string, consent: boolean) => {
  return useMemo(() => {
    const errors = createFormErrors({ name, email, phone, message });
    if (!consent) errors.consent = "Please accept to be contacted";
    return errors;
  }, [name, email, phone, message, consent]);
};