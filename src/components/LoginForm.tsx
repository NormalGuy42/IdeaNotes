"use client"

import PasswordInput from "@/components/inputs/passwordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState, FormEvent, useEffect } from "react";


export default function LoginForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading,setIsLoading] = useState(false);
    const router = useRouter()

    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError('')
        setIsLoading(true)

        if (!email || !password) {
            setError("All fields are necessary.");
            setIsLoading(false)
            return;
        }

        try{
            const res = await signIn("credentials",{
                email,
                password,
                redirect: false
            })

            if(res!.error) {
                setError(res?.error!)
                setIsLoading(false)
                return;
            }
            if (res?.status == 200) {
                const username = res
                router.replace("/" + username)
            } else if(res?.error === 'user-not') {
                // handle this particular error
            } else {
                // handle generic error
                console.log(res)
            }
            
        }catch(error){
            if(error instanceof Error){
                setError(error.message)
                setIsLoading(false)
            }
            console.log(error)
        }
    }
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container" onSubmit={handleSubmit} autoComplete="off">
                {error && (
                    <div className="flex justify-center mb-1">
                      <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                      </div>
                    </div>
                )}

                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    className="input" 
                    name="email"
                    autoComplete="off"  
                    id="email"
                    onChange={e => setEmail(e.target.value)}  
                />
                
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    className="input" 
                    name="password"
                    autoComplete="none"  
                    id="password"
                    onChange={e => setPassword(e.target.value)}  
                />

                <button className="submit-btn" aria-disabled={isLoading} >{isLoading? 'Logging in...': 'Login'}</button>
                <div className="form-options">
                    <Link href="signup">Create Account</Link>
                    <span>|</span>
                    <Link href="forgot-password">Forgot Password</Link>
                </div>
            </form>
        </main>
    )
}