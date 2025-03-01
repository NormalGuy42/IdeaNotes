"use client"

import Header from "@/components/shared/Header";
import { toast } from "@/hooks/use-toast";
import { subscribe } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";


const JoinBtn = ()=>{
    const { pending } = useFormStatus()

    return(
        <button className={"main-btn rounded-none relative right-2 min-w-[80px] flex justify-center " + (pending ? "main-btn-pending":"")} type="submit" disabled={pending}>
            { pending ? 
                <div role="status">
                    <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                :
                "Join Us!"
            }
        </button>
    )
}

export default function WaitlistPage(){

    const [emailVal,setEmailVal] = useState('')
    const [ isPending, setIsPending ] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);



    async function handleSubmit(event: React.FormEvent){

        event.preventDefault()
        setIsPending(true)

        const email = emailVal
        if(!email){
            toast({
                variant: 'destructive',
                description: 'Please enter email',
            })
            return
        }

        const data = await subscribe(email);
        setIsPending(false)

        if (!data.success) {
            toast({
                variant: 'destructive',
                description: data.message,
            })
        } else {
            toast({
                description: data.message,
            })
        }

        setEmailVal('')
    }
   
    return(
        <main className="min-h-screen">
            <div className="h-screen flex items-center justify-center flex-col">
                <h1 className="text-5xl headline max-sm:text-4xl"><span>Never forget an idea</span> ever again starting from now</h1>
                <p className="p-3 text-center max-sm:max-w-[400px]">Document, Categorize and keep track of your ideas, all in one place.</p>

                <form ref={formRef} onSubmit={handleSubmit} className="waitlist flex items-center py-10 ">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Please enter your email" 
                        className="m-0 rounded-none" 
                        value={emailVal}
                        onChange={(e)=>setEmailVal(e.target.value)}
                        required
                    />
                    {/* <JoinBtn/> */}
                    <button className={"main-btn rounded-none relative right-2 min-w-[80px] flex justify-center " + (isPending ? "main-btn-pending":"")} type="submit" disabled={isPending}>
                        { isPending ? 
                            <div role="status">
                                <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :
                            "Join Us!"
                        }
                    </button>
                </form>
                <div className="socials p-10 flex justify-center gap-10">
                <a href={'https://discord.gg/jh2H577Ytr'} target="_blank">
                    <img src="/icons/discord-icon.svg" alt="" height={100} width={100}/>
                </a>
                <a href={'https://x.com/_madiou'} target="_blank">
                    <img src="/icons/twitter-x-logo.png" alt="" height={100} width={100}/>
                </a>
                </div>
            </div>
        </main>
    )
}