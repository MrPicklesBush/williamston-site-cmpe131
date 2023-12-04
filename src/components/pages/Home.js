import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import EventCalendar from '../EventCalendar';
import Footer from '../Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <EventCalendar />
      <Cards />
      <Footer />
      
    </>
  );
}

export default Home;