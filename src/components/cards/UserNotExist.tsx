"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react"

const UserNotExist = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        setError('')
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const username = formData.get('username');

        if(username == null){
            setIsLoading(false)
            setError('Username field empty')
            return
        }

        router.replace('auth/signup?username='+username)        
    }

  return (
    <div className="card-bg p-5 w-96 flex flex-col items-center">
        <p>😯</p>
        <p>This user does not exist yet</p>
        <form className="form-container" onSubmit={handleSubmit}>
            {error && <p className="text-red">{error}</p>}
            <input type="text" name="username" placeholder="Enter your username" className="input" autoComplete="off"/>
            <button type="submit" className="submit-btn">Claim this page </button>
        </form>
        <Link href='/'>HomePage</Link>
    </div>
  )
};

export default UserNotExist;