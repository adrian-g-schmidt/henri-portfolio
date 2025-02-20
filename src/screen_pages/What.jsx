export default function What({ handleNavigate }) {
  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full bg-[#2160FF] overflow-visible">
      <div className="w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-white text-[#2160FF] mb-3">
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
        2. What?
      </div>
      <div className="flex h-[calc(100%-3rem)]">
        <div className="w-full text-3xl overflow-y-auto scrollbar-hide">
          <div className="flex gap-1 snap-start">
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-2 leading-none">
                FILMMAKING PROJECTS
              </h2>
              <p className="text-[8px] text-left uppercase mb-3">
                THE FOLLOWING FILMS WERE EITHER SPEARHEADED BY OR OTHERWISE
                INVOLVE HENRI SCOTT.
              </p>
              <div
                className="flex gap-1 overflow-visible mt-1 mb-4 flex-wrap"
                data-active-tag=""
              >
                <span
                  onClick={(e) => {
                    const projectsContainer = document.querySelector(".grid");
                    if (e.target.classList.contains("bg-white")) {
                      // If active, deactivate
                      e.target.classList.remove("bg-white", "text-[#2160FF]");
                      e.target.classList.add("text-white");
                      e.target.parentElement.dataset.activeTag = "";
                      // Show all projects
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          project.style.display = "flex";
                        });
                    } else {
                      // If inactive, activate
                      e.target.parentElement
                        .querySelectorAll("span")
                        .forEach((span) => {
                          span.classList.remove("bg-white", "text-[#2160FF]");
                          span.classList.add("text-white");
                        });
                      e.target.classList.add("bg-white", "text-[#2160FF]");
                      e.target.classList.remove("text-white");
                      e.target.parentElement.dataset.activeTag = "Dir";

                      // Filter projects
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          const hasDirTag =
                            project
                              .querySelector(".flex.gap-1.mt-1 span")
                              ?.textContent.trim() === "Dir";
                          project.style.display = hasDirTag ? "flex" : "none";
                        });
                    }
                  }}
                  className="text-[8px] bg-transparent text-white px-1 cursor-pointer hover:bg-white hover:text-[#2160FF] border border-white"
                >
                  DIRECTOR
                </span>
                <span
                  onClick={(e) => {
                    const projectsContainer = document.querySelector(".grid");
                    if (e.target.classList.contains("bg-white")) {
                      e.target.classList.remove("bg-white", "text-[#2160FF]");
                      e.target.classList.add("text-white");
                      e.target.parentElement.dataset.activeTag = "";
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          project.style.display = "flex";
                        });
                    } else {
                      e.target.parentElement
                        .querySelectorAll("span")
                        .forEach((span) => {
                          span.classList.remove("bg-white", "text-[#2160FF]");
                          span.classList.add("text-white");
                        });
                      e.target.classList.add("bg-white", "text-[#2160FF]");
                      e.target.classList.remove("text-white");
                      e.target.parentElement.dataset.activeTag = "Wtr";

                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          const spans = project.querySelectorAll(
                            ".flex.gap-1.mt-1 span",
                          );
                          const hasWtrTag = Array.from(spans).some(
                            (span) => span.textContent.trim() === "Wtr",
                          );
                          project.style.display = hasWtrTag ? "flex" : "none";
                        });
                    }
                  }}
                  className="text-[8px] bg-transparent text-white px-1 cursor-pointer hover:bg-white hover:text-[#2160FF] border border-white"
                >
                  WRITER
                </span>
                <span
                  onClick={(e) => {
                    const projectsContainer = document.querySelector(".grid");
                    if (e.target.classList.contains("bg-white")) {
                      e.target.classList.remove("bg-white", "text-[#2160FF]");
                      e.target.classList.add("text-white");
                      e.target.parentElement.dataset.activeTag = "";
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          project.style.display = "flex";
                        });
                    } else {
                      e.target.parentElement
                        .querySelectorAll("span")
                        .forEach((span) => {
                          span.classList.remove("bg-white", "text-[#2160FF]");
                          span.classList.add("text-white");
                        });
                      e.target.classList.add("bg-white", "text-[#2160FF]");
                      e.target.classList.remove("text-white");
                      e.target.parentElement.dataset.activeTag = "Prod";

                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          const spans = project.querySelectorAll(
                            ".flex.gap-1.mt-1 span",
                          );
                          const hasProdTag = Array.from(spans).some(
                            (span) => span.textContent.trim() === "Prod",
                          );
                          project.style.display = hasProdTag ? "flex" : "none";
                        });
                    }
                  }}
                  className="text-[8px] bg-transparent text-white px-1 cursor-pointer hover:bg-white hover:text-[#2160FF] border border-white"
                >
                  PRODUCER
                </span>
                <span
                  onClick={(e) => {
                    const projectsContainer = document.querySelector(".grid");
                    if (e.target.classList.contains("bg-white")) {
                      e.target.classList.remove("bg-white", "text-[#2160FF]");
                      e.target.classList.add("text-white");
                      e.target.parentElement.dataset.activeTag = "";
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          project.style.display = "flex";
                        });
                    } else {
                      e.target.parentElement
                        .querySelectorAll("span")
                        .forEach((span) => {
                          span.classList.remove("bg-white", "text-[#2160FF]");
                          span.classList.add("text-white");
                        });
                      e.target.classList.add("bg-white", "text-[#2160FF]");
                      e.target.classList.remove("text-white");
                      e.target.parentElement.dataset.activeTag = "DoP";

                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          const spans = project.querySelectorAll(
                            ".flex.gap-1.mt-1 span",
                          );
                          const hasDoPTag = Array.from(spans).some(
                            (span) => span.textContent.trim() === "DoP",
                          );
                          project.style.display = hasDoPTag ? "flex" : "none";
                        });
                    }
                  }}
                  className="text-[8px] bg-transparent text-white px-1 cursor-pointer hover:bg-white hover:text-[#2160FF] border border-white"
                >
                  CINEMATOGRAPHER
                </span>
                <span
                  onClick={(e) => {
                    const projectsContainer = document.querySelector(".grid");
                    if (e.target.classList.contains("bg-white")) {
                      e.target.classList.remove("bg-white", "text-[#2160FF]");
                      e.target.classList.add("text-white");
                      e.target.parentElement.dataset.activeTag = "";
                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          project.style.display = "flex";
                        });
                    } else {
                      e.target.parentElement
                        .querySelectorAll("span")
                        .forEach((span) => {
                          span.classList.remove("bg-white", "text-[#2160FF]");
                          span.classList.add("text-white");
                        });
                      e.target.classList.add("bg-white", "text-[#2160FF]");
                      e.target.classList.remove("text-white");
                      e.target.parentElement.dataset.activeTag = "Edit";

                      projectsContainer
                        .querySelectorAll(".flex-col")
                        .forEach((project) => {
                          const spans = project.querySelectorAll(
                            ".flex.gap-1.mt-1 span",
                          );
                          const hasEditTag = Array.from(spans).some(
                            (span) => span.textContent.trim() === "Edit",
                          );
                          project.style.display = hasEditTag ? "flex" : "none";
                        });
                    }
                  }}
                  className="text-[8px] bg-transparent text-white px-1 cursor-pointer hover:bg-white hover:text-[#2160FF] border border-white"
                >
                  EDITOR
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-[0.76] mb-2 mr-1.5">
              <div
                className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/showreel.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("showreel")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[12px] bg-white px-1">
                  SHOWREEL
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[12px] bg-white px-1">
                  [FEB 2025]
                </div>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mr-1.5 snap-start">
            <div className="flex flex-col">
              <div
                className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/vicarious.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("vicarious")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  SHORT FILM
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  [IN PROD]
                </div>
              </div>
              <h2 className="text-[10px] mt-2">VICARIOUS</h2>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Dir
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Wtr
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Prod
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/running_hug_square.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("longrunningjoke")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  DOCUMENTARY
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  [IN PROD]
                </div>
              </div>
              <h2 className="text-[10px] mt-2">A LONG RUNNING JOKE</h2>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Dir
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Wtr
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Prod
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  DoP
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Edit
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/terms.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("terms")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  MUSIC VIDEO
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  [2024]
                </div>
              </div>
              <h2 className="text-[10px] mt-2">TERMS AND CONDITIONS</h2>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Dir
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Wtr
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Prod
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  DoP
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="bg-cover bg-center cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/strings.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("strings")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  SHORT FILM
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  [IN PROD]
                </div>
              </div>
              <h2 className="text-[10px] mt-2">STRINGS ATTACHED</h2>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  DoP
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="bg-cover cursor-pointer z-30 flex-shrink-0 aspect-square bg-[url(/assets/JFB.jpg)] relative transition-transform hover:scale-110 hover:shadow-[3px_3px_3px_rgba(0,0,0,0.3)] origin-center"
                onClick={() => handleNavigate("breathe")}
              >
                <div className="absolute top-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  SHORT FILM
                </div>
                <div className="absolute bottom-1 left-1 text-[#2160FF] text-[8px] bg-white px-1">
                  [IN DEV]
                </div>
              </div>
              <h2 className="text-[10px] mt-2">JUST F$#!@*G BREATHE</h2>
              <div className="flex gap-1 mt-1 flex-wrap">
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Wtr
                </span>
                <span className="text-[8px] bg-white text-[#2160FF] px-1">
                  Prod
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[17px] flex flex-col justify-start gap-1">
          <div
            className="border border-white hover:bg-white hover:text-[#2160FF] h-9 w-[17px] flex items-center justify-center cursor-pointer"
            onMouseDown={() => {
              const scrollableDiv = document.querySelector(".overflow-y-auto");
              const interval = setInterval(() => {
                scrollableDiv.scrollTop -= 10;
              }, 10);

              const handleMouseUp = () => {
                clearInterval(interval);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mouseup", handleMouseUp);
            }}
            onClick={() => {
              const scrollableDiv = document.querySelector(".overflow-y-auto");
              scrollableDiv.scrollTop -= 50;
            }}
          >
            ▲
          </div>
          <div
            className="border border-white hover:bg-white hover:text-[#2160FF] h-9 w-[17px] flex items-center justify-center cursor-pointer"
            onMouseDown={() => {
              const scrollableDiv = document.querySelector(".overflow-y-auto");
              const interval = setInterval(() => {
                scrollableDiv.scrollTop += 10;
              }, 10);

              const handleMouseUp = () => {
                clearInterval(interval);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mouseup", handleMouseUp);
            }}
            onClick={() => {
              const scrollableDiv = document.querySelector(".overflow-y-auto");
              scrollableDiv.scrollTop += 50;
            }}
          >
            ▼
          </div>
          <div
            className="border border-white w-[17px] h-20 cursor-grab active:cursor-grabbing relative"
            onMouseDown={(e) => {
              const scrollableDiv = document.querySelector(".overflow-y-auto");
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
              className="absolute bg-white w-full h-[30px] left-0"
              style={{
                top: (() => {
                  const scrollableDiv =
                    document.querySelector(".overflow-y-auto");
                  if (!scrollableDiv) return "0%";
                  const scrollPercentage =
                    (scrollableDiv.scrollTop /
                      (scrollableDiv.scrollHeight -
                        scrollableDiv.clientHeight)) *
                    87;
                  return `${Math.min(Math.max(scrollPercentage, 0), 62)}%`;
                })(),
              }}
              ref={(el) => {
                if (el) {
                  const scrollableDiv =
                    document.querySelector(".overflow-y-auto");
                  const updatePosition = () => {
                    const scrollPercentage =
                      (scrollableDiv.scrollTop /
                        (scrollableDiv.scrollHeight -
                          scrollableDiv.clientHeight)) *
                      87;
                    el.style.top = `${Math.min(Math.max(scrollPercentage, 0), 62)}%`;
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
}
