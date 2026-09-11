import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyAdminToken } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const authResult = verifyAdminToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { is_active: false },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deactivated", user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
