import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import FeedbackWall from './components/FeedbackWall';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import AssistantModal from './components/AssistantModal';

function PortfolioApp() {
  const { isDaylight } = useTheme();
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [feedbackRefreshKey, setFeedbackRefreshKey] = useState(0);

  const handleFeedbackUpdated = () => {
    setFeedbackRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDaylight 
        ? 'bg-[#f8fafc] text-slate-900 daylight-ambient' 
        : 'bg-[#070913] text-slate-100 night-ambient'
    }`}>
      
      {/* Top Header Navigation */}
      <Navbar onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Resume />
        <FeedbackWall 
          key={feedbackRefreshKey}
          onOpenAdmin={() => setAdminModalOpen(true)} 
        />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Admin Moderation Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onFeedbackUpdated={handleFeedbackUpdated}
      />

      {/* Portfolio AI Chat Assistant (PRD §7) */}
      <AssistantModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
