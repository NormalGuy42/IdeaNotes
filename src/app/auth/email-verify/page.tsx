import Link from "next/link";

export default function ForgotPassword(){
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container">
                <label htmlFor="code">Enter Code</label>
                <input type="text" className="input" id="code"/>
                <button className="submit-btn">Verify Email</button>
                <div className="form-options">
                    <Link href="signup">Create Account</Link>
                    <span>|</span>
                    <Link href="login">Login</Link>
                </div>
            </form>
        </main>
    )
}