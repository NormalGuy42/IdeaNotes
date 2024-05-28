import { connectDatabase } from "@/server/connection";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    // const searchParams = req.nextUrl.searchParams;
    const { username } = await req.json()
  try {
    await connectDatabase();

    const userExists = await User.findOne({ username }).select(' _id usertype ideas');
   
    if(userExists == null){
      throw new Error('User does not exist')
    }

    const ideaList = userExists.usertype ? userExists.ideas : []
    const userData = {id: userExists._id, usertype: userExists.usertype, ideaList}

    return NextResponse.json({data: userData},{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(
        { message: "An error occurred while getting the user data. " + error },
        { status: 500 }
      );
  }
}