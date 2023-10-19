"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {  useRecoilState, useRecoilValue } from 'recoil';

import { hamburgButtonAtom } from '@/recoil/atoms/hamburgButtonAtom';

import { UserAtom } from '@/recoil/atoms/userAtoms';
import { useState } from 'react';
import SearchBar from './search/SearchBar';


export default function NavBar(){

    
    const [hamburgIconClicked, setHamburgIconClicked] = useRecoilState(hamburgButtonAtom);

    const user = useRecoilValue(UserAtom);

    const logo = `../avatars/${user?.avatar}.svg`;
    const router = useRouter();


    async function signOut (){
        
        try{
            const resp = await axios.get('/api/logout')
            if(resp.status === 200){
                setHamburgIconClicked(!hamburgIconClicked)
                router.push("/");    
            }
        }catch(error){
            alert(error);
        }      

    }

    function myProfile(){
        if(user){
            setHamburgIconClicked(!hamburgIconClicked)
            router.push(`/profile/${user.id}`);


        }
    }

    return(
        <nav className='bg-red-800 '>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/home" className="flex items-center rounded-sm">
                    <Image src="/logo.png" width={40} height={20} alt="X Logo" className='rounded-sm ' />
                </Link>

                <span className='w-9/12 sm:w-10/12 md:w-1/2 gap-2  bg-green-800'>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    
                        
                        <SearchBar />
                        
                        
                    
                </span>
                <div className='flex flex-row gap-2'>

                    
                    <div>
                    
                    </div>

                        <div>
                            <button 
                            className="relative group"
                            onClick={(e)=>{
                                setHamburgIconClicked(!hamburgIconClicked);
                            }} >
                                <div className="relative flex overflow-hidden items-center justify-center rounded-full transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                                    <Image src={logo}  width={40} height={20} alt="avatar" className='rounded-lg'/>
                                </div>
                            </button>
                            { hamburgIconClicked &&
                            <div className="flex absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                        
                                    <Button label={"Sign out"} width={70} navFunc={signOut} hamburgIcon={true} />
                                    <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700"></hr>
                                    <Button label={"Profile"} width={70} navFunc={myProfile} hamburgIcon={true} />
                                    
                                </div>
                            </div>
                            }   
                        </div>   
                </div>
                
            </div>
        </nav>

        
    )}


    //