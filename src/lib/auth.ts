import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"

export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
            checks: ["none"], // solve error 'State cookie was missing.'
        }),  
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
}

//export default NextAuth(authOptions)



