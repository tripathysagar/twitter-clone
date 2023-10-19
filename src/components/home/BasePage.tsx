"use client"
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect, useState } from 'react';

import {type userDetailsType} from '../../lib/zodTypes';
import CreateTweet from './CreateTweet';
import ShowTweet from './ShowTweet';
import axios from 'axios';
import { TweetsAtom } from '@/recoil/atoms/tweetsAtoms';
import { hamburgButtonAtom } from '@/recoil/atoms/hamburgButtonAtom';
import { searchBottonStatus } from "@/recoil/atoms/searchQueryAtom";


export default function BasePage({user}:{user:userDetailsType}){
    // false : show the tweets
    // true : hide the tweets
    const [searchButtonClicked, setSearchButtonClicked] = useRecoilState(searchBottonStatus);
    
    const [hamburgIconClicked, setHamburgIconClicked] = useRecoilState(hamburgButtonAtom);
    const [showSpan, setShowSpan] = useState("");
    
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);
    const [tweets, setTweets] = useRecoilState(TweetsAtom);

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
                //...tweets,
                ...newTweets
            ]);


            console.log(tweets);
          } catch (error) {
            console.error('Error fetching tweets:', error);
          }
}

    useEffect(()=>{
        setSearchButtonClicked(false);
        setUserAtom(user);
        fetchTweets();
        setHamburgIconClicked(false);
        //console.log(`useratrom : ${userAtom}`)
    },[])

    useEffect(()=>{
        setShowSpan(hamburgIconClicked ? "hidden md:block" : "");
    },[hamburgIconClicked])

    if(userAtom !== undefined)
    return(
        
        <main >
            
            
            {!searchButtonClicked && 
            <div className="relative">
                <span  className={showSpan}> 
                    <div className='flex flex-col '>
                        <CreateTweet />
                    </div>

                    <div className='flex flex-col items-center justify-center m-3 '>
                        <ShowTweet />
                        
                    </div>
                </span>
            </div>
            }
            
            
        </main>
        

        
    )}


