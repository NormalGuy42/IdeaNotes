"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GoogleSignIn from "../buttons/google-btn";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useState } from "react";
import { CustomLoadingIcon } from "../main-icons/Icons";


const SignInButton = () => {
    const { pending } = useFormStatus()
    
    return (
    <div className="submit-btn-container py-4">
        <button className="main-btn">
        {pending ? <CustomLoadingIcon/> : 'Sign In'}
        </button>
    </div>
    )
}

export default function SignInForm() {
    const [data, action] = useFormState(signInWithCredentials, {
        message: '',
        success: false,
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const validateForm = (formData: FormData) => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        // Get form values
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } 
        // else if (password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        //     isValid = false;
        // }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (formData: FormData) => {
        if (validateForm(formData)) {
            action(formData);
        }
    }
    return(
        <section className="w-full h-screen flex items-center justify-center">
            <div className="card-main">
                <form action={handleSubmit} className="credentials-form">
                    <Link href={"/"}>
                        <div className="logo flex items-center justify-center">
                            <Image src="/ideanote-logo.png" width={64} height={64} alt="logo"/>
                        </div>
                    </Link>
                    <h1 className="mb-5 w-full text-2xl font-bold text-center">Sign In</h1>
                    {data && !data.success && (
                        <div className="text-center text-destructive">{data.message}</div>
                    )}
                    <label className="w-full">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-8 border border-solid rounded p-2"
                        name="email" />
                    {errors.email && (
                        <div className="text-destructive">{errors.email}</div>
                    )}
                    <label className="w-full">Password</label>
                    <div className="flex w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-8 border border-solid rounded p-2"
                        name="password" />
                    </div>
                    {errors.password && (
                        <div className="text-destructive">{errors.password}</div>
                    )}
                    <SignInButton/>
                </form>
                <Link
                    href="/sign-up"
                    className="text-sm text-[#888] transition duration-150 ease hover:text-white">
                    Don't have an account?
                </Link>
                <div className="divider p-3">
                    <div className="line h-[2px] bg-[#888] w-full max-w-32 mx-auto"></div>
                </div>
                <GoogleSignIn />
            </div>
            
        </section>
    )
}