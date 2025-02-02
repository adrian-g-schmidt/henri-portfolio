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

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const TVInterface = ({ onSpin, onNod }) => {
  const [stream, setStream] = useState(null);
  const [activeChannel, setActiveChannel] = useState(0);

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

  return (
    <Html
      transform
      position={[0, 1.98, 0.001]}
      rotation={[0, 0, 0]}
      scale={4}
      style={{
        width: "320px",
        height: "240px",
        borderRadius: "5px",
        overflow: "hidden",
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
        {activeChannel === 0 && (
          <div className="relative z-20 p-4">
            <h1 className="text-2xl text-white w-full text-center mb-4">
              WELCOME
            </h1>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div
                className="pr-4 group w-3/4 py-2 text-lg text-white hover:text-green-400 cursor-pointer flex items-center justify-center"
                onClick={() => setActiveChannel(1)}
              >
                <span className="w-4 opacity-0 group-hover:inline-block group-hover:opacity-100">
                  ⏵{" "}
                </span>
                INTRO
              </div>
              <div
                className="pr-4 group w-3/4 py-2 text-lg text-white hover:text-green-400 cursor-pointer flex items-center justify-center"
                onClick={onSpin}
              >
                <span className="w-4 opacity-0 group-hover:inline-block group-hover:opacity-100">
                  ⏵{" "}
                </span>
                SPIN
              </div>
              <div
                className="pr-4 group w-3/4 py-2 text-lg text-white hover:text-green-400 cursor-pointer flex items-center justify-center"
                onClick={onNod}
              >
                <span className="w-4 opacity-0 group-hover:inline-block group-hover:opacity-100">
                  ⏵{" "}
                </span>
                NOD
              </div>
            </div>
          </div>
        )}
        {activeChannel === 1 && (
          <video
            autoPlay
            playsInline
            className="z-20 video-effect absolute top-0 left-0 w-full h-full object-cover"
            src="./intro-vid.mp4"
            onEnded={() => setActiveChannel(0)}
          />
        )}
      </div>
    </Html>
  );
};

function Model() {
  const tv = useGLTF(`${import.meta.env.BASE_URL}crt_tv.glb`);
  const modelRef = useRef();
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const animationStartTime = useRef(null);
  const spinStartTime = useRef(null);
  const nodStartTime = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isNodding, setIsNodding] = useState(false);

  useEffect(() => {
    camera.lookAt(0, 0, 0);
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

  useFrame((state) => {
    if (!isLoaded) return;

    if (animationStartTime.current === null) {
      animationStartTime.current = state.clock.getElapsedTime();
    }

    const time = state.clock.getElapsedTime() - animationStartTime.current;
    const duration = 2;

    if (time <= duration) {
      const progress = time / duration;
      const eased = easeOutCubic(progress);
      modelRef.current.position.z = -50 * (1 - eased);
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(1.2 * eased);
    } else {
      modelRef.current.position.z = 0;
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(1.2);
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
        modelRef.current.position.z = 0;
        modelRef.current.position.x = 0;
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
      <group ref={modelRef} visible={false}>
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
          enableZoom={true}
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
