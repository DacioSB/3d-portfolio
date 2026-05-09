/* eslint-disable react/no-unknown-property */

import { useInView } from "react-intersection-observer";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.glb");

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={3} castShadow />
      <directionalLight 
        position={[-2, 0, -5]} 
        intensity={1} 
      />
      <directionalLight 
        position={[0, 5, 0]} 
        intensity={1} 
      />
      
      <hemisphereLight 
        intensity={0.5} 
        groundColor="black"
      />
      <primitive object={earth.scene} scale={1.5} position-y={0} rotation-y={0} />
    </>
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // ADD THIS HOOK
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  },[]);

  return (
    <div ref={ref} className="w-full h-full">
      <Canvas
        shadows
        frameloop={!inView ? "never" : (isMobile ? "demand" : "always")}
        dpr={[1, 1.5]} // Reduced DPR for better performance
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: false, // Disable antialiasing for performance
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5} // Slower rotation for better performance
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping={false} // Disable damping for performance
          />
          <Earth />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
