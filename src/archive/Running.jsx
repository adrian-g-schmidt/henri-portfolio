export default function Running({ handleNavigate }) {
  return (
    <div className="z-20 flex justify-between flex-col p-4 h-full">
      <header className="w-full uppercase text-xl pb-2 flex justify-between text-right">
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
        A LONG RUNNING JOKE
        <br />
        [IN PRODUCTION]
      </header>
      <div className="w-full text-3xl gap-4 grid grid-cols-5 h-full mt-8">
        <div className="col-span-3 flex flex-col gap-4">
          <div
            className="bg-cover
 z-30 w-full flex items-end justify-start flex-shrink-0 grow bg-[url(/assets/running_joke.jpg)] p-2"
          ></div>
          <div className="flex justify-between w-full">
            <h2 className="text-[8px] uppercase">Documentary</h2>
          </div>
        </div>
        <div className="flex col-span-2 justify-between flex-col items-end">
          <span className="text-[8px] text-right text-pretty">
            WRITER, DIRECTOR, DOP
            <br /> <br />
            Competing at the highest levels of Ultra Trail Running, Mikey
            Dimuantes grapples with his conflicting relationship with his sport.
          </span>
          <div className="text-xs border border-white flex p-[2px] uppercase z-10 w-fit gap-1">
            <div className="w-fit">Treatment</div>
            <img className="h-4" src="assets/download_icon.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
