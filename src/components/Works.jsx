import { useState } from "react";
import Tilt from 'react-parallax-tilt';
import { motion } from "framer-motion";
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
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        className="h-full" // Add this to ensure full height
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Tilt
          className='bg-tertiary p-5 rounded-2xl w-full max-w-sm mx-auto flex flex-col h-full' // Add flex-col and h-full
          tiltMaxAngleX={45}
          tiltMaxAngleY={45}
          scale={1}
          transitionSpeed={450}
        >
          <div className='relative w-full h-[230px]'>
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover rounded-2xl'
            />
            <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              >
                <img
                  src={github}
                  alt='source code'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col flex-grow'> {/* Add this wrapper div */}
            <div className='mt-5'>
              <h3 className='text-white font-bold text-[24px]'>{name}</h3>
              <p className='mt-2 text-secondary text-[14px]'>{description}</p>
            </div>
            <div className='mt-auto pt-4 flex flex-wrap gap-2'> {/* Add mt-auto */}
              {tags.map((tag) => (
                <p
                  key={`${name}-${tag.name}`}
                  className={`text-[14px] ${tag.color}`}
                >
                  #{tag.name}
                </p>
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
  const ITEMS_PER_PAGE = 3;
  const [visibleProjects, setVisibleProjects] = useState(ITEMS_PER_PAGE);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + ITEMS_PER_PAGE);
  };

  const thereIsMoreToShow = visibleProjects < projects.length;
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
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="relative">
        <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full pb-24'>
          {projects
            .map((project, index) => ({ ...project, index })) // preserve original index
            .slice(0, visibleProjects)
            .map(({ index, ...project }) => (
              <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}

          {/* BLUR OVERLAY */}
          {thereIsMoreToShow && (
            <div className="absolute bottom-12 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none blur-sm" />
          )}
        </div>
      </div>

      {thereIsMoreToShow && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-violet-600 text-white hover:bg-violet-700 hover:scale-105 rounded-md transition"
          >
            See More
          </button>
        </div>
      )}
    </>
  );
};

const WrappedWorks = SectionWrapper(Works, "work");
export default WrappedWorks;
