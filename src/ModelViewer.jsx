// ModelViewer.jsx
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

function Model() {
  const tv = useGLTF("/crt_tv.glb");
  const modelRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    // Adjust the camera to look at the center
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const duration = 2;

    if (time <= duration) {
      const progress = time / duration;
      const eased = easeOutCubic(progress);

      // Move from far away to exactly 0
      modelRef.current.position.z = -50 * (1 - eased);
      modelRef.current.position.y = 0.2;

      // Scale up to final size
      modelRef.current.scale.setScalar(eased * 8);
    } else {
      // Ensure final position is exact
      modelRef.current.position.z = 0;
      modelRef.current.position.y = 0.2;
      modelRef.current.scale.setScalar(8);
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={tv.scene}
        position={[0, 0.2, 0]} // Offset to adjust vertical position
        scale={8}
        rotation={[0, Math.PI, 0]} // Start with 180-degree rotation
      />
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
        target={[0, 0, 0]} // Set orbit center to match model center
      />
      <Environment preset="city" />
    </Canvas>
  );
}
