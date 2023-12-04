import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, [])



  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            City of Williamston
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/boards-and-commissions'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Boards & Commissions
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/departments'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Departments
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/community'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Our Community
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/business'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Business
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/visit-us'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Visit Us
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/pdf-converter' className='nav-links' onClick={closeMobileMenu}>
                PDF Converter
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/register-login' className='nav-links' onClick={closeMobileMenu}>
                Register/Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;