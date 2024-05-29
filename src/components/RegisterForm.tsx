"use client";


import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function RegisterForm(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter();
    const searchParams = useSearchParams()
    const usernameQuery = searchParams.get('username') 

    useEffect(()=>{
      console.log(usernameQuery)
      if(usernameQuery !== null){
        setUsername(usernameQuery!)
      }
    },[])

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!username || !email || !password) {
          setError("All fields are necessary.");
          return;
        }
    
        try {
          const resUserExists = await fetch("../api/userExists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username }),
          });
    
          const { status } = await resUserExists.json();
    
          if (status) {
            console.log(status)
            setError(status + " already exists.");
            return;
          }
    
          const res = await fetch("../api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email, 
              password,
            }),
          });
    
          if (res.ok) {
            const form = e.target as HTMLFormElement;
            form.reset();
            router.push("/"+username);
          } else {
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        }
    };

    return(
        <main className=" flex justify-center items-center min-h-screen">
            <form id="form" className="box form-container" onSubmit={handleSubmit} autoComplete="off">
                {error && (
                    <div className="flex justify-center mb-1">
                      <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                      </div>
                    </div>
                )}
                <label htmlFor="username">Username</label>
                <input 
                    onChange={(e) => setUsername(e.target.value)}
                    type="text" 
                    className="input" 
                    id="username" 
                    autoComplete="off"
                    value={username}
                    name="username"/>
                {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}

                <label htmlFor="email">Email</label>
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    type="text" 
                    className="input"
                    id="email" 
                    autoComplete="none"
                    name="email"/>
                {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}

                <label htmlFor="password">Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input" 
                    id="password"
                    autoComplete="off"
                />
                {/* <PasswordInput/> */}
                {/* {state?.errors?.password && (
                    <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                        ))}
                    </ul>
                    </div>
                )} */}
                {/* <button aria-disabled={pending} type="submit" className="submit-btn">
                    {pending ? 'Submitting...' : 'Create Account'}
                </button> */}
                <button className="submit-btn">
                    {/* {pending ? 'Submitting...' : 'Create Account'} */}
                    Create Account
                </button>
                <div className="form-options">
                    <Link href="login">Login</Link>
                </div>
            </form>
        </main>
    )
}