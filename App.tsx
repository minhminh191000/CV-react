import React from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ClickStarEffect from './components/ClickStarEffect';
import ScrollProgressLine from './components/ScrollProgressLine';
import AmbientBackground from './components/AmbientBackground';
import FloatingNav from './components/FloatingNav';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Updated layout wrapper for Sticky Footer support */}
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-200 relative transition-colors duration-500 overflow-x-hidden w-full">
          <AmbientBackground />
          <ClickStarEffect />
          <ScrollProgressLine />
          <Header />
          
          <main className="flex-grow w-full">
            <Experience />
            <Skills />
            <Projects />
          </main>

          <Footer />
          <FloatingNav />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;