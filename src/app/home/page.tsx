
import { cookies } from "next/headers";


import { extractJWT } from "@/lib/JWT";
import { prisma } from "@/lib/prismaInit";
import { UserDetails, userDetails } from '@/lib/zodTypes';
import BasePage from "../../components/home/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";



export default async function HomePage(){

    const cookieStore = cookies();
    const cookie = cookieStore.get('t-cookie');
  //console.log(cookie);
    if(cookie !== undefined ) {
        
        //extract or get the user details filter by the ID
        const userExists = await getUserFromJWT(cookie.value)

        console.log(`userExists : ${userExists}`);
        
        if(userExists !== null){
          
        
          if(!userExists){
              // the user is not present in the DB
              // TODO remove cookie
          }else{
              // TODO : genrate new jwt with updated timeperiod and, set that value
              
              const user = userDetails.safeParse(userExists);
              if(user.success){
                
                return (
                 <BasePage user={user.data}/>
                );
              }
            }
        }
    }

    return <div>
            oops
        </div>
}