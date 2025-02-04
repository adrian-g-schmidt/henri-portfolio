export default function Home({ handleNavigate }) {
  return (
    <div className="flex items-center justify-center z-20 h-full">
      <div className="flex flex-col items-start justify-center w-fit">
        <button
          className="-my-1 uppercase text-xl text-white hover:text-red-600 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("who")}
        >
          1. Who?
        </button>
        <button
          className="-my-1 uppercase text-xl text-white hover:text-red-600 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("what")}
        >
          2. What?
        </button>
        <button
          className="-my-1 uppercase
        text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("when")}
        >
          3. When?
        </button>
        <button
          className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("where")}
        >
          4. Where?
        </button>
        <button
          className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("why")}
        >
          5. Why?
        </button>
        <button
          className="-my-1 uppercase  text-xl text-white hover:text-red-500 cursor-pointer flex items-center justify-center"
          onClick={() => handleNavigate("how")}
        >
          6. How?
        </button>
      </div>
    </div>
  );
}
