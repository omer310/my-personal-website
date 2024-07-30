import React from 'react';
import { motion } from 'framer-motion';

const StorySection = () => {
  const milestones = [
    { year: '2018', event: 'Started Computer Science studies in Sudan', details: 'Began my journey in tech at a local university, diving into the world of programming and computer systems.' },
    { year: '2019', event: 'Relocated to the United States', details: 'Faced with civil unrest in Sudan, I made the brave decision to continue my education in the US, adapting to a new culture and educational system.' },
    { year: '2021', event: 'Earned Associate\'s degree in Computer Science', details: 'Completed my first major educational milestone in the US, gaining a solid foundation in computer science principles and practices.' },
    { year: '2023', event: 'Completed Bachelor\'s degree in Computer Science', details: 'Achieved a significant goal by earning my bachelor\'s degree, expanding my knowledge in advanced topics and preparing for a career in tech.' },
    { year: '2024', event: 'Seeking opportunities in the tech industry', details: 'Actively pursuing roles where I can apply my skills, contribute to innovative projects, and continue growing as a professional.' },
  ];

  return (
    <section id="story" className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          My Journey
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <div className="bg-gray-200 dark:bg-gray-700 w-64 h-64 rounded-full mx-auto overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src="/path-to-your-avatar-image.jpg" alt="Your Avatar" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3"
          >
            <h3 className="text-2xl font-semibold mb-4">My Story</h3>
            <p className="mb-4">
              My journey in computer science began in Sudan, where I started my college education. However, my path took an unexpected turn when civil war erupted in my home country. Faced with this challenge, I made the difficult decision to leave Sudan and continue my education in the United States.
            </p>
            <p>
              In America, I persevered in my studies, earning first an Associate's degree in Computer Science. Driven by my passion for technology and determination to succeed, I then went on to complete my Bachelor's degree in the same field. This journey has not only provided me with a strong educational foundation but has also shaped my resilience and adaptability in the face of adversity.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Key Milestones</h3>
          <div className="relative border-l-2 border-blue-500 ml-3">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="mb-8 flex"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                <div className="ml-6">
                  <h4 className="text-xl font-semibold mb-1.5">{milestone.year}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">{milestone.event}</p>
                  <p className="text-gray-700 dark:text-gray-300">{milestone.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;