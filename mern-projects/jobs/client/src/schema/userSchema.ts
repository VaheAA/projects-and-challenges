import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be provided" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  email:
    z.string().email({ message: "Invalid email address" })
});


export type User = z.infer<typeof userSchema>;