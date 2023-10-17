"use client"

import { commentType } from "@/lib/zodTypes";
import axios from "axios";
import  { useRouter } from "next/navigation";
import { useState } from "react";



export default function CommentCard({commentInput}:{commentInput:commentType}){
    const router = useRouter();
    const [comment, setComment] = useState<commentType>(commentInput);


    
    const avatarSrc = `../avatars/${comment.authorAvatar}.svg`;

    //console.log(avatarSrc);

    

    
    return (
        <div className=" pt-2 flex  bg-red-800 font-sans " >
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800  rounded border w-full">
                <div 
                className="flex  flex-row ml-2 "
                onClick={(e) => router.push(`/profile/${comment.authorId}`)}

                >
                <img className="w-10 h-10 mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 " src={avatarSrc}/>
                    <div className="flex items-center">
                        <div className="ml-1.5 text-sm leading-tight">
                            <span className="text-black dark:text-white font-bold block ">{comment.authorName}</span>
                            <span className="text-gray-500 dark:text-gray-400 font-normal block">@{comment.authorEmail}</span>
                        </div>
                    </div>  
                </div>

                <span>
                    <p className="text-black dark:text-white block  leading-snug mt-3 ml-2">{comment.comment}</p>
                    <p className="text-gray-500 dark:text-gray-400  py-1 my-0.5 ml-2 font-sans">{formatTweetDate(comment.createdAt.toString())}</p>
                    

                </span>
                
                
                
            </div>
        </div>
    );
}

function formatTweetDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
  
    const formattedDate = date.toLocaleDateString('en-US', options) ;
  
    return formattedDate;
}



//
//
