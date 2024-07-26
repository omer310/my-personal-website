import React, { useState, useEffect, useRef } from 'react';
import { User, Folder, Layers, Mail, Award, GraduationCap, Moon, Sun } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'} transition-colors duration-300`}>
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-10">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                OA
              </div>
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

      <main className="container mx-auto px-6 pt-24">
        <section id="story" className="min-h-screen flex flex-col justify-center">
          <div className="mb-20">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              👋 Hey, I'm Omar Ahmed, I'm...
            </h1>
            <p className="text-4xl font-semibold mb-10 leading-snug">
              Merging creativity with computational thinking to push technological boundaries.
            </p>
          </div>
          <div className="flex items-start space-x-12">
            <div className="w-1/3">
              <div 
                ref={avatarContainerRef}
                onMouseMove={handleMouseMove}
                className="w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden shadow-lg"
              >
                {/* The 3D avatar will be rendered here */}
              </div>
            </div>
            <div className="w-2/3">
              <p className="text-xl mb-6 leading-relaxed">
                I was born in Brooklyn, New York and graduated with a
                Bachelors in Computer Science, with a minor in Mathematics,
                from the University of Lehman College this year.
              </p>
              <p className="text-xl leading-relaxed">
                In my "free time" I continue to build applications that
                solve problems I encounter frequently, always trying
                to implement new technologies.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16">
          <h2 className="text-3xl font-bold mb-8">Selected Works</h2>
          <div className="space-y-8">
          <ProjectCard
              title="Food Assistance Website"
              description="Revamped a food assistance application form, focusing on improving user experience and data flow. The project involved redesigning the form's interface for better usability and enhancing the backend to ensure accurate data routing. This dual-focus approach streamlined the application process, making it more efficient for users while maintaining data integrity on the backend."
              technologies={['HTML', 'CSS', 'JavaScript', 'Firebase', 'React']}
              image="/api/placeholder/400/200"
            />
            <ProjectCard
              title="Black Mentor Network Website"
              description="Designed and implemented a website for the Black Mentor Network, a non-profit organization that provides mentorship to underprivileged individuals. The website was built using Next.js, Tailwind CSS, and Firebase, and it allows users to browse mentorship opportunities and apply to the ones that interest them."
              technologies={['HTML', 'CSS', 'JavaScript', 'Firebase', 'React', 'Next.js', 'Tailwind CSS']}
              image="/api/placeholder/400/200"
            />
            <ProjectCard
              title="Live Transcription"
              description="Turn your computer's sounds into text with this nifty app! Using Deepgram's API, it grabs your PC's audio and converts it to readable words in real-time. Watch as computer babble becomes actual sentences in a cool little window. It's tech magic made simple!"
              technologies={['Python', 'Deepgram API']}
              image="/api/placeholder/400/200"
            />
            <ProjectCard
              title="Jarvis Voice Assistant"
              description="An AI-powered voice assistant that can perform various tasks through voice commands. Utilizes OpenAI's API for natural language processing and understanding."
              technologies={['Python', 'OpenAI API']}
              image="/api/placeholder/400/200"
            />
          </div>
        </section>

        <section id="skills" className="py-16">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <SkillCard title="Frontend Development" items={['React', 'Next.js', 'Vue.js', 'HTML/CSS']} />
            <SkillCard title="Backend Development" items={['Node.js', 'Express', 'Python', 'Django']} />
            <SkillCard title="Database" items={['MongoDB', 'PostgreSQL', 'Firebase']} />
            <SkillCard title="DevOps" items={['Docker', 'Kubernetes', 'CI/CD', 'AWS']} />
          </div>
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

        <section id="connect" className="py-16">
          <h2 className="text-3xl font-bold mb-8">Connect</h2>
          <p className="mb-6 text-lg">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
          <a href="mailto:Omersalahabuzaid@gmail.com" className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors">
            Get in Touch
          </a>
        </section>
      </main>
    </div>
  );
};

const ProjectCard = ({ title, description, technologies, image }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">{tech}</span>
        ))}
      </div>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
    </div>
  );
};

const SkillCard = ({ title, items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalWebsite;