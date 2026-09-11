import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyUserToken } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    await connectDB();

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
        pan_number: user.pan_number,
        aadhaar_no: user.aadhaar_no,
        address: user.address,
        pincode: user.pincode,
        city: user.city,
        state: user.state,
        country: user.country,
        date_of_birth: user.date_of_birth,
        profile_image: user.profile_image,
        businessName: user.businessName,
        bankAccount: user.bankAccount,
        bankIfsc: user.bankIfsc,
        kyc_status: user.kyc_status,
        is_active: user.is_active,
        wallet_balance: user.wallet_balance,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
