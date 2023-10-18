import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { prisma } from "@/lib/prismaInit";
import { getUserFromJWT } from "@/lib/getUserFromJWT";
import { followInput } from '@/lib/zodTypes';
import { stat } from "node:fs";

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

        const userExists = await getUserFromJWT(cookie.value);

        if(userExists === -1 || userExists === null){
            status = 401;
            throw new Error("unauthorized");
        }

        const body = followInput.safeParse(jsonBody);
        if(!body.success){
            status = 400;
            throw new Error("bad input");
        }

        const {parentId, followStatus} = body.data;

        // user shoud not follow itself
        if(userExists.id === parentId){
            status = 400;
            throw new Error("bad input");

        }
        
        const parent  = await prisma.user.findFirst({
            where: {
                id: parentId
            }
        });

        

        //the parent does not exists
        if( parent!==null){
            
            const followerEntry = await prisma.followers.findFirst({
                where: {
                    parentId: parentId,
                    followerId: userExists.id
                }
            })

            let resp :NextResponse; 
            if(followStatus === true)//got innput that user want to follow someone
            {
                // as user already follows given user 
                if(followerEntry !== null){
                    status = 400;
                    throw new Error("user already liked");
                }

                const newFollowerEntry = await prisma.followers.create({
                    data: {
                        parentId: parentId,
                        followerId: userExists.id
                    }
                })
                
            
                resp =   NextResponse.json(
                    {
                      message: 'followed',
                      followingSince: newFollowerEntry.followingSince
                    },
                    {status: 200},
                )
            }else{// for un-following a given user
                // as user does not follow given user 
                if(followerEntry === null){
                    status = 400;
                    throw new Error("user already not following");
                }
                const newFollowerEntry = await prisma.followers.delete({
                    where: {
                        id: followerEntry.id
                    }
                });
                

                resp =  NextResponse.json(
                    {
                      message: 'un-followed',
                    },
                    {status: 200},
                )
            }

            

            
            const updatedParentEntry  = await prisma.user.update({
                where: {
                    id: parentId
                },
                data: {
                    followerCount: parent.followerCount + (followStatus ? 1 : -1),
                }
            });
    
            return resp
            
        }else{
            status = 400;
            throw new Error("Parent does not exist")
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