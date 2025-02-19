export default function Terms({ handleNavigate }) {
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
        <div className="text-right">TERMS AND CONDITIONS</div>
      </header>
      {/* VIDEO SLIDESHOW CONTAINER */}
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
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_1.jpg",
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_2.jpg",
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_3.jpg",
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_4.jpg",
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_5.jpg",
                "public/assets/PROJECT_IMAGES/TERMS_GALLERY/TERMS_6.jpg",
              ];

              // Create two layers for the crossfade effect.
              const layer1 = document.createElement("div");
              const layer2 = document.createElement("div");
              const playButton = document.createElement("button");

              [layer1, layer2].forEach((layer) => {
                layer.className =
                  "absolute inset-0 bg-cover bg-center transition-opacity duration-6000";
              });

              playButton.className =
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-40";
              playButton.innerHTML = `
                <div class="w-8 h-8 border border-white transition-colors hover:bg-white flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" class="transition-all hover:fill-[#18181b]">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              `;

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
              el.appendChild(playButton);

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
          {/* VIDEO SLIDESHOW CONTAINER END*/}
          <div className="flex justify-between w-full">
            <h2 className="text-[8px]">
              MUSIC VIDEO
              <br />
              [2024]
            </h2>
            <h2 className="text-[8px] text-right">
              RUNTIME:
              <br />
              00:04:13
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
                I made a music video for local Sydney musician, WHEREIMATRN. The
                entire video was shot in 3 hours. <br /> <br /> It’s a fun and
                surreal interpretation of his song, ‘Terms and Conditions'
                inspired by early 2000s java based browser games.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  LOGLINE
                </span>
                <br />
                Held captive by a sentient water cooler in a mysterious room, a
                man is forced to drink all of its contents in order to win his
                freedom — only to discover that he has wet the bed.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  CREDITS
                </span>
                <span className="text-white text-[7px] !text-left">
                  <u>DIRECTOR</u>: Henri Scott
                  <br /> <br />
                  <u>WRITER</u>: Henri Scott
                  <br />
                  <br />
                  <u>PRODUCERS</u>: <br />
                  Henri Scott, Gabriel Medieros
                  <br />
                  <br />
                  <u>CINEMATOGRAPHER</u>: Henri Scott
                  <br />
                  <br />
                  <u>ART DEPT</u>: Henri Scott
                  <br />
                  <br />
                  <u>EDITOR</u>: Henri Scott
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
        </div>
      </div>
    </div>
  );
}
