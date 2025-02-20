import { useCallback, memo, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import Home from "./screen_pages/Home";
import Intro from "./screen_pages/Intro";
import Who from "./screen_pages/Who";
import When from "./screen_pages/When";
import Why from "./screen_pages/Why";
import Where from "./screen_pages/Where";
import What from "./screen_pages/What";
import Showreel from "./screen_pages/Project Pages/Showreel.jsx";
import LongRunningJoke from "./screen_pages/Project Pages/LongRunningJoke.jsx";
import Strings from "./screen_pages/Project Pages/Strings.jsx";
import Bouncing from "./screen_pages/Bouncing";
import Vicarious from "./screen_pages/Project Pages/Vicarious.jsx";
import Breathe from "./screen_pages/Project Pages/Breathe.jsx";
import TermsVideo from "./screen_pages/Project Pages/TermsVideo.jsx";
import Terms from "./screen_pages/Project Pages/Terms.jsx";

const TVInterface = () => {
  const [stream, setStream] = useState(null);
  const [currentPage, setCurrentPage] = useState("bouncing");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((streamData) => {
        setStream(streamData);
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Memoize the navigation handler
  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Memoize the video element
  const VideoElement = memo(({ stream }) => (
    <video
      autoPlay
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-40 rotate-y-180 opacity-5 pointer-events-none"
      ref={(video) => {
        if (video && stream) {
          video.srcObject = stream;
        }
      }}
    />
  ));

  VideoElement.displayName = "VideoElement";

  // Memoize each page component
  const PageComponent = memo(({ currentPage, handleNavigate }) => {
    switch (currentPage) {
      case "home":
        return <Home handleNavigate={handleNavigate} />;
      case "who":
        return <Who handleNavigate={handleNavigate} />;
      case "when":
        return <When handleNavigate={handleNavigate} />;
      case "why":
        return <Why handleNavigate={handleNavigate} />;
      case "where":
        return <Where handleNavigate={handleNavigate} />;
      case "what":
        return <What handleNavigate={handleNavigate} />;
      case "intro":
        return <Intro handleNavigate={handleNavigate} />;
      case "bouncing":
        return <Bouncing handleNavigate={handleNavigate} />;
      case "showreel":
        return <Showreel handleNavigate={handleNavigate} />;
      case "longrunningjoke":
        return <LongRunningJoke handleNavigate={handleNavigate} />;
      case "strings":
        return <Strings handleNavigate={handleNavigate} />;
      case "terms":
        return <Terms handleNavigate={handleNavigate} />;
      case "termsvideo":
        return <TermsVideo handleNavigate={handleNavigate} />;
      case "breathe":
        return <Breathe handleNavigate={handleNavigate} />;
      case "vicarious":
        return <Vicarious handleNavigate={handleNavigate} />;
      default:
        return <DefaultPage handleNavigate={handleNavigate} />;
    }
  });

  PageComponent.displayName = "PageComponent";

  // Memoize the default page component
  const DefaultPage = memo(({ handleNavigate }) => (
    <div>
      Doesnt exist yet
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
    </div>
  ));

  DefaultPage.displayName = "DefaultPage";

  return (
    <Html
      transform
      position={[0, 1.98, 0.0075]}
      rotation={[0, 0, 0]}
      scale={4}
      style={{
        width: "320px",
        height: "240px",
        borderRadius: "5px",
        overflow: "hidden",
        backgroundColor: "#18181B",
      }}
      distanceFactor={1}
      wrapperClass="tv-wrapper"
      occlude
    >
      <div className="bg-zinc-900 crt w-full h-full text-white border-none blur-[0.4px] relative">
        {stream && <VideoElement stream={stream} />}
        <PageComponent
          currentPage={currentPage}
          handleNavigate={handleNavigate}
        />
      </div>
    </Html>
  );
};

export default memo(TVInterface);
