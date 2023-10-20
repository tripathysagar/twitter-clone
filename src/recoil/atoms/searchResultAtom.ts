import { atom } from "recoil";

export const SearchResultAtom = atom<JSX.Element>({
    key: 'SearchResultAtom',
    default: undefined
});