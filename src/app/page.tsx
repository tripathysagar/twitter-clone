


import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component";

import { authOptions } from "@/lib/auth";

import  Home  from '@/components/Home';


export default  function Page() {
  return <Home />    
}



/*

*/




/*
  
export  default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
*/

