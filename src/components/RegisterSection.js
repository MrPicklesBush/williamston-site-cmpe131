import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button } from './Button';
import { database } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './RegisterSection.css';

function RegisterSection() {
  const [login,setLogin] = useState(false)

  const history = useNavigate()

  const handleSubmit = (e,type) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const email = e.target.email.value
    const password = e.target.password.value
    if(type == 'signup'){
      createUserWithEmailAndPassword(database,email,password).then(data=>{
        console.log(data,"authData")
        history('/')
      }).catch(err=>{
        alert(err.code)
        setLogin(true)
      })
    }else{
      signInWithEmailAndPassword(database,email,password).then(data=>{
        console.log(data,"authData")
        history('/')
      }).catch(err=>{
        alert(err.code)
      })
    }
  };

  const handleReset = ()=>{
    history("/reset");
  }

  return (
    <div className="register-container">
      {/* Register and login Screen */}
      <div className="row">
        <div
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <br />
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}

export default RegisterSection;