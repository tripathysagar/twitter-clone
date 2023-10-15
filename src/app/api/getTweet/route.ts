import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { prisma } from "@/lib/prismaInit";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

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
                        avatar: true,
                        email: true
                    }
                },
                likes: {
                    where: {
                        authorId: userExists.id, // Fill in the userId to filter likes by a specific user
                    },
                    select: {
                        id: true
                    }
                }
            }
            
        })
        console.log("+++++++++++++++++++++")
        
        
        const flattenedTweets = tweets.map(tweet => ({
            id: tweet.id,
            tweet: tweet.tweet,
            createdAt: tweet.createdAt,
            avatar: tweet.author.avatar,
            authorName: tweet.author.name,
            authorEmail: tweet.author.email,
            likesCount: tweet.likesCount,
            commentsCount: tweet.commentsCount,
            userLiked: tweet.likes[0] === undefined ? false : true
        }));

        //console.log(flattenedTweets);
        return NextResponse.json(flattenedTweets,
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