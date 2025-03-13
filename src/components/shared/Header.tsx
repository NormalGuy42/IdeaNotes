"use client";

import Link from "next/link";
import UserButton from "../buttons/user-account-btn";
import { useSession } from "next-auth/react";

 
export function NavBarItem({url, currentUrl, text}: {url:string, currentUrl:string, text:string}){
    return(
        <li className={"hover:text-[var(--violet)] " +  (url === currentUrl? 'text-[var(--violet)]' : '')}>
        <Link href={url}>
            {text}
        </Link>
    </li>   
    )
}
export default function Header(){
    const { status } = useSession()        
   
    return (
        <nav>
            <ul className="flex justify-end pt-5 pr-5 gap-2">
                <li className="hover:underline">
                    {
                        status !== "authenticated" ? 
                        <Link href="/sign-in">
                            <button className="main-btn">Try the beta</button>
                        </Link> 
                        : 
                        <UserButton/>
                    }
                </li>
            </ul>
        </nav>
   )
};
 

 