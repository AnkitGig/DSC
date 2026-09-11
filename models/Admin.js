import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
