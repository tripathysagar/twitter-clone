

import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import {useRouter} from 'next/navigation';
import {signIn, useSession, signOut} from 'next-auth/react';
import { Session, getServerSession } from "next-auth";

import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";

import { authOptions } from "@/lib/auth";




export  default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}


/*
export default  function Home() {

const router = useRouter();
const session = useSession();

const  Signup =  () => {
  console.log("Signup clicked!");
  //router.push("/signup");
};

const  Signin =  () => {
  console.log("Signin clicked!");
  //router.push("/signin");
  return signIn();
};
  const [str, setStr] = useState('');


  if(!session.data){
    return (
      <main >
        <div className='flex flex-col md:flex-row  justify-center h-screen'>
          
          <div className='  md:w-1/3 flex justify-center  items-center'>
            <img 
            src={'/logo.png'} 
            alt={'Logo'} 
            className='w-20 h-20 md:w-fit md:h-fit p-5'
            ></img>
          </div>
    
          <div className="md:w-2/3 flex flex-col z-10 items-center justify-between font-mono text-sm p-5">
    
            <span className="text-3xl md:text-5xl lg:text-7xl my-16 ">Happening now</span>
    
    
            <span className="text-xl md:text-3xl  pb-8  my-12">Join today.</span>
    
            
    
            <Button label="Create Account" width={96} navFunc={Signup} />
            
    
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-12 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute  px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/4 dark:text-white dark:bg-gray-900"></span>
            </div>
    
            <div className="text-base">
              <span>Already have an account?</span>
            </div>
            
            <Button label="Sign In" width={96}  navFunc={Signin} />
            
    
            </div>
        </div>
        
        
        
        
        
      </main>)
  }

  
}
*/




/*
  

function Signin(){
  return (() =>{
    console.log("sign in clicked")
  })
}*/

