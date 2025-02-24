import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
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

import TVInterface from "./TVInterface";

const easeOutCubic = (x) => {
  return 1 - Math.pow(1 - x, 3);
};

function Model({ cameraPosition }) {
  const tv = useGLTF(`${import.meta.env.BASE_URL}crt_erased.glb`);
  const modelRef = useRef();
  const { camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);
  const animationStartTime = useRef(null);
  const [isBored, setIsBored] = useState(false);
  const lastInteractionTime = useRef(Date.now());
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const transitionProgress = useRef(0);
  const returnAnimationStartTime = useRef(null);
  const isReturning = useRef(false);
  const returnStartPosition = useRef({ x: 0, y: 0, z: 0 });
  const returnStartRotation = useRef({ x: 0, y: 0, z: 0 });
  const lookTarget = useRef({ x: 0, y: 0 });
  const lookVelocity = useRef({ x: 0, y: 0 });
  const lastRandomLook = useRef(0);
  const randomLookOffset = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const cursorChaseTarget = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0);
  }, [camera, cameraPosition]);

  useEffect(() => {
    camera.lookAt(0, 0, 0);

    const handleMouseMove = (event) => {
      lastMousePosition.current = { ...mousePosition.current };
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };

      if (isBored) {
        isMoving.current = true;
        cursorChaseTarget.current = {
          x: mousePosition.current.x * 10,
          y: mousePosition.current.y * 5,
          z: -10,
        };
      }

      const movementDistance = Math.sqrt(
        Math.pow(mousePosition.current.x - lastMousePosition.current.x, 2) +
          Math.pow(mousePosition.current.y - lastMousePosition.current.y, 2),
      );

      if (movementDistance > 0.01) {
        randomLookOffset.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const checkBoredom = setInterval(() => {
      if (Date.now() - lastInteractionTime.current > 100000) {
        setIsBored(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(checkBoredom);
    };
  }, [camera, isBored]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.z = -50;
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(0);
      modelRef.current.visible = true;
    }
    setIsLoaded(true);
  }, []);

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

    const time = state.clock.getElapsedTime();
    const movementDistance = Math.sqrt(
      Math.pow(mousePosition.current.x - lastMousePosition.current.x, 2) +
        Math.pow(mousePosition.current.y - lastMousePosition.current.y, 2),
    );

    if (time - lastRandomLook.current > 0.5 && movementDistance < 0.001) {
      lastRandomLook.current = time;
    }

    lookTarget.current = {
      x: mousePosition.current.x + randomLookOffset.current.x,
      y: mousePosition.current.y + randomLookOffset.current.y,
    };

    lookVelocity.current.x +=
      (lookTarget.current.x * 0.15 - lookVelocity.current.x) * 0.05;
    lookVelocity.current.y +=
      (lookTarget.current.y * 0.15 - lookVelocity.current.y) * 0.05;

    if (animationStartTime.current === null) {
      animationStartTime.current = time;
    }

    const startTime = time - animationStartTime.current;
    const duration = 2;

    if (!isReturning.current) {
      transitionProgress.current += isBored ? 0.005 : -0.005;
      transitionProgress.current = Math.max(
        0,
        Math.min(1, transitionProgress.current),
      );
    }

    if (startTime <= duration) {
      const progress = startTime / duration;
      const eased = easeOutCubic(progress);
      modelRef.current.position.z = -50 * (1 - eased);
      modelRef.current.position.y = -0.2;
      modelRef.current.scale.setScalar(1.2 * eased);
    } else if (isReturning.current) {
      if (returnAnimationStartTime.current === null) {
        returnAnimationStartTime.current = time;
      }

      const returnTime = time - returnAnimationStartTime.current;
      const returnDuration = 1.0;

      if (returnTime <= returnDuration) {
        const progress = easeOutCubic(returnTime / returnDuration);
        modelRef.current.position.x =
          returnStartPosition.current.x * (1 - progress);
        modelRef.current.position.y =
          returnStartPosition.current.y * (1 - progress) + -0.2 * progress;
        modelRef.current.position.z =
          returnStartPosition.current.z * (1 - progress);
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
      const hoverTime = time;
      const hoverHeight = Math.sin(hoverTime * 0.5) * 0.05;

      if (!isBored) {
        modelRef.current.position.y = -0.2 + hoverHeight;
        modelRef.current.rotation.x +=
          (lookVelocity.current.y - modelRef.current.rotation.x) * 0.5;
        modelRef.current.rotation.y +=
          (lookVelocity.current.x - modelRef.current.rotation.y) * 0.01;
      } else {
        if (isMoving.current) {
          // Chase cursor with lag
          const dx = cursorChaseTarget.current.x - modelRef.current.position.x;
          const dy = cursorChaseTarget.current.y - modelRef.current.position.y;
          const dz = cursorChaseTarget.current.z - modelRef.current.position.z;

          velocity.current.x += (dx - velocity.current.x) * 0.05;
          velocity.current.y += (dy - velocity.current.y) * 0.05;
          velocity.current.z += (dz - velocity.current.z) * 0.05;

          const speed = Math.sqrt(
            velocity.current.x ** 2 +
              velocity.current.y ** 2 +
              velocity.current.z ** 2,
          );

          if (speed < 0.01) {
            isMoving.current = false;
          }
        } else {
          // Default bored behavior
          const boredHoverTime = time * 0.2;
          targetPosition.current.x = Math.sin(boredHoverTime) * 4;
          targetPosition.current.y = Math.cos(boredHoverTime * 0.7) * 0.5 - 0.2;
          targetPosition.current.z = Math.cos(boredHoverTime) * 5 - 15;

          const dx = targetPosition.current.x - modelRef.current.position.x;
          const dy = targetPosition.current.y - modelRef.current.position.y;
          const dz = targetPosition.current.z - modelRef.current.position.z;

          velocity.current.x += (dx - velocity.current.x) * 0.03;
          velocity.current.y += (dy - velocity.current.y) * 0.03;
          velocity.current.z += (dz - velocity.current.z) * 0.03;
        }

        const targetRotationY = Math.atan2(
          velocity.current.x,
          velocity.current.z,
        );
        const targetRotationZ = -velocity.current.x * 0.2;
        const targetRotationX = velocity.current.y * 0.2;

        modelRef.current.position.x += velocity.current.x * 0.02;
        modelRef.current.position.y += velocity.current.y * 0.02;
        modelRef.current.position.z += velocity.current.z * 0.02;
        modelRef.current.rotation.y +=
          (targetRotationY - modelRef.current.rotation.y) * 0.1;
        modelRef.current.rotation.x +=
          (targetRotationX - modelRef.current.rotation.x) * 0.1;
        modelRef.current.rotation.z +=
          (targetRotationZ - modelRef.current.rotation.z) * 0.1;
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
        <TVInterface />
      </group>
    </Center>
  );
}

export default function ModelViewer() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const getInitialCameraZ = () => {
    const ratio = window.innerWidth / window.innerHeight;
    return ratio < 1 ? 5 + (1 - ratio) * 5 : 5;
  };

  const [cameraPosition, setCameraPosition] = useState([
    0,
    0,
    getInitialCameraZ(),
  ]);
  const springRef = useRef(null);
  const isSpringAnimating = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setDimensions(newDimensions);

      const ratio = newDimensions.width / newDimensions.height;
      const newZ = ratio < 1 ? 5 + (1 - ratio) * 5 : 5;
      console.log(newZ);
      setCameraPosition([cameraPosition[0], cameraPosition[1], newZ]);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cameraPosition]);

  const handleMouseUp = () => {
    isSpringAnimating.current = true;
    const springDuration = 1000;
    const startTime = Date.now();
    const startPosition = [...cameraPosition];
    const ratio = dimensions.width / dimensions.height;
    const targetZ = ratio < 1 ? 5 + (1 - ratio) * 5 : 5;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / springDuration, 1);
      const easedProgress = easeOutCubic(progress);

      setCameraPosition([
        startPosition[0] * (1 - easedProgress),
        startPosition[1] * (1 - easedProgress),
        targetZ,
      ]);

      if (progress < 1) {
        springRef.current = requestAnimationFrame(animate);
      } else {
        isSpringAnimating.current = false;
      }
    };

    springRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (springRef.current) {
        cancelAnimationFrame(springRef.current);
      }
    };
  }, []);

  var isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") == -1 &&
    navigator.userAgent.indexOf("FxiOS") == -1;

  const canvasProps = {
    style: { width: dimensions.width, height: dimensions.height },
    className: "w-full h-full canvas-parent",
  };

  return (
    <div className="overflow-hidden w-full h-screen">
      <CanvasWrapper>
        <Canvas {...canvasProps}>
          <Model cameraPosition={cameraPosition} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0, 0]}
            onEnd={handleMouseUp}
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
    </div>
  );
}
