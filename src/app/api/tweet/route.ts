import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prismaInit";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { string } from "zod";

export async function POST(req: Request) {
    let status: number = 500;
    const cookieStore = cookies()

    try{
        const jsonBody = await req.json(); //fetch the body of the req
        const cookie = cookieStore.get('t-cookie');

        if(cookie === undefined){
            status = 401;
            throw new Error("unauthorized");
        }

        const userExists = await getUserFromJWT(cookie.value)

        if(userExists === -1 || userExists === null){
            status = 401;
            throw new Error("unauthorized");
        }

        if(typeof jsonBody.tweet !== 'string'){
            status = 400;
            throw new Error("expected string ");
        }
        console.log(jsonBody.tweet)

        const tweet = await prisma.tweet.create({
            data:{
                tweet: jsonBody.tweet,
                authorId:  userExists.id
            }
        })



        //console.log(jsonBody);
        console.log(tweet);

        const resp = NextResponse.json(
            {
              message: "tweet created",
            },
            {status: 200},
        )

        return resp
        
    }catch(error:any){
        console.log(error.message);
        return NextResponse.json({
            status: "error",
            message: error.message,
          },
          { status: status }
        );
    }
}

export async function GET(req: Request) {
    let status: number = 500;
    const cookieStore = cookies()

    try{
        // jsonBody = await req.json(); //fetch the body of the req
        const cookie = cookieStore.get('t-cookie');

        if(cookie === undefined){
            status = 401;
            throw new Error("unauthorized");
        }

        const userExists = await getUserFromJWT(cookie.value)

        if(userExists === -1 || userExists === null){
            status = 401;
            throw new Error("unauthorized");
        }

        const offset = Number(req.headers.get('offset'));
        console.log(offset * 5);
        
        const tweets = await prisma.tweet.findMany({
            orderBy:{
                  createdAt: 'desc',
                },
            skip: offset * 5,
            take: 5, 
            include : {
                author: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
            
        })

        //console.log(tweets);
        return NextResponse.json(tweets,
          { status: 200 }
        );

    }catch(error:any){
        console.log(error.message);
        return NextResponse.json({
            status: "error",
            message: error.message,
          },
          { status: status }
        );
    }

    
}