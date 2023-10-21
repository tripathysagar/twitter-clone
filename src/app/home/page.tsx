
import { cookies } from "next/headers";


import {  userDetails } from '@/lib/zodTypes';
import BasePage from "@/components/home/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { redirect } from "next/navigation";


export default async function HomePage(){

  const cookieStore = cookies();
  const cookie = cookieStore.get('t-cookie');

  if(cookie !== undefined ){
    const userExists = await getUserFromJWT(cookie.value);

    console.log(`userExists inside of layout : ${userExists}`);

    if(userExists === null || userExists === -1){
      //deleteCookie(); did not work 
    }else{
      const user = userDetails.safeParse(userExists);
      if(user.success){
        
        //const tweets = await fetchTweets(user.data.id, 0);
        //console.log(tweets);
        return  <BasePage user={user.data} />
          

      }
  }}
  
  redirect('/');
  
           
}