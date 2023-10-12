import { prisma } from "@/lib/prismaInit";
import { NextResponse } from "next/server";
import { generateJWT } from "@/lib/JWT";
import { encodePassword } from "@/lib/encodePassword";

export async function POST(req: Request) {
  let status = 200;
  try {
    const body = await req.json();
    console.log(body);
    const {  email, password} = body as {
      email: string;
      password: string;
    };
    
    // check if the user already exist;
    const  userExists = await prisma.user.findFirst({
      where : {
        email: email
      }
    })

    if(!userExists ){
      console.log(`user name is does not exist: ${email}`);
      status = 401;
      throw new Error(`check username or password`);
    }



    const passwordEncrypted = (encodePassword(password));

    if(passwordEncrypted !== userExists.password){
      console.log(`invalid password entered for ${email}: ${password}`);
      status = 401;
      throw new Error(`check username or password`);
    }

    
    console.log(userExists);

    //console.log(userExists);

    const token = generateJWT(userExists.id);

    if(token === ''){
      console.log("Could not find the Secret to generate JWT");
      status = 500;
      throw new Error("Could not find the Secret to generate JWT");
    }
    
    
    const resp = NextResponse.json(
      {
        id: userExists.id,
        message: "user created",
      },
      {status: status},
      
    )
    
    resp.cookies.set("t-cookie", token);

    return resp;

  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: status }
    );
  }
}