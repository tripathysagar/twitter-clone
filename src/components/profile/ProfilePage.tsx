"use client"

import { profileType } from "@/lib/zodTypes";
import { Button } from "../Button";
import { ProfileAtom } from "@/recoil/atoms/profileAtoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatTweetDate } from "../addComment/TweetCard";


export function ProfilePage({profileInput, selfPage}:{profileInput:profileType, selfPage: boolean}) {

    

    
    const [profile, setProfile] = useState(profileInput);
    console.log("+++++++++++++++++");
    console.log(profile);
    console.log("+++++++++++++++++")

    // indicating if the given user already follows the user
    //console.log(`profile inside of profile page : ${profile.id, profile.email, profile.followingSince}`);

    const avatarSrc =  `../avatars/${profile?.avatar}.svg`;

    useEffect(()=>{
        console.log(profile.followingSince instanceof Date)
        console.log(typeof profile.followingSince  )

    },[profile])

    async function addFollow(){
        const body = {
            parentId: profile.id, 
            followStatus: ((profile.followingSince === undefined || profile.followingSince === null) ? true : false),
        };
        try{
            const resp = await axios.post('/api/follow', body);

            if(resp.status === 200){
                if(resp.data.message === 'followed')
                    setProfile(prevProfile=>({
                        ...prevProfile,
                        followingSince: resp.data.followingSince,
                    }))
                else
                    setProfile(prevProfile=>({
                        ...prevProfile,
                        followingSince: null
                    }))
                
            }

            console.log(profile);
        }catch(error:any){
            console.log('Error response data:\n', error.response.data.message);
            alert(error.response.data.message);
        }

    }
    
    return (
        <div className=" pt-2 flex w-full sm:w-10/12 md:w-1/2 bg-red-800 font-sans " >
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800  rounded border w-full">
                <div className="flex  flex-row ml-2 justify-between ">
                    <div className="flex  flex-row ml-2">
                        <img className="w-10 h-10 mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 " src={avatarSrc}/>

                        <div className="flex items-center  ">
                            <div className="ml-1.5 text-sm leading-tight bg-red-950">
                                <span className="text-black dark:text-white font-bold block ">{profile.name}</span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">@{profile.email}</span>
                            </div>
        
        
                        </div>
                    </div>
                    
                    {
                        !selfPage  &&
                        <div className="flex bg-green-800">
                        {
                            ( profile.followingSince === undefined ||   profile.followingSince === null) &&
                            <Button label={"follow"} width={80} navFunc={addFollow} />
                        }
                        {
                            ( profile.followingSince !== undefined && profile.followingSince !== null) &&
                            <Button label={"un-follow"} width={80} navFunc={addFollow} />

                        }
                        </div>  
                    }
                    
                </div>
                {
                    ( profile.followingSince !== undefined && profile.followingSince !== null) &&
                    <span>
                    following since {formatTweetDate(profile.followingSince.toString())}

                    </span>

                }
                </div>
        </div>
    );
}




/*


<span>
                    <p className="text-black dark:text-white block  leading-snug mt-3 ml-2">{tweet.tweet}</p>
                    <p className="text-gray-500 dark:text-gray-400  py-1 my-0.5 ml-2 font-sans">{formatTweetDate(tweet.createdAt.toString())}</p>
                    

                </span>
*/
