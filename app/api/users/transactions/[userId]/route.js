import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Transaction from "@/models/Transaction";
import { verifyUserToken } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    await connectDB();

    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
    return NextResponse.json({ transactions });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
