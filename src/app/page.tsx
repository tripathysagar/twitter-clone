"use server"

import  Home  from '@/components/Home';
import { extractJWT } from '@/lib/JWT';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';

export default async function Page() {

  const cookieStore = cookies();
  const cookie = cookieStore.get('t-cookie');
  console.log(cookie);

  if(cookie !== undefined ) {
    const userId = extractJWT(cookie.value);
    console.log(userId);
  }

  

  return <Home />    
}


