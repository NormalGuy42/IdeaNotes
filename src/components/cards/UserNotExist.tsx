"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react"

const UserNotExist = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [username,setUsername] = useState('')

    const router = useRouter();
    const path = usePathname();

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        setError('')
        setIsLoading(true)


        if(!username){
            setIsLoading(false)
            setError('Username field empty')
            return
        }

        router.replace('auth/signup?username='+username)        
    }

    useEffect(()=>{
        const pageID  = path.split('/')[1];
        setUsername(pageID)
    },[])

  return (
    <div className="card-bg p-5 w-96 flex flex-col items-center">
        <p className="text-6xl pb-5">😯</p>
        <p>This user does not exist yet</p>
        <form className="flex items-center p-8" onSubmit={handleSubmit}>
            {error && <p className="text-red">{error}</p>}
            <input type="text" 
                name="username" 
                placeholder="Enter your username" 
                className="flexed-input" 
                autoComplete="off"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
            <button type="submit" className="flexed-submit-btn">Claim</button>
        </form>
        <Link href='/' >Home</Link>
    </div>
  )
};

export default UserNotExist;