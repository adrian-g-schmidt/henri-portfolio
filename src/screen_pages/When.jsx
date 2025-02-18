import React, { useState, useEffect, useRef } from "react";

const Square = ({
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  importantText,
  isFilled,
  isCurrentDay,
  media,
}) => {
  const [isFlashing, setIsFlashing] = useState(true);

  useEffect(() => {
    if (isCurrentDay) {
      const interval = setInterval(() => {
        setIsFlashing((prev) => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isCurrentDay]);

  return (
    <div className="relative overflow-visible z-10">
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-white text-[#2160FF] px-1 py-[0.125em] text-sm overflow-visible flex flex-row items-start gap-2">
          <div className="flex flex-col items-center">
            <div>{index}</div>
            {importantText && (
              <div className="text-[0.6rem]">{importantText}</div>
            )}
            {isCurrentDay && <div className="text-xs">TODAY</div>}
          </div>
          {media && media.type === "image" && (
            <img
              src={media.url}
              alt={importantText}
              className="max-w-[100px] max-h-[80px] object-contain"
            />
          )}
          {media && media.type === "video" && (
            <video
              src={media.url}
              className="max-w-[100px] max-h-[80px] object-contain"
              autoPlay
              muted
              loop
            />
          )}
        </div>
      )}
      <div
        className={`w-2 h-2 border border-white hover:bg-white/20 cursor-pointer relative transition-all duration-300
          ${isFilled || (isCurrentDay && isFlashing) ? "bg-white outline-1 outline-offset-[-2px] outline-[#2160FF]" : ""}`}
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
  const [isAnimating, setIsAnimating] = useState(false);
  const SQUARES_PER_ROW = 30;
  const TOTAL_SQUARES = 30392;
  const VISIBLE_SQUARES = 630;
  const scrollIntervalRef = useRef(null);
  const gridRef = useRef(null);
  const scrollVisRef = useRef(null);
  const isDraggingRef = useRef(false);
  const animationRef = useRef(null);

  const startDate = new Date("1997-12-01T00:00:00");
  const currentDate = new Date();
  const daysSinceStartDate = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24),
  );

  // Calculate initial start index
  const rowWithCurrentDay = Math.floor(daysSinceStartDate / SQUARES_PER_ROW);
  const initialStartIndex = Math.max(
    0,
    (rowWithCurrentDay - 10) * SQUARES_PER_ROW,
  );
  const [startIndex, setStartIndex] = useState(initialStartIndex);

  const squares = Array.from(
    { length: VISIBLE_SQUARES },
    (_, i) => i + startIndex,
  ).filter((index) => index < TOTAL_SQUARES);

  const importantSquares = {
    0: { text: "Birth" },
    592: { text: "Discovered Chocolate" },
    1028: {
      text: "First Steps",
      media: {
        type: "image",
        url: "assets/JFB.jpg",
      },
    },
    1497: { text: "Invented a New Dance Move" },
    2003: {
      text: "Became a Dinosaur Expert",
      media: {
        type: "video",
        url: "./intro-vid.mp4",
      },
    },
    2504: { text: "Built a Rocketship" },
    2998: { text: "Learned to Juggle" },
    3502: { text: "Farted" },
    4005: { text: "Mastered the Art of Sandwich Making" },
    4503: { text: "Discovered a New Planet" },
    5007: { text: "Became a Time Traveler" },
    5501: { text: "Won a Staring Contest with a Cat" },
    6002: { text: "Became a Professional Pillow Fort Architect" },
    6503: { text: "Learned to Speak Dolphin" },
    7001: { text: "Invented a New Ice Cream Flavor" },
    7504: { text: "Became a Superhero" },
    8006: { text: "Traveled to the Center of the Earth" },
    8502: { text: "Became a Master of Disguise" },
    9003: { text: "Learned to Fly" },
    9501: { text: "Became a World Champion in Hide and Seek" },
    30391: { text: "Expected Death" },
  };

  const importantSquareIndices = Object.keys(importantSquares)
    .map(Number)
    .sort((a, b) => a - b);

  const scrollUp = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - SQUARES_PER_ROW * 2));
  };

  const scrollDown = () => {
    const maxIndex =
      Math.ceil(
        (TOTAL_SQUARES - VISIBLE_SQUARES + SQUARES_PER_ROW) / SQUARES_PER_ROW,
      ) * SQUARES_PER_ROW;
    setStartIndex((prevIndex) =>
      Math.min(maxIndex, prevIndex + SQUARES_PER_ROW * 2),
    );
  };

  const startScrolling = (direction) => {
    if (scrollIntervalRef.current) return;

    let scrollMultiplier = 2;
    const scrollStartTime = Date.now();

    scrollIntervalRef.current = setInterval(() => {
      const scrollDuration = Date.now() - scrollStartTime;

      if (scrollDuration >= 1000) {
        scrollMultiplier = 12;
      } else if (scrollDuration >= 500) {
        scrollMultiplier = 6;
      }

      setStartIndex((prevIndex) => {
        if (direction === "up") {
          return Math.max(0, prevIndex - SQUARES_PER_ROW * scrollMultiplier);
        } else {
          const maxIndex =
            Math.ceil(
              (TOTAL_SQUARES - VISIBLE_SQUARES + SQUARES_PER_ROW) /
                SQUARES_PER_ROW,
            ) * SQUARES_PER_ROW;
          return Math.min(
            maxIndex,
            prevIndex + SQUARES_PER_ROW * scrollMultiplier,
          );
        }
      });
    }, 25);
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
      percentage * (TOTAL_SQUARES - VISIBLE_SQUARES + SQUARES_PER_ROW),
    );
    const adjustedStartIndex =
      Math.round(newStartIndex / SQUARES_PER_ROW) * SQUARES_PER_ROW;
    setStartIndex(
      Math.max(
        0,
        Math.min(
          adjustedStartIndex,
          TOTAL_SQUARES - VISIBLE_SQUARES + SQUARES_PER_ROW,
        ),
      ),
    );
  };

  const animateToIndex = (targetIndex) => {
    setIsAnimating(true);
    const startRow = Math.floor(startIndex / SQUARES_PER_ROW);
    const targetRow = Math.floor(targetIndex / SQUARES_PER_ROW);
    const distance = targetRow - startRow;
    const duration = 500; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentRow = startRow + distance * eased;
      const newIndex = Math.round(currentRow * SQUARES_PER_ROW);

      setStartIndex(
        Math.max(
          0,
          Math.min(newIndex, TOTAL_SQUARES - VISIBLE_SQUARES + SQUARES_PER_ROW),
        ),
      );

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const navigateToImportantSquare = (direction) => {
    const midPoint = hoveredIndex || startIndex + VISIBLE_SQUARES / 2;

    let targetSquare;
    if (direction === "next") {
      targetSquare = importantSquareIndices.find((index) => index > midPoint);
      if (!targetSquare) {
        targetSquare = importantSquareIndices[0]; // Wrap to beginning
      }
    } else {
      targetSquare = [...importantSquareIndices]
        .reverse()
        .find((index) => index < midPoint);
      if (!targetSquare) {
        targetSquare =
          importantSquareIndices[importantSquareIndices.length - 1]; // Wrap to end
      }
    }

    const targetRow = Math.floor(targetSquare / SQUARES_PER_ROW);
    const targetIndex = Math.max(0, (targetRow - 10) * SQUARES_PER_ROW);
    animateToIndex(targetIndex);
    setTimeout(() => {
      setHoveredIndex(targetSquare);
    }, 500);
  };

  const scrollToToday = () => {
    const targetRow = Math.floor(daysSinceStartDate / SQUARES_PER_ROW);
    const targetIndex = Math.max(0, (targetRow - 10) * SQUARES_PER_ROW);
    animateToIndex(targetIndex);
    setTimeout(() => {
      setHoveredIndex(daysSinceStartDate);
    }, 500);
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
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

      <div className="w-full text-[#FFFFFF] p-1 text-center text-[0.6rem] whitespace-nowrap">
        HENRI IS EXPECTED TO LIVE FOR ANOTHER{" "}
        {TOTAL_SQUARES - daysSinceStartDate} DAYS
      </div>

      <div className="w-full h-full relative flex pt-0.5">
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${SQUARES_PER_ROW}, minmax(0, 1fr))`,
          }}
        >
          {squares.map((index) => (
            <Square
              key={index}
              index={index + 1}
              isHovered={!isAnimating && hoveredIndex === index}
              onMouseEnter={() => !isAnimating && setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              importantText={importantSquares[index]?.text}
              media={importantSquares[index]?.media}
              isFilled={index < daysSinceStartDate}
              isCurrentDay={index === daysSinceStartDate}
            />
          ))}
        </div>
        <div className="ml-auto flex flex-col items-center gap-4 h-full">
          <div className="border border-white text-[0.6rem]/2 text-center p-1">
            {String(startIndex + 1).padStart(5, "0")} <br />- <br />
            {String(
              Math.min(startIndex + VISIBLE_SQUARES, TOTAL_SQUARES),
            ).padStart(5, "0")}
          </div>
          <div className="flex flex-row gap-1 mt-[-10px]">
            <button className="border border-white hover:bg-white hover:text-[#2160FF] h-3 px-1 text-xs flex items-center justify-center">
              -
            </button>
            <button className="border border-white hover:bg-white hover:text-[#2160FF] h-3 px-1 text-xs flex items-center justify-center">
              +
            </button>
          </div>
          <div className="flex flex-row gap-2 mt-[-10px]">
            <div
              className="border border-white h-16 relative"
              id="scroll-vis"
              ref={scrollVisRef}
              onMouseMove={handleScrub}
              onMouseDown={() => (isDraggingRef.current = true)}
              onMouseUp={() => (isDraggingRef.current = false)}
              onMouseLeave={() => (isDraggingRef.current = false)}
            >
              <div
                className="w-3 h-1.5 bg-white cursor-grab transition-transform duration-100"
                style={{
                  transform: `translateY(${(startIndex / TOTAL_SQUARES) * 57}px)`,
                }}
              ></div>
            </div>
            <div className="flex flex-col w-4 gap-2 text-xs">
              <button
                onMouseDown={() => startScrolling("up")}
                onMouseUp={stopScrolling}
                onMouseLeave={stopScrolling}
                onClick={scrollUp}
                className="border border-white hover:bg-white hover:text-[#2160FF] h-7"
              >
                ▲
              </button>
              <button
                onMouseDown={() => startScrolling("down")}
                onMouseUp={stopScrolling}
                onMouseLeave={stopScrolling}
                onClick={scrollDown}
                className="border border-white hover:bg-white hover:text-[#2160FF] h-7"
              >
                ▼
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-1 mt-[-10px] items-center">
            <button
              onClick={() => navigateToImportantSquare("prev")}
              className="border border-white hover:bg-white hover:text-[#2160FF] h-3 w-3 flex items-center justify-center text-[0.6rem]"
            >
              <span className="h-[14px]">&lt;</span>
            </button>
            <div className="w-2 h-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-400 "></div>
            </div>
            <button
              onClick={() => navigateToImportantSquare("next")}
              className="border border-white hover:bg-white hover:text-[#2160FF] h-3 w-3 flex items-center justify-center text-[0.6rem]"
            >
              <span className="h-[14px]">&gt;</span>
            </button>
          </div>
          <button
            onClick={scrollToToday}
            className="border border-white hover:bg-white hover:text-[#2160FF] text-[0.4rem] h-3 w-10 mt-[-10px] flex items-center justify-center"
          >
            TODAY
          </button>
        </div>
      </div>
    </div>
  );
}
