import { connectDatabase } from "@/server/connection";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
  try {
    const { username, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectDatabase();
    // await User.create({ username: username, email: email, password: hashedPassword, usertype: false });

    // Create new user
    const newUser = new User({ username: username, email: email, password: hashedPassword, usertype: false });
    await newUser.save();

    return NextResponse.json({ message: "User registered."}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." + error },
      { status: 500 }
    );
  }
}