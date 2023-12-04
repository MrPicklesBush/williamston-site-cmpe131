import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Sign up for the community newsletter
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <h3>City Hall:</h3>
            <Link to='https://maps.app.goo.gl/8v8x5Ky5gcvjZz5y8'>161 E. Grand River Ave Williamston, MI 48895</Link>
            <Link to='/'>Office Hours: Mon-Fri, 8 am - 5 pm</Link>
            <Link to='/'>Phone: 517-655-2774</Link>
            <Link to='/'>Fax: 517-655-2797</Link>
            <Link to='/' className='email-text'>info@williamston-mi.us</Link>
          </div>
        </div>
        
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              City of Williamston
            </Link>
          </div>
          <small class='website-rights'>City of Williamston © 2020</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='https://www.facebook.com/williamstoncity/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
