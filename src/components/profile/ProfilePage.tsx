"use client"

import { profileType } from "@/lib/zodTypes";
import { Button } from "../Button";
import { ProfileAtom } from "@/recoil/atoms/profileAtoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatTweetDate } from "../addComment/TweetCard";

//selfPage is for indicating the loged in user trying to access its ownn page
export function ProfilePage({profileInput, selfPage, forSearchReasult}:{
    profileInput:profileType, 
    selfPage: boolean,
    forSearchReasult: boolean
}) {

    

    
    const [profile, setProfile] = useState(profileInput);
    //console.log("+++++++++++++++++");
    //console.log(profile);
    //console.log("+++++++++++++++++")

    // indicating if the given user already follows the user
    //console.log(`profile inside of profile page : ${profile.id, profile.email, profile.followingSince}`);

    const avatarSrc =  `../avatars/${profile?.avatar}.svg`;
    
    useEffect(()=>{
        //console.log(profile.followingSince instanceof Date)
        //console.log(typeof profile.followingSince  )

        console.log(profile);
        console.log(forSearchReasult);

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
                        followerCount: prevProfile.followerCount + 1
                    }))
                else
                    setProfile(prevProfile=>({
                        ...prevProfile,
                        followingSince: null,
                        followerCount: prevProfile.followerCount - 1
                    }))
                
            }

            console.log(profile);
        }catch(error:any){
            console.log('Error response data:\n', error.response.data.message);
            alert(error.response.data.message);
        }

    }
    
    return (
        <div className=" pt-2 flex  bg-red-800 font-sans " >
            
            <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800  rounded border w-full">
                <div className="flex  flex-row ml-2 justify-between  mb-2">
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
                            <Button label={"follow"} width={80} navFunc={addFollow} hamburgIcon={false}/>
                        }
                        {
                            ( profile.followingSince !== undefined && profile.followingSince !== null) &&
                            <Button label={"un-follow"} width={80} navFunc={addFollow} hamburgIcon={false}/>

                        }
                        </div>  
                    }
                    
                </div>
                <div className="flex flex-row justify-between ml-2">
                {
                    ( profile.followingSince !== undefined && profile.followingSince !== null) &&
                    <span>
                    Following From: {formatTweetDate(profile.followingSince.toString())}
                    </span>

                }
                {!forSearchReasult &&
                <div className="mr-2">
                    <b className="mr-1">#followers:</b> 
                    {profile.followerCount}
                </div>   
                }
                </div>
                
            </div>

            
        </div>
    );
}



