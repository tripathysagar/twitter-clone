"use client"
import { useRecoilState } from 'recoil';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect } from 'react';

import {type userDetailsType} from '../../lib/zodTypes';
import Navbar from '@/components/home/NavBar';
import CreateTweet from './CreateTweet';
import ShowTweet from './ShowTweet';
import axios from 'axios';
import { TweetsAtom } from '@/recoil/atoms/tweetsAtoms';


export default function BasePage({user}:{user:userDetailsType}){

    
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
        setUserAtom(user);
        fetchTweets();
        console.log(`useratrom : ${userAtom}`)
    },[])

    if(userAtom !== undefined)
    return(
        
        <main >
            
            
            <div className="relative">

                <div className='flex flex-col '>
                    <CreateTweet />
                </div>

                <div className='flex flex-col items-center justify-center m-3 '>
                    <ShowTweet />
                    
                </div>
            </div>
            
            
        </main>
        

        
    )}


