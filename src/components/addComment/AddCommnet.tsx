import axios from "axios";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button } from "@/components/Button";
import { UserAtom } from '@/recoil/atoms/userAtoms';

import { commentType, tweetType } from "@/lib/zodTypes";
import { AddTweetAtom } from "@/recoil/atoms/tweetAtom";
import { CommentsAtom } from "@/recoil/atoms/commentsAtoms";
 

export default function AddCommnet(){
    const [comment, setComment] = useState("");
    const user = useRecoilValue(UserAtom);
    const [tweet, setTweet] = useRecoilState(AddTweetAtom);
    const [comments, setComments] = useRecoilState(CommentsAtom);

    
    async function postComment(){
        if(comment.length <= 128 && comment !== '' && tweet !== undefined){

            const body = {
                tweetId: tweet.id,
                comment: comment,
            };
            try{
                const resp = await axios.post('/api/comments', body);
                setComment(''); 

                console.log("+++++++++++++++++")
                console.log(`user : ${user?.name}`)

                if(user !== undefined)
                if (resp.status === 200) {
                    console.log("++++++++++++");
                    console.log(resp);
                    setTweet({
                        ...tweet,
                        commentsCount: tweet.commentsCount + 1
                    });

                    const newComment:commentType={
                        id: resp.data.id,
                        comment: comment,
                        createdAt: resp.data.createdAt,
                        authorId: resp.data.authorId,
                        tweetId: tweet.id,
                        authorName: user.name,
                        authorEmail: user.email,
                        authorAvatar: user.avatar
                    }
                    setComments((prevCommnets)=>[
                        newComment, ...prevCommnets
                    ])

                    //console.log(tweet);
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

        <div className=" gap-2 flex flex-col w-full sm:w-10/12 md:w-1/2 m-3 rounded-2xl bg-green-800">
            
            <div className="  ">
                <label htmlFor="large-input" 
                className="block  text-sm font-medium text-white">
                    
                </label>

                <div className="relative  bg-slate-700  rounded-sm" data-te-input-wrapper-init>
                    <textarea
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary "
                        id="exampleFormControlTextarea1"
                        rows="4"
                        placeholder="Add your commnent"
                        value={comment}
                        onChange={(e)=>{
                            setComment(e.target.value)
                        }}
                        >  
                    </textarea>
                </div>
                <div className="flex flex-row justify-end  gap-2 pt-2">
                    {comment.length <= 128 && <h1 className=" pb-.75 font-medium font-sans text-cyan-400">
                        {comment.length}/128
                    </h1>}

                    {comment.length > 128 && <h1 className=" pt-2 font-medium font-sans text-rose-600">
                        {128-comment.length}/128
                    </h1>}

                    <Button label={"Add"} width={80} navFunc={postComment} />
                    
                </div>
            </div>
        </div>
    )
}