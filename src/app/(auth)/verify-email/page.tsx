import VerifyEmailForm from "@/components/forms/verify-email-form";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Verify Email",
  };
}

export default async function SignUp() {
  return (
    <div className="grid grid-cols-1 justify-items-center content-center h-full">
      <VerifyEmailForm />
    </div>
  );
}