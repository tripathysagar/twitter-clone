"use client"
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';

import { TweetsAtom } from '@/recoil/atoms/tweetAtoms';
import axios from "axios";
import { tweet, tweetType } from "@/lib/zodTypes";
import TweetCard from "./TweetCard";

export default function ShowTweet(){

    const [tweets, setTweets] = useRecoilState(TweetsAtom);
    const [fetched, setFetched] = useState(false);

    async function fetchTweets(){
        try {
            const resp = await axios.get('/api/tweet', {
                headers: {
                    offset: tweets.length
                }
            });

            const newTweets = await resp.data;
            // Assuming the response contains an array of tweets
            setTweets((tweets)=>[
                ...tweets,
                ...newTweets
            ]);

            console.log(tweets);
          } catch (error) {
            console.error('Error fetching tweets:', error);
          }
    }

    useEffect(()=>{
        fetchTweets();
        setFetched(true);


    },[])

    useEffect(() => {
        console.log('Updated tweets:', tweets);
      }, [tweets]);
    
    return(
        <ul className="w-full sm:w-10/12 md:w-1/2 gap-2 ">
            { fetched && (
                            <li >
                            {tweets.map(tweet => 
                                <TweetCard tweetInput={tweet} clickable={true} />
                                
                            )}
                            </li>
                        )
            }
        </ul>
    )
}