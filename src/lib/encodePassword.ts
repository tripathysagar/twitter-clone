import {pbkdf2Sync} from 'node:crypto';

const salt = process.env.NEXT_PUBLIC_SALT;

export  function encodePassword(pwd:string):string{
    if(salt === undefined ){
        return ""
    }
    const key = pbkdf2Sync(pwd, salt, 100000, 64, 'sha512');
    return key.toString()
}