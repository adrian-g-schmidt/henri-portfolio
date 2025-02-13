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
            viewBox="0 0 61 43"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8401 24.6782C11.5485 25.3951 12.4819 25.7541 13.4159 25.7541C14.3352 25.7541 15.2551 25.4061 15.9606 24.7089C17.3831 23.3034 17.3969 21.0108 15.9913 19.5883L13.1162 16.6784H42.3437C48.4794 16.6784 53.4712 21.6701 53.4712 27.8058V28.1037C53.4712 31.076 52.3137 33.8702 50.212 35.972C48.798 37.386 48.798 39.6786 50.212 41.0926C50.919 41.7996 51.8458 42.1532 52.7724 42.1532C53.699 42.1532 54.6257 41.7997 55.3327 41.0926C58.8022 37.6231 60.7129 33.0103 60.7129 28.1037V27.8057C60.7129 22.8991 58.8022 18.2862 55.3327 14.8168C51.8632 11.3473 47.2503 9.43657 42.3437 9.43657H13.0327L15.9466 6.55733C17.3691 5.15182 17.3829 2.85923 15.9773 1.43675C14.572 0.0143373 12.2794 0.00047519 10.8568 1.40606L1.78887 10.3661C1.10573 11.0411 0.718681 11.9597 0.712957 12.92C0.707163 13.8803 1.08311 14.8035 1.75811 15.4867L10.8401 24.6782Z"
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
