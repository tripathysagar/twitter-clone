import { selector } from "recoil";
import { TweetsAtom } from "../atoms/tweetsAtoms";

export const sortTweetsList = selector({
    key: 'FilteredTodoList',
    get: ({get}) => {
      
      const list = get(TweetsAtom);
    
      


  
      return [...list].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    },
});