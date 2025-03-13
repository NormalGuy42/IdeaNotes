import { auth } from "@/auth";
import VerifyEmailForm from "@/components/forms/verify-email-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Verify Email",
  };
}


export default async function VerifyEmail({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string
  }
}) {
  
  const session = await auth()

  if (!session){
    redirect('/sign-in')
  }

  if (session.user.emailVerified) {
    return redirect(callbackUrl || '/user')
  }

  return (
    <div className="grid grid-cols-1 justify-items-center content-center h-full">
      <VerifyEmailForm />
    </div>
  );
}