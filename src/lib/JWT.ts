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


export  function extractJWT(token:string):Number{
    
    if(typeof SECRET === 'string' && SECRET !== undefined) {
        let data =  jwt.verify(token, SECRET)
        console.log(data)
        return Number(data.id)
    }
    
    
    //return -1;

}