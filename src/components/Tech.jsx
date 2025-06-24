import { useState, useEffect, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Lazy load BallCanvas for better performance
const BallCanvas = lazy(() => import("./canvas/Ball"));

const TechIcon = ({ technology, index }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    // Stagger rendering to improve performance
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  if (isMobile || !technology.icon) {
    // Mobile fallback - use simple image instead of 3D
    return (
      <div className="w-28 h-28 flex items-center justify-center bg-tertiary rounded-full border-2 border-secondary/20 hover:border-secondary/50 transition-all duration-300">
        {technology.icon ? (
          <img 
            src={technology.icon} 
            alt={technology.name}
            className="w-16 h-16 object-contain"
            loading="lazy"
          />
        ) : (
          <p className="text-white text-xs text-center px-2">{technology.name}</p>
        )}
      </div>
    );
  }

  return (
    <div className='w-28 h-28'>
      {shouldRender ? (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-full">
            <div className="canvas-loader"></div>
          </div>
        }>
          <BallCanvas icon={technology.icon} />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-full">
          <div className="canvas-loader"></div>
        </div>
      )}
    </div>
  );
};

TechIcon.propTypes = {
  technology: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired
};

const Tech = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const technologiesPerPage = 6; // Reduced from 8 for better performance
  const totalPages = Math.ceil(technologies.length / technologiesPerPage);
  
  // Get current page technologies
  const currentTechnologies = technologies.slice(
    currentPage * technologiesPerPage,
    (currentPage + 1) * technologiesPerPage
  );
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };
  
  return (
    <>
      <div className='flex flex-row flex-wrap justify-center gap-10 mb-10'>
        {currentTechnologies.map((technology, index) => (
          <TechIcon 
            key={`${technology.name}-${currentPage}`} 
            technology={technology} 
            index={index}
          />
        ))}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentPage === 0 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-violet-600 text-white hover:bg-violet-700 hover:scale-105'
          }`}
        >
          Previous
        </button>
        
        <span className="text-white">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            currentPage === totalPages - 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-violet-600 text-white hover:bg-violet-700 hover:scale-105'
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

const WrappedTech = SectionWrapper(Tech, "");
export default WrappedTech;
