import "./App.css";
import ModelViewer from "./ModelViewer";

function App() {
  return (
    <div className="w-svw h-svh relative bg-zinc-950">
      <ModelViewer />
      <div
        className="w-full h-full z-50 absolute top-0 pointer-events-none"
        id="grain-parent"
      ></div>
    </div>
  );
}

export default App;
