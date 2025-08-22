// "use client"

import NewIdeaFormTemplate from "@/components/forms/new-idea-form-template";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { DiscordLink, TwitterLink } from "@/lib/constants";
import { Plus } from "lucide-react";
import Link from "next/link";



export default function Home() {   

  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center flex-col landing-section ">
        <h1 className="text-5xl headline max-sm:text-4xl"><span>Never forget an idea</span> ever again starting from now</h1>
        <p className="p-3 text-center max-sm:max-w-[400px]">Document, Categorize and keep track of your ideas, all in one place.</p>
          
        <div className="relative pb-[59.4059405940594%] h-0 w-5/6 max-[800px]: mx-auto"><iframe src="https://www.loom.com/embed/44171d5a9fd848088c9860012dfe3ed0?sid=6d2d3cde-808e-45f6-a933-ded880c1075d" allowFullScreen className="absolute top-0 left-0 w-full h-full"></iframe></div>
          
          
      </div>
      <section className="landing-section p-16">
        <h2 className="subheading text-center">Why Ideanotes</h2>
        <p className="text-center max-w-[600px] mx-auto">Ideanotes is the perfect platform to track and document all your ideas. Whether it's important ideas such as potential businesses you want to start or just something fun you thought about, Ideanotes helps you with storing and refining your idea</p>
        <ul className="flex justify-evenly gap-7 p-7">
          <li className="landing-card">
              <div className="number">
                1
              </div>
              <p>Track your ideas</p>
          </li>
          <li className="landing-card">
              <div className="number">
                2
              </div>
              <p>Categorize your ideas</p>
          </li>
          <li className="landing-card">
              <div className="number">
                3
              </div>
              <p>Document your ideas</p>
          </li>
        </ul>
        <video src="/david-lynch-ideas.mp4" controls className="max-w-[640px] mx-auto"></video>
      </section>
      <section className="landing-section landing-test flex">
        <div className="flex items-center landing-test-container">
          <div className="landing-test-container-inner">
            <h2 className="subheading"> <span>Try it out</span> </h2>
            <p>See how easy it is to get started. Just fill a simple form to create or add an idea to a category. You have to write a title and quick descrption to lay the foundation of your idea, you can write all the rest of the details out later. </p>
          </div>
          <img src="/arrow.png" alt="" className="max-w-[240px]"/>
        </div>
        <NewIdeaFormTemplate/>
      </section>
      <section className="landing-section">
        <h2 className="subheading text-center">Join our discord</h2>
        <p className="max-w-[600px] text-center mx-auto">You can join our discord to have direct access to me and can suggest features and report bugs. You will also be part of a vibrant community that you will allow you to showcase your work</p>
        <Link href={DiscordLink} className="join-discord-link">
          <button className="main-btn join-discord">
            Join Now <img src="/icons/discord-icon-white.svg" alt="" height={100} width={100}/>
          </button>
        </Link>
      </section>
      <section className="landing-section">
        <h2 className="subheading">FAQ</h2>
        <p>If you have another question you can contact me on <Link href={TwitterLink}><span className="!underline">Twitter</span></Link> or on <Link href={DiscordLink}><span className="!underline">Discord</span></Link></p>
        <ul className="pt-8">
          <li className="faq-card">
            <div className="flex items-center justify-between">
              <h3 className="faq-title text-2xl">Is my data secure</h3>
              <button><Plus/></button>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quaerat architecto explicabo, esse officia ea aspernatur possimus magni saepe, pariatur suscipit rerum repudiandae molestiae unde itaque iusto totam consectetur at!
            </p>
          </li>
        </ul>
      </section>
      <section className="landing-section flex flex-col items-center">
        <h2 className="subheading">Stop forgetting your ideas</h2>
        <button className="main-btn max-w-[150px]">Get Started Now</button>
      </section>

      <Footer/>
  </main>
);
}
