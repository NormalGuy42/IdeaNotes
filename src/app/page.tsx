"use client"

import UserButton from "@/components/buttons/user-account-btn";
import Header from "@/components/shared/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
   
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-5xl headline"><span>Never forget an idea</span> ever again</h1>
      </div>
    </main>
  );
}
