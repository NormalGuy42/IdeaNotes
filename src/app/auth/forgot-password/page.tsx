import Link from "next/link";

export default function ForgotPassword(){
    return(
        <main className="flex justify-center items-center min-h-screen">
            <form className="box form-container">
                <label htmlFor="email">Email</label>
                <input type="text" className="input" id="email"/>
                <button className="submit-btn">Receive Code</button>
                <div className="form-options">
                    <Link href="login">Login</Link>
                </div>
            </form>
        </main>
    )
}