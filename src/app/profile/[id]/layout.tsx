
import NavBar from '@/components/NavBar';
import Result from '@/components/search/Result';
import type { Metadata } from 'next';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



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
  //console.log(`isnide of layout ${cookie?.value}`);

  if(cookie !== undefined ) {

        return (
          
            
            <div className="sticky top-0 z-50"> 
                <NavBar />
                <div className="relative flex flex-col items-center justify-center m-3">
                    <Result />
                  </div>
                {children}
            </div>  
            
        )
      
    }
  

  redirect('/');
  
}
