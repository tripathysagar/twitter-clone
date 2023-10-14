"use client"


import {type SignUpBody} from '../../lib/zodTypes';
import Navbar from '@/app/home/NavBar';
import CreateTweet from './CreateTweet';

export default function BasePage({user}:{user:SignUpBody}){

    

    return(
        <main >
            <Navbar avatar={user.avatar} />
            
            <div className='flex flex-col '>
                <CreateTweet name={user.name} />

            </div>
            
        </main>

        
    )}