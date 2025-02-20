import { memo, useState, useEffect } from "react";

const Why = memo(({ handleNavigate }) => {
  const options = [
    { text: "Money", size: "text-6xl" },
    { text: "Happy", size: "text-5xl" },
    { text: "Successful", size: "text-5xl" },
    { text: "Laugh", size: "text-6xl" },
    { text: "Cry", size: "text-6xl" },
    { text: "Disgusted", size: "text-5xl" },
    { text: "Entertained", size: "text-4xl" },
    { text: "Popular", size: "text-5xl" },
    { text: "Question the point of it all", size: "text-3xl" },
    { text: "Decide it's all worth it anyway", size: "text-3xl" },
    { text: "Feel safe", size: "text-5xl" },
    { text: "Proud", size: "text-6xl" },
    { text: "See yourself for who you truly are", size: "text-3xl" },
  ];

  const [index, setIndex] = useState(0);
  const [jerk, setJerk] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % options.length);
      setJerk(true);
      setTimeout(() => setJerk(false), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, [index, options.length]);

  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full">
      <header className="w-full uppercase text-xl pb-2 flex justify-between">
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
        5. Why?
      </header>
      <div className="flex flex-col w-full text-center grow justify-center items-center gap-6 ">
        <p className="text-xs w-full">HENRI WILL MAKE YOU</p>
        <p
          className={`uppercase h-24 ${options[index].size} ${jerk ? "jerk" : ""}`}
        >
          {options[index].text}
        </p>
      </div>
    </div>
  );
});

Why.displayName = "Why";

export default Why;
