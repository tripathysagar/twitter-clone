"use client"

import { Button } from "@/components/Button";
import { extractError } from "@/lib/extractError";
import { signInBody } from "@/lib/zodTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Form(){
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
  
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    async function signInFunc (){

        const body = {
            email: email,
            password: password
        };
        const  validBody = signInBody.safeParse(body);
        if(!validBody.success){
            const { errors } = validBody.error;

            console.log(errors);

            const errMessage = extractError(errors);
            
            
            alert(errMessage);  
            return;
        }

        try{
            const resp = await axios.post('/api/login',body)
            //console.log(resp);
        
            if(resp.status === 200){
                router.push("/home");
            }else {
                throw new Error(resp.data.message);
            }
        }catch(error:any){
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error response data:\n', error.response.data.message);
                alert(error.response.data.message);
              } else {
                console.error('Request failed:', error.message);
              }
        }
        
        

    }
      
  
      return (
          <div className="flex items-center justify-center h-screen">
              <div className=" text-white  rounded-lg border shadow-lg p-5 box-content h-1/3 w-full md:w-1/2 lg:w-1/3 m-2 ">
                  <div >
                      <div className="">
                          <label htmlFor="Email Address" className="block mb-2  text-gray-900 dark:text-white">First name</label>
                          <input 
                          type="text" 
                          id="email" 
                          className="bg-gray-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-[#1da1f2] focus:border-[#1da1f2] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#1da1f2] dark:focus:border-[#1da1f2]" 
                          placeholder="foo.bar@mail.com" 
                          required
                          onChange={(e) => {setEmail(e.target.value)}} />
                      </div>
                      <div className="mb-5">
                          <label htmlFor="Password" className="block mb-2  text-gray-900 dark:text-white">Password</label>
                          <input 
                          type="password" 
                          id="password" 
                          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          placeholder="password" 
                          required 
                          onChange={(e) => {setPassword(e.target.value)}} />
                      </div>
                      
  
                      <div className="flex tems-center justify-center">
                          <Button label={"Log in"} width={80} navFunc={signInFunc} />
                      </div>
                  </div>
              </div>
          </div>
      )
}