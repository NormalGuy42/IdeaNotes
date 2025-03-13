import { auth } from "../../../auth";
import SignUpForm from "@/components/forms/sign-up-form";
import { APP_NAME } from "@/lib/constants";

import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Sign Up - ${APP_NAME} `,
  };
}

export default async function SignUp({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string
  }
}){


  const session = await auth()
  if (session) {
    return redirect(callbackUrl || '/verify-email')
  }  
  return (
    <div className="grid grid-cols-1 justify-items-center content-center h-full">
      <SignUpForm />
    </div>
  );
}