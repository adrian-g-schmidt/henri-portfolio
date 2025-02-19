import { memo } from "react";

const Who = memo(({ handleNavigate }) => {
  const startContinuousScroll = (direction) => {
    const scrollableDiv = document.querySelector(".overflow-y-scroll");
    if (scrollableDiv) {
      const scrollAmount = direction === "up" ? -5 : 5;
      const scroll = () => {
        scrollableDiv.scrollBy({
          top: scrollAmount,
          behavior: "auto",
        });
        if (window.scrollInterval) {
          requestAnimationFrame(scroll);
        }
      };
      window.scrollInterval = true;
      requestAnimationFrame(scroll);
    }
  };

  const stopContinuousScroll = () => {
    window.scrollInterval = false;
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const scrollableDiv = document.querySelector(".overflow-y-scroll");
    if (scrollableDiv) {
      const delta = e.deltaY || e.touches?.[0]?.clientY || 0;
      scrollableDiv.scrollBy({
        top: delta * 0.5,
        behavior: "auto",
      });
    }
  };

  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full bg-[#2160FF]">
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
        1. Who?
      </header>
      <div className="grow w-full h-12 text-left text-xs grid grid-cols-[1fr_5fr_1.25rem_1.25rem] px-0 gap-3">
        <div className="flex justify-between flex-col">
          <p className="text-[0.9rem]/3.5">
            HENRI
            <br />
            SCOTT is a FILMMAKER and multi-disciplinary CREATIVE.
          </p>
          <div className="flex flex-col justify-between gap-4 text-left">
            <div
              className="mt-auto text-xs border border-white hover:bg-white hover:text-[#2160FF] flex p-[2px] uppercase z-10 w-fit gap-1 group cursor-pointer"
              onClick={() =>
                window.open("assets/HENRI SCOTT_CV_2025.pdf", "_blank")
              }
            >
              <div className="w-fit">Portfolio</div>
              <svg
                className="h-4 fill-white group-hover:fill-[#2160FF]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
              </svg>
            </div>
            <div className="relative flex flex-col text-[0.55rem]">
              <a
                href="mailto:henri@henriscott.com"
                className="w-fit hover:px-0 hover:bg-white hover:text-[#2160FF]"
              >
                henri@henriscott.com
              </a>
              <a
                href="https://www.instagram.com/henri_spectacular/"
                className="w-fit hover:px-0 hover:bg-white hover:text-[#2160FF]"
              >
                @henri_spectacular
              </a>
            </div>
          </div>
        </div>
        <div
          className="overflow-y-scroll scrollbar-hide text-right text-[0.8rem]/3 mr-[-35px]"
          onWheel={handleScroll}
          onTouchMove={handleScroll}
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <p>
            <img
              alt="a scan of henri's drivers licence with fake details"
              src="assets/licence_edit_blue.jpg"
              className="w-full mb-4"
            />
            Henri&#39;s FILMMAKING practice spans NARRATIVE and DOCUMENTARY.
            <br />
            <br />
            His focus is on exploring contemplative internal struggles and
            contradictory characters who get in their own way.
            <img
              alt="A venn diagram of law, filmmaking, and design intersecting at creative problem solving"
              src="assets/venn.jpg"
              className="w-full my-4"
            />
            With a professional and educational background in design, law, and
            innovation, Henri has a strong interest and aptitude in CREATIVE
            IDEATION, STORY TELLING, and PROBLEM SOLVING.
            <br />
            <br />
            Nothing motivates him more than seeing a great idea come to life.
          </p>
          <img src="assets/henri_who.jpg" className="mt-3" />
        </div>
        <div className="flex flex-col gap-2 pl-9">
          <button
            onMouseDown={() => startContinuousScroll("up")}
            onMouseUp={stopContinuousScroll}
            onMouseLeave={stopContinuousScroll}
            className="border border-white hover:bg-white hover:text-[#2160FF] h-9 w-[17px]"
          >
            ▲
          </button>
          <button
            onMouseDown={() => startContinuousScroll("down")}
            onMouseUp={stopContinuousScroll}
            onMouseLeave={stopContinuousScroll}
            className="border border-white hover:bg-white hover:text-[#2160FF] h-9 w-[17px]"
          >
            ▼
          </button>
          <div
            className="border border-white w-[17px] h-19 cursor-grab active:cursor-grabbing relative"
            onMouseDown={(e) => {
              const scrollableDiv =
                document.querySelector(".overflow-y-scroll");
              const startY = e.clientY;
              const startScroll = scrollableDiv.scrollTop;

              const handleMouseMove = (e) => {
                const delta = e.clientY - startY;
                const scrollRatio = delta / scrollableDiv.clientHeight;
                const scrollAmount = scrollRatio * scrollableDiv.scrollHeight;
                scrollableDiv.scrollTop = startScroll + scrollAmount;
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            <div
              className="absolute bg-white w-full h-[25px] left-0"
              style={{
                top: (() => {
                  const scrollableDiv =
                    document.querySelector(".overflow-y-scroll");
                  if (!scrollableDiv) return "0%";
                  const scrollPercentage =
                    (scrollableDiv.scrollTop /
                      (scrollableDiv.scrollHeight -
                        scrollableDiv.clientHeight)) *
                    100;
                  return `${Math.min(Math.max(scrollPercentage, 0), 66)}%`;
                })(),
              }}
              ref={(el) => {
                if (el) {
                  const scrollableDiv =
                    document.querySelector(".overflow-y-scroll");
                  const updatePosition = () => {
                    const scrollPercentage =
                      (scrollableDiv.scrollTop /
                        (scrollableDiv.scrollHeight -
                          scrollableDiv.clientHeight)) *
                      100;
                    el.style.top = `${Math.min(Math.max(scrollPercentage, 0), 66)}%`;
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
  );
});

Who.displayName = "Who";

export default Who;
