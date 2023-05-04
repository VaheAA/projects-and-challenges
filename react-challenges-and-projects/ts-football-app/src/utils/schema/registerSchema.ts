import { z } from 'zod';

export const userRegisterSchema = z.object({
  username: z.string().min(3, { message: 'Username must be not less than 3 characters' }),
  email: z.string().email({ message: 'Please provide valid email' }),
  password: z.string().min(6, { message: "Please provide password at least 6 characters long" })
});


export type UserRegisterType = z.infer<typeof userRegisterSchema>;