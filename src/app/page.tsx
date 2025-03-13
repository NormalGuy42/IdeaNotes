// "use client"

import Header from "@/components/shared/Header";
import { redirect } from "next/navigation";
// import { toast } from "@/hooks/use-toast";
// import { subscribe } from "@/lib/actions/user.actions";
// import Link from "next/link";
// import { useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";

export default function Home() {

  redirect('/waitlist')
  
   
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-5xl headline"><span>Never forget an idea</span> ever again starting from now</h1>
        <p className="p-3 text-center">Document, Categorize and keep track of your ideas, all in one place.</p>
      </div>
    </main>
  );
}
