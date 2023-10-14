import { ZodIssue } from "zod";

export function extractError(obj:ZodIssue[]){
    let error:string = "";

    
    obj.map((dict) =>{
        //console.log(dict);
        if(dict.path[0] === 'email'){
            error =  "- " + dict.message;
        }else if(dict.path[0] === 'avatar'){
            error = error  + " \n- please select an avatar";
        }else{
            error = error  + ` \n- ${dict.path[0]} ` + dict.message;
        }
    })
    return  error;
}

