import { useState, useRef, useEffect } from "react";

export default function Home({ handleNavigate }) {
  const [currentVideo, setCurrentVideo] = useState("h_spin.mp4");
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="flex items-center justify-center z-20 h-full bg-zinc-900">
      <div
        className={`grid grid-cols-2 p-8 items-center transition-all duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className={`flex flex-col items-start justify-center w-fit transition-transform duration-500 ${showContent ? "translate-x-0" : "-translate-x-full"}`}
        >
          <button
            className="my-1 uppercase text-xl text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.5)] hover:text-red-600 hover:[text-shadow:_0_0_15px_rgba(239,68,68,0.5)] hover:bg-zinc-800 hover:px-6 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
            onClick={() => handleNavigate("who")}
            onMouseEnter={() => setCurrentVideo("vin_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("h_spin.mp4")}
          >
            1. Who?
          </button>
          <button
            className="my-1 uppercase text-xl text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.5)] hover:text-red-600 hover:[text-shadow:_0_0_15px_rgba(239,68,68,0.5)] hover:bg-zinc-800 hover:px-6 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
            onClick={() => handleNavigate("what")}
            onMouseEnter={() => setCurrentVideo("cam_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("h_spin.mp4")}
          >
            2. What?
          </button>
          <button
            className="my-1 uppercase text-xl text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.5)] hover:text-red-500 hover:[text-shadow:_0_0_15px_rgba(239,68,68,0.5)] hover:bg-zinc-800 hover:px-6 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
            onClick={() => handleNavigate("when")}
            onMouseEnter={() => setCurrentVideo("dionysis_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("h_spin.mp4")}
          >
            3. When?
          </button>
          <button
            className="my-1 uppercase text-xl text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.5)] hover:text-red-500 hover:[text-shadow:_0_0_15px_rgba(239,68,68,0.5)] hover:bg-zinc-800 hover:px-6 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
            onClick={() => handleNavigate("where")}
            onMouseEnter={() => setCurrentVideo("earth_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("h_spin.mp4")}
          >
            4. Where?
          </button>
          <button
            className="my-1 uppercase text-xl text-white [text-shadow:_0_0_2px_rgba(255,255,255,0.5)] hover:text-red-500 hover:[text-shadow:_0_0_15px_rgba(239,68,68,0.5)] hover:bg-zinc-800 hover:px-6 transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap"
            onClick={() => handleNavigate("why")}
            onMouseEnter={() => setCurrentVideo("cash_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("h_spin.mp4")}
          >
            5. Why?
          </button>
        </div>
        <div
          className={`transition-transform duration-500 ${showContent ? "translate-x-0" : "translate-x-full"}`}
        >
          <video ref={videoRef} autoPlay loop muted className="z-0">
            <source src={`./home_videos/${currentVideo}`} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
