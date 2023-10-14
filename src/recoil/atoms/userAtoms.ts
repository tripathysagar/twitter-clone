import { userDetailsType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const UserAtom = atom<userDetailsType | undefined>({
    key: 'user',
    default: undefined
});