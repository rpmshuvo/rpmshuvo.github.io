import { useTheme } from './components/hooks/useTheme.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Skills from './components/sections/Skills.jsx';
import Experience from './components/sections/Experience.jsx';
import Projects from './components/sections/Projects.jsx';
import Publication from './components/sections/Publication.jsx';
import Education from './components/sections/Education.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <Navbar theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publication />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
