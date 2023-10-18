"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { tweetType } from "@/lib/zodTypes";
import { AddTweetAtom } from '@/recoil/atoms/tweetAtom';

// TODO use recoil in the page to 
export default function TweetCard({tweetInput}:{tweetInput:tweetType}){
    const router = useRouter();
    

    const [tweet, setTweet] = useState(tweetInput);


    //console.log(`tweet : ${{...tweet}}`)


    // if clickable is true indicating the call has come from the comment page 
    // else it is in the home page
    const avatarSrc =  `../avatars/${tweet?.avatar}.svg`;



    async function likeTweet(likeButton:boolean, tweetId: Number ){
        try{
            const body = {
                liked: likeButton,
                tweetId: tweet?.id,
              };
            axios.post('/api/like', body);
        }catch(error){
            console.log(error);
        }
    }

    
    return (
        <div className=" pt-2 flex w-full sm:w-10/12 md:w-1/2 bg-red-800 font-sans " key={tweet.id.toString()}>
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800  rounded border w-full">
                <div 
                className="flex  flex-row ml-2 "
                onClick={(e) => router.push(`/profile/${tweet.authorId}`)}

                >
                    <img className="w-10 h-10 mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 " src={avatarSrc}/>

                    <div className="flex items-center">
                        <div className="ml-1.5 text-sm leading-tight">
                            <span className="text-black dark:text-white font-bold block ">{tweet.authorName}</span>
                            <span className="text-gray-500 dark:text-gray-400 font-normal block">@{tweet.authorEmail}</span>
                        </div>
                    </div>  
                </div>

                <span>
                    <p className="text-black dark:text-white block  leading-snug mt-3 ml-2">{tweet.tweet}</p>
                    <p className="text-gray-500 dark:text-gray-400  py-1 my-0.5 ml-2 font-sans">{formatTweetDate(tweet.createdAt.toString())}</p>
                    

                </span>
                
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1 pl-2">
                    <div className="text-gray-500 dark:text-gray-400 flex ">
                        <div className="flex items-center mr-6">
                            {tweet.userLiked &&  
                            <svg  
                            viewBox="0 0 24 24" 
                            className=" fill-red-950 h-5 w-auto r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" 
                            onClick={(e) => {

                                setTweet((prevTweet) => ({
                                  ...prevTweet,
                                  userLiked: false,
                                  likesCount: prevTweet.likesCount - 1,
                                }));
                                likeTweet(false, tweet.id);
                              }}
                            >
                                <g>
                                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>}
                            
                            {!tweet.userLiked &&  
                            <svg  
                            viewBox="0 0 24 24" 
                            className=" fill-current  h-5 w-auto r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" 
                            onClick={(e) => {

                                setTweet((prevTweet) => ({
                                  ...prevTweet,
                                  userLiked: true,
                                  likesCount: prevTweet.likesCount + 1,
                                }));
                                likeTweet(true, tweet.id);
                              }}
                            ><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>}
                            
                            <span className="ml-1">{tweet.likesCount.toString()}</span>
                        </div>
                    <div className="flex items-center mr-6">
                        <svg className="fill-current h-5 w-auto r-1re7ezh r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" viewBox="0 0 24 24" ><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                        <span className="ml-1">{tweet.commentsCount.toString()}</span>
                    </div>
                </div>
            </div>
                
            </div>
        </div>
    );
}

 export function formatTweetDate(dateString: string): string {
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




