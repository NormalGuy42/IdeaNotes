"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailForm(){

    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        console.log('verify email')
    };

    return(
        <section className="w-full h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="card-main credentials-form">
                <Link href={"/"}>
                    <div className="logo flex items-center justify-center">
                        <Image src="/ideanote-logo.png" width={64} height={64} alt="logo"/>
                    </div>
                </Link>
                <h1 className="mb-5 w-full text-2xl font-bold text-center">Sign In</h1>
                {error && <div className="text-red">{error}</div>} 
                <label className="w-full text-sm">Email</label>
                <div className="submit-btn-container py-4">
                    <button className="main-btn">
                    Verify Email
                    </button>
                </div>
                <Link
                    href="/sign-up"
                    className="text-sm text-[#888] transition duration-150 ease hover:text-white">
                    Don't have an account?
                </Link>
            </form>
        </section>
    )
}