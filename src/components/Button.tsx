
 
export function Button({label, width, navFunc, hamburgIcon}:{label:string, width:Number, navFunc: ()=>void, hamburgIcon:boolean}){
    
    if(hamburgIcon){
        return (
            <button
            onClick={navFunc} 
            type="button" 
            className="w-60 text-black  focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
                {label}
          </button>)
    }

    if(width === 96)
    return (
        <button
        onClick={navFunc} 
        type="button" 
        className="w-60 text-white bg-[#1da1f2] focus:outline-none   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2  ">
            {label}
      </button>
    )

    if(width === 28)
    return (
        <button
        onClick={navFunc} 
        type="button" 
        className="w-28 text-white bg-[#1da1f2] focus:outline-none   font-medium rounded-full text-sm px-5  text-center mr-2  ">
            {label}
        
      </button>
    )
    return (
        <button
        onClick={navFunc} 
        type="button" 
        className=" text-white bg-gray-400 focus:outline-none   font-medium rounded-full text-sm px-5  text-center mr-2  ">
            {label}
        
      </button>
    )

}