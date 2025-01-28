import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Center,
  Html,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

const TVInterface = () => {
  return (
    <Html
      transform
      position={[0, 2.35, -0.01]}
      rotation={[0, 0, 0]}
      scale={1.3}
      style={{
        width: "980px",
        height: "750px",
        borderRadius: "15px",
        overflow: "hidden",
      }}
      distanceFactor={1}
    >
      <div className="crt w-full h-full text-white border-none p-16 blur-[0.5px]">
        <div>
          <h1 className="text-4xl text-white">
            This works way better than I expected
          </h1>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="w-3/4 h-16 text-2xl border-white text-white hover:bg-white/20 cursor-pointer">
            Channel 1
          </div>
          <div className="w-3/4 h-16 text-2xl border-white text-white hover:bg-white/20 cursor-pointer">
            Channel 2
          </div>
          <div className="w-3/4 h-16 text-2xl border-white text-white hover:bg-white/20 cursor-pointer">
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

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const duration = 2;
    if (time <= duration) {
      const progress = time / duration;
      const eased = easeOutCubic(progress);
      modelRef.current.position.z = -50 * (1 - eased);
      modelRef.current.position.y = 0.2;
      modelRef.current.scale.setScalar(eased);
    } else {
      modelRef.current.position.z = 0;
      modelRef.current.position.y = 0.2;
      modelRef.current.scale.setScalar(1);
    }
  });

  return (
    <Center>
      <group ref={modelRef}>
        <primitive
          object={tv.scene}
          position={[0, 0.2, 0]}
          scale={8}
          rotation={[0, Math.PI, 0]}
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
