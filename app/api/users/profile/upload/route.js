import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { verifyUserToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const authResult = verifyUserToken(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const contentType = request.headers.get("content-type") || "";

    let fileData = null;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      fileData = body.image || body.file;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") || formData.get("image");

      if (!file) {
        return NextResponse.json({ error: "No image file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || "image/jpeg";
      fileData = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    if (!fileData) {
      return NextResponse.json({ error: "Image data is missing" }, { status: 400 });
    }

    const uploadResponse = await uploadToCloudinary(fileData, "dsc_profiles");

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
