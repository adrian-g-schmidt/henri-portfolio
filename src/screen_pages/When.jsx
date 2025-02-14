import React, { useEffect, useRef, useState } from "react";

export default function When({ handleNavigate }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");
    const cellWidth = canvas.width / 30;
    const cellHeight = cellWidth;

    canvas.height = cellWidth * Math.ceil(2000 / 30);

    const drawVisibleArea = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#fff";

      const containerRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const visibleHeight = containerRect.height;

      const startRow = Math.max(0, Math.floor(scrollTop / cellHeight) - 5);
      const endRow = Math.min(
        Math.ceil((scrollTop + visibleHeight) / cellHeight) + 5,
        Math.ceil(canvas.height / cellHeight),
      );

      // Draw only visible cells and their immediate surroundings
      const visibleStartRow = Math.max(0, Math.floor(scrollTop / cellHeight));
      const visibleEndRow = Math.min(
        Math.ceil((scrollTop + visibleHeight) / cellHeight),
        Math.ceil(canvas.height / cellHeight),
      );

      // Draw vertical lines for visible area
      for (let i = 0; i <= 30; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, visibleStartRow * cellHeight);
        ctx.lineTo(i * cellWidth, visibleEndRow * cellHeight);
        ctx.stroke();
      }

      // Draw horizontal lines for visible area
      for (let i = visibleStartRow; i <= visibleEndRow; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(canvas.width, i * cellHeight);
        ctx.stroke();
      }

      if (hoveredCell) {
        const cellY = hoveredCell.y;
        if (cellY >= visibleStartRow && cellY <= visibleEndRow) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
          ctx.fillRect(
            hoveredCell.x * cellWidth,
            hoveredCell.y * cellHeight,
            cellWidth,
            cellHeight,
          );

          const cellNumber = hoveredCell.y * 50 + hoveredCell.x + 1;

          const boxHeight = 40;
          const boxWidth = Math.max(60, cellNumber.toString().length * 20);
          const boxX = hoveredCell.x * cellWidth + (cellWidth - boxWidth) / 2;
          const boxY = hoveredCell.y * cellHeight - boxHeight - 5;

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

          ctx.fillStyle = "#2160FF";
          ctx.font = "30px Crt";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            cellNumber.toString(),
            boxX + boxWidth / 2,
            boxY + boxHeight / 2,
          );
        }
      }
    };

    drawVisibleArea();
    container.addEventListener("scroll", () => {
      window.requestAnimationFrame(drawVisibleArea);
    });

    return () => {
      container.removeEventListener("scroll", drawVisibleArea);
    };
  }, [hoveredCell, scrollPosition]);

  return (
    <div className="z-20 flex justify-start flex-col p-4 h-full bg-[#2160FF]">
      <header className="w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-white text-[#2160FF] mb-3">
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
      <div
        ref={containerRef}
        className="overflow-y-scroll w-full h-full"
        onScroll={(e) => setScrollPosition(e.target.scrollTop)}
      >
        <canvas
          ref={canvasRef}
          width="900"
          height="900"
          className="w-full border border-white"
          onMouseMove={(e) => {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;
            const cellWidth = canvas.width / 30;
            const cellHeight = cellWidth;
            const cellX = Math.floor(x / cellWidth);
            const cellY = Math.floor(y / cellHeight);
            setHoveredCell({ x: cellX, y: cellY });
          }}
          onMouseLeave={() => setHoveredCell(null)}
        />
      </div>
    </div>
  );
}
