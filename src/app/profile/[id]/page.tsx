
import { redirect } from "next/navigation";

import { cookies, headers } from "next/headers";
import {  profileType, userDetails } from '@/lib/zodTypes';
import BasePage from "@/components/profile/BasePage";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { extractUserById} from '../../../lib/prismaQuery';

import { prisma } from '@/lib/prismaInit';

//import BasePage from "../../components/addComment/BasePage";


export default async function Page({ params }: { params: { id: number } }) {
  const profileId = Number(params.id);
  
  const cookieStore = cookies();

  console.log("********************")
  console.log(typeof profileId);
  console.log("********************")
  

  
  const cookie = cookieStore.get('t-cookie');

  if(cookie !== undefined ) {
    //extract or get the user details filter by the ID
    const userExists = await getUserFromJWT(cookie.value);
    const accountReq = await extractUserById(profileId);

    //console.log(`userExists : ${userExists}`);
    //console.log(`userClicked : ${accountReq}`);

    const user = userDetails.safeParse(userExists);

    if(userExists !== null && accountReq !== null && user.success === true){
    
      if(!userExists || userExists === -1){
          // the user is not present in the DB
          // TODO remove cookie
      }else{
        
        const parentFollower =await prisma.followers.findFirst({
          where: {
            parentId: accountReq.id,
            followerId: userExists.id
          }
        })
        console.log(parentFollower);



        const profileData = {
          id: accountReq.id,
          name: accountReq.name,
          email: accountReq.email,
          avatar: accountReq.avatar,
          followingSince: parentFollower?.followingSince,
          followerCount: accountReq.followerCount
        }
        
        const tweets = await prisma.tweet.findMany({
          where: {
            authorId: profileData.id
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
            }
          }
        });
        const flattenedTweets = tweets.map(tweet => ({
          tweet: tweet.tweet,
          id: tweet.id,
          createdAt: tweet.createdAt,
          avatar: tweet.author.avatar,
          likesCount: tweet.likesCount,
          commentsCount: tweet.commentsCount,
          authorId: tweet.author.id,
          authorName: tweet.author.name,
          authorEmail: tweet.author.email,
          userLiked: tweet.likes[0] === undefined ? false : true
      }));
      
        //console.log("----------------------------------")
        console.log(flattenedTweets);
        const followingUsers = await prisma.user.findMany({
          where: {
            followers: {
              some: {
                followerId: profileData.id,
              },
            },
          },
        });

        console.log(followingUsers)
        console.log("........................................ following")

        const FollowingUserData : profileType[]= []
        
        console.log(followingUsers);
        for(let i = 0; i < followingUsers.length; i++ ){
          const temp =await prisma.followers.findFirst({
            where: {
              parentId: followingUsers[i].id,
              followerId: userExists.id
            }
          })
          FollowingUserData.push({
            id: followingUsers[i].id,
            name: followingUsers[i].name,
            email: followingUsers[i].email,
            avatar: followingUsers[i].avatar,
            followingSince: temp?.followingSince,
            followerCount: followingUsers[i].followerCount
          })
          
        } 

        console.log(FollowingUserData);

        /*
        const x =  await prisma.user.findMany({
          where: {
            followers: {
              some: {
                parentId: profileData.id,
              },
            },
          },
        });
        console.log("++++++++++++++++++++++++++ x")
        console.log(x)
        */
        return (
           <BasePage profileData={profileData} user={user.data} tweets={flattenedTweets} following={FollowingUserData} /> 
          );
        
    }}
  }

  

  redirect('/');


}



