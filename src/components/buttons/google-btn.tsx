import { signIn } from "../../auth";
import { signInWithGoogle } from "@/lib/actions/user.actions";
import Image from "next/image";


export default function GoogleSignIn(){
    return(
        <form action={signInWithGoogle}>
            <button className="bg-white flex justify-center p-2 rounded w-full items-center hover:bg-[#ffffffc4] gap-5">
                <Image src="/icons/google-logo.png" height={28} width={28} alt="google sign in button"/>
                <span className="text-black text-sm">Continue with Google</span>
            </button>
        </form>
    )
}