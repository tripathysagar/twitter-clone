import { notFound } from 'next/navigation'    

import { cookies } from "next/headers";
import {  userDetails } from '@/lib/zodTypes';
import BasePage from "@/components/addComment/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";

import { prisma } from '@/lib/prismaInit';

//import BasePage from "../../components/addComment/BasePage";


export default async function Page({ params }: { params: { tweetId: string } }) {
  const paramTweetId = Number(params.tweetId);

  const cookieStore = cookies();
  console.log("********************")

  console.log(paramTweetId);
  console.log("********************")
  

  
  const cookie = cookieStore.get('t-cookie');

  if(cookie !== undefined ) {
    //extract or get the user details filter by the ID
    const userExists = await getUserFromJWT(cookie.value);

    console.log(`userExists : ${userExists}`);
    
    if(userExists !== null){
      
    
      if(!userExists || userExists === -1){
          // the user is not present in the DB
          // TODO remove cookie
      }else{

        const tweet = await prisma.tweet.findFirst({
          where: {
            id: paramTweetId,
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

        if(tweet === null){
          return notFound()
        }
        //console.log(tweet);

        const user = userDetails.safeParse(userExists);
        //console.log(user);



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

        //console.log(flattenedTweet);

        
        const commnets = await prisma.comments.findMany({
          where: {
            tweetId: tweet.id
          }, 
          orderBy:{
            createdAt: 'desc',
          },
          include : {
            author: {
                select: {
                    name: true,
                    avatar: true,
                    email: true,
                }
            }
          }
        })


        const flattenedCommnets = commnets.map((obj) =>{
          return {
            id: obj.id,
            comment: obj.comment,
            createdAt: obj.createdAt,
            authorId: obj.authorId,
            tweetId: obj.tweetId,
            authorName: obj.author.name,
            authorEmail: obj.author.email,
            authorAvatar: obj.author.avatar,
          }
        })

        //console.log(flattenedCommnets);
        
        if(user.success){
          //console.log(user?.data)
  
          return (
            <main>
              
              <BasePage  tweet={flattenedTweet} comments={flattenedCommnets} user={user.data}/>
            </main>
          )
          }
    }}
  }

  

  return <div>{params.tweetId.toString()}</div>

}