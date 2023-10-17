
import { notFound } from 'next/navigation'    

import { cookies, headers } from "next/headers";
import {  userDetails } from '@/lib/zodTypes';
import BasePage from "@/components/addComment/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";

import { prisma } from '@/lib/prismaInit';

//import BasePage from "../../components/addComment/BasePage";


export default async function Page() {
  
  const headersList = headers()
  const userEmail = headersList.has('email');
  const cookieStore = cookies();
  console.log("********************")

  console.log(userEmail);
  console.log("********************")
  

  
  const cookie = cookieStore.get('t-cookie');

  if(cookie !== undefined ) {
    //extract or get the user details filter by the ID
    const userExists = await getUserFromJWT(cookie.value);

    console.log(`userExists : ${userExists}`);
    
    if(userExists !== null){
      
    
      if(!userExists || userExists === -1){
          // the user is not present in the DB
          // TODO remove cookie
      }else{
        
    }}
  }

  

  return <div>profile page</div>

}