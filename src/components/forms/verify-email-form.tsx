"use client";
import { FormEvent, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { verifyEmail } from "@/lib/actions/user.actions";
import { CustomLoadingIcon } from "../main-icons/Icons";
import { revalidatePath } from "next/cache";

export default function VerifyEmailForm(){

    const { data: session, update} = useSession();

    const [email,setEmail] = useState('');
    const [error, setError] = useState("");
    const [ isPending, setIsPending ] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    console.log(session)


    const updateSessionVerification = async()=>{
        await update({
            ...session,
            user:{
                ...session?.user,
                emailVerified: true
            }
        });
        router.push('/user')
    }

    useEffect(()=>{
        const emailParam = searchParams.get('email');
        const codeParam = searchParams.get('code');
        const userEmail = session?.user.email || ''
        setEmail(userEmail)

        if(session?.user.emailVerified){
            router.push('/user')
        }

        if(emailParam && codeParam){
            console.log(emailParam, codeParam)
            const fetchData = async()=>{
                try{
                    const data = await verifyEmail(emailParam, 'verify-email',codeParam)
                    if(!data.success){
                        toast({
                            variant: "destructive",
                            description: data.message
                        })

                        // When User is already verified
                        if(data.updateSession){
                            updateSessionVerification()
                        }
                    }else{
                        // When User is successfully verified
                        updateSessionVerification()
                        toast({
                            description: data.message
                        })
                    }
                }catch(error){
                    console.log(error)
                }             
            }

            fetchData()
        }
    },[])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault() 
        setIsPending(true)
        if(!email){
            toast({
                variant: 'destructive',
                description: 'Please enter an email',
            })
            setIsPending(false)
            return
        }   

        const data = await verifyEmail(email,'verify-email','')
        setIsPending(false)
        
        if (!data.success) {
            toast({
                variant: 'destructive',
                description: data.message,
            })     
            if(data.updateSession){
                updateSessionVerification()
            }
        } else {
            toast({
                description: data.message,
            })
        }

    };

    return(
        <section className="w-full h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="card-main credentials-form">
                <Link href={"/"}>
                    <div className="logo flex items-center justify-center">
                        <Image src="/ideanote-logo.png" width={64} height={64} alt="logo"/>
                    </div>
                </Link>
                <h1 className="mb-5 w-full text-2xl font-bold text-center">Verify Email</h1>
                {error && <div className="text-red">{error}</div>} 
                <label className="w-full">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-8 border border-solid rounded p-2"
                    name="email" 
                    value={email}
                    onChange={(e)=>{setEmail(e.currentTarget.value)}}
                    />
                <div className="submit-btn-container py-4">
                    <button className="main-btn">
                    {
                        isPending?
                            <CustomLoadingIcon/>
                        :
                            "Verify Email"
                    }
                    </button>
                </div>
            </form>
        </section>
    )
}