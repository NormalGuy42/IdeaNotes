import PasswordInput from "@/components/inputs/passwordInput";
import Link from "next/link";

export default function SignUp(){
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container">
                <label htmlFor="username">Username</label>
                <input type="text" className="input" id="username"/>
                <label htmlFor="email">Email</label>
                <input type="text" className="input" id="email"/>
                <label htmlFor="password">Password</label>
                <PasswordInput/>
                <button className="submit-btn">Create Account</button>
                <div className="form-options">
                    <Link href="login">Login</Link>
                </div>
            </form>
        </main>
    )
}