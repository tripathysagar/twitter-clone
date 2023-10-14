import { NextResponse } from "next/server";




export async function GET(req: Request) {
    let status: number = 200;
    try {
      
      const resp = NextResponse.json({
        message: "Logout"
      });
      
      resp.cookies.delete("t-cookie");
    
      return resp ;
      
    } catch (error: any) {
      return NextResponse.json({
          status: "error",
          message: error.message,
        },
        { status: status }
      );
    }
  }