import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Please provide valid email' }),
  password: z.string().min(6, { message: "Please provide password at least 6 characters long" })
});


export type UserLoginType = z.infer<typeof userLoginSchema>;