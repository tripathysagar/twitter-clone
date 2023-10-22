import '../globals.css'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


import NavBar from '@/components/NavBar';



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
          
            <div className="sticky top-0 z-50"> 
                <NavBar />
                {children}
            </div>
            
        )
      
    }
  redirect('/');
  
}

