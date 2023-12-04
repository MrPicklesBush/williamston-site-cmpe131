import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import './Register_LoginSection.css';

function Register_LoginSection() {
  const [login, setLogin] = useState(false);
  const [buttonText, setButtonText] = useState('Sign In');
  const [buttonLink, setButtonLink] = useState('/register-login');
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    // Listener to check if the user is signed in
    const authStateChanged = () => {
      const auth = database.currentUser;
      if (auth) {
        setUser(auth);
      } else {
        setUser(null);
      }
    };

    // Set up the listener
    const unsubscribe = database.onAuthStateChanged(authStateChanged);

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === 'signup') {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          history('/');
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          history('/');
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleReset = () => {
    const email = prompt('Enter your email:');
    if (email) {
      sendPasswordResetEmail(database, email)
        .then(() => {
          alert('Password reset email sent. Check your inbox!');
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleSignOut = () => {
    signOut(database)
      .then(() => {
        history('/');
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const toggleButton = () => {
    setLogin(!login);
    setButtonText(login ? 'Sign In' : 'Sign Up');
    setButtonLink(login ? '/register-login' : '/register');
  };

  return (
    <div className="register-container">
      <div className="row">
        {user ? (
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <div className={login ? 'pointer' : 'activeColor'} onClick={toggleButton}>
              Sign Up
            </div>
            <div className={login ? 'activeColor' : 'pointer'} onClick={toggleButton}>
              Sign In
            </div>
          </>
        )}
      </div>
      <h1>{login ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        {login && (
          <p onClick={handleReset} className="forgot-password">
            Forgot Password?
          </p>
        )}
        <br />
        <button>{login ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  );
}

export default Register_LoginSection;