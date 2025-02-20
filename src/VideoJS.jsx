import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./videoPlayer.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady, onBackClick } = props;

  React.useEffect(() => {
    // Initialize the Video.js player only once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      // Add custom back button if onBackClick is provided
      if (onBackClick) {
        // Register custom BackButton component if not already registered
        if (!videojs.getComponent("BackButton")) {
          const Button = videojs.getComponent("Button");
          class BackButton extends Button {
            constructor(player, options) {
              super(player, options);
              this.controlText("Back");
            }
            handleClick() {
              if (this.options_.onClick) {
                this.options_.onClick();
              }
            }
            buildCSSClass() {
              return `vjs-back-button ${super.buildCSSClass()}`;
            }
          }
          videojs.registerComponent("BackButton", BackButton);
        }
        // Insert the back button into the control bar before the play toggle
        const controlBar = player.getChild("controlBar");
        const playToggle = controlBar.getChild("playToggle");
        const playToggleIndex = controlBar.children().indexOf(playToggle);
        controlBar.addChild(
          "BackButton",
          { onClick: onBackClick },
          playToggleIndex,
        );
      }
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady, onBackClick]);

  // Dispose the Video.js player when the component unmounts
  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
