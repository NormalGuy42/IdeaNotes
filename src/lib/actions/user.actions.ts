"use server"

import { connectToMongoDB } from "@/db/connection";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { auth, signIn, signOut } from "../../auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Category } from "@/types";
import Waitlist from "../models/Waitlist";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { verificationEmailTemplate } from "@/components/email-templates/verification-email-template";
import { v4 as uuidv4 } from 'uuid'; 
import Verification from "../models/Verifications";

const resend = new Resend(process.env.RESEND_KEY);

// Create a new ratelimiter, that allows 5 requests every 6 hours
const waitlistRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "21600 s"), // Actual time is every 6 hours so that you don't have to wait a whole day
});



// TODO: Check if user is already verified in the user collection to not waste time sending emails
export async function subscribe(
  emailData: string,
  callbackUrl: string,
  verificationCode: string,
){

  try{

    const identifier = (headers().get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    
    const { success } = await waitlistRatelimit.limit(identifier);

    if(!success) return {success: false, message: `Limit achieved. Please try again in tomorrow`}

    const email = emailData

    await connectToMongoDB();

    const emailFound = await Waitlist.findOne({ email: { $regex: email, $options: 'i' } })

    if(emailFound) return { success: false, message: 'You have already joined' }

    //If the verification process started and there is a verification code in the url
    if(!verificationCode){

      //Create token
      const emailToken = uuidv4();
      
      const { error } = await resend.emails.send({
        from: 'IdeaNotes <sender@ideanotes.co>',
        to: email,
        subject: 'Email Verification',
        react: verificationEmailTemplate({token: emailToken, callbackUrl: callbackUrl, email: email})
      });
  
      if(!error){
        //Create a new verification token
        const newVerification = new Verification({
          email: email,
          token: emailToken,
        })    

        await newVerification.save()
        return {success: true, message: "✅ Please check your inbox to verify your email"}
      }
  
      console.log(error)
      return {success: false, message: "Email Error! Please contact website owner"}
    }

    // Find verification code before adding to waitlist
    const findUserVerification = await Verification.findOne({email: email}).select("+token")

    if(!findUserVerification) return {success: false, message: "No token exists for this user"}

    if(findUserVerification.token !== verificationCode) return {success: false, message: "Error! Codes do not match", revalidate: true}

    const subscriber = new Waitlist({
      email: email
    })

    await subscriber.save()
    await Verification.deleteOne({email: email});

    console.log(`User ${email} joined`)

    return {success: true, message: "🎉 Successfully Joined!"}


  }catch(error){
    console.log(error)
    return {success: false, message: `Important Error. Contact Website Owner`}
  }
  
}

// TODO: Check if user is in verified in the waitlist collection to not waste time sending emails
export async function verifyEmail(
  email: string,
  callbackUrl: string,
  verificationCode: string,
){

  try{

    const session = await auth()
    if(!session) return {success: false, message: "User not authenticated"};

    await connectToMongoDB();

    const user = await User.findOne({
      email: session.user.email
    }).select('+emailVerified')

    if(!user) return {success: false, message: "User does not exist"}

    if(user.emailVerified) return {success: false, message: "User already verified", updateSession: true}
    
    if(!verificationCode){

      //Create token
      const emailToken = uuidv4();
      
      const { error } = await resend.emails.send({
        from: 'IdeaNotes <sender@ideanotes.co>',
        to: email,
        subject: 'Email Verification',
        react: verificationEmailTemplate({token: emailToken, callbackUrl: callbackUrl, email: email})
      });
  
      if(!error){
        // console.log(`http://localhost:3000/${callbackUrl}?code=${emailToken}&email=${email}`)
      
        //Create a new verification token
        const newVerification = new Verification({
          email: email,
          token: emailToken,
        })    

        await newVerification.save()
        return {success: true, message: "✅ Please check your inbox to verify your email"}
      }
  
      console.log(error)
      return {success: false, message: "Email Error! Please contact website owner"}
    }
    else{

      // Find verification code before adding to waitlist
      const findUserVerification = await Verification.findOne({email: email}).select("+token")

      if(!findUserVerification) return {success: false, message: "No token exists for this user"}

      if(findUserVerification.token !== verificationCode) return {success: false, message: "Error! Codes do not match", revalidate: true}

      await User.findOneAndUpdate(
        {email: email},
        {$set: {emailVerified: true}}
      )
      await Verification.deleteOne({email: email});
  
      console.log(`User ${email} verified`)
      
      return {success: true, message: '🎉 Successfully verified email', revalidate: false}
    
    }
  }catch(error){
    console.log(error)
    return {success: false, message: "Error! Verification unsuccessful"}
  }

}

export async function signup(
  prevState: unknown,
  formData: FormData
){
  const email = formData.get('email');
  const password = formData.get('password') as string;

  try {

    await connectToMongoDB();
    const userFound = await User.findOne({ email: { $regex: email, $options: 'i' } });

    if(userFound) return { success: false, message: 'Email already in use' }
    
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      provider: 'credentials',
      role: 'user',
      emailVerified: false,
    });

    const savedUser = await user.save();
    const credentials = {email, password};

    await signIn('credentials', credentials)

    return { success: true, message: 'User account created successfully' }

  }catch(error){
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: `Error: ${error}` }
  }
}

export async function signUpWithGoogle(
  prevState: unknown,
  formData: FormData,
)
{
    const email = formData.get('email');

    try {
      await connectToMongoDB();
      const userFound = await User.findOne({ email: { $regex: email, $options: 'i' } });

      if(userFound) return { success: false, message: 'Email already in use' }
  
      const user = new User({
        email,
        role: 'user',
        provider: 'google',
        emailVerified: true,
      });
      const savedUser = await user.save();

    }catch(error){
        if(error instanceof AuthError) return { success: false, message: 'Google sign in failed' }
        if(isRedirectError(error)) return { success: false, message: `Google sign in failed: ${error}` }

        throw error

    }
}

export async function signInWithGoogle(){
    try{
      await signIn("google")
    }catch(error){
      if(error instanceof AuthError){
        return { success: false, message: 'Google sign in failed' }
      }
      throw error
    }
}

export async function signInWithCredentials(
    prevState: unknown,
    formData: FormData
  ) {
    try {
      const user = {
        email: formData.get('email'),
        password: formData.get('password'),
      }
      
      await signIn('credentials', user)
      return { success: true, message: 'Sign in successfully' }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      return { success: false, message: 'Invalid email or password' }
    }
  }


export async function logout(){

  await signOut({ 
    redirectTo: "/" , 
    redirect: true
  });
  revalidatePath('/')
}


// GET

export async function getUserCategories(){
  try {
    const session = await auth();
    if (!session) {
      return { 
        success: false, 
        message: 'Not authenticated' 
      };
    }

    await connectToMongoDB();

    const user = await User.findOne({ 
      _id: session.user.id 
    }).select('categories');

    if (!user) {
      return { 
        success: false, 
        message: 'User not found' 
      };
    }

    // Ensure categories is an array
    const categories: Category[] = user.categories || [];

    return { 
      success: true, 
      data: categories 
    };

} catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      message: `Error fetching categories: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
}
}