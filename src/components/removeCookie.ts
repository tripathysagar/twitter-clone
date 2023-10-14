'use server'
 
import { cookies } from 'next/headers';
 
export async function deleteCookie(key:string) {
    console.log(key)
  cookies().delete(key);
}