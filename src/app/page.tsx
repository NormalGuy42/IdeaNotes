import Header from "@/components/Header";
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-[80vh] flex items-center justify-center">
        <p>HomePage</p>    
      </div>
    </main>
  );
}
