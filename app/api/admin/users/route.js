import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const authResult = verifyAdminToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "10", 10)));
    const search = (searchParams.get("search") || "").trim();
    const status = (searchParams.get("status") || "all").toLowerCase();
    const kyc = (searchParams.get("kyc") || "all").toLowerCase();
    const tab = (searchParams.get("tab") || "all").toLowerCase();
    const sortField = searchParams.get("sortBy") || "_id";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    // Build Mongo Query Filter
    const query = {};

    // 1. Text Search across name, first_name, last_name, email, phone, businessName, city
    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [
        { name: searchRegex },
        { first_name: searchRegex },
        { last_name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { businessName: searchRegex },
        { city: searchRegex },
        { aadhaar_no: searchRegex },
        { pan_number: searchRegex },
      ];
    }

    // 2. Status filter
    if (status === "active") {
      query.is_active = true;
    } else if (status === "inactive") {
      query.is_active = { $ne: true };
    }

    // 3. KYC filter
    if (kyc === "verified") {
      query.kyc_status = true;
    } else if (kyc === "pending") {
      query.kyc_status = { $ne: true };
    }

    // 4. Tab specific filter
    if (tab === "kyc") {
      query.kyc_status = { $ne: true };
    } else if (tab === "funds") {
      query.wallet_balance = { $gt: 0 };
    }

    // Calculate overall system metrics (global, not restricted by search/pagination)
    const [
      totalUsersCount,
      activeUsersCount,
      kycVerifiedCount,
      walletAggregate,
      filteredTotal,
      users,
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ is_active: true }),
      User.countDocuments({ kyc_status: true }),
      User.aggregate([
        {
          $group: {
            _id: null,
            totalWallet: { $sum: { $ifNull: ["$wallet_balance", 0] } },
          },
        },
      ]),
      User.countDocuments(query),
      User.find(query)
        .select("-password")
        .sort({ [sortField]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    const totalWallet = walletAggregate.length > 0 ? walletAggregate[0].totalWallet : 0;
    const totalPages = Math.ceil(filteredTotal / limit) || 1;

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        total: filteredTotal,
        page,
        limit,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
      metrics: {
        totalUsers: totalUsersCount,
        activeUsers: activeUsersCount,
        inactiveUsers: totalUsersCount - activeUsersCount,
        kycVerified: kycVerifiedCount,
        kycPending: totalUsersCount - kycVerifiedCount,
        totalWallet,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
