"use client"

import {  useRecoilState, useSetRecoilState } from 'recoil';

import { Button } from '../Button';
import { profileType, userDetailsType } from '../../lib/zodTypes'
import NavBar from '../NavBar';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect, useState } from 'react';
import { ProfilePage } from './ProfilePage';
import { ProfileAtom } from '@/recoil/atoms/profileAtoms';
import { hamburgButtonAtom } from '@/recoil/atoms/hamburgButtonAtom';



export default function BasePage({profileData, user}:{profileData:profileType, user:userDetailsType}){

    const [hamburgIconClicked, setHamburgIconClicked] = useRecoilState(hamburgButtonAtom);

    const [showSpan, setShowSpan] = useState("");

    const selfPage = user.email === profileData.email ? true : false; // indicatng if the if user try to look at his profile

    const setUserAtom = useSetRecoilState(UserAtom);
    const setProfileAtom = useSetRecoilState(ProfileAtom);
    
    useEffect(()=>{
        setUserAtom(user);
        setProfileAtom(profileData);
        setHamburgIconClicked(false);

    },[])
    


    useEffect(()=>{
        setShowSpan(hamburgIconClicked ? "hidden md:block" : "");
    },[hamburgIconClicked])

    return( 
    <main >
        <div className="bg-emerald-950 ">
            
            <span  className={showSpan}>
                <div className='flex  items-center justify-center '>
                    <ProfilePage  profileInput={profileData} selfPage={selfPage}/>
                </div>
            </span>
        </div>
    </main>)

}

function setHamburgIconClicked(arg0: boolean) {
    throw new Error('Function not implemented.');
}
   