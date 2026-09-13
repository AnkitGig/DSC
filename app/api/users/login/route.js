import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    const user = await User.findOne({ email, password });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: "Account not activated by admin" },
        { status: 403 }
      );
    }

    // Generate JWT token for user
    const token = generateToken({ id: user._id, role: "user" }, "1d");

    return NextResponse.json({
      message: "Login successful",
      token,
      userId: user._id,
      kyc_status: !!user.kyc_status,
      name: user.name || user.first_name || "",
      email: user.email,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
