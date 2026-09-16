import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyUserToken } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

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

export async function PUT(request, { params }) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = params;
    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();

    // Check if profile_image is base64 and upload to Cloudinary
    let profileImageUrl = body.profile_image;
    if (profileImageUrl && profileImageUrl.startsWith("data:image")) {
      try {
        const uploadRes = await uploadToCloudinary(profileImageUrl, "dsc_profiles");
        profileImageUrl = uploadRes.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed in PUT:", uploadErr);
        // If Cloudinary fails, keep previous image or throw error
        return NextResponse.json(
          { error: "Failed to upload profile picture to Cloudinary" },
          { status: 500 }
        );
      }
    }

    // Updatable fields
    if (body.first_name !== undefined) user.first_name = body.first_name.trim();
    if (body.last_name !== undefined) user.last_name = body.last_name.trim();
    if (body.name !== undefined) {
      user.name = body.name.trim();
    } else if (body.first_name !== undefined || body.last_name !== undefined) {
      const fName = body.first_name !== undefined ? body.first_name.trim() : (user.first_name || "");
      const lName = body.last_name !== undefined ? body.last_name.trim() : (user.last_name || "");
      user.name = `${fName} ${lName}`.trim() || user.name;
    }

    if (body.phone !== undefined) user.phone = body.phone.trim();
    if (body.pan_number !== undefined) user.pan_number = body.pan_number.trim().toUpperCase();
    if (body.aadhaar_no !== undefined) user.aadhaar_no = body.aadhaar_no.trim();
    if (body.address !== undefined) user.address = body.address.trim();
    if (body.pincode !== undefined) user.pincode = body.pincode.trim();
    if (body.city !== undefined) user.city = body.city.trim();
    if (body.state !== undefined) user.state = body.state.trim();
    if (body.country !== undefined) user.country = body.country.trim();
    if (body.date_of_birth !== undefined) {
      user.date_of_birth = body.date_of_birth ? new Date(body.date_of_birth) : null;
    }
    if (body.businessName !== undefined) user.businessName = body.businessName.trim();
    if (body.bankAccount !== undefined) user.bankAccount = body.bankAccount.trim();
    if (body.bankIfsc !== undefined) user.bankIfsc = body.bankIfsc.trim().toUpperCase();
    if (profileImageUrl !== undefined) user.profile_image = profileImageUrl;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
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
    console.error("Profile update error:", err);
    return NextResponse.json({ error: err.message || "Server error updating profile" }, { status: 500 });
  }
}

export async function PATCH(request, params) {
  return PUT(request, params);
}

