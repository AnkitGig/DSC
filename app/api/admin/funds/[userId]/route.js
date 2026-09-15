import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { verifyAdminToken } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const authResult = verifyAdminToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    const { amount } = await request.json();

    if (typeof amount !== "number" || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.wallet_balance = (user.wallet_balance || 0) + amount;
    await user.save();

    // Create transaction record
    await Transaction.create({
      user: user._id,
      amount: amount,
      type: "credit",
      status: "Success",
      description: "Funds added by admin",
    });

    return NextResponse.json({
      message: "Funds added",
      balance: user.wallet_balance,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
