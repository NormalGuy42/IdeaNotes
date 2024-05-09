import PasswordInput from "@/components/inputs/passwordInput";
import Link from "next/link";

export default function Login(){
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container">
                <label htmlFor="email">Email</label>
                <input type="text" className="input" name="email"/>
                <label htmlFor="password">Password</label>
                <PasswordInput/>
                <button className="submit-btn">Login</button>
                <div className="form-options">
                    <Link href="signup">Create Account</Link>
                    <span>|</span>
                    <Link href="forgot-password">Forgot Password</Link>
                </div>
            </form>
        </main>
    )
}