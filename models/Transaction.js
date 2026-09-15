import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], default: "credit" },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  description: { type: String, default: "Funds added by admin" },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
