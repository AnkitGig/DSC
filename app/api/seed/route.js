import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const admin = new Admin({
        username: "admin",
        password: "admin123",
      });
      await admin.save();
      return NextResponse.json({ message: "Admin initialized (admin / admin123)" });
    }
    return NextResponse.json({ message: "Admin already exists", count: adminCount });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
