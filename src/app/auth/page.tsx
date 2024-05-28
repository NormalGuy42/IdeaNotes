"use client";

import { useRouter } from "next/navigation";
import React from "react"

const AuthPage = () => {

    const router = useRouter();
    router.push('auth/login')

    return (
        <div></div>
    )
};

export default AuthPage;
