/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Rooms = ({ isMobile }) => {
  const room = useGLTF("./room/scene.gltf");

  return (
    <mesh>
      {/* Directional Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2.8}
        castShadow
        shadow-mapSize={1024}
      />

      {/* Point Lights */}
      <pointLight position={[-2, 3, 3]} intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={0.5} />
      <pointLight position={[1, 1, -2]} intensity={0.3} />

      {/* Ambient Light */}
      <ambientLight intensity={5} />

      <primitive
        object={room.scene}
        scale={isMobile ? 0.2 : 0.5}
        position={isMobile ? [0, -1.5, -2.2] : [0, -1.8, -0.5]}
        rotation={[0.2, -0.3, -0.1]}
      />
    </mesh>
  );
};

const RoomsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
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
      frameloop="demand"
      shadows={!isMobile} // Disable shadows on mobile
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile
      camera={{
        position: [5, 5, 10],
        fov: isMobile ? 45 : 35, // Wider FOV on mobile
      }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        alpha: true,
        powerPreference: "high-performance"
      }}
      performance={{ min: 0.5 }} // Performance monitoring
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
          enableDamping={!isMobile} // Disable damping on mobile
        />
        <Rooms isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default RoomsCanvas;
