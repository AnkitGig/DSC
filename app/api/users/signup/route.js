import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, phone, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists." },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "Signup successful. Wait for admin verification." },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
