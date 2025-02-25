"use client";

import Link from "next/link";
import UserButton from "../buttons/user-account-btn";
import { useSession } from "next-auth/react";
 
export default function Header(){
    const { status } = useSession()        
    return (
        <nav>
            <ul className="flex justify-end pt-5 pr-5 gap-2">
                <li className="hover:underline">
                    {
                        status !== "authenticated" ? 
                        <Link href="/sign-in">
                            <button className="main-btn">Get Started</button>
                        </Link> 
                        : 
                        <UserButton/>
                    }
                </li>
            </ul>
        </nav>
   )
};
 

 