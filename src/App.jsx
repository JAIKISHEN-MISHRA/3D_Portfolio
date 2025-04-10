import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './section/Navbar';
import Hero from './section/Hero';
import About from './section/About';
import Projects from './section/Projects';
import Contact from './section/Contact';
import Footer from './section/Footer';
import Journey from './section/Journey';
import './port.css'; 
const App = () => {
  const location = useLocation();
  const isJourneyPage = location.pathname === '/journey';

  return (
    <div className={isJourneyPage ? 'disable-index-styles' : ''}>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <main className="max-w-7xl mx-auto">
              <Hero />
              <About />
              <Projects />
              <Contact />
              <Footer />
            </main>
          } 
        />
        <Route 
          path="/journey" 
          element={
            <main className="bg-slate-300/20">
              <Journey /> 
            </main>
          } 
        />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
