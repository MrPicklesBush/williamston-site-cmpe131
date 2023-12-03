import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import EventCalendar from '../EventCalendar';

function Home() {
  return (
    <>
      <HeroSection />
      <EventCalendar />
      <Cards />
      
    </>
  );
}

export default Home;