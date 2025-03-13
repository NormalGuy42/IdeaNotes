import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";





export  const Provider = async({ children }: {children?: React.ReactNode}) => {
  const session = await auth();

  //Adding the session and session key made it possible to update the session without reloads
  //I am so grateful for StackOverflow

  return <SessionProvider session={session}  key={session?.user.id}>{children}</SessionProvider>;
};