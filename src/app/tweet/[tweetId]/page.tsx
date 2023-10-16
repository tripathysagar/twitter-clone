import { notFound } from 'next/navigation'    

import { cookies } from "next/headers";
import {  userDetails } from '@/lib/zodTypes';
import BasePage from "@/components/addComment/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import NavBar from "@/components/addComment/NavBar";
import { redirect } from "next/navigation";
import { UserAtom } from '@/recoil/atoms/userAtoms';
import { prisma } from '@/lib/prismaInit';

//import BasePage from "../../components/addComment/BasePage";


export default async function Page({ params }: { params: { tweetId: number } }) {

  const cookieStore = cookies();
  
  const cookie = cookieStore.get('t-cookie');

  if(cookie !== undefined ) {
    //extract or get the user details filter by the ID
    const userExists = await getUserFromJWT(cookie.value)

    console.log(`userExists : ${userExists}`);
    
    if(userExists !== null){
      
    
      if(!userExists || userExists === -1){
          // the user is not present in the DB
          // TODO remove cookie
      }else{
          // TODO : genrate new jwt with updated timeperiod and, set that value
          
          /*const res = await axios.get('/api/getTweet',{
            headers: {
              tweetId: params.tweetId
            }
          })
          */

          const tweet = await prisma.tweet.findFirst({
            where: {
              id: Number(params.tweetId),
            },
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
            
          }})

          if(tweet === null){
            return notFound()
          }

          const user = userDetails.safeParse(userExists);


          const flattenedTweet = {
            id: tweet.id,
            tweet: tweet.tweet,
            createdAt: tweet.createdAt,
            avatar: tweet.author.avatar,
            authorName: tweet.author.name,
            authorEmail: tweet.author.email,
            likesCount: tweet.likesCount,
            commentsCount: tweet.commentsCount,
            userLiked: tweet.likes[0] === undefined ? false : true
        };

        console.log(flattenedTweet);
        if(user.success){
        console.log(user?.data)

        return (
          <main>
          <div className="sticky top-0 z-50"> 
            <NavBar avatar={user.data.avatar} />
  
          </div>
            <BasePage  tweet={flattenedTweet}/>
          </main>
        )
          
          
        }
    }}}

  

  return <div>oops</div>

}