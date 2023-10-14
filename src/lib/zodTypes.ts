import { z } from 'zod';

export const signUpBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name:   z.string().min(2),
    avatar: z.number().min(1).max(12),
});

export type signUpBodyType = z.infer<typeof signUpBody>;


export const signInBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type signInBodyType = z.infer<typeof signInBody>;


export const userDetails = z.object({
    email: z.string().email(),
    name:   z.string().min(2),
    avatar: z.number().min(1).max(12),
})
export type userDetailsType = z.infer<typeof userDetails>;


export const tweet = z.object({
    autherId: z.number(),
    content: z.string().max(129),
    createdAt: z.date(),
})

export type tweetType = z.infer<typeof tweet>;

