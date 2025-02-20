import { memo, useEffect, useRef } from "react";

const Where = memo(({ handleNavigate }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative z-20 flex justify-between flex-col h-full bg-[#18181b]">
      <header className="relative z-30 w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-[#00000] text-white mb-3">
        <button
          className="h-6 w-6 group cursor-pointer"
          onClick={() => handleNavigate("home")}
        >
          <svg
            className="w-full h-full group-hover:text-red-500"
            viewBox="0 0 29.68 20.77"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.87,12.55v-3.35h10.1c1.58,0,2.86,1.28,2.86,2.86s-1.28,2.86-2.86,2.86h-11.71v5.84h11.71c4.8,0,8.7-3.91,8.7-8.71s-3.91-8.7-8.7-8.7h-10.1V0L0,6.28l10.87,6.28h0Z"
              fill="currentColor"
            />
          </svg>
        </button>
        3. Where?
      </header>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-10"
        src="assets/OFFICE CCTV.mp4"
        autoPlay
        muted
        playsInline
        loop
      />
    </div>
  );
});

Where.displayName = "Where";

export default Where;
