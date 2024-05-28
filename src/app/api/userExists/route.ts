import { connectDatabase } from "@/server/connection";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDatabase();

    let status = '';
    const { email, username } = await req.json();
    const userNameExists = await User.findOne({username: {$regex: `^${username}$`, $options: 'i'}}).select("_id");
   
    if(userNameExists !== null){
      status = 'Username'
    }
   
    const emailExists = await User.findOne({ email }).select("_id");
    if(emailExists !== null){
      status = 'Email'
    }

    return NextResponse.json({status: status });
    
  } catch (error) {
    console.log(error);
  }
}