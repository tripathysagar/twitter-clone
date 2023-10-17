import '../globals.css'
import type { Metadata } from 'next';
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { useSetRecoilState } from 'recoil';

import { getUserFromJWT } from '@/lib/getUserFromJWT';
import { userDetails, userDetailsType } from '@/lib/zodTypes';
import { UserAtom } from '@/recoil/atoms/userAtoms';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const cookieStore = cookies();

  const cookie = cookieStore.get('t-cookie');
  console.log(`isnide of layout ${cookie?.value}`);

  if(cookie !== undefined ) {

        return (
          <html lang="en">
            <body className="{inter.className} font-serif" > 
                {children}
            </body>
          </html>
        )
      
    }
  redirect('/');
  
}
