export default function Showreel({ handleNavigate }) {
  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full">
      <header className="w-full uppercase text-xl pb-2 flex justify-between">
        <button
          className="h-6 w-6 group cursor-pointer"
          onClick={() => handleNavigate("what")}
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
        SHOWREEL [FEB 2025]
      </header>
      <div className="w-full text-3xl gap-4 grid grid-cols-5 h-full mt-1">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="bg-cover relative z-30 w-full flex items-center justify-center flex-shrink-0 grow bg-[url(assets/showreel_banner.jpg)] p-2 hover:scale-105 transition-transform duration-300">
            <div className="text-white text-6xl drop-shadow-lg -translate-y-[8px]">
              ▶
            </div>
          </div>
          <div className="flex justify-between w-full">
            <h2 className="text-[8px]">SHOWREEL [FEB 2025]</h2>
            <h2 className="text-[8px] text-right">RUNTIME: 00:05:35</h2>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              DIRECTOR
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              WRITER
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              PRODUCER
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              CINEMATOGRAPHER
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              EDITOR
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-[7px] text-left h-[60px] overflow-y-auto scrollbar-hide hide-scrollbar block"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "::-webkit-scrollbar": { display: "none" },
              }}
            >
              <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                ABOUT
              </span>
              A Showcase of my work as a filmmaker spanning Narrative and
              Documentary.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
