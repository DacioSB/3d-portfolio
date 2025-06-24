import { motion } from "framer-motion";
import { Suspense, useState, useEffect } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Delay canvas loading to improve initial render
    const timer = setTimeout(() => {
      setShowCanvas(true);
    }, isMobile ? 2000 : 500);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      clearTimeout(timer);
    };
  }, [isMobile]);

  return (
      <section className={`relative w-full h-screen mx-auto`}>
          <div
              className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
          >
              <div className="flex flex-col justify-center items-center mt-5">
                  <div className="w-5 h-5 rounded-full bg-[#6141ac]" />
                  <div className="w-1 sm:h-80 h-40 violet-gradient" />
              </div>

              <div>
                  <h1 className={`${styles.heroHeadText} text-white`}>
                      {"Hey there! I'm"} <span className="text-[#6141ac]">Dacio</span>
                  </h1>
                  <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                      {"I'm a software developer"}
                      <br className="sm:block hidden" />
                      I create web applications and intensive data systems
                  </p>
              </div>
          </div>

          {/* Conditional 3D Canvas rendering with fallback */}
          {showCanvas && !isMobile ? (
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="canvas-loader mb-4"></div>
                  <p>Loading 3D Scene...</p>
                </div>
              </div>
            }>
              <ComputersCanvas />
            </Suspense>
          ) : isMobile ? (
            // Mobile fallback with gradient background
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-black-100 to-black-200 opacity-80" />
          ) : (
            // Loading state for desktop
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="canvas-loader mb-4"></div>
                <p>Preparing 3D Experience...</p>
              </div>
            </div>
          )}

          <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
              <a href="#about">
                  <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                      <motion.div
                          animate={{
                              y: [0, 24, 0],
                          }}
                          transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "loop",
                          }}
                          className="w-3 h-3 rounded-full bg-secondary mb-1"
                      />
                  </div>
              </a>
          </div>
      </section>
  );
};

export default Hero;
