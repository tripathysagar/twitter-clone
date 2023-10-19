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
        }else{
            // filter user's table user
            const user = await prisma.user.findMany({
                where: {
                    email: {
                      contains: query, // Use 'contains' filter to check for substring
                    },
                  },
                });
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