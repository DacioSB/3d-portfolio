import { useState } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const technologiesPerPage = 8;
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
        {currentTechnologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            {technology.icon ? (
              <BallCanvas icon={technology.icon} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-full">
                <p className="text-white text-xs">{technology.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-md ${
            currentPage === 0 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-violet-600 text-white hover:bg-violet-700'
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
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages - 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-violet-600 text-white hover:bg-violet-700'
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
