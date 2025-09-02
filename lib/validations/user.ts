import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .min(2, { error: "Name must be at least 2 characters long." }),
  email: z.email({ error: "Enter a valid email." }),
  password: z
    .string({ error: "Password is required." })
    .min(8, { error: "Password should be at least 8 characters long." })
    .max(100, { error: "Password should be less than 100 characters long." }),
});

export type SignupInput = z.infer<typeof signupSchema>;
