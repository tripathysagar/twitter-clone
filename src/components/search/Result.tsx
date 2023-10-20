"use client"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { QueryAtom, searchBottonStatus } from "@/recoil/atoms/searchQueryAtom";
import { SearchResultAtom } from "@/recoil/atoms/searchResultAtom";
import { useEffect } from "react";

export default function Result(){

    const [searchButtonClicked, setSearchButtonClicked] = useRecoilState(searchBottonStatus);
    const searchResult = useRecoilValue(SearchResultAtom);
    const setSearchStr = useSetRecoilState(QueryAtom);

    return (
        <div className="w-full sm:w-10/12 md:w-1/2 gap-2 ">
        {searchButtonClicked && 
            (
                <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-lg bg-clip-border">
                    

                    <div className="flex flex-col items-center justify-center m-3 mb-7">  
                          
                        <button 
                        type="button" 
                        className="absolute top-0 right-0 bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 "
                        onClick={(e)=>{
                            //console.log("cross is clicked")
                            setSearchButtonClicked(false);
                            setSearchStr('');
                        }}
                        >
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                        </button>
                    </div>
                    { 
                    (searchResult !== undefined && searchResult.props.children !== 'Not found') &&
                    <div className="w-full justify-center">
                        {searchResult}
                    </div>
                    }
                    { 
                    (searchResult !== undefined && searchResult.props.children === 'Not found') &&
                    <div className="flex flex-row items-center justify-center mb-7">
                        {searchResult}
                    </div>
                    }
                        
                    </div>
            )
        }
        </div>

    );
}


/*

<div className="p-6">
                        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        UI/UX Review Check
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        The place is close to Barceloneta Beach and bus stop just 2 min by walk
                        and near to "Naviglio" where you can enjoy the main night life in
                        Barcelona.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button
                        className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        >
                        Read More
                        </button>
                    </div>
*/
