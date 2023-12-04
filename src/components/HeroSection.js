import { signOut } from "firebase/auth";
import React from 'react';
import '../App.css';
import { Button } from './Button';
import { database } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";
import './HeroSection.css';

function HeroSection() {
  const history = useNavigate()
  
  const handleClick = () =>{
    signOut(database).then(val=>{
        console.log(val,"val")
        history('/register-login')
    })
}
  
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
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;