"use client"

import { toast } from "@/hooks/use-toast";
import { redirect, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { CustomLoadingIcon } from "../../components/main-icons/Icons";
import { subscribe } from "@/lib/actions/user.actions";
import Header from "../../components/shared/Header";

export default function WaitlistPage(){

    const [emailVal,setEmailVal] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const searchParams = useSearchParams();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(()=>{
        const emailParam = searchParams.get('email');
        const codeParam = searchParams.get('code');

        if(emailParam && codeParam){
            console.log(emailParam, codeParam)
            const fetchData = async()=>{
                try{
                    const data = await subscribe(emailParam, 'waitlist',codeParam)
                    if(!data.success){
                        toast({
                            variant: "destructive",
                            description: data.message
                        })

                        if(data.revalidate) redirect('/waitlist')
                    }else{
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

        try{
            const data = await subscribe(email, 'waitlist', '');
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
        }catch(error){
            setIsPending(false)
            console.log(error)
        }
    }
   
    return(
        <main className="min-h-screen">
            <Header />
            <div className="flex items-center justify-center flex-col max-w-[1000px] mx-auto pt-16">
                <h1 className="text-5xl headline max-sm:text-4xl"><span>Never forget an idea</span> ever again starting from now</h1>
                <p className="p-3 text-center max-sm:max-w-[400px]">Document, Categorize and keep track of your ideas, all in one place.</p>
                
                <div className="relative pb-[59.4059405940594%] h-0 w-5/6 max-[800px]: mx-auto"><iframe src="https://www.loom.com/embed/44171d5a9fd848088c9860012dfe3ed0?sid=6d2d3cde-808e-45f6-a933-ded880c1075d" allowFullScreen className="absolute top-0 left-0 w-full h-full"></iframe></div>
                <form ref={formRef} onSubmit={handleSubmit} className="waitlist flex items-center pt-10 ">
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
                            <CustomLoadingIcon/>
                            :
                            "Join Us!"
                        }
                    </button>
                </form>
                <p className="pt-2 pb-10 text-sm text-center">Join the Waitlist to be informed of the full release</p>
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