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


export async function subscribe(
  emailData: String,
){

  try{
    const email = emailData

    await connectToMongoDB();

    const emailFound = await Waitlist.findOne({ email: { $regex: email, $options: 'i' } })

    if(emailFound) return { success: false, message: 'You have already joined' }

    const subscriber = new Waitlist({
      email: email
    })
  
    await subscriber.save()

    console.log(`User ${email} joined`)

    return {success: true, message: "🎉 Successfully Joined!"}

  }catch(error){
    console.log(error)
    return {success: false, message: `Important Error. Contact Website Owner`}
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