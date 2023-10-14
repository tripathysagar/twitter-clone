import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { prisma } from "./prismaInit";
import { extractJWT } from "./JWT";



export async function getUserFromJWT(cookie: string){
    const userId = extractJWT(cookie);
    
    // given jwt token is invalid either expired or invalid
    if(userId === -1){ 
      console.log("invalid cookie");
      // TODO remove 
      return -1
    }

    
        //extract or get the user details filter by the ID
    const userExists = await prisma.user.findFirst({
        where : {
            id: userId
        }
    })

    
    return userExists
}