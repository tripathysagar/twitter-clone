"use client"
import { useRecoilState } from 'recoil';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect } from 'react';

import {type UserDetails} from '../../lib/zodTypes';
import Navbar from '@/components/home/NavBar';
import CreateTweet from './CreateTweet';
//import ShowTweet from './ShowTweet';


export default function BasePage({user}:{user:UserDetails}){

    
    const [userAtom, setUserAtom] = useRecoilState(UserAtom);

    useEffect(()=>{
        setUserAtom(user);
    },[])

    if(userAtom !== undefined)
    return(
        <main >
            <Navbar avatar={userAtom.avatar} />
            
            <div className='flex flex-col '>
                <CreateTweet />
            </div>

            <div>
                
            </div>
            
        </main>

        
    )}