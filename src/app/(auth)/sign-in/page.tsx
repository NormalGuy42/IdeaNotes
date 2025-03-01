import { auth } from "../../../auth";
import SignInForm from "@/components/forms/sign-in-form";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { APP_NAME } from '@/lib/constants';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Sign In - ${APP_NAME} `,
  };
}

export default async function SignIn({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string
  }
}){

  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/user')
  }  
  
  return (
    <div className="grid grid-cols-1 justify-items-center content-center h-full">
      <SignInForm />
    </div>
  );
}