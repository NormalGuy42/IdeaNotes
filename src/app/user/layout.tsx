import { auth } from "@/auth";
import UserHeader from "@/components/shared/UserHeader";
import { redirect } from "next/navigation";

export default async function UserPageLayout(
{
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  const session = await auth()
  
  if (!session){
    redirect('/sign-in')
  }

  if(!session.user.emailVerified){
    redirect('/verify-email')
  }
  
  
  return(
      <main>
        <UserHeader />
        {children}
      </main>
  )
}