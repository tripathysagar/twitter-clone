import { prisma } from "@/lib/prismaInit";
import { NextResponse } from "next/server";
import { encodePassword } from '@/lib/encodePassword';
import { generateJWT } from "@/lib/JWT";

export async function POST(req: Request) {
  let status: number = 200;
  try {
    const body = await req.json(); //fetch the body of the req
    

    //de-struct the data
    const { name, email, password, avatar} = body as {
      name: string;
      email: string;
      password: string;
      avatar: number
    };

    // check if the user already exist;
   
    const userExists = await prisma.user.findFirst({
      where : {
        email: email
      }
    })
    console.log(userExists);
    // userExists !== null; raise error and 400 status
    if(userExists  ){
      console.log(`user name is taken: ${email}`);
      status = 400;
      throw new Error(`user name is taken: ${email}`);

    }
    
    console.log(name, email, password, avatar, body.avatar)

    // encode password or raise error
    const passwordEncrypted = (encodePassword(password));
    if(passwordEncrypted === ""){
      console.log("failed to encoding password;  salt is undefined");
      status = 500;
      throw new Error("Server Error, We are checking!!!");
    }

    console.log(passwordEncrypted);
    // create entry in db
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: passwordEncrypted,
        avatar
      },
    });

    console.log(`user created ${user}`);

    // generate JWT token for setting the cookies
    const token = generateJWT(user.id);
    if(token === ''){
      console.log("Could not find the Secret to generate JWT");
      status = 500;
      throw new Error("Could not find the Secret to generate JWT");
    }
    
    const resp = NextResponse.json(
      {
        id: user.id,
        message: "user created",
      },
      {status: status},
      
    )
    resp.cookies.set("t-cookie", token);
  
    return resp ;
    
  } catch (error: any) {
    return NextResponse.json({
        status: "error",
        message: error.message,
      },
      { status: status }
    );
  }
}