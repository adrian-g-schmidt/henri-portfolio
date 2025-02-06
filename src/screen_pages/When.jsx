import React, { useState, useEffect } from "react";

export default function When({ handleNavigate }) {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2081-02-15T12:01:00");
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        setTimeRemaining(null);
      } else {
        setTimeRemaining({
          years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
          months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)),
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

  return (
    <div className="z-20 flex justify-between -my-1 flex-col p-2 h-full">
      <header className="w-full uppercase text-xl pb-2 flex justify-between -my-1">
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
      <div className="w-full text-right text-xl gap-2 flex flex-col">
        <p className="text-[1.2rem] w-full text-center">
          HENRI IS EXPECTED TO DIE IN
        </p>
        {timeRemaining ? (
          <div className="flex flex-col w-full">
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.years}</span> <span>YEARS</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.months}</span> <span>MONTHS</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.days}</span> <span>DAYS</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.hours}</span> <span>HOURS</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.minutes}</span> <span>MINUTES</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.seconds}</span> <span>SECONDS</span>
            </span>
            <span className="flex justify-between -my-1">
              <span>{timeRemaining.milliseconds}</span> <span>MSECONDS</span>
            </span>
          </div>
        ) : (
          <div>GOODBYE!</div>
        )}
      </div>
    </div>
  );
}
