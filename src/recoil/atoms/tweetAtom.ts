import { tweetType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const AddTweetAtom = atom<tweetType | undefined>({
    key: 'tweetType',
    default: undefined,
    
})