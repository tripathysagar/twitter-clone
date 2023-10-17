"use client"
import { useEffect, useState } from "react";
import {  useRecoilValue } from 'recoil';



import TweetCard from "./TweetCard";
import React from "react";
import { sortTweetsList } from "@/recoil/selectors/sortTweetsList";

export default function ShowTweet(){
    const tweets = useRecoilValue(sortTweetsList);
    
    useEffect(() => {
        console.log("inside of show tweets")
        console.log(tweets);

        
    }, [tweets]);
    
    return(
        <ul key="showTweets" className="w-full sm:w-10/12 md:w-1/2 gap-2 ">
            
                
                    {tweets.map(tweet => 
                        <TweetCard key={tweet.id} tweetInput={tweet} clickable={true} />
                                
                    )}
            
        </ul>
    )
    
    
}


