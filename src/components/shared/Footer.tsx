import { DiscordLink, TwitterLink } from "@/lib/constants";
import Link from "next/link";


function Footer() {
    return ( 
        <footer className="flex max-w-[1000px] justify-evenly pt-48">
            <div>
                <img src="/ideanote-logo.png" alt="" height={120} width={120}/>
                <div className="socials p-10 flex justify-center gap-10">
                    <Link href={DiscordLink} target="_blank">
                        <img src="/icons/discord-icon.svg" alt="" height={50} width={50}/>
                    </Link>
                    <Link href={TwitterLink} target="_blank">
                        <img src="/icons/twitter-x-logo.png" alt="" height={50} width={50}/>
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="footer-header">Links</h3>
                <ul>
                    <li>
                    <Link href={'#faq'}>FAQ</Link>
                    </li>
                    <li>
                    <Link href={'#faq'}>Login</Link>
                    </li>
                    <li>
                    <Link href={'#faq'}>Sign Up</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="footer-header">Legal</h3>
                <ul>
                    <li>
                    <Link href={''}>Terms of Service</Link>
                    </li>
                    <li>
                    <Link href={''}>Privacy Policy</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h3 className="footer-header">My other projects</h3>
                <ul>
                    <li>
                    <Link href={''}>Ideaforge</Link>
                    </li>
                    <li>
                    <Link href={''}>Portfolio</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;