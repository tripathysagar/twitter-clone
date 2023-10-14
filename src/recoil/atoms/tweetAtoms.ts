import { tweetType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const TweetAtom = atom<tweetType[]>({
    key: 'tweets',
    default: []
});