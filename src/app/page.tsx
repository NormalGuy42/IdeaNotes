import PasswordInput from "@/components/inputs/passwordInput";


export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <form className="box form-container">
        <label htmlFor="">Email</label>
        <input type="text" className="input"/>
        <label htmlFor="">Password</label>
        <PasswordInput/>
        <button className="submit-btn">Login</button>
      </form>
    </main>
  );
}
