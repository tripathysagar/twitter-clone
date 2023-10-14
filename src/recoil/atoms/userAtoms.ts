import { UserDetails } from "@/lib/zodTypes";
import { atom } from "recoil";

export const UserAtom = atom<UserDetails | undefined>({
    key: 'TodoList',
    default: undefined
  });