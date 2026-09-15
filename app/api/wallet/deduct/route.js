import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import { verifyUserToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId, amount, serviceName, description } = await request.json();

    const targetUserId = userId || authResult.user?.userId || authResult.user?.id;
    if (!targetUserId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: "Invalid deduction amount" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(targetUserId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentBalance = Number(user.wallet_balance || 0);
    if (currentBalance < numAmount) {
      return NextResponse.json(
        {
          error: `Insufficient wallet balance (Current Balance: ₹${currentBalance.toFixed(
            2
          )}). Please ask admin to add funds.`,
          balance: currentBalance,
        },
        { status: 400 }
      );
    }

    user.wallet_balance = currentBalance - numAmount;
    await user.save();

    // Create transaction log
    await Transaction.create({
      user: user._id,
      amount: numAmount,
      type: "debit",
      status: "Pending",
      description: description || serviceName || "Service Fee Deduction",
    });

    return NextResponse.json({
      message: "Deduction successful",
      balance: user.wallet_balance,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
