import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  aadhaar_no: String,
  profile_image: String,
  kyc_status: { type: Boolean, default: false },
  is_active: { type: Boolean, default: false },
  wallet_balance: { type: Number, default: 0 },
  first_name: String,
  last_name: String,
  pan_number: String,
  address: String,
  pincode: String,
  city: String,
  state: String,
  country: String,
  date_of_birth: Date,
  businessName: { type: String, default: "" },
  bankAccount: { type: String, default: "" },
  bankIfsc: { type: String, default: "" },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
