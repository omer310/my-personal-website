import React, { useState, useEffect } from 'react';
import { User, Folder, Layers, Mail, Award, GraduationCap, Moon, Sun } from 'lucide-react';

const PersonalWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
                JT
              </div>
            </div>
            <ul className="flex space-x-6">
              {['story', 'projects', 'skills', 'education', 'honors', 'connect'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="flex items-center hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
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
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-4">
              👋 Hey, I'm Omar Ahmed, I'm...
            </h1>
            <p className="text-3xl font-semibold mb-8">
              Dedicated to tackling diverse challenges and creating impactful solutions.
            </p>
          </div>
          <div className="flex items-start space-x-8">
            <div className="w-1/3">
              <div className="w-48 h-48 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                <img src="/api/placeholder/192/192" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-2/3">
              <p className="mb-4">
                I was born in Brooklyn, New York and graduated with a
                Bachelors in Computer Science, with a minor in Mathematics
                , from the University of Lehman College. this year.
              </p>
              <p>
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
              title="Jarvis Voice Assisstant"
              description=""
              technologies={['OpenAI API', 'Python']}
              image="/api/placeholder/400/200"
            />
            <ProjectCard
              title=" Food Assistance Website "
              description=""
              technologies={['Next.js', 'React.js', 'Firebase', 'NextAuth']}
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
            <h3 className="text-xl font-bold mb-2">Lehman College</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Bachelor of Science in Computer Science</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Minor in Mathematics</p>
            <p className="text-gray-600 dark:text-gray-400">Graduated: May 2024</p>
          </div>
        </section>

        <section id="honors" className="py-16">
          <h2 className="text-3xl font-bold mb-8">Honors & Awards</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>President's List</li>
            <li>Dean's List</li>
            <li>1st Place, University Hackathon 2022</li>
          </ul>
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
