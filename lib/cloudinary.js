import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload an image (base64 string or url) to Cloudinary
 * @param {string} fileStr Base64 string or data URI
 * @param {string} folder Destination folder
 * @returns {Promise<object>} Cloudinary upload result
 */
export async function uploadToCloudinary(fileStr, folder = "dsc_profiles") {
  return await cloudinary.uploader.upload(fileStr, {
    folder,
    resource_type: "image",
    transformation: [
      { width: 500, height: 500, crop: "fill", gravity: "face" },
      { quality: "auto" },
      { fetch_format: "auto" }
    ],
  });
}
