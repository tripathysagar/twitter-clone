"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Form(){
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
  
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
      
  
      return (
          <div className="flex items-center justify-center h-screen">
              <div className=" text-white  rounded-lg border shadow-lg p-5 box-content h-1/2 w-full md:w-1/2 lg:w-1/3 ">
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
                      <div>
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
                          <button
                              onClick={async(e) => {
                                  console.log(email,password);
                                  
                                  const resp = await axios.post('/api/login',{
                                      email: email,
                                      password: password,
                                  })
                                  console.log(resp);
                                  
                                  if(resp.status === 200){
                                    router.push("/");
                                    }
  
                              }}
                              type="button" 
                              className=" text-white bg-[#1da1f2] focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
                              Log in
              
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )
}