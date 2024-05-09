import PasswordInput from "@/components/inputs/passwordInput";
import Link from "next/link";

export default function ForgotPassword(){
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container">
                <label htmlFor="password">Enter New Password</label>
                <PasswordInput/>
                <button className="submit-btn">Change Password</button>
                <div className="form-options">
                    <Link href="signup">Create Account</Link>
                    <span>|</span>
                    <Link href="login">Login</Link>
                </div>
            </form>
        </main>
    )
}