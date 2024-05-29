
"use client";

import RegisterForm from "@/components/RegisterForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp(){
    
    const session = useSession()
    const router = useRouter()
    
    useEffect(() => {
        if (session?.status === 'authenticated') {
            let username = session?.data.user.username;
            router.push('/' + username) 
        }
    })
    
    
    return <RegisterForm/>
}