import { error } from 'console';
import jwt from 'jsonwebtoken';

const  SECRET = process.env.NEXT_PUBLIC_SECRET

export  function generateJWT(id: Number){

    if(typeof SECRET === 'string' && SECRET !== undefined) 
        return jwt.sign(
            { 
                id: id, 
            }, 
            SECRET, 
            { expiresIn: '1h' }
        );
    
    return '';
}


export  function extractJWT(token:string):number{
    

    if(typeof SECRET === 'string' && SECRET !== undefined) {
        try{
            let data:any;
            let err:any;

            data =  jwt.verify(token, SECRET);
            if(err){
                throw new Error("invalid JWT");
            }
            console.log(data);
            if (!isNaN(data.id)) {
                return Number(data.id);
            } else {
                throw new Error("ID is not a valid number");
            }
        }catch(error: any){
            console.log(error.message)
            return -1
        }
        
    }
    return -1;
    
    
    //return -1;

}