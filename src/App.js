import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Folder, Layers, Mail, Award, GraduationCap, Moon, Sun, Send, Linkedin, Github, Twitter, X, ExternalLink } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Parallax } from 'react-parallax';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import StorySection from './StorySection';
import BMN from './Images/BMN.png';
import FA from './Images/FA.png';
import LIVE from './Images/LIVE.png';
import LOGO from './Images/Logo.png'; // Import your logo image


const PersonalWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const avatarContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const avatarRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (!avatarContainerRef.current) return;

    const width = 256;
    const height = 256;

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    rendererRef.current.setSize(width, height);
    avatarContainerRef.current.appendChild(rendererRef.current.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    sceneRef.current.add(directionalLight);

    // Adjust camera position
    cameraRef.current.position.set(0, 0.15, 0.6);
    cameraRef.current.lookAt(0, 0.15, 0);

    const loader = new GLTFLoader();
    loader.load('/Avatar.glb', (gltf) => {
      avatarRef.current = gltf.scene;
      avatarRef.current.scale.set(0.2, 0.2, 0.2); // Adjust scale as needed
      avatarRef.current.position.set(0, -0.2, 0); // Adjust position as needed
      sceneRef.current.add(avatarRef.current);

      avatarRef.current.traverse((object) => {
        if (object.isBone && object.name === 'Head') {
          headRef.current = object;
        }
      });

      // Add circular mask
      const maskGeometry = new THREE.CircleGeometry(0.5, 32);
      const maskMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, 
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.6
      });
      const mask = new THREE.Mesh(maskGeometry, maskMaterial);
      mask.position.set(0, 0, 0.5);
      mask.scale.setScalar(1.1);
      sceneRef.current.add(mask);

      animate();
    }, undefined, (error) => {
      console.error('An error occurred loading the model:', error);
    });

    return () => {
      if (rendererRef.current && avatarContainerRef.current) {
        avatarContainerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);
    if (avatarRef.current) {
      avatarRef.current.rotation.y += 0.005;
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  const handleMouseMove = (event) => {
    if (!headRef.current || !avatarContainerRef.current) return;

    const rect = avatarContainerRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const maxRotation = 0.3;
    const rotationY = x * maxRotation;
    const rotationX = y * maxRotation;

    headRef.current.rotation.y = rotationY;
    headRef.current.rotation.x = rotationX;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const SkillCard = ({ title, items }) => {
    const [hoveredSkill, setHoveredSkill] = useState(null);
  
    return (
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <motion.li 
              key={index} 
              className="flex flex-col"
              onHoverStart={() => setHoveredSkill(item.name)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="text-sm text-gray-500">{item.proficiency}%</span>
              </div>
              <motion.div 
                className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1"
                initial={{ width: 0 }}
                animate={{ width: hoveredSkill === item.name ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.proficiency}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen relative ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-300`}>
      <ParticleBackground />
      <div className="relative z-10">
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 shadow-md z-10 rounded-full">
          <nav className="px-6 py-3">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={LOGO} 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <ul className="flex space-x-6">
                {['story', 'projects', 'skills', 'education', 'honors', 'connect'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="flex items-center transition-transform duration-300 hover:transform hover:translate-y-1"
                    >
                      {section === 'story' && <User className="mr-2" />}
                      {section === 'projects' && <Folder className="mr-2" />}
                      {section === 'skills' && <Layers className="mr-2" />}
                      {section === 'education' && <GraduationCap className="mr-2" />}
                      {section === 'honors' && <Award className="mr-2" />}
                      {section === 'connect' && <Mail className="mr-2" />}
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-6 pt-32">
          <StorySection />

          <section id="projects" className="py-16">
            <h2 className="text-3xl font-bold mb-8">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="Food Assistance Website"
                description="Revamped a food assistance application form, focusing on improving user experience and data flow. Key features include a streamlined application process, real-time eligibility checking, and multilingual support."
                technologies={['HTML', 'CSS', 'JavaScript', 'Firebase', 'React']}
                image={FA}
                projectLink="https://foodassistance.example.com"
              />
              <ProjectCard
                title="Black Mentor Network Website"
                description="Designed and implemented a website for the Black Mentor Network, a non-profit organization that provides mentorship to underprivileged individuals. The website was built using Next.js, Tailwind CSS, and Firebase, and it allows users to browse mentorship opportunities and apply to the ones that interest them."
                technologies={['HTML', 'CSS', 'JavaScript', 'Firebase', 'React', 'Next.js', 'Tailwind CSS']}
                image={BMN}
                projectLink="https://blackmentornetwork.example.com"
              />
              <ProjectCard
                title="Live Transcription"
                description="Turn your computer's sounds into text with this nifty app! Using Deepgram's API, it grabs your PC's audio and converts it to readable words in real-time. Watch as computer babble becomes actual sentences in a cool little window. It's tech magic made simple!"
                technologies={['Python', 'Deepgram API']}
                image={LIVE}
                projectLink="https://github.com/omer310/real-time-audio-transcription"
              />
              <ProjectCard
                title="Jarvis Voice Assistant"
                description="An AI-powered voice assistant that can perform various tasks through voice commands. Utilizes OpenAI's API for natural language processing and understanding."
                technologies={['Python', 'OpenAI API']}
                image="/path/to/jarvis-image.jpg"
                projectLink="https://jarvis.example.com"
              />
            </div>
          </section>

          <section id="skills" className="py-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <SkillCard
                title="Frontend Development"
                items={[
                  { name: 'React', proficiency: 90 },
                  { name: 'Next.js', proficiency: 85 },
                  { name: 'Vue.js', proficiency: 75 },
                  { name: 'HTML/CSS', proficiency: 95 }
                ]}
              />
              <SkillCard
                title="Backend Development"
                items={[
                  { name: 'Node.js', proficiency: 80 },
                  { name: 'Express', proficiency: 75 },
                  { name: 'Python', proficiency: 90 },
                  { name: 'Django', proficiency: 70 }
                ]}
              />
              <SkillCard
                title="Database"
                items={[
                  { name: 'MongoDB', proficiency: 85 },
                  { name: 'PostgreSQL', proficiency: 80 },
                  { name: 'Firebase', proficiency: 90 }
                ]}
              />
              <SkillCard
                title="DevOps"
                items={[
                  { name: 'Docker', proficiency: 70 },
                  { name: 'Kubernetes', proficiency: 60 },
                  { name: 'CI/CD', proficiency: 75 },
                  { name: 'AWS', proficiency: 70 }
                ]}
              />
            </motion.div>
          </section>

          <section id="education" className="py-16">
            <h2 className="text-3xl font-bold mb-8">Education</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Lehman College</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Bachelor of Science in Computer Science</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Minor in Mathematics</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">GPA: <span className="text-blue-500 dark:text-blue-300 font-semibold">3.65</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Graduated: May 2024</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Relevant Coursework: Data Structures and Algorithms, Machine Learning, Web Development</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Bronx Community College</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Associate Degree in Computer Science</p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">GPA: <span className="text-blue-500 dark:text-blue-300 font-semibold">3.7</span></p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Graduated: May 2022</p>
              </div>
            </div>
          </section>

          <section id="honors" className="py-16">
            <h2 className="text-3xl font-bold mb-8">Honors & Awards</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>President's List</li>
                <li>Dean's List</li>
                <li>1st Place, University Hackathon 2022</li>
              </ul>
            </div>
          </section>

          <ContactSection />
        </main>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies, image, projectLink }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 md:h-80">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-2xl font-bold text-white text-center px-4">{title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">{tech}</span>
          ))}
        </div>
        {projectLink && (
          <a 
            href={projectLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
          >
            Visit Project <ExternalLink className="ml-2" size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Message submitted:', message);
    setMessage('');
  };

  return (
    <section id="connect" className="py-16">
      <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
                required
              />
              <button
                type="submit"
                className="absolute bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.form>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">Connect with Me</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Find me on these platforms:
          </p>
          <div className="flex space-x-4">
            <SocialLink href="https://www.linkedin.com/in/omar-ahmed-9214b6186/" icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href="https://github.com/omer310" icon={<Github />} label="GitHub" />
            <SocialLink href="https://x.com/user_l0_0l" icon={<Twitter />} label="Twitter" />
          </div>
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Email</h4>
            <a href="mailto:Omersalahabuzaid@gmail.com" className="text-blue-500 hover:underline">
              omersalahabuzaid@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default PersonalWebsite;