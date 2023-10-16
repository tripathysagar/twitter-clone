'use server'
 
import { cookies } from 'next/headers'
 
export async function deleteCookie() {
  try{
  cookies().set('t-cookie', '');

  }catch(e:any){
    console.log(e.message)
  }
  
}