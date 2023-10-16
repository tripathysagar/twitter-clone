"use client"
import { useRecoilState } from 'recoil';

import { AddTweetAtom } from '@/recoil/atoms/tweetAtom';
import TweetCard from './TweetCard';
import { tweetType } from '@/lib/zodTypes';
import { useEffect } from 'react';


export default function BasePage({tweet}:{tweet:tweetType}){
    const [tweetAtom, setTweetAtom] = useRecoilState(AddTweetAtom);

    useEffect(()=>{
        console.log(tweet);

        //console.log(`tweetAtom before ${tweetAtom}`);
        setTweetAtom(tweet);
        console.log(`tweetAtom after ${tweetAtom}`);

    },[])
    return (
        
        <main >
            <div className="bg-emerald-950 ">

                <div className='flex  items-center justify-center '>
                    <TweetCard tweetInput={tweet} clickable={true} />

                </div>

                <div className='flex flex-col items-center justify-center m-3 '>
                    <div>addd comment</div>
        
                </div>
            </div>


        </main>
    )

}

//<ShowTweet />