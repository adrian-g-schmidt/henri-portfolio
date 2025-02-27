import React, { useState, useEffect, useRef } from "react";

const Square = ({
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  importantText,
  isFilled,
}) => {
  return (
    <div className="relative overflow-visible z-10">
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-white text-[#2160FF] px-1 py-[0.125em] text-sm overflow-visible">
          {importantText || index}
        </div>
      )}
      <div
        className={`w-2 h-2 border border-white hover:bg-white/20 cursor-pointer relative ${isFilled ? "bg-white outline-1 outline-offset-[-2px] outline-[#2160FF]" : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {importantText && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function When({ handleNavigate }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const SQUARES_PER_ROW = 30;
  const TOTAL_SQUARES = 30392;
  const VISIBLE_SQUARES = 630;
  const scrollIntervalRef = useRef(null);
  const gridRef = useRef(null);
  const scrollVisRef = useRef(null);
  const isDraggingRef = useRef(false);

  const startDate = new Date("1997-12-01T00:00:00");
  const currentDate = new Date();
  const daysSinceStartDate = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24),
  );

  const squares = Array.from(
    { length: VISIBLE_SQUARES },
    (_, i) => i + startIndex,
  ).filter((index) => index < TOTAL_SQUARES);

  const importantSquares = {
    0: "Birth",
    237: "First Laugh",
    592: "Discovered Chocolate",
    1028: "First Steps",
    1497: "Invented a New Dance Move",
    2003: "Became a Dinosaur Expert",
    2504: "Built a Rocketship",
    2998: "Learned to Juggle",
    3502: "Became a Ninja",
    4005: "Mastered the Art of Sandwich Making",
    4503: "Discovered a New Planet",
    5007: "Became a Time Traveler",
    5501: "Won a Staring Contest with a Cat",
    6002: "Became a Professional Pillow Fort Architect",
    6503: "Learned to Speak Dolphin",
    7001: "Invented a New Ice Cream Flavor",
    7504: "Became a Superhero",
    8006: "Traveled to the Center of the Earth",
    8502: "Became a Master of Disguise",
    9003: "Learned to Fly",
    9501: "Became a World Champion in Hide and Seek",
    9940: "Discovered the Secret to Eternal Happiness",
  };

  const scrollUp = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - SQUARES_PER_ROW));
  };

  const scrollDown = () => {
    const maxIndex =
      Math.ceil((TOTAL_SQUARES - VISIBLE_SQUARES) / SQUARES_PER_ROW) *
      SQUARES_PER_ROW;
    setStartIndex((prevIndex) =>
      Math.min(maxIndex, prevIndex + SQUARES_PER_ROW),
    );
  };

  const startScrolling = (direction) => {
    if (scrollIntervalRef.current) return;

    scrollIntervalRef.current = setInterval(() => {
      setStartIndex((prevIndex) => {
        if (direction === "up") {
          return Math.max(0, prevIndex - SQUARES_PER_ROW);
        } else {
          return Math.min(
            TOTAL_SQUARES - VISIBLE_SQUARES,
            prevIndex + SQUARES_PER_ROW,
          );
        }
      });
    }, 50);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleScrub = (e) => {
    if (!isDraggingRef.current) return;
    const scrollVis = scrollVisRef.current;
    const rect = scrollVis.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = y / rect.height;
    const newStartIndex = Math.round(
      percentage * (TOTAL_SQUARES - VISIBLE_SQUARES),
    );
    const adjustedStartIndex =
      Math.round(newStartIndex / SQUARES_PER_ROW) * SQUARES_PER_ROW;
    setStartIndex(
      Math.max(
        0,
        Math.min(adjustedStartIndex, TOTAL_SQUARES - VISIBLE_SQUARES),
      ),
    );
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        scrollDown();
      } else {
        scrollUp();
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className="z-20 flex justify-start flex-col p-4 h-full bg-[#2160FF]">
      <header className="w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-white text-[#2160FF]">
        <button
          className="h-6 w-6 group cursor-pointer"
          onClick={() => handleNavigate("home")}
        >
          <svg
            className="h-6 w-6 group-hover:text-red-500"
            viewBox="0 0 61 43"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8401 24.6782C11.5485 25.3951 12.4819 25.7541 13.4159 25.7541C14.3352 25.7541 15.2551 25.4061 15.9606 24.7089C17.3831 23.3034 17.3969 21.0108 15.9913 19.5883L13.1162 16.6784H42.3437C48.4794 16.6784 53.4712 21.6701 53.4712 27.8058V28.1037C53.4712 31.076 52.3137 33.8702 50.212 35.972C48.798 37.386 48.798 39.6786 50.212 41.0926C50.919 41.7996 51.8458 42.1532 52.7724 42.1532C53.699 42.1532 54.6257 41.7997 55.3327 41.0926C58.8022 37.6231 60.7129 33.0103 60.7129 28.1037V27.8057C60.7129 22.8991 58.8022 18.2862 55.3327 14.8168C51.8632 11.3473 47.2503 9.43657 42.3437 9.43657H13.0327L15.9466 6.55733C17.3691 5.15182 17.3829 2.85923 15.9773 1.43675C14.572 0.0143373 12.2794 0.00047519 10.8568 1.40606L1.78887 10.3661C1.10573 11.0411 0.718681 11.9597 0.712957 12.92C0.707163 13.8803 1.08311 14.8035 1.75811 15.4867L10.8401 24.6782Z"
              fill="currentColor"
            />
          </svg>
        </button>
        3. When?
      </header>

      <div className="w-full h-full relative flex pt-2">
        <div ref={gridRef} className="grid grid-cols-30">
          {squares.map((index) => (
            <Square
              key={index}
              index={index + 1}
              isHovered={hoveredIndex === index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              importantText={importantSquares[index]}
              isFilled={index < daysSinceStartDate}
            />
          ))}
        </div>
        <div className="ml-1 flex flex-col items-center justify-between h-full">
          <div className="border border-white text-[0.6rem]/2 text-center p-1">
            {String(startIndex + 1).padStart(5, "0")} <br />- <br />
            {String(
              Math.min(startIndex + VISIBLE_SQUARES, TOTAL_SQUARES),
            ).padStart(5, "0")}
          </div>
          <div className="flex flex-col w-[20px] gap-2 text-xs">
            <button
              onMouseDown={() => startScrolling("up")}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
              onClick={scrollUp}
              className="border border-white hover:bg-white hover:text-[#2160FF] h-8"
            >
              ▲
            </button>
            <button
              onMouseDown={() => startScrolling("down")}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
              onClick={scrollDown}
              className="border border-white hover:bg-white hover:text-[#2160FF] h-9"
            >
              ▼
            </button>
          </div>
          <div
            className="border border-white h-12 relative"
            id="scroll-vis"
            ref={scrollVisRef}
            onMouseMove={handleScrub}
            onMouseDown={() => (isDraggingRef.current = true)}
            onMouseUp={() => (isDraggingRef.current = false)}
            onMouseLeave={() => (isDraggingRef.current = false)}
          >
            <div
              className="w-2 h-2 bg-white cursor-grab"
              style={{
                transform: `translateY(${(startIndex / TOTAL_SQUARES) * 40}px)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
