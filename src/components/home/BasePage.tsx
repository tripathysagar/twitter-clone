"use client"
import { useRecoilState } from 'recoil';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect } from 'react';

import {type userDetailsType} from '../../lib/zodTypes';
import Navbar from '@/components/home/NavBar';
import CreateTweet from './CreateTweet';
import ShowTweet from './ShowTweet';


export default function BasePage({user}:{user:userDetailsType}){

    
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);

    useEffect(()=>{
        setUserAtom(user);
    },[])

    if(userAtom !== undefined)
    return(
        <main >
            <div className="sticky top-0 z-50"> 
                <Navbar avatar={userAtom.avatar} />

            </div>
            <div className="relative">

                <div className='flex flex-col '>
                    <CreateTweet />
                </div>

                <div className='flex flex-col items-center justify-center m-3 '>
                    <ShowTweet />
                    
                </div>
            </div>
            
            
        </main>

        
    )}