"use client"

import { signup } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";
import GoogleSignIn from "../buttons/google-btn";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";

const SignUpButton = () => {
    const { pending } = useFormStatus()
    
    return (
    <div className="submit-btn-container py-4">
        <button className="main-btn">
        {pending ? 'Submitting...' : 'Create Account'}
        </button>
    </div>
    )
}

export default function SignUpForm(){
    const [data, action] = useFormState(signup, {
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
                <form 
                    action={handleSubmit}
                    className="credentials-form"
                >
                    <Link href={"/"}>
                        <div className="logo flex items-center justify-center">
                            <Image src="/ideanote-logo.png" width={64} height={64} alt="logo"/>
                        </div>
                    </Link>
                    <h1 className="mb-5 w-full text-2xl font-bold text-center">Register</h1>
                    {data && !data.success && (
                        <div className="text-center text-destructive">{data.message}</div>
                    )}
                    <label className="w-full">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-8 border border-solid p-2 rounded"
                        name="email"
                    />
                    {errors.email && (
                        <div className="text-destructive">{errors.email}</div>
                    )}
                    <label className="w-full">Password</label>
                    <div className="flex w-full">
                        <input
                        type="password"
                        placeholder="Password"
                        className="w-full h-8 border border-solid p-2 rounded"
                        name="password"
                        />
                    </div>
                    {errors.password && (
                        <div className="text-destructive">{errors.password}</div>
                    )}
                    <SignUpButton/>
                </form>
                <Link href="/sign-in" className="text-sm text-[#888] transition duration-150 ease hover:text-white">
                    Already have an account?
                </Link>
                <div className="divider p-3">
                    <div className="line h-[2px] bg-[#888] w-full max-w-32 mx-auto"></div>
                </div>
                <GoogleSignIn />
            </div>
        </section>
            
    )
}