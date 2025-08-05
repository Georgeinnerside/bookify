import { z } from "zod";

// registration schema
export const RegistrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "must contain at least one letter." })
      .regex(/[0-9]/, { message: "must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "must contain at least one special character",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;

// login schema
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
