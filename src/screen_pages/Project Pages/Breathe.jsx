export default function Breathe({ handleNavigate }) {
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
        <div className="text-right">JUST FUCKING BREATHE</div>
      </header>
      {/* SINGLE IMAGE CONTAINER */}
      <div className="w-full text-3xl gap-4 grid grid-cols-5 h-full mt-1">
        <div className="col-span-3 flex flex-col gap-3">
          <div className="bg-cover bg-center relative z-30 w-full flex items-center justify-center flex-shrink-0 grow bg-[url(/assets/JFB_banner.jpg)] p-2 transition-transform duration-300"></div>
          {/* SINGLE IMAGE CONTAINER */}

          <div className="flex justify-between w-full">
            <h2 className="text-[8px]">
              SHORT FILM
              <br />
              [IN DEVELOPMENT]
            </h2>
            <h2 className="text-[8px] text-right">
              RUNTIME:
              <br />
              00:05:00
            </h2>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              WRITER
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              PRODUCER
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <span
                className="text-[7px] text-left h-[120px] overflow-y-auto scrollbar-hide hide-scrollbar block flex-grow mr-[5px]"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "::-webkit-scrollbar": { display: "none" },
                }}
                ref={(el) => {
                  if (el) {
                    window.scrollableText = el;
                  }
                }}
              >
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  ABOUT
                </span>
                Following the success of his first film Bondi Boy, Sydney based
                director, Rhavin Banda, is teaming up with Henri Scott for an
                ultra-short film about temptation and the perils of
                justification.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  LOGLINE
                </span>
                <br />
                When Lobsang encounters an ad for a buddhist meditation app
                while watching online pornography next to his sleeping life, he
                is offered a chance to conquer his temptations.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  CREDITS
                </span>
                <span className="text-white text-[7px] !text-left">
                  <u>WRITERS</u>: Rhavin Banda, Henri Scott
                  <br />
                  <br />
                  <u>PRODUCERS</u>: Rhavin Banda, Henri Scott
                </span>
              </span>
              <div
                className="border border-white w-[90px] h-[120Px] cursor-grab active:cursor-grabbing relative"
                onMouseDown={(e) => {
                  let lastY = e.clientY;

                  const mouseMoveHandler = (e) => {
                    const delta = e.clientY - lastY;
                    window.scrollableText.scrollTop += delta;
                    lastY = e.clientY;
                    const scrollPercentage =
                      (window.scrollableText.scrollTop /
                        (window.scrollableText.scrollHeight -
                          window.scrollableText.clientHeight)) *
                      100;
                    e.target.nextElementSibling.style.top = `${Math.min(Math.max(scrollPercentage, 0), 91)}%`;
                  };

                  const mouseUpHandler = () => {
                    document.removeEventListener("mousemove", mouseMoveHandler);
                    document.removeEventListener("mouseup", mouseUpHandler);
                  };

                  document.addEventListener("mousemove", mouseMoveHandler);
                  document.addEventListener("mouseup", mouseUpHandler);
                }}
              >
                <div
                  className="absolute bg-white w-full h-[9px] left-0"
                  style={{
                    top: (() => {
                      if (!window.scrollableText) return "0%";
                      const scrollPercentage =
                        (window.scrollableText.scrollTop /
                          (window.scrollableText.scrollHeight -
                            window.scrollableText.clientHeight)) *
                        100;
                      return `${Math.min(Math.max(scrollPercentage, 0), 91)}%`;
                    })(),
                  }}
                  ref={(el) => {
                    if (el) {
                      const updatePosition = () => {
                        const scrollPercentage =
                          (window.scrollableText.scrollTop /
                            (window.scrollableText.scrollHeight -
                              window.scrollableText.clientHeight)) *
                          100;
                        el.style.top = `${Math.min(Math.max(scrollPercentage, 0), 93)}%`;
                        requestAnimationFrame(updatePosition);
                      };
                      requestAnimationFrame(updatePosition);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
