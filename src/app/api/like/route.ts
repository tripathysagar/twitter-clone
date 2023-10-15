import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prismaInit";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { likeReq } from '@/lib/zodTypes';

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

       

        const body = likeReq.safeParse(jsonBody);
        if(!body.success){
            status = 400;
            throw new Error("bad input");
        }

        console.log(body.data);

        const {liked, tweetId} = body.data;

        const tweetEntry  = await prisma.tweet.findFirst({
            where: {
                id: tweetId
            }
        });

        if(liked === true){
            // create entry for likes table
            const likeEntry = await prisma.likes.create({
                data:{
                    tweetId: tweetId,
                    authorId: userExists.id
                }
            })

            // increase the likes by
            if(tweetEntry?.likesCount !== null && tweetEntry !== null){
                const updatedItem = await prisma.tweet.update({
                    where: {
                      id: tweetId, // Specify the item to update by its ID
                    },
                    data: {
                        likesCount: tweetEntry.likesCount + 1
                    },})
            }
            
        
        } else{
            // find the enrty in the likes table
            const likeEntry = await prisma.likes.findFirst({
                where:{
                    tweetId: tweetId,
                    authorId: userExists.id
                }
            })

            // delete the likes entry
            const deleteEntry = await prisma.likes.delete({
                where: {
                    id: likeEntry?.id
                }
            })

            // decrease the likes by

            if(tweetEntry?.likesCount !== null && tweetEntry !== null){
                const updatedItem = await prisma.tweet.update({
                    where: {
                      id: tweetId, // Specify the item to update by its ID
                    },
                    data: {
                        likesCount: tweetEntry.likesCount - 1
                    },})
            }
            
        }


        //console.log(jsonBody);
        

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