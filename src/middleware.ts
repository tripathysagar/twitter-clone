
import type { NextRequest } from 'next/server';
import { extractJWT } from '@/lib/JWT';
import { prisma } from "@/lib/prismaInit";


export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get('t-cookie');
  
  /*
  try{
    let userId
    if(cookie !== undefined ) {
      userId = extractJWT(cookie.value);
      
      
      const userExists = await prisma.user.findFirst({
        where : {
          id: userId
        }
      })

      if(userExists === null){
        // delete the cookie as the user does not exists
        // ivalid cookie
        request.cookies.delete('t-cookie');
        
      }
      else{
        request.headers.set("email", userExists.email);
        request.headers.set("id", userExists.email);
        request.headers.set("name", userExists.name);
        request.headers.set("avatar", String(userExists.avatar))
      }
    }
    
  }catch(error){
    console.log(`error inside middleware: ${error}`)
  }

  */

}