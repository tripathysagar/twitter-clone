import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prismaInit";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { addComment } from '@/lib/zodTypes';

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

       

        const body = addComment.safeParse(jsonBody);
        if(!body.success){
            status = 400;
            throw new Error("bad input");
        }

        console.log(body.data);

        const {comment, tweetId} = body.data;


        const tweetEntry  = await prisma.tweet.findFirst({
            where: {
                id: tweetId
            }
        });



        if(tweetEntry !== null){
            // create entry for likes table
            

            const newComment = await prisma.comments.create({
                data: {
                    comment: comment,
                    authorId: userExists.id,
                    tweetId: tweetEntry.id
                }
            })

            const updatedTweetEntry = await prisma.tweet.update({
                where: {
                    id: tweetId
                },
                data: {
                    commentsCount: tweetEntry.commentsCount+ 1
                }
            })

            const resp = NextResponse.json(
                {
                  message: "comment added",
                  id: newComment.id,
                  createdAt: newComment.createdAt,
                  authorId: userExists.id
                },
                {status: 200},
            )
            return resp;
            
        }else{
            status = 400;
            throw new Error("invalid tweetId");
        }


        //console.log(jsonBody);
        

        

        
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