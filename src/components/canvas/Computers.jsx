/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Rooms = ({ isMobile }) => {
  const room = useGLTF("./room/scene.gltf");

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
      <primitive 
        object={room.scene} 
        scale={isMobile ? 0.25 : 0.4} 
        position-y={isMobile ? -1.0 : -1.8} // Adjusted for mobile
        rotation-y={0}
        rotation-x={0.1}
      />
    </>
  );
};

const RoomsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

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
  }, []);

  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 1.5]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: false,
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
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={false}
        />
        <Rooms isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default RoomsCanvas;