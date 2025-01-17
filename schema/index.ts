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

export const ProfileSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  bio: z
    .string()
    .min(1, {
      message: "Bio is required",
    })
    .max(100, {
      message: "Maximum words limit is 100.",
    }),
  githubLink: z.string().url().optional().or(z.literal("")),
  instaLink: z.string().url().optional().or(z.literal("")),
  mailLink: z.string().email().optional().or(z.literal("")),
  facebookLink: z.string().url().optional().or(z.literal("")),
  linkedinLink: z.string().url().optional().or(z.literal("")),
});

export const ChangePasswordSchme = z.object({
  currentPassword: z.string().min(6),
  newPassword: z
    .string()
    .min(6)
    .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
      message:
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
    }),
});

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  categories: z
    .array(
      z.union([
        z.string(),
        z.object({
          value: z.string(),
          label: z.string().optional(),
        }),
      ])
    )
    .min(1, "At least one category is required"),
  tags: z
    .array(
      z.union([
        z.string(),
        z.object({
          value: z.string(),
          label: z.string().optional(),
        }),
      ])
    )
    .min(1, "At least one category is required"),
});

export const SiteSettingSchema = z.object({
  accentColor: z.string().min(4, "Accent Color must be provided"),
  gradientStart: z.string().min(4, "Gradient Start Color must be provided"),
  gradientEnd: z.string().min(4, "Gradient End Color must be provided"),
  heroDescription: z
    .string()
    .min(30, "Description must be atleast 30 characters"),
  heroTitle: z.string().min(20, "Title must be atleast 20 characters"),
  siteName: z.string().min(3, "Site name is required"),
});

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),

  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});
