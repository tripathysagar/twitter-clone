"use client"

import axios from "axios";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button } from "@/components/Button";
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { TweetsAtom } from "@/recoil/atoms/tweetsAtoms";
import { tweetType } from "@/lib/zodTypes";
 

export default function CreateTweet(){
    const [tweet, setTweet] = useState("");
    const user = useRecoilValue(UserAtom);
    const [tweets, setTweets] = useRecoilState(TweetsAtom);

    
    async function postTweet(){
        if(tweet.length <= 128 && tweet !== ''){

            const body = {
                tweet: tweet
            };
            try{

                const resp = await axios.post('/api/tweet', body);
                setTweet(''); 

                console.log("+++++++++++++++++")
                console.log(`user : ${user?.name}`)

                if(user !== undefined)
                if (resp.status === 200) {
                    console.log("++++++++++++");
                    console.log(resp);
                    const now = new Date();
                    const utcTimestamp = now.toISOString();
                    const userTweeet : tweetType ={
                        id: resp.data.id,
                        tweet: tweet,
                        createdAt: resp.data.createdAt, 
                        avatar: user.avatar,
                        likesCount: 0,
                        commentsCount: 0,
                        authorName: user.name,
                        authorEmail: user.email,
                        userLiked: false,
                        authorId: user.id
                    }

                    console.log(`userTweeet value is : ${userTweeet}`);
                    console.log(`tweets before updating: ${tweets}`);

                    
                    setTweets((prevTweets) => [
                        userTweeet,...prevTweets,
                    ]);
                    console.log(`after updated ${typeof tweets[0].createdAt}`);

                } else {
                    throw new Error(resp.data.message);
                }

            }catch(error:any){
                console.log('Error response data:\n', error.response.data.message);
                alert(error.response.data.message);
            }

        }
    }

    return (

        <div className="flex flex-col items-center justify-center m-3">
            
            <div className=" w-full sm:w-10/12 md:w-1/2 gap-2 ">
                <label htmlFor="large-input" 
                className="block  text-sm font-medium text-white">
                    <h1>Hello {user?.name} 👋</h1>
                </label>

                <div className="relative  bg-slate-700  rounded-sm" data-te-input-wrapper-init>
                    <textarea
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  "
                        id="exampleFormControlTextarea1"
                        rows="4"
                        placeholder="Your tweet"
                        value={tweet}
                        onChange={(e)=>{
                            setTweet(e.target.value)
                        }}
                        >  
                    </textarea>
                </div>
                <div className="flex flex-row justify-end  gap-2 pt-2">
                    {tweet.length <= 128 && <h1 className=" pt-2 font-medium font-sans text-cyan-400">
                        {tweet.length}/128
                    </h1>}

                    {tweet.length > 128 && <h1 className=" pt-2 font-medium font-sans text-rose-600">
                        {128-tweet.length}/128
                    </h1>}

                    <Button label={"Post"} width={80} navFunc={postTweet} hamburgIcon={false} />
                    
                </div>
            </div>
        </div>
    )
}