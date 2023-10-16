"use client"
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from "next/navigation";


import { TweetsAtom } from '@/recoil/atoms/tweetsAtoms';
import axios from "axios";
import {  tweetType } from "@/lib/zodTypes";
import TweetCard from "./TweetCard";
import React from "react";
import { sortTweetsList } from "@/recoil/selectors/sortTweetsList";

export default function ShowTweet(){
    const router = useRouter();

    const [changed, setChanged] = useState(0);


    const tweets = useRecoilValue(sortTweetsList);
    
    

    

    useEffect(() => {
        console.log("inside of show tweets")
       console.log(tweets);
       
       setChanged(changed+1)
       router.push('/home');
        
    }, [tweets]);



    
    return <>
        {changed && showTweets(tweets)}
    </> ;
    
    
}


function showTweets(tweets : tweetType[]) {

    return(
        <ul className="w-full sm:w-10/12 md:w-1/2 gap-2 ">
            
                <li >
                    {tweets.map(tweet => 
                        <TweetCard tweetInput={tweet} clickable={true} />
                                
                    )}
                </li>
            
            
        </ul>
    )
}