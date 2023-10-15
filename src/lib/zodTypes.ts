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


export const likeReq = z.object({
    liked: z.boolean(),
    tweetId: z.number(),
})

export type likeType = z.infer<typeof likeReq>;

export const tweet = z.object({
    id: z.number(),
    tweet: z.string().max(129),
    createdAt: z.date(), 
    avatar: z.number().min(1).max(12),
    likesCount: z.number(),
    commentsCount: z.number(),
    authorName: z.string(),
    authorEmail: z.string().email(),
    userLiked: z.boolean()
})

export type tweetType = z.infer<typeof tweet>;

