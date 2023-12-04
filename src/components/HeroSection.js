
import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  
  
  return (
    
    <div className='hero-container'>
      
      {/*<div class="parallax"></div>*/}
      <h1>Welcome to Williamston</h1>
      <p>Discover the Charm</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;