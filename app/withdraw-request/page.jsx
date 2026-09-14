import React from "react";
import WithdrawRequest from "@/components/WithdrawRequest";

export const metadata = {
  title: "Withdraw Request | DSC PAY",
  description: "Submit a request to withdraw wallet funds directly to your bank account.",
};

export default function WithdrawRequestPage() {
  return <WithdrawRequest />;
}
