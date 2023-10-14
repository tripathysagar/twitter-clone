"use client"
import { useRecoilState } from 'recoil';


import {type UserDetails} from '../../lib/zodTypes';
import Navbar from '@/components/home/NavBar';
import CreateTweet from './CreateTweet';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect } from 'react';

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
                <CreateTweet name={userAtom.name} />

            </div>
            
        </main>

        
    )}