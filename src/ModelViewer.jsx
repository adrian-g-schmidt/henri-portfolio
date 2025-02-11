import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Center,
  Html,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  ChromaticAberration,
  Vignette,
  Sepia,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { CanvasWrapper } from "@isaac_ua/drei-html-fix";

import Home from "./screen_pages/Home";
import Intro from "./screen_pages/Intro";
import Who from "./screen_pages/Who";
import When from "./screen_pages/When";
import Why from "./screen_pages/Why";
import What from "./screen_pages/What";
import Showreel from "./screen_pages/Showreel";
import Running from "./screen_pages/Running";
import Bouncing from "./screen_pages/Bouncing";

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const TVInterface = ({ onSpin, onNod }) => {
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

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

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
      <div className="bg-zinc-900 crt w-full h-full text-white border-none blur-[0.5px] relative">
        {stream && (
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
        )}
        {(() => {
          switch (currentPage) {
            case "home":
              return <Home handleNavigate={handleNavigate} />;
            case "who":
              return <Who handleNavigate={handleNavigate} />;
            case "when":
              return <When handleNavigate={handleNavigate} />;
            case "why":
              return <Why handleNavigate={handleNavigate} />;
            case "what":
              return <What handleNavigate={handleNavigate} />;
            case "intro":
              return <Intro handleNavigate={handleNavigate} />;
            case "bouncing":
              console.log("hello");
              return <Bouncing handleNavigate={handleNavigate} />;
            case "showreel":
              return <Showreel handleNavigate={handleNavigate} />;
            case "running":
              return <Running handleNavigate={handleNavigate} />;
            default:
              return (
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
              );
          }
        })()}
      </div>
    </Html>
  );
};

function Model() {
  const tv = useGLTF(`${import.meta.env.BASE_URL}crt_erased.glb`);
  const modelRef = useRef();
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const animationStartTime = useRef(null);
  const spinStartTime = useRef(null);
  const nodStartTime = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isNodding, setIsNodding] = useState(false);
  const [isBored, setIsBored] = useState(false);
  const lastInteractionTime = useRef(Date.now());
  const boredPosition = useRef({ x: 0, y: 0.2, z: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const transitionProgress = useRef(0);
  const returnAnimationStartTime = useRef(null);
  const isReturning = useRef(false);
  const returnStartPosition = useRef({ x: 0, y: 0, z: 0 });
  const returnStartRotation = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    camera.lookAt(0, 0, 0);

    const checkBoredom = setInterval(() => {
      if (Date.now() - lastInteractionTime.current > 8000) {
        setIsBored(true);
      }
    }, 1000);

    return () => clearInterval(checkBoredom);
  }, [camera]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.z = -50;
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(0);
      modelRef.current.visible = true;
    }
    setIsLoaded(true);
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    spinStartTime.current = null;
  };

  const handleNod = () => {
    setIsNodding(true);
    nodStartTime.current = null;
  };

  const handleInteraction = () => {
    lastInteractionTime.current = Date.now();
    if (isBored) {
      setIsBored(false);
      isReturning.current = true;
      returnAnimationStartTime.current = null;
      returnStartPosition.current = {
        x: modelRef.current.position.x,
        y: modelRef.current.position.y,
        z: modelRef.current.position.z,
      };
      returnStartRotation.current = {
        x: modelRef.current.rotation.x,
        y: modelRef.current.rotation.y,
        z: modelRef.current.rotation.z,
      };
    }
  };

  useFrame((state) => {
    if (!isLoaded) return;

    if (animationStartTime.current === null) {
      animationStartTime.current = state.clock.getElapsedTime();
    }

    const time = state.clock.getElapsedTime() - animationStartTime.current;
    const duration = 2;

    // Update transition progress
    if (!isReturning.current) {
      transitionProgress.current += isBored ? 0.005 : -0.005;
      transitionProgress.current = Math.max(
        0,
        Math.min(1, transitionProgress.current),
      );
    }

    if (time <= duration) {
      const progress = time / duration;
      const eased = easeOutCubic(progress);
      modelRef.current.position.z = -50 * (1 - eased);
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(1.2 * eased);
    } else if (isReturning.current) {
      if (returnAnimationStartTime.current === null) {
        returnAnimationStartTime.current = state.clock.getElapsedTime();
      }

      const returnTime =
        state.clock.getElapsedTime() - returnAnimationStartTime.current;
      const returnDuration = 1.0;

      if (returnTime <= returnDuration) {
        const progress = easeOutCubic(returnTime / returnDuration);

        // Interpolate position
        modelRef.current.position.x =
          returnStartPosition.current.x * (1 - progress);
        modelRef.current.position.y =
          returnStartPosition.current.y * (1 - progress) + -0.2 * progress;
        modelRef.current.position.z =
          returnStartPosition.current.z * (1 - progress);

        // Interpolate rotation
        modelRef.current.rotation.x =
          returnStartRotation.current.x * (1 - progress);
        modelRef.current.rotation.y =
          returnStartRotation.current.y * (1 - progress);
        modelRef.current.rotation.z =
          returnStartRotation.current.z * (1 - progress);
      } else {
        modelRef.current.position.set(0, -0.2, 0);
        modelRef.current.rotation.set(0, 0, 0);
        isReturning.current = false;
        transitionProgress.current = 0;
      }
    } else if (!isReturning.current) {
      // Blend between normal and bored states
      const hoverTime = state.clock.getElapsedTime();
      const lookTime = state.clock.getElapsedTime();
      const hoverHeight = Math.sin(hoverTime * 0.5) * 0.05;
      const lookX = Math.sin(lookTime * 0.4) * 0.1;
      const lookY = Math.sin(lookTime * 0.3) * 0.05;

      // Calculate bored state positions and rotations
      const boredHoverTime = state.clock.getElapsedTime() * 0.2;
      targetPosition.current.x = Math.sin(boredHoverTime) * 3;
      targetPosition.current.y = Math.cos(boredHoverTime * 0.7) * 0.5 - 0.2;
      targetPosition.current.z = Math.cos(boredHoverTime) * 2 - 8;

      // Calculate direction vector for bored state
      const dx = targetPosition.current.x - modelRef.current.position.x;
      const dy = targetPosition.current.y - modelRef.current.position.y;
      const dz = targetPosition.current.z - modelRef.current.position.z;

      // Update velocity with smooth acceleration
      velocity.current.x += (dx - velocity.current.x) * 0.03;
      velocity.current.y += (dy - velocity.current.y) * 0.03;
      velocity.current.z += (dz - velocity.current.z) * 0.03;

      // Calculate rotations for bored state
      const targetRotationY = Math.atan2(
        velocity.current.x,
        velocity.current.z,
      );
      const targetRotationZ = -velocity.current.x * 0.2;
      const targetRotationX = velocity.current.y * 0.2;

      // Blend between normal and bored positions
      const blendedX =
        0 * (1 - transitionProgress.current) +
        (modelRef.current.position.x + velocity.current.x * 0.02) *
          transitionProgress.current;
      const blendedY =
        (-0.2 + hoverHeight) * (1 - transitionProgress.current) +
        (modelRef.current.position.y + velocity.current.y * 0.02) *
          transitionProgress.current;
      const blendedZ =
        0 * (1 - transitionProgress.current) +
        (modelRef.current.position.z + velocity.current.z * 0.02) *
          transitionProgress.current;

      // Blend between normal and bored rotations
      const blendedRotY =
        lookX * (1 - transitionProgress.current) +
        targetRotationY * transitionProgress.current;
      const blendedRotX =
        lookY * (1 - transitionProgress.current) +
        targetRotationX * transitionProgress.current;
      const blendedRotZ =
        0 * (1 - transitionProgress.current) +
        targetRotationZ * transitionProgress.current;

      // Apply blended transformations
      modelRef.current.position.x +=
        (blendedX - modelRef.current.position.x) * 0.1;
      modelRef.current.position.y +=
        (blendedY - modelRef.current.position.y) * 0.1;
      modelRef.current.position.z +=
        (blendedZ - modelRef.current.position.z) * 0.1;
      modelRef.current.rotation.y +=
        (blendedRotY - modelRef.current.rotation.y) * 0.1;
      modelRef.current.rotation.x +=
        (blendedRotX - modelRef.current.rotation.x) * 0.1;
      modelRef.current.rotation.z +=
        (blendedRotZ - modelRef.current.rotation.z) * 0.1;
    }

    // Handle spin animation
    if (isSpinning) {
      if (spinStartTime.current === null) {
        spinStartTime.current = state.clock.getElapsedTime();
      }
      const spinTime = state.clock.getElapsedTime() - spinStartTime.current;
      const spinDuration = 2;

      if (spinTime <= spinDuration) {
        const progress = spinTime / spinDuration;
        const eased = easeOutCubic(Math.sin((progress * Math.PI) / 2));
        modelRef.current.rotation.y = Math.PI * 2 * eased;
      } else {
        modelRef.current.rotation.y = 0;
        setIsSpinning(false);
      }
    }

    // Handle nod animation
    if (isNodding) {
      if (nodStartTime.current === null) {
        nodStartTime.current = state.clock.getElapsedTime();
      }
      const nodTime = state.clock.getElapsedTime() - nodStartTime.current;
      const nodDuration = 0.8;
      const nodNumber = 2;

      if (nodTime <= nodNumber * nodDuration) {
        const normalizedTime = nodTime / nodDuration;
        const rotation = 1 - Math.cos(normalizedTime * Math.PI * 2);
        modelRef.current.rotation.x = rotation * 0.2;
      } else {
        modelRef.current.rotation.x = 0;
        setIsNodding(false);
      }
    }
  });

  return (
    <Center>
      <group
        ref={modelRef}
        visible={false}
        onClick={handleInteraction}
        onPointerOver={handleInteraction}
        onWheel={handleInteraction}
      >
        <primitive
          object={tv.scene}
          position={[0, -0.2, 0]}
          scale={8}
          rotation={[0, Math.PI, 0]}
          onLoad={() => setIsLoaded(true)}
        />
        <TVInterface onSpin={handleSpin} onNod={handleNod} />
      </group>
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <CanvasWrapper>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full canvas-parent"
      >
        <Model />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <Environment preset="city" />
        <EffectComposer>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0005]}
          />
          <Sepia intensity={0.5} />
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </CanvasWrapper>
  );
}
