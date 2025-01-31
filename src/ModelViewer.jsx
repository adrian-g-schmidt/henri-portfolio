import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Center,
  Html,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  EffectComposer,
  ChromaticAberration,
  Noise,
  Vignette,
  Sepia,
  Bloom,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const TVInterface = () => {
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
      position={[0, 1.95, 0.046]}
      rotation={[0, 0, 0]}
      scale={4}
      style={{
        width: "320px",
        height: "240px",
        borderRadius: "15px",
        overflow: "hidden",
      }}
      distanceFactor={1}
      wrapperClass="tv-wrapper"
      occlude
    >
      <div className="crt w-full h-full text-white border-none blur-[0.5px] relative">
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
              Reflections
            </h1>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div
                className="w-3/4 py-2 text-lg text-white hover:bg-white/20 cursor-pointer flex items-center justify-center"
                onClick={() => setActiveChannel(1)}
              >
                Click to Play Intro
              </div>
              <div
                className="w-3/4 py-2 text-lg text-white hover:bg-white/20 cursor-pointer flex items-center justify-center"
                onClick={() => setActiveChannel(2)}
              >
                Channel 2
              </div>
              <div
                className="w-3/4 py-2 text-lg text-white hover:bg-white/20 cursor-pointer flex items-center justify-center"
                onClick={() => setActiveChannel(3)}
              >
                Channel 3
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

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    // Set initial position
    if (modelRef.current) {
      modelRef.current.position.z = -50;
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(0);
      modelRef.current.visible = true;
    }
    setIsLoaded(true);
  }, []);

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
        <TVInterface />
      </group>
    </Center>
  );
}

export default function ModelViewer() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full"
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
            offset={[0.0005, 0.0005]} // Slightly stronger effect
          />
          <Sepia intensity={0.5} /> {/* Warmer vintage tone */}
          {/* <Noise
          premultiply={false} // More visible noise
          blendFunction={BlendFunction.OVERLAY} // Makes it pop more
        /> */}
          <Vignette eskil={false} offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
