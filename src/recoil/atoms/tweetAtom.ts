import { tweetType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const AddTweetAtom = atom<tweetType>({
    key: 'tweetComment',
    default: {
        id: -1,
        tweet: "",
        createdAt: new Date(), 
        avatar: -1,
        likesCount: -1,
        commentsCount: -1,
        authorName: "",
        authorEmail: "",
        userLiked: false
    }}
    )
