import { useRecoilState, useSetRecoilState } from "recoil";
import { QueryAtom, searchBottonStatus } from '@/recoil/atoms/searchQueryAtom';
import axios from "axios";
import { useState } from "react";
import { profileType, tweetType } from "@/lib/zodTypes";
import TweetCard from "../home/TweetCard";
import { ProfilePage } from "../profile/ProfilePage";
import { SearchResultAtom } from "@/recoil/atoms/searchResultAtom";



export default function SearchBar(){

    const [searchStr, setSearchStr] = useRecoilState(QueryAtom);
    const setSearchButtonClicked = useSetRecoilState(searchBottonStatus);

    const  setSearchResultAtom = useSetRecoilState(SearchResultAtom);
    //const [tweets, setTweets] = useState<tweetType[]>([]);
    //const [profiles, setProfiles] = useState<profileType[]>([]);
    async function serach() {
        if(searchStr.length > 0)
        try{

          const resp = await axios.post('../api/search', {
            query: searchStr
          });

          if(resp.status === 200){
            console.log(resp);
            
            setSearchResultAtom(extractResult(resp.data, false));
          }
        }catch(error:any){
          console.log(error);
          alert(error.message)
        }
    }
    
    return (
        <div className='flex flex-row'>
          <div className="relative w-full">
            
            <input 
              type="text" 
              id="simple-search" 
              className="     text-sm rounded-lg  block w-full  p-2.5  bg-gray-700  text-white " 
              placeholder="Search #tweet or user" 
              value={searchStr}
              required
              onChange={(e) => {
                const str = e.target.value;
                setSearchStr(e.target.value);
                
              }}
            />
            {searchStr.length > 0 &&
              <button 
              type="button" 
              className="absolute inset-y-0 right-0 bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 "
              onClick={(e)=>{
                //console.log("cross is clicked")
                setSearchStr('');
                setSearchButtonClicked(false);
              }}
              >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
            }
            
          </div>
          <button 
          type="submit" 
          className="p-2.5  text-sm font-medium text-white bg-sky-500 rounded-lg border border-blue-700 "
          onClick={(e)=>{
            if(searchStr !== ''){
              serach();
              setSearchButtonClicked(true);
            }
            

          }}
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>

          
        </div>
    )
}



export function extractResult(data: any, selfPage: boolean){


  if(data.queryType === 'profile' && data.result.length > 0){
    // set atom data search profile 
    const profiles:profileType[] = data.result;
    return (
      <div className="w-full">
      {
      profiles.map(profile => 
        <ProfilePage  profileInput={profile} selfPage={false} forSearchReasult={true}/>
        )
      }
      </div>
    );


  }else if(data.queryType === 'tweet' && data.result.length > 0){
    // set atom data tweet data
    const tweets:tweetType[] = data.result;
    return (
      <div className="w-full bg-green-300">
      {
      tweets.map(tweet => 
        <TweetCard key={tweet.id} tweetInput={tweet} clickable={true} />)
      }
      </div>
    );

  }else{
    // set search tweet atom and search profile atom to empty
    // to throw error  of "no data available"
    return <div>
      Not found
    </div>
  }


}
/*
<div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none ">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
              </svg>
            </div>
*/