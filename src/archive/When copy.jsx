import React, { useState, useEffect } from "react";

export default function When({ handleNavigate }) {
  const startDate = new Date("1997-12-01T00:00:00");
  const targetDate = new Date("2081-02-15T12:01:00");
  const totalTime = targetDate.getTime() - startDate.getTime();

  const [timeRemaining, setTimeRemaining] = useState({
    years: 61,
    months: 750,
    weeks: 900,
    days: 20464,
    hours: 7469360,
    minutes: 44816160,
    seconds: 2688969600,
    milliseconds: 268896960000,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining(null);
      } else {
        setTimeRemaining({
          years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
          months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)),
          weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor(difference / (1000 * 60)),
          seconds: Math.floor(difference / 1000),
          milliseconds: difference,
        });
      }
    };

    const interval = setInterval(calculateTimeRemaining, 1);
    return () => clearInterval(interval);
  }, []);

  const calculateProgress = () => {
    const now = new Date();
    const totalDuration = targetDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
    return progress;
  };

  const progressWidth = calculateProgress() * 100;

  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full bg-[#2160FF]">
      <header className="w-full uppercase text-xl h-2 p-4 flex justify-between items-center bg-white text-[#2160FF] mb-3">
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
        3. When?
      </header>
      <div className="w-full text-right gap-2 flex flex-col">
        <p className="text-sm w-full text-center">
          HENRI IS EXPECTED TO DIE IN
        </p>
        <div className="w-2/5 grid grid-cols-9 gap-1 -mb-10 items-end ml-2">
          {Array.from({ length: 9 }).map((_, index) => {
            const yearsPerBar = 10;
            const totalYears = totalTime / (1000 * 60 * 60 * 24 * 365);
            const remainderYears = totalYears - 80;
            const barHeight =
              index === 8
                ? Math.floor((remainderYears / yearsPerBar) * 32)
                : 32;

            return (
              <div
                key={index}
                className="bg-zinc-900 border border-white flex flex-col justify-end"
                style={{ height: `${barHeight}px` }}
              >
                {index < Math.floor(progressWidth / (100 / 9)) && (
                  <div className="bg-white" style={{ height: "100%" }} />
                )}
                {index === Math.floor(progressWidth / (100 / 9)) && (
                  <div
                    className="bg-white"
                    style={{
                      height: `${((((progressWidth / 100) * totalTime) % (10 * 365 * 24 * 60 * 60 * 1000)) / (10 * 365 * 24 * 60 * 60 * 1000)) * 32}px`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {timeRemaining ? (
          <div className="grid grid-cols-4 w-full gap-2 text-xl">
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.years}
            </span>
            <span className="text-left -my-2">YRS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.months}
            </span>
            <span className="text-left -my-2">MTHS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.weeks}
            </span>
            <span className="text-left -my-2">WKS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.days}
            </span>
            <span className="text-left -my-2">DAYS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.hours}
            </span>
            <span className="text-left -my-2">HRS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.minutes}
            </span>
            <span className="text-left -my-2">MINS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.seconds}
            </span>
            <span className="text-left -my-2">SECS</span>
            <span className="text-right col-span-3 -my-2">
              {timeRemaining.milliseconds}
            </span>
            <span className="text-left -my-2">MSECS</span>
          </div>
        ) : (
          <div>GOODBYE!</div>
        )}
      </div>
    </div>
  );
}
