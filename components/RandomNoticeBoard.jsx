"use client";

import React, { useState, useEffect } from "react";

const noticeBoards = [
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C203308%5C638773587167851956-mahila%20noti.jpeg",
    alt: "Mahila Notice",
    label: "Mahila Notice",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C11825%5C638515270611199784-Mentation%20Printer%20Notice%20Board.jpeg",
    alt: "Mentation Printer Notice Board",
    label: "Mentation Printer Notice Board",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C11825%5C638518699174934374-Reward%20Library%20Notice%20Board.jpeg",
    alt: "Reward Library Notice Board",
    label: "Reward Library Notice Board",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C203308%5C638780406177195212-notice%20face%20auth.jpeg",
    alt: "Face Auth Notice",
    label: "Face Auth Notice",
  },
];

const RandomNoticeBoard = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % noticeBoards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { src, alt, label } = noticeBoards[index];

  return (
    <div className="flex flex-col md:flex-row gap-1 items-start w-full">
      <div className="flex-1 bg-white rounded-xl shadow-md p-1 flex flex-col items-center">
        <img
          src={src}
          alt={alt}
          className="w-full max-w-4xl h-[400px] object-contain rounded"
        />
        <span className="text-base text-gray-800 font-semibold mt-1">{label}</span>
      </div>
    </div>
  );
};

export default RandomNoticeBoard;
