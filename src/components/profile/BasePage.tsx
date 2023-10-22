"use client"

import {  useRecoilState, useSetRecoilState } from 'recoil';

import { Button } from '../Button';
import { profileType, tweetType, userDetailsType } from '../../lib/zodTypes'
import NavBar from '../NavBar';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect, useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { ProfileAtom } from '@/recoil/atoms/profileAtoms';
import { hamburgButtonAtom } from '@/recoil/atoms/hamburgButtonAtom';
import { searchBottonStatus } from '@/recoil/atoms/searchQueryAtom';
import Link from 'next/link';
import { extractResult } from '../search/SearchBar';



export default function BasePage({profileData, user, tweets, following}:{
    profileData:profileType, 
    user:userDetailsType,
    tweets:tweetType[],
    following: profileType[]
}){

    const data={
        queryType: '',
        result: [] as any[],
    };
    const [searchButtonClicked, setSearchButtonClicked] = useRecoilState(searchBottonStatus);

    const [hamburgIconClicked, setHamburgIconClicked] = useRecoilState(hamburgButtonAtom);

    const [showSpan, setShowSpan] = useState("");

    const [result, setResult] = useState<JSX.Element>();

    const selfPage = user.email === profileData.email ? true : false; // indicatng if the if user try to look at his profile

    const setUserAtom = useSetRecoilState(UserAtom);
    const setProfileAtom = useSetRecoilState(ProfileAtom);
    
    useEffect(()=>{
        setUserAtom(user);
        setProfileAtom(profileData);
        setHamburgIconClicked(false);
        setSearchButtonClicked(false);

        //console.log(following);
        //console.log(tweets);
        //console.log(following);

        if(tweets.length !== 0){
            data.queryType = "tweet";
            data.result = tweets;
            setResult(extractResult(data, selfPage));
        }else{
            setResult(
            <div className='items-center'>
                Has not started tweeting
            </div>)
        }
    },[])
    

    
    useEffect(()=>{
        setShowSpan(hamburgIconClicked ? "hidden md:block" : "");
    },[hamburgIconClicked])

    return( 
    <div>
        { !searchButtonClicked && 

        
            <span  className={showSpan}>
                <div className='flex  flex-col items-center justify-center '>
                    <div className='w-full sm:w-10/12 md:w-1/2'>
                        <ProfilePage  profileInput={profileData} selfPage={selfPage} forSearchReasult={false}/>
                        
                        <div className='flex flex-row  flex-wrap  justify-evenly  '>
                        
                                <button
                                className="bg-gray-400 hover:bg-sky-500 text-gray-800 font-bold rounded-l w-1/2 "
                                onClick={(e)=>{
                                    if(tweets.length !== 0){
                                        data.queryType = "tweet";
                                        data.result = tweets;
                                        setResult(extractResult(data, selfPage));
                                    }else{
                                        setResult(<div>
                                            Does not started tweeting
                                        </div>)
                                    }
                                }}
                                >Tweets</button>
                                
                                <button 
                                className="bg-gray-400 hover:bg-sky-500 text-gray-800 font-bold  rounded-r w-1/2"
                                onClick={(e)=>{
                                    
                                    if(following.length !== 0){
                                        data.queryType = "profile";
                                        data.result = following;
                                        setResult(extractResult(data, selfPage));
                                    }else{
                                        setResult((<div>
                                            Not following anybody
                                        </div>))
                                    }
                                    

                                    
                                }}
                                >Following{following.length !==0 && 
                                <b>[{following.length}] </b>}</button>
                            

                        </div>

                        { result !== undefined &&  result}
                        
                    </div>
                    
                </div>
                
            </span>
        
        
        }

    </div>)

}


   