import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prismaInit";
import { getUserFromJWT } from "@/lib/getUserFromJWT";

export async function POST(req: Request) {
    let status: number = 500;
    const cookieStore = cookies()

    try{
        const jsonBody = await req.json(); //fetch the body of the req
        const cookie = cookieStore.get('t-cookie');
        console.log(jsonBody);
        if(cookie === undefined){
            status = 401;
            throw new Error("unauthorized");
        }

        const userExists = await getUserFromJWT(cookie.value);

        if(userExists === -1 || userExists === null){
            status = 401;
            throw new Error("unauthorized");
        }

        const query = jsonBody.query;

        if(typeof query !== 'string'){
            status = 400;
            throw new Error("bad input");
        }
        let message: any;

        if(query[0] === '#'){
            // check filter data from comments table

            const tweets = await prisma.tweet.findMany({
                where: {
                  tweet: {
                    contains:query,
                  },
                },
                include : {
                  author: {
                      select: {
                          name: true,
                          avatar: true,
                          email: true,
                          id: true
                      }
                  },
                  likes: {
                    where: {
                        authorId: userExists.id, // Fill in the userId to filter likes by a specific user
                    },
                    select: {
                      id: true
                    }
                  }}
                }
            )

            const result = [];
            for(let i = 0; i < tweets.length; i++){
                const tweet = tweets[i];

                const flattenedTweet = {
                    id: tweet.id,
                    tweet: tweet.tweet,
                    createdAt: tweet.createdAt,
                    avatar: tweet.author.avatar,
                    authorName: tweet.author.name,
                    authorEmail: tweet.author.email,
                    authorId: tweet.author.id,
                    likesCount: tweet.likesCount,
                    commentsCount: tweet.commentsCount,
                    userLiked: tweet.likes[0] === undefined ? false : true
                  };
                result.push(flattenedTweet);
            }
            
            return NextResponse.json({
                queryType: "tweet",
                result: result,
              },
              { status: 200 }
            );

        }else{
            // filter user's table user
            const users = await prisma.user.findMany({
                where: {
                    name: {
                      contains: query, // Use 'contains' filter to check for substring
                    },
                  },
            });

            console.log(users);

            let result = [];
            for(let i =0; i < users.length; i++){
                const parentFollower =await prisma.followers.findFirst({
                    where: {
                      parentId: users[i].id,
                      followerId: userExists.id
                    }
                  })
                
                result.push({
                    id: users[i].id,
                    name: users[i].name,
                    email: users[i].email,
                    avatar: users[i].avatar,
                    followingSince: parentFollower?.followingSince,
                })
                console.log("================================")

                console.log(`parentFollower : ${parentFollower}`);

            }


            return NextResponse.json({
                queryType: "profile",
                result: result,
              },
              { status: 200 }
            );
            
        }


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