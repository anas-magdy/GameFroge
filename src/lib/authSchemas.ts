import { z } from "zod";

// Password validation regex: at least 1 uppercase, 1 lowercase, 1 number, and 1 special character
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// Common validation transformations
const emailValidation = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address");
const passwordValidation = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(
    PASSWORD_REGEX,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

// Login schema
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Registration schema
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type RegisterSchema = z.infer<typeof registerSchema>;
