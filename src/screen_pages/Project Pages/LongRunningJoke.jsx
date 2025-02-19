export default function LongRunningJoke({ handleNavigate }) {
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
        <div className="text-right">A LONG RUNNING JOKE</div>
      </header>

      {/* SLIDESHOW CONTAINER */}
      <div className="w-full text-3xl gap-4 grid grid-cols-5 h-full mt-1">
        <div className="col-span-3 flex flex-col gap-3">
          <div
            className="relative z-30 w-full grow p-2 overflow-hidden"
            ref={(el) => {
              if (!el) return;
              // Prevent re-initialization on re-renders
              if (el._slideshowInitialized) return;
              el._slideshowInitialized = true;

              const images = [
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_1.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_3.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_4.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_5.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_6.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_7.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_8.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_9.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_10.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_11.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_12.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_13.jpg",
                "public/assets/PROJECT_IMAGES/RUNNINGJOKE_GALLERY/RUNNING_14.jpg",
              ];

              // Create two layers for the crossfade effect.
              const layer1 = document.createElement("div");
              const layer2 = document.createElement("div");

              [layer1, layer2].forEach((layer) => {
                layer.className =
                  "absolute inset-0 bg-cover bg-center transition-opacity duration-6000";
              });

              // Initialize:
              // layer1 is visible with the first image.
              // layer2 is hidden with the second image.
              layer1.style.backgroundImage = `url(${images[0]})`;
              layer1.style.opacity = "1";
              layer2.style.backgroundImage = `url(${images[1]})`;
              layer2.style.opacity = "0";

              // Append the layers to the container.
              el.appendChild(layer1);
              el.appendChild(layer2);

              // We'll alternate the roles of the two layers.
              let currentIndex = 0;
              let topLayer = layer1;
              let bottomLayer = layer2;

              setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                // Set the bottom layer's background to the next image.
                bottomLayer.style.backgroundImage = `url(${images[nextIndex]})`;
                // Fade in the bottom layer while fading out the top layer.
                bottomLayer.style.opacity = "1";
                topLayer.style.opacity = "0";

                // After the transition, swap the layers.
                setTimeout(() => {
                  const temp = topLayer;
                  topLayer = bottomLayer;
                  bottomLayer = temp;
                  currentIndex = nextIndex;
                }, 6000); // 6000ms matches the transition duration.
              }, 9000);
            }}
          />
          {/* SLIDESHOW CONTAINER END*/}

          <div className="flex justify-between w-full">
            <h2 className="text-[8px]">
              DOCUMENTARY
              <br />
              [IN PRODUCTION]
            </h2>
            <h2 className="text-[8px] text-right">
              RUNTIME:
              <br />
              00:16:30
            </h2>
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
              EDITOR
            </span>
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              CINEMATOGRAPHER
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <span
                className="text-[7px] text-left h-[90px] overflow-y-auto scrollbar-hide hide-scrollbar block flex-grow mr-[5px]"
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
                As a solo filmmaker, I have been able to film Mikey over the
                course of a year, gaining intimate access into his career and
                home life.
                <br />
                <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  LOGLINE
                </span>
                <br />
                A Long Running Joke follows Australia’s leading ultra trail
                runner, Mikey Dimuantes, as he competes at the highest level in
                his sport.
                <br /> <br />
                While the surface-level narrative tracks Mikey’s quest to
                compete against the best in the world, the deeper story is an
                intimate exploration of his evolving relationship with trail
                running, amidst the complexity of trying to build and maintain a
                full and meaningful life. When the very thing that once cured
                his anxiety becomes the cause of it, how can he justify
                continuing to compete?
                <br /> <br />
                The project has attracted significant early interest, receiving
                funding.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  CREDITS
                </span>
                <span className="text-white text-[7px] !text-left">
                  <u>DIRECTOR</u>: Henri Scott
                  <br />
                  <br />
                  <u>WRITER</u>: Henri Scott
                  <br />
                  <br />
                  <u>PRODUCERS</u>:<br /> Henri Scott, Sebastian Zizza
                  <br />
                  <br />
                  <u>DOP</u>: Henri Scott
                  <br />
                  <br />
                  <u>DOP 2ND UNIT</u>: Gianluca Cascone
                  <br />
                  <br />
                  <u>DRONE OPERATOR</u>: Charlie Kinnear
                </span>
              </span>
              <div
                className="border border-white w-[90px] h-[90px] cursor-grab active:cursor-grabbing relative"
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
                        el.style.top = `${Math.min(Math.max(scrollPercentage, 0), 91)}%`;
                        requestAnimationFrame(updatePosition);
                      };
                      requestAnimationFrame(updatePosition);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-auto text-xs border border-white hover:bg-white hover:text-[#18181b] flex p-[2px] uppercase z-10 w-fit gap-1 ml-auto group">
            <div className="w-fit">Treatment</div>
            <svg
              className="h-4 fill-white group-hover:fill-[#18181b]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
