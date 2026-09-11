import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyUserToken } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    await connectDB();
    const body = await request.json();

    const {
      aadhaar_no,
      profile_image,
      first_name,
      last_name,
      pan_number,
      address,
      pincode,
      city,
      state,
      country,
      date_of_birth,
      businessName,
      bankAccount,
      bankIfsc,
    } = body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        aadhaar_no,
        profile_image,
        first_name,
        last_name,
        pan_number,
        address,
        pincode,
        city,
        state,
        country,
        date_of_birth,
        businessName,
        bankAccount,
        bankIfsc,
        kyc_status: true,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "KYC updated", user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
