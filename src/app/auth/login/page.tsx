'use client';

import LoginForm from "@/components/LoginForm";
import PasswordInput from "@/components/inputs/passwordInput";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login(){
    const session = useSession()
    const router = useRouter()
    
    useEffect(() => {
        if (session?.status === 'authenticated') {
            let username = session?.data.user.username;
            router.push('/' + username) 
        }
    })
    
    return(
        <LoginForm />
    )
}