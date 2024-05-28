'use client';
import Link from "next/link";
import React from "react"
 
 const Header = () => {
   return (
        <nav>
            <ul className="flex justify-end pt-5 pr-5 gap-2">
                <li className="hover:underline">
                    <Link href="/auth/login">Login</Link>
                </li>
                <li className="hover:underline">
                    <Link href="/auth/signup">Signup</Link>
                </li>
            </ul>
        </nav>
   )
 };
 
 export default Header;
 