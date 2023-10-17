import { commentType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const CommentsAtom = atom<commentType[]>({
    key: 'commnets',
    default: []
});

