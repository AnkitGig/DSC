"use client";

import React from "react";
import { FaTimes, FaHeadset, FaPhoneAlt } from "react-icons/fa";

/**
 * Reusable Customer Not Found / Error Popup Modal
 *
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Callback function to close the modal
 * @param {string} [title="Customer Not Found"] - Modal title
 * @param {string|React.ReactNode} [description] - Description or error explanation text
 * @param {string|React.ReactNode} [helpText] - Help message in the bottom highlighted box
 * @param {string} [buttonText="Contact Customer Team"] - Label on the main action button
 * @param {function} [onButtonClick] - Custom action when clicking the button (defaults to onClose)
 * @param {boolean} [showDivider=true] - Whether to show the "OR" divider
 * @param {boolean} [showHelpBox=true] - Whether to show the customer support info box
 */
export default function CustomerNotFoundModal({
  isOpen,
  onClose,
  title = "Customer Not Found",
  description = "The details you entered do not match with our records.\nPlease check the Consumer Number / Account Number and try again.",
  helpText,
  buttonText = "Contact Customer Team",
  onButtonClick,
  showDivider = true,
  showHelpBox = true,
}) {
  if (!isOpen) return null;

  const handleAction = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-[#fff8f8] rounded-3xl shadow-2xl p-6 sm:p-7 max-w-sm sm:max-w-md w-full border border-red-200 text-center relative animate-in zoom-in-95">
        {/* Close (X) button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            title="Close"
          >
            <FaTimes size={16} />
          </button>
        )}

        {/* Red Circle Exclamation Icon */}
        <div className="w-13 h-13 rounded-full border-[2.5px] border-red-500 text-red-500 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl font-black leading-none -mt-0.5">!</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-black text-[#0a1e4d] mb-1.5">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto mb-4 font-medium whitespace-pre-line">
            {description}
          </p>
        )}

        {/* OR Divider */}
        {showDivider && (
          <div className="flex items-center justify-center my-4 text-xs font-bold text-slate-400 gap-3">
            <div className="h-[1px] bg-slate-200/80 flex-1"></div>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
              OR
            </span>
            <div className="h-[1px] bg-slate-200/80 flex-1"></div>
          </div>
        )}

        {/* Help Box */}
        {showHelpBox && (
          <div className="bg-[#fcebeb] border border-red-100 rounded-2xl p-3.5 flex items-center gap-3 text-left mb-5">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1d68f6] flex items-center justify-center shrink-0">
              <FaHeadset size={18} />
            </div>
            <p className="text-xs text-slate-700 leading-snug">
              {helpText || (
                <>
                  If you are still facing the issue, please contact our{" "}
                  <span className="font-bold text-slate-900">
                    Customer Team
                  </span>{" "}
                  for further assistance.
                </>
              )}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAction}
          className="w-full py-3 bg-[#1d68f6] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <FaPhoneAlt size={12} />
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
}
