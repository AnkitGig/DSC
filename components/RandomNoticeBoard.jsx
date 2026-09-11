"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const noticeBoards = [
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C11825%5C638515270611199784-Mentation%20Printer%20Notice%20Board.jpeg",
    alt: "Mentation Printer Notice Board",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C203308%5C638780406177195212-notice%20face%20auth.jpeg",
    alt: "Face Auth Notice",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C11825%5C638518699174934374-Reward%20Library%20Notice%20Board.jpeg",
    alt: "Reward Library Notice Board",
  },
  {
    src: "https://csg3bc1d2bdf701x404ex975.blob.core.windows.net/vkv-b2b-blob/upload%5C203308%5C638773587167851956-mahila%20noti.jpeg",
    alt: "Mahila Notice",
  },
];

const RandomNoticeBoard = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % noticeBoards.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + noticeBoards.length) % noticeBoards.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % noticeBoards.length);
  };

  return (
    <div
      className="w-full relative group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg border border-slate-200/80 bg-white">
        {/* Banner Images Carousel */}
        <div className="w-full aspect-[21/9] sm:aspect-[24/9] md:aspect-[28/9] max-h-[340px] relative bg-slate-100 flex items-center justify-center overflow-hidden">
          {noticeBoards.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={`absolute inset-0 w-full h-full object-cover sm:object-fill transition-opacity duration-700 ease-in-out ${
                index === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            />
          ))}
        </div>

        {/* Floating Left Arrow */}
        <button
          onClick={handlePrev}
          title="Previous Banner"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 border border-slate-200"
        >
          <FaChevronLeft size={13} />
        </button>

        {/* Floating Right Arrow */}
        <button
          onClick={handleNext}
          title="Next Banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 border border-slate-200"
        >
          <FaChevronRight size={13} />
        </button>

        {/* Floating Modern Pill Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
          {noticeBoards.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              title={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === i
                  ? "w-6 h-2 bg-white shadow"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomNoticeBoard;
