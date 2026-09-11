import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();
    const { username, password } = await request.json();

    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ id: admin._id, role: "admin" }, "1d");
    return NextResponse.json({ message: "Admin login successful", token });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
