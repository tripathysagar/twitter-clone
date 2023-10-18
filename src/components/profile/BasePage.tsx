"use client"

import {  useRecoilState, useSetRecoilState } from 'recoil';

import { Button } from '../Button';
import { profileType, userDetailsType } from '../../lib/zodTypes'
import NavBar from '../NavBar';
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useEffect } from 'react';
import { ProfilePage } from './ProfilePage';
import { ProfileAtom } from '@/recoil/atoms/profileAtoms';



export default function BasePage({profileData, user}:{profileData:profileType, user:userDetailsType}){

    const selfPage = user.email === profileData.email ? true : false; // indicatng if the if user try to look at his profile

    const setUserAtom = useSetRecoilState(UserAtom);
    const setProfileAtom = useSetRecoilState(ProfileAtom);
    
    useEffect(()=>{
        setUserAtom(user);
        setProfileAtom(profileData);
    },[])
    
    return( 
    <main >
        <div className="bg-emerald-950 ">
            <div className="sticky top-0 z-50"> 
                <NavBar />
            </div>
            <div className='flex  items-center justify-center '>
                    <ProfilePage  profileInput={profileData} selfPage={selfPage}/>

                </div>
        </div>
    </main>)

}
   