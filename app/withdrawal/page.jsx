import React from "react";
import Withdrawal from "@/components/Withdrawal";

export const metadata = {
  title: "Cash Withdrawal (AePS) | DSC PAY",
  description: "Withdraw money from any bank account using AEPS (Aadhaar Enabled Payment System).",
};

export default function WithdrawalPage() {
  return <Withdrawal />;
}
