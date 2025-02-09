import { useState, useRef, useEffect } from "react";

export default function Home({ handleNavigate }) {
  const [currentVideo, setCurrentVideo] = useState("vin_spin.mp4");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  return (
    <div className="flex items-center justify-center z-20 h-full bg-zinc-900">
      <div className="grid grid-cols-2 p-4 ">
        <div className="flex flex-col items-start justify-center w-fit">
          <button
            className="-my-1 uppercase text-xl text-white hover:text-red-600 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("who")}
            onMouseEnter={() => setCurrentVideo("vin_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            1. Who?
          </button>
          <button
            className="-my-1 uppercase text-xl text-white hover:text-red-600 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("what")}
            onMouseEnter={() => setCurrentVideo("cam_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            2. What?
          </button>
          <button
            className="-my-1 uppercase
        text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("when")}
            onMouseEnter={() => setCurrentVideo("dionysis_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            3. When?
          </button>
          <button
            className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("where")}
            onMouseEnter={() => setCurrentVideo("vin_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            4. Where?
          </button>
          <button
            className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("why")}
            onMouseEnter={() => setCurrentVideo("cash_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            5. Why?
          </button>
          <button
            className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
            onClick={() => handleNavigate("how")}
            onMouseEnter={() => setCurrentVideo("vin_spin.mp4")}
            onMouseLeave={() => setCurrentVideo("vin_spin.mp4")}
          >
            6. How?
          </button>
        </div>
        <video ref={videoRef} autoPlay loop muted className="z-0">
          <source src={`./home_videos/${currentVideo}`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
