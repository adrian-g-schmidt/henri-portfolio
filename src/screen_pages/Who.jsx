export default function Who({ handleNavigate }) {
  const scrollContent = (direction) => {
    const scrollableDiv = document.querySelector(".overflow-y-scroll");
    if (scrollableDiv) {
      const scrollAmount = direction === "up" ? -50 : 50;
      scrollableDiv.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
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
      <div className="grow w-full h-12 text-left text-xs grid grid-cols-[1fr_5fr_1.25rem] px-0 gap-3">
        <div className="flex justify-between flex-col">
          <p className="text-[0.9rem]/3.5">
            HENRI
            <br />
            SCOTT is a FILMMAKER and multi-disciplinary CREATIVE.
          </p>
          <div className="flex flex-col justify-between gap-1 text-left">
            <div className="border border-white flex p-[2px] px-[2px] uppercase z-10 w-fit gap-1 hover:bg-white hover:text-[#2160FF] group">
              <div className="w-fit text-[0.55rem]/2.5">
                Resume &#38; <br />
                Portfolio
              </div>
              <svg
                className="h-5 w-3"
                viewBox="0 01625 2119"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1561.25 402.589L1218.52 60.0947C1183.26 21.2365 1126.74 0 1070.22 0H212.055C95.4021 0.22592 0 95.5642 0 211.913V1906.31C0 2022.89 95.4021 2118.23 212.055 2118.23H1412.95C1529.6 2118.23 1625 2022.89 1625 1906.31V554.408C1625 497.928 1603.75 441.448 1561.47 402.589H1561.25ZM1384.69 423.826H1201.12V240.379L1384.69 423.826ZM1412.95 1977.03H212.055C173.171 1977.03 141.521 1945.17 141.521 1906.54V211.913C141.521 173.055 173.397 141.426 212.055 141.426H1059.82V423.826C1059.82 501.542 1123.35 565.026 1201.12 565.026H1483.71V1906.54C1483.71 1945.4 1451.83 1977.03 1413.17 1977.03H1412.95Z"
                  className="fill-white group-hover:fill-[#2160FF]"
                />
                <path
                  d="M762.991 1405.22L773.616 1415.84C773.616 1415.84 777.233 1419.46 780.624 1419.46C784.015 1419.46 784.241 1423.07 787.632 1423.07C791.023 1423.07 791.25 1423.07 794.641 1426.69C797.052 1426.69 799.388 1427.89 801.649 1430.3H829.908C832.319 1430.3 834.655 1429.1 836.916 1426.69C839.327 1426.69 841.663 1425.48 843.924 1423.07C847.541 1423.07 847.541 1419.46 850.932 1419.46C854.323 1419.46 854.549 1415.84 857.941 1415.84L1080.39 1193.54C1108.65 1165.3 1108.65 1123.05 1080.39 1094.58C1052.14 1066.12 1009.86 1066.34 981.375 1094.58L882.356 1186.31V720.46C882.356 681.601 850.48 649.973 811.822 649.973C773.164 649.973 741.288 681.827 741.288 720.46V1186.31L649.503 1094.58C621.244 1066.34 578.969 1066.34 550.484 1094.58C521.999 1122.82 522.225 1165.07 550.484 1193.54L762.312 1405.45L762.991 1405.22Z"
                  className="fill-white group-hover:fill-[#2160FF]"
                />
                <path
                  d="M1201.12 1214.55C1162.23 1214.55 1130.58 1246.4 1130.58 1285.03V1496.95H494.87V1285.03C494.87 1246.18 462.994 1214.55 424.336 1214.55C385.677 1214.55 353.801 1246.4 353.801 1285.03V1496.95C353.801 1574.66 417.327 1638.15 495.096 1638.15H1130.81C1208.58 1638.15 1272.1 1574.66 1272.1 1496.95V1285.03C1272.1 1246.18 1240.23 1214.55 1201.57 1214.55H1201.12Z"
                  className="fill-white group-hover:fill-[#2160FF]"
                />
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
        <div className="overflow-y-scroll scrollbar\:has-visible-track::-webkit-scrollbar-hide text-right text-[0.8rem]/3">
          <p>
            <img
              alt="a scan of henri's drivers licence with fake details"
              src="assets/licence_edit_blue.jpg"
              className="w-full mb-4"
            />
            Henri's FILMMAKING practice spans NARRATIVE and DOCUMENTARY.
            <br />
            <br />
            His focus is on exploring contemplative internal struggles and
            contradictory characters who get in their own way.
            <img
              alt="A venn diagram of law, filmmaking, and design intersecting at creative problem solving"
              src="./venn.jpg"
              className="w-full my-4"
            />
            With a professional and educational background in design, law, and
            innovation, Henri has a strong interest and aptitude in CREATIVE
            IDEATION, STORY TELLING, and PROBLEM SOLVING.
            <br />
            <br />
            Nothing motivates him more than seeing a great idea come to life.
          </p>
          <img src="./assets/henri_who.jpg" className="mt-2" />
        </div>
        <div className="flex flex-col w-[40px] pr-5 gap-2">
          <button
            onClick={() => scrollContent("up")}
            className="border border-white hover:bg-white hover:text-[#2160FF] h-8"
          >
            ▲
          </button>
          <button
            onClick={() => scrollContent("down")}
            className="border border-white hover:bg-white hover:text-[#2160FF] h-9"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
