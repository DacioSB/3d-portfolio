import { useState, useMemo } from "react";
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import PropTypes from "prop-types";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="h-full"
      initial="hidden"
      animate="show"
      exit="hidden"
      layout
      viewport={{ once: true, amount: 0.1 }}
    >
      <Tilt
        className='bg-tertiary p-5 rounded-2xl w-full max-w-sm mx-auto flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300'
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1.02}
        transitionSpeed={450}
      >
        <div className='relative w-full h-[230px] group'>
          <img
            src={image || "/placeholder.svg?height=230&width=400&query=project preview"}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-2xl' />
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200'
            >
              <img
                src={github || "/placeholder.svg"}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>
        
        <div className='flex flex-col flex-grow'>
          <div className='mt-5'>
            <h3 className='text-white font-bold text-[24px] hover:text-violet-400 transition-colors duration-200'>{name}</h3>
            <p className='mt-2 text-secondary text-[14px] leading-relaxed'>{description}</p>
          </div>
          
          <div className='mt-auto pt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[12px] px-3 py-1 rounded-full border border-opacity-50 ${tag.color} hover:scale-105 transition-transform duration-200`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
  source_code_link: PropTypes.string.isRequired,
};

const Works = () => {
  const ITEMS_PER_PAGE = 6;
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique tags with their counts and sort by frequency
  const tagStats = useMemo(() => {
    const tagCounts = {};
    projects.forEach(project => {
      project.tags.forEach(tag => {
        tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
      });
    });
    
    // Convert to array and sort by count (descending)
    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedFilters.length === 0) {
      return projects;
    }
    return projects.filter(project => 
      project.tags.some(tag => selectedFilters.includes(tag.name))
    );
  }, [selectedFilters]);

  // Reset visible projects when filter changes
  const handleFilterChange = (tagName) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(tagName)
        ? prev.filter(filter => filter !== tagName)
        : [...prev, tagName];
      
      // Reset pagination when filters change
      setVisibleProjects(ITEMS_PER_PAGE);
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setVisibleProjects(ITEMS_PER_PAGE);
  };

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleFilteredProjects = filteredProjects.slice(0, visibleProjects);
  const thereIsMoreToShow = visibleProjects < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleProjects;

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      {/* Filter Section */}
      <motion.div 
        className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        variants={fadeIn("up", "", 0.2, 1)}
      >
        <div className="flex items-center gap-3">
          {/* Filter Icon SVG */}
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
          <span className="text-white font-medium">Filter by technologies:</span>
          {selectedFilters.length > 0 && (
            <span className="text-violet-400 text-sm">
              ({selectedFilters.length} selected)
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {/* Clear All Button */}
          {selectedFilters.length > 0 && (
            <button
              onClick={handleClearAllFilters}
              className="px-3 py-2 text-sm text-violet-400 hover:text-violet-300 border border-violet-400/30 hover:border-violet-400/60 rounded-lg transition-colors duration-200"
            >
              Clear All
            </button>
          )}
          
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-tertiary rounded-lg border border-violet-400/30 hover:border-violet-400/60 transition-colors duration-200 min-w-[160px] justify-between"
            >
              <span className="text-white">
                {selectedFilters.length === 0 
                  ? "Select Technologies" 
                  : `${selectedFilters.length} Selected`
                }
              </span>
              {/* Chevron Down SVG */}
              <svg 
                className={`w-4 h-4 text-violet-400 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full min-w-[250px] bg-tertiary rounded-lg border border-violet-400/30 shadow-xl z-10 max-h-80 overflow-y-auto"
                >
                  <div className="p-2">
                    <div className="text-xs text-secondary mb-2 px-2">
                      Sorted by frequency • {tagStats.length} technologies
                    </div>
                    {tagStats.map(({ name, count }) => (
                      <label
                        key={name}
                        className="flex items-center justify-between px-3 py-2 hover:bg-violet-400/10 rounded-md cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedFilters.includes(name)}
                              onChange={() => handleFilterChange(name)}
                              className="w-4 h-4 text-violet-400 bg-transparent border-2 border-violet-400/50 rounded focus:ring-violet-400 focus:ring-2"
                            />
                            {selectedFilters.includes(name) && (
                              <svg 
                                className="absolute inset-0 w-4 h-4 text-violet-400 pointer-events-none" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className={`text-sm transition-colors duration-200 ${
                            selectedFilters.includes(name) ? 'text-violet-400' : 'text-white group-hover:text-violet-300'
                          }`}>
                            {name}
                          </span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full transition-colors duration-200 ${
                          selectedFilters.includes(name) 
                            ? 'bg-violet-400/20 text-violet-400' 
                            : 'bg-gray-600/50 text-secondary group-hover:bg-violet-400/10'
                        }`}>
                          {count}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <motion.div 
          className="mt-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-secondary text-sm">Active filters:</span>
          {selectedFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 px-3 py-1 bg-violet-400/20 text-violet-400 rounded-full text-sm"
            >
              {filter}
              <button
                onClick={() => handleFilterChange(filter)}
                className="ml-1 hover:text-violet-300 transition-colors duration-200"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </motion.div>
      )}

      {/* Projects Count */}
      <motion.div 
        className="mt-6 flex items-center gap-2 text-secondary text-sm"
        variants={fadeIn("up", "", 0.3, 1)}
      >
        {/* Eye Icon SVG */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>
          Showing {visibleFilteredProjects.length} of {filteredProjects.length} projects
          {selectedFilters.length > 0 && ` (filtered by ${selectedFilters.length} technolog${selectedFilters.length === 1 ? 'y' : 'ies'})`}
        </span>
      </motion.div>

      {/* Projects Grid */}
      <div className="relative">
        <motion.div 
          className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full pb-8'
          layout
        >
          <AnimatePresence mode="wait">
            {visibleFilteredProjects.map((project, index) => (
              <ProjectCard 
                key={`${selectedFilters.join('-')}-${project.name}-${index}`} 
                index={index} 
                {...project} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-secondary text-lg mb-4">
              No projects found with the selected technologies
            </p>
            <button
              onClick={handleClearAllFilters}
              className="px-4 py-2 text-violet-400 hover:text-violet-300 border border-violet-400/50 hover:border-violet-400/70 rounded-lg transition-colors duration-200"
            >
              Clear filters to see all projects
            </button>
          </motion.div>
        )}
      </div>

      {/* Enhanced See More Button */}
      {thereIsMoreToShow && (
        <motion.div 
          className="w-full flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-secondary text-sm">
            {remainingCount} more project{remainingCount !== 1 ? 's' : ''} available
          </div>
          <button
            onClick={handleSeeMore}
            className="group relative px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 font-medium flex items-center gap-2">
              Load More Projects
              {/* Arrow Down SVG */}
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </motion.div>
      )}
    </>
  );
};

const WrappedWorks = SectionWrapper(Works, "work");
export default WrappedWorks;
