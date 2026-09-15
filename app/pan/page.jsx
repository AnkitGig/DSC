import { Suspense } from "react";
import Aadhaar from "@/components/Aadhaar";

export const metadata = {
  title: "PAN Card Services | DSC PAY",
  description: "Apply for New PAN Card, Correction, Minor PAN, and PVC PAN Card Online",
};

export default function PanCardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f8fc] md:ml-64 p-6 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>}>
      <Aadhaar initialTab="pan" />
    </Suspense>
  );
}
