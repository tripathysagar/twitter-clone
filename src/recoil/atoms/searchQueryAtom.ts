import { atom } from "recoil";

export const QueryAtom = atom({
    key: 'queryAtom',
    default: ''
});

export const searchBottonStatus = atom({
    key: 'searchBottonStatus',
    default: false
})