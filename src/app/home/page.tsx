import { extractJWT } from "@/lib/JWT";
import { prisma } from "@/lib/prismaInit";
import { cookies } from "next/headers";

import BasePage from "./BasePage";



export default async function HomePage(){

    const cookieStore = cookies();
    const cookie = cookieStore.get('t-cookie');
  //console.log(cookie);
    if(cookie !== undefined ) {
        const userId = extractJWT(cookie.value);
    
        // given jwt token is invalid either expired or invalid
        if(userId === -1){ 
          console.log("invalid cookie");
          // TODO remove cookie
        }else{
    
          //extract or get the user details filter by the ID
          const userExists = await prisma.user.findFirst({
            where : {
              id: userId
            }
          })
          console.log(`userExists for the id ${userId} : ${userExists}`);
          
          if(!userExists){
            // the user is not present in the DB
            // TODO remove cookie
          }else{
            // TODO : genrate new jwt with updated timeperiod and, set that value
            return (
              <BasePage user={userExists}/>
            );
          }
        }}
        return <div>
            oops
        </div>
}