"use client"
import {  useRecoilState, useSetRecoilState } from 'recoil';

import TweetCard from './TweetCard';
import { commentType, tweetType, userDetailsType } from '@/lib/zodTypes';
import AddCommnet from './AddCommnet';
import ShowTweet from './ShowCommnets';
import { CommentsAtom } from '@/recoil/atoms/commentsAtoms';
import { useEffect } from 'react';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import NavBar from './NavBar';
import { AddTweetAtom } from '@/recoil/atoms/tweetAtom';


export default function BasePage({tweet, comments, user}:{tweet:tweetType, comments:commentType[], user:userDetailsType}){
   
    const  setUserAtom = useSetRecoilState(UserAtom);
    const setCommentsAtom = useSetRecoilState(CommentsAtom);
    const setTweetAtom = useSetRecoilState(AddTweetAtom);

    useEffect(()=>{
        //console.log(comments)

        setCommentsAtom([...comments]);
        setUserAtom(user);
        setTweetAtom(tweet);
        //console.log(commentsAtom)
    },[])

    
    
    return (
        
        <main >
            <div className="bg-emerald-950 ">
                <div className="sticky top-0 z-50"> 
                    <NavBar />
  
                </div>
                <div className='flex  items-center justify-center '>
                    <TweetCard tweetInput={tweet}  />

                </div>

                <div className='flex flex-col items-center justify-center  bg-red-500 '>
                    <AddCommnet />
                    <ShowTweet />
                </div>
            </div>


        </main>
    )

}

//<ShowTweet />