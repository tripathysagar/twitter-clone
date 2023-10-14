"use client"

import Image from 'next/image';
import {type SignUpBody} from '../../lib/zodTypes';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NavBar({avatar}:{avatar:number}){

    const logo = `avatars/${avatar}.svg`;
    const router = useRouter();

    async function signOut (){
        
        try{
            const resp = await axios.get('/api/logout')
            if(resp.status === 200){
                router.push("/");    
            }
        }catch(error){
            alert(error);
        }      

    }

    return(
        <nav className='bg-red-800'>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/home" className="flex items-center rounded-sm">
                    <Image src="/logo.png" width={40} height={20} alt="X Logo" className='rounded-sm' />
                </Link>

                <div className='flex flex-row gap-2'>

                    <Image src={logo}  width={40} height={20} alt="avatar" className='rounded-lg'/>
                    <div>
                    <Button label={"Sign out"} width={70} navFunc={signOut}  />
                    </div>
                                
                </div>
                
            </div>
        </nav>

        
    )}