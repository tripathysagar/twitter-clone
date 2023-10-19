import { tweetType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const TweetsAtom = atom<tweetType[]>({
    key: 'tweets',
    default: []
});


export const searchTweetsAtom = atom<tweetType[]>({
    key: 'searchTweetsAtom',
    default: []
});
