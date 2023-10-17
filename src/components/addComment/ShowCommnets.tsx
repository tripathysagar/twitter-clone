"use client"

import { commentType } from "@/lib/zodTypes";
import { useEffect, useState } from "react";

import  CommentCard  from './CommentCard';
import { useRecoilValue } from "recoil";
import { CommentsAtom } from "@/recoil/atoms/commentsAtoms";

export default function ShowTweet(){
    
    const comments = useRecoilValue(CommentsAtom);
    
    return (
            <ul key="showTweets" className="w-full sm:w-10/12 md:w-1/2 gap-2 bg-black">
                {
                    comments.map(comment => 
                        <CommentCard key={comment.id} commentInput={comment} />)
                }   
            </ul>);
    
}


