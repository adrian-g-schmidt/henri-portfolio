import { DvdScreensaver } from "react-dvd-screensaver";
import { useState, useRef, useEffect } from "react";

const COLORS = [
  "#ff0000",
  "#ff4000",
  "#ff8000",
  "#ffbf00",
  "#ffff00",
  "#bfff00",
  "#80ff00",
  "#40ff00",
  "#00ff00",
  "#00ff40",
  "#00ff80",
  "#00ffbf",
  "#00ffff",
  "#00bfff",
  "#0080ff",
  "#0040ff",
  "#0000ff",
  "#4000ff",
  "#8000ff",
  "#bf00ff",
  "#ff00ff",
  "#ff00bf",
  "#ff0080",
  "#ff0040",
  "#ff0000",
];

export default function Bouncing({ handleNavigate }) {
  const [logoColor, setLogoColor] = useState(COLORS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleImpact = () => {
    setLogoColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  };

  const handleClick = () => {
    const video = videoRef.current;
    if (!isPlaying) {
      video.currentTime = 1; // Skip first second
      video.play();
      setIsPlaying(true);

      video.addEventListener("timeupdate", () => {
        if (video.duration - video.currentTime <= 4.5) {
          video.pause();
          handleNavigate("home");
        }
      });
    } else {
      video.currentTime = video.duration - 3;
    }
  };

  return (
    <div
      className="cursor-pointer flex items-center justify-center z-20 w-full h-[240px]"
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="./intro-vid.mp4"
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-30"
        style={{ opacity: videoRef.current?.played.length ? 1 : 0 }}
      />
      {!isPlaying && (
        <DvdScreensaver speed={0.4} impactCallback={handleImpact}>
          <div className="relative w-[44px] h-[34px] z-10">
            <img
              src="./assets/logo.png"
              className="absolute w-full h-full object-contain mix-blend-screen"
            />
            <div
              style={{
                backgroundColor: logoColor,
                maskImage: "url('./assets/logo.png')",
                WebkitMaskImage: "url('./assets/logo.png')",
                maskSize: "contain",
                WebkitMaskSize: "contain",
              }}
              className="absolute w-full h-full z-10 mix-blend-color"
            />
          </div>
        </DvdScreensaver>
      )}
    </div>
  );
}
