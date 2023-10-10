import { z } from 'zod';

export const signUpBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name:   z.string().min(2),
    avatar: z.number().min(1).max(12),
});

export type SignUpBody = z.infer<typeof signUpBody>;
