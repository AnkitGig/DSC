"use client";

import React, { useState } from "react";

const aadhaarServices = [
  {
    title: "Name Updation",
    description: "Update your name on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Mobile Number Updation",
    description: "Update your mobile number linked to Aadhaar.",
    image: "/assets/mobile.png",
  },
  {
    title: "Email Updation",
    description: "Update your email address on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Address Updation",
    description: "Update your address on Aadhaar.",
    image: "/assets/id-card.png",
  },
  {
    title: "Photo Change",
    description: "Change your photo on Aadhaar.",
    image: "/assets/boy.png",
  },
  {
    title: "Biometric Change (Only Five Finger Device)",
    description: "Update your biometrics using a five finger device.",
    image: "/assets/fingerprint.png",
  },
  {
    title: "Blue Card",
    description: "Apply for Aadhaar Blue Card for children below 5 years.",
    image: "/assets/Aadhaar1.png",
  },
];

const Aadhaar = () => {
  const [popup, setPopup] = useState({ open: false, service: null });

  const handleCardClick = (service) => {
    setPopup({ open: true, service });
  };

  const closePopup = () => {
    setPopup({ open: false, service: null });
  };

  return (
    <div className="aadhaar-page p-4 md:ml-64 md:p-6" style={{ minHeight: "100vh", background: "#f5f7fa", padding: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
        <img src="/assets/Aadhaar_Preview.png" alt="Aadhaar Card Logo" style={{ width: 120, height: "auto", marginBottom: 12 }} />
        <h2 style={{ textAlign: "center", color: "#2d3748", fontWeight: 700, fontSize: 32, letterSpacing: 2 }}>AADHAAR CARD</h2>
        <p style={{ color: "#4a5568", fontSize: 18, marginTop: 4, marginBottom: 0 }}>Aadhaar Services</p>
      </div>

      <div
        className="aadhaar-services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {aadhaarServices.map((service, idx) => (
          <div
            key={idx}
            className="aadhaar-service-card"
            style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(service)}
          >
            <div
              style={{
                width: 60,
                height: 60,
                background: "#e2e8f0",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                overflow: "hidden",
              }}
            >
              <img src={service.image} alt={service.title + " icon"} style={{ width: 40, height: 40, objectFit: "contain" }} />
            </div>
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#2b6cb0", fontWeight: 600 }}>{service.title}</h3>
            <p style={{ color: "#4a5568", textAlign: "center", fontSize: "1rem" }}>{service.description}</p>
          </div>
        ))}
      </div>

      {popup.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closePopup}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "1rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              padding: "2rem 2.5rem",
              minWidth: 320,
              maxWidth: "90vw",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#2b6cb0", fontWeight: 700, fontSize: 24, marginBottom: 12 }}>{popup.service?.title}</h2>
            <p style={{ color: "#4a5568", fontSize: 16, marginBottom: 18 }}>{popup.service?.description}</p>
            <div style={{ color: "#e53e3e", fontWeight: 500, fontSize: 16, marginBottom: 18 }}>
              Please add the biometric device
            </div>
            <button
              onClick={closePopup}
              style={{
                marginTop: 8,
                padding: "8px 24px",
                background: "#2b6cb0",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aadhaar;
