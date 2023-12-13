import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(10, "Password must be atleast 10 characters"),
    confirmPassword: z.string(),
    attributes: z.array(
      z.object({ _id: z.string().min(1), attributeName: z.string().min(1) })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
