import { profileType } from "@/lib/zodTypes";
import { atom } from "recoil";

export const ProfileAtom = atom<profileType >({
    key: 'profile',
    default: {
        id: 0,
        name: '',
        email: '',
        avatar: -1,
        followingSince: undefined,
      
    }
});