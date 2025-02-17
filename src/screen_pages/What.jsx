export default function What({ handleNavigate }) {
  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full bg-[#2160FF] overflow-visible">
      <header className="w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-white text-[#2160FF] mb-3">
        <button
          className="h-6 w-6 group cursor-pointer"
          onClick={() => handleNavigate("home")}
        >
          <svg
            className="w-full h-full group-hover:text-red-500"
            viewBox="0 0 61 43"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8401 24.6782C11.5485 25.3951 12.4819 25.7541 13.4159 25.7541C14.3352 25.7541 15.2551 25.4061 15.9606 24.7089C17.3831 23.3034 17.3969 21.0108 15.9913 19.5883L13.1162 16.6784H42.3437C48.4794 16.6784 53.4712 21.6701 53.4712 27.8058V28.1037C53.4712 31.076 52.3137 33.8702 50.212 35.972C48.798 37.386 48.798 39.6786 50.212 41.0926C50.919 41.7996 51.8458 42.1532 52.7724 42.1532C53.699 42.1532 54.6257 41.7997 55.3327 41.0926C58.8022 37.6231 60.7129 33.0103 60.7129 28.1037V27.8057C60.7129 22.8991 58.8022 18.2862 55.3327 14.8168C51.8632 11.3473 47.2503 9.43657 42.3437 9.43657H13.0327L15.9466 6.55733C17.3691 5.15182 17.3829 2.85923 15.9773 1.43675C14.572 0.0143373 12.2794 0.00047519 10.8568 1.40606L1.78887 10.3661C1.10573 11.0411 0.718681 11.9597 0.712957 12.92C0.707163 13.8803 1.08311 14.8035 1.75811 15.4867L10.8401 24.6782Z"
              fill="currentColor"
            />
          </svg>
        </button>
        2. What?
      </header>
      <div className="w-full text-3xl h-fit overflow-y-scroll [&::-webkit-scrollbar]:hidden snap-y snap-mandatory">
        <div className="flex gap-4 snap-start">
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1">FILMMAKING PROJECTS</h1>
            <p className="text-[10px] text-left uppercase mb-4">
              THE FOLLOWING COLLECTION OF PROJECTS WERE EITHER SPEARHEADED BY OR
              OTHERWISE INVOLVE HENRI SCOTT.
            </p>
          </div>
          <div className="flex flex-col flex-[0.7] mb-4">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(./showreel.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("showreel")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[12px] bg-white px-1">
                SHOWREEL
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[12px] bg-white px-1">
                [FEB 2025]
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 snap-start">
          <div className="flex flex-col">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(./vicarious.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("vicarious")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                SHORT FILM
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                [IN PRODUCTION]
              </div>
            </div>
            <h2 className="text-[10px] mt-2">VICARIOUS</h2>
          </div>
          <div className="flex flex-col">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(./running_joke.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("running")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                DOCUMENTARY
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                [IN PRODUCTION]
              </div>
            </div>
            <h2 className="text-[10px] mt-2">A LONG RUNNING JOKE</h2>
          </div>
          <div className="flex flex-col">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-white relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("project3")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                MUSIC VIDEO
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                [2024]
              </div>
            </div>
            <h2 className="text-[10px] mt-2">TERMS AND CONDITIONS</h2>
          </div>
          <div className="flex flex-col">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-white relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("project4")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                SHORT FILM
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                [IN PRODUCTION]
              </div>
            </div>
            <h2 className="text-[10px] mt-2">STRINGS ATTACHED</h2>
          </div>
          <div className="flex flex-col">
            <div
              className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-white relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
              onClick={() => handleNavigate("project5")}
            >
              <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                SHORT FILM
              </div>
              <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                [DEVELOPMENT]
              </div>
            </div>
            <h2 className="text-[10px] mt-2">JUST FUCKING BREATHE</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
