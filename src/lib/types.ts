import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(3)
      .max(8)
      .describe("Password must be between 3 and 8 characters."),
    passwordConfirm: z
      .string()
      .min(3)
      .max(8)
      .describe("Password must be between 3 and 8 characters."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });


export const createWorkspaceSchema = z.object({
  name: z.string().min(3).max(80),
  logo: z.any(),
});