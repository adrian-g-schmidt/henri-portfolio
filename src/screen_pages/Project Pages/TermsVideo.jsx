import { memo, useCallback, useRef } from "react";
import VideoJS from "../../VideoJS";
import videojs from "video.js";

// Move options outside component to prevent recreation on each render
const videoJsOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  controlBar: { pictureInPictureToggle: false },
  sources: [
    {
      src: "./assets/240208_HENRI_SCOTT_MUSIC_VIDEO.mp4",
      type: "video/mp4",
    },
  ],
};

const TermsVideo = memo(({ handleNavigate }) => {
  const playerRef = useRef(null);

  // Memoize the player ready handler
  const handlePlayerReady = useCallback((player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  }, []);

  // Update the back button navigation to go to "terms"
  const handleBackClick = useCallback(() => {
    handleNavigate("terms");
  }, [handleNavigate]);

  return (
    <div className="z-20 flex justify-between flex-col h-full bg-[#2160FF]">
      <div className="flex justify-center h-full">
        <div className="w-full h-full">
          <VideoJS
            options={videoJsOptions}
            onReady={handlePlayerReady}
            onBackClick={handleBackClick}
          />
        </div>
      </div>
    </div>
  );
});

TermsVideo.displayName = "TermsVideo";

export default TermsVideo;
