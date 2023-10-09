import {  NextResponse } from 'next/server';

type ResponseData = {
  message: string
}
export async function  GET(req: Request) {
    
  
  const msg = {
    message: "hello from backend"
  }
  
  const resp =  NextResponse.json(msg, {status: 200});
  console.log(resp);
  return resp;
}



 
 
