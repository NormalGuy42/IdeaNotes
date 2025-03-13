'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavBarItem } from "./Header";


const UserHeader = () => {

    const pathname = usePathname()
    const links = [
        {
            url: '/user',
            text: 'Home'
        },
        {
            url: '/user/profile',
            text: 'Profile'
        },
    ]

    return (
        <nav className="flex justify-between items-center p-3">
            <div className="flex gap-3">
                <div className="logo">
                    <Link href='/'>
                        <Image src="/ideanote-logo.png" width={64} height={64} alt="IdeaNote Logo"/>
                    </Link>
                </div>
                <ul className="flex justify-end pt-5 pr-5 gap-2">
                    {   
                        links.map((link,index)=>
                            <NavBarItem key={index} url={link.url} currentUrl={pathname} text={link.text} />
                        )

                    }
                </ul>
            </div>
            <Link href="/user/new-idea">
                <button className="main-btn flex justify-center p-2 rounded items-center gap-2 max-w-52 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#fff" height={28} width={28}>
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                    <span className="text-white">Create New Idea</span>
                </button>
            </Link>
        </nav>
   )
 };
 
 export default UserHeader;