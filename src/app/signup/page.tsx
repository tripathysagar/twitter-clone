"use client"

import axios from "axios";
import { useState } from "react";


export default  function Signup() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [logo, setLogo] = useState(0);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const arr : JSX.Element[] = [];

    for(let i:number = 1; i < 13; i++){
        const src = `avatars/${i}.svg`;
        const avatar = `avatar-${i}`;

        arr.push(
            <img 
            className={`w-10 h-10 rounded  ${i === logo ? 'border-[#1da1f2] border-4': '' }`}
            key={src} 
            src={src} 
            alt={avatar} 
            onClick={(e)=>{
                console.log(src);
                console.log(i);
                setLogo(i);
            }}
            />
        )
    }

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
                        <label htmlFor="Email Address" className="block mb-2  text-gray-900 dark:text-white">Password</label>
                        <input 
                        type="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="password" 
                        required 
                        onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    

                    <div>
                        <label>Coose Avatar </label>
                    
                        <div className="px-10 py-5 grid   gap-0.5 gap-x-0.5 grid-cols-6 ">
                            {arr}
                        </div>
                    </div>

                    <div className="pb-5">
                        <label htmlFor="Name" className="block mb-2  text-gray-900 dark:text-white">Name</label>
                        <input 
                        type="text" 
                        id="name" 
                        className="bg-gray-50 border  border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="foo bar" 
                        required 
                        onChange={(e) => {setName(e.target.value)}} 
                        />
                    </div>

                    <div className="flex tems-center justify-center">
                        <button
                            onClick={async(e) => {
                                console.log(email,password,name,logo);
                                
                                const resp = await axios.post('/api/signup',{
                                    email: email,
                                    password: password,
                                    name: name,
                                    avatar: logo
                                })
                                console.log(resp);

                            }}
                            type="button" 
                            className=" text-white bg-[#1da1f2] focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
                            Sign Up
            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}