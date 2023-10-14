import { useState } from "react";

export default function CreateTweet({name}:{name:string}){
    const [tweet, setTweet] = useState("");

    return (
        <div className="flex flex-col items-center justify-center">
            <div className=" w-full sm:w-10/12 md:w-1/2 gap-2">
                <label htmlFor="large-input" 
                className="block  text-sm font-medium text-white">
                    <h1>Hello {name}!!!</h1>
                </label>

                <div className="relative  bg-slate-700 m-3 rounded-sm" data-te-input-wrapper-init>
                    <textarea
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary  dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary "
                        id="exampleFormControlTextarea1"
                        rows="4"
                        placeholder="Your tweet">  x 
                    </textarea>
                    
                    </div>
            </div>
        </div>
    )
}