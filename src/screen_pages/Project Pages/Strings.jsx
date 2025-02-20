export default function Strings({ handleNavigate }) {
  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full">
      <header className="w-full uppercase text-xl pb-2 flex justify-between">
        <button
          className="h-6 w-6 group cursor-pointer"
          onClick={() => handleNavigate("what")}
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
        <div className="text-right">STRINGS ATTACHED</div>
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
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_1.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_2.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_3.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_4.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_5.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_6.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_7.jpg",
                "assets/PROJECT_IMAGES/STRINGS_GALLERY/STRINGS_8.jpg",
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
              SHORT FILM
              <br />
              [IN PRODUCTION]
            </h2>
            <h2 className="text-[8px] text-right">
              RUNTIME:
              <br />
              00:15:35
            </h2>
          </div>
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="bg-white text-[#18181B] text-[8px] px-1">
              CINEMATOGRAPHER
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <span
                className="text-[7px] text-left h-[120px] w-[1000px] overflow-y-auto scrollbar-hide block flex-grow mr-[5px]"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  WebkitScrollbar: { display: "none" },
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
                A wimsical and surrealist short about following your heart when
                everything seems dark.
                <br /> <br />
                I was brought onto this project as Cinematographer by Director,
                Naren Gurrier-Jones. We shot on weekends over a 3 week period.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  LOGLINE
                </span>
                <br />
                When a young man’s heart is stolen, he must follow his heart
                string to reclaim it, or turn to drastic measures to be set
                free.
                <br /> <br />
                <span className="bg-white text-[#18181B] text-[8px] px-1 mb-1 inline-block w-full">
                  CREDITS
                </span>
                <span className="text-white text-[7px] !text-left">
                  <u>DIRECTOR</u>: Naren G-J
                  <br />
                  <br />
                  <u>WRITER</u>: Naren G-J
                  <br />
                  <br />
                  <u>PRODUCERS</u>:<br /> Naren G-J, Luke Antoun
                  <br />
                  <br />
                  <u>1ST AD</u>: Sebastian Zizza
                  <br />
                  <br />
                  <u>DOP</u>: Henri Scott
                  <br />
                  <br />
                  <u>1ST AC</u>: Tom Gojak
                  <br />
                  <br />
                  <u>ART DEPT</u>: Amelia Leach
                  <br />
                  <br />
                  <u>SOUND RECORDISTS</u>: <br />
                  Peter Kaloudis, Tyrone Lawrence
                  <br />
                  <br />
                  <u>EDITOR</u>: Isabelle Bray
                  <br />
                  <br />
                  <u>RUNNER</u>: Thom Banks
                </span>
              </span>
              <div
                className="border border-white w-full h-[120px] cursor-grab active:cursor-grabbing relative"
                onMouseDown={(e) => {
                  let lastY = e.clientY;

                  const mouseMoveHandler = (e) => {
                    const delta = e.clientY - lastY;
                    const newScrollTop =
                      window.scrollableText.scrollTop + delta * 2;
                    const maxScroll =
                      window.scrollableText.scrollHeight -
                      window.scrollableText.clientHeight;

                    window.scrollableText.scrollTop = Math.max(
                      0,
                      Math.min(newScrollTop, maxScroll),
                    );
                    lastY = e.clientY;

                    const availableScrollSpace =
                      e.target.clientHeight -
                      e.target.nextElementSibling.clientHeight;
                    const scrollPercentage =
                      (window.scrollableText.scrollTop / maxScroll) *
                      availableScrollSpace;
                    e.target.nextElementSibling.style.top = `${Math.min(Math.max(scrollPercentage, 0), availableScrollSpace)}px`;
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
                  className="absolute bg-white w-full h-[20px] left-0"
                  style={{
                    top: (() => {
                      if (!window.scrollableText) return "0px";
                      const availableScrollSpace = 90 - 20; // container height - handle height
                      const scrollPercentage =
                        (window.scrollableText.scrollTop /
                          (window.scrollableText.scrollHeight -
                            window.scrollableText.clientHeight)) *
                        availableScrollSpace;
                      return `${Math.min(Math.max(scrollPercentage, 0), availableScrollSpace)}px`;
                    })(),
                  }}
                  ref={(el) => {
                    if (el) {
                      const updatePosition = () => {
                        const availableScrollSpace =
                          el.parentElement.clientHeight - el.clientHeight;
                        const scrollPercentage =
                          (window.scrollableText.scrollTop /
                            (window.scrollableText.scrollHeight -
                              window.scrollableText.clientHeight)) *
                          availableScrollSpace;
                        el.style.top = `${Math.min(Math.max(scrollPercentage, 0), availableScrollSpace)}px`;
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
