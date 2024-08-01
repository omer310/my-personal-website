import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Avatar from './Images/avatar.png';

const StorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones = [
    { year: '2018', event: 'Started CS in Sudan', details: 'Began my tech journey at University of Al-Gzera in Sudan, diving into programming fundamentals.' },
    { year: '2019', event: 'Moved to USA', details: 'Relocated to continue education, embracing new challenges and cultural experiences.' },
    { year: '2021', event: 'Associate\'s Degree', details: 'Earned my Associate\'s in Computer Science, building a strong foundation in tech.' },
    { year: '2023', event: 'Bachelor\'s Degree', details: 'Completed Bachelor\'s in CS, mastering advanced concepts and preparing for industry.' },
    { year: '2024', event: 'Career Launch', details: 'Seeking opportunities to apply my skills and contribute to innovative tech projects.' },
  ];

  const handleConnect = () => {
    window.open("https://www.linkedin.com/in/omar-ahmed-9214b6186/", "_blank");
  };

  return (
    <section id="story" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100"
        >
          My Journey in Tech
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3"
          >
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
                <img 
                  src={Avatar} 
                  alt="Your Avatar" 
                  className="w-full h-full object-cover object-center object-top"
                  style={{ objectPosition: '50% 3%' }}
                />
              </div>
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Omar Ahmed</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Aspiring Software Engineer</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="flex">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex-1 py-4 px-2 text-center cursor-pointer transition-colors duration-300 ${
                      activeIndex === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {milestone.year}
                  </div>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{milestones[activeIndex].event}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{milestones[activeIndex].details}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">My Unique Perspective</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
              My path from Sudan to the USA has been quite the ride, opening my eyes to new ways of thinking and problem-solving. I've picked up the knack for adapting on the fly and coming up with creative fixes.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
              I get a real kick out of using tech to make a difference in everyday life. With my unique background, I'm keen to jump in and cook up some exciting ideas in the tech world. Let's team up and create something awesome!
              </p>
              <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full flex items-center group transition-colors duration-300 hover:bg-blue-600"
      onClick={handleConnect}
    >
      Connect with me
      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;