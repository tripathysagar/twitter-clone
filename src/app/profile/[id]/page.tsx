
import { redirect } from "next/navigation";

import { cookies, headers } from "next/headers";
import {  userDetails } from '@/lib/zodTypes';
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
          }
        });


        const following = await prisma.user.findMany({
          where: {
            followers: {
              some: {
                followerId: profileData.id,
              },
            },
          },
        });

        console.log(following);
        
        return (
           <BasePage profileData={profileData} user={user.data}/> 
          );
        
    }}
  }

  

  redirect('/');


}