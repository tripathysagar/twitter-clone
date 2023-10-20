"use client"
import {  useRecoilState, useSetRecoilState } from 'recoil';

import TweetCard from './TweetCard';
import { commentType, tweetType, userDetailsType } from '@/lib/zodTypes';
import AddCommnet from './AddCommnet';
import ShowTweet from './ShowCommnets';
import { CommentsAtom } from '@/recoil/atoms/commentsAtoms';
import { useEffect, useState } from 'react';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { AddTweetAtom } from '@/recoil/atoms/tweetAtom';
import { hamburgButtonAtom } from '@/recoil/atoms/hamburgButtonAtom';
import { searchBottonStatus } from '@/recoil/atoms/searchQueryAtom';


export default function BasePage({tweet, comments, user}:{tweet:tweetType, comments:commentType[], user:userDetailsType}){
   
    const [searchButtonClicked, setSearchButtonClicked] = useRecoilState(searchBottonStatus);

    const [hamburgIconClicked, setHamburgIconClicked] = useRecoilState(hamburgButtonAtom);

    const  setUserAtom = useSetRecoilState(UserAtom);
    const setCommentsAtom = useSetRecoilState(CommentsAtom);
    const setTweetAtom = useSetRecoilState(AddTweetAtom);
    


    const [showSpan, setShowSpan] = useState("");

    useEffect(()=>{
        //console.log(comments)
        setSearchButtonClicked(false);
        setCommentsAtom([...comments]);
        setUserAtom(user);
        setTweetAtom(tweet);
        setHamburgIconClicked(false);
        //console.log(commentsAtom)
    },[])

    useEffect(()=>{
        setShowSpan(hamburgIconClicked ? "hidden md:block" : "");
    },[hamburgIconClicked])

    
    
    return (
        
        <main >
            <div className="bg-emerald-950 ">
                
                    {!searchButtonClicked && 
                    <span  className={showSpan}>
                        <div className='flex  items-center justify-center '>
                            <TweetCard tweetInput={tweet}  />

                        </div>

                        <div className='flex flex-col items-center justify-center  bg-red-500 '>
                            <AddCommnet />
                            <ShowTweet />
                        </div>
                    </span>
                
                    }
            </div>


        </main>
    )

}

//<ShowTweet />