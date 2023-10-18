
import { boolean, z } from 'zod';

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
    authorId: z.number(),
    authorName: z.string(),
    authorEmail: z.string().email(),
    userLiked: z.boolean()
})

export type tweetType = z.infer<typeof tweet>;

export const addComment = z.object({
    comment: z.string().max(129),
    tweetId: z.number(),
})

export type addCommentType = z.infer<typeof tweet>;


export const  commnet =  z.object({
    id: z.number(),
    comment: z.string().max(129),
    createdAt: z.date(), 
    authorId: z.number(),
    tweetId: z.number(),
    authorName: z.string(),
    authorEmail: z.string().email(),
    authorAvatar: z.number(),
})

export type commentType = z.infer<typeof commnet>;


export const followInput = z.object({
    parentId: z.number(),
    followStatus: z.boolean()
})

export type followInputType = z.infer<typeof followInput>;







export const profile = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    avatar: z.number(),
    followingSince: z.union([z.date(), z.null(), z.undefined()]).optional(),
  });
  
  export type profileType = z.infer<typeof profile>;