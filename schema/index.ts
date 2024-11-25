import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6)
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
      message:
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
    }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const VerificationSchema = z.object({
  otp: z.string().max(6, {
    message: "Otp is required",
  }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
    confirmPassword: z
      .string()
      .min(6)
      .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
        message:
          "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
