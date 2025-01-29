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

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const TVInterface = () => {
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
      occlude
    >
      <div className="crt w-full h-full text-white border-none p-4 blur-[0.5px]">
        <div>
          <h1 className="text-2xl text-white w-full text-center">
            This works way better than I expected
          </h1>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-3/4 py-2 text-lg border-white text-white hover:bg-white/20 cursor-pointer flex items-center justify-center">
            Channel 1
          </div>
          <div className="w-3/4 py-2 text-lg border-white text-white hover:bg-white/20 cursor-pointer flex items-center justify-center">
            Channel 2
          </div>
          <div className="w-3/4 py-2 text-lg border-white text-white hover:bg-white/20 cursor-pointer flex items-center justify-center">
            Channel 3
          </div>
        </div>
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
      <group ref={modelRef}>
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
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
      <Model />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
