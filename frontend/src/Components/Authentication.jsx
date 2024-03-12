import React, { useState } from 'react';
import './authPage.css';
import backgroundImage from '../assets/auth-bg.jpg'; // Import the background image

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const handleLoginClick = () => {
        setIsLogin(true);
    };
    const handleSignupClick = () => {
        setIsLogin(false);
    };

    const handleLogin = () => {
      try {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        if (username === '' || password === '') {
            throw new Error('Please fill in all fields');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const handleRegister = () => {
      try {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (username === '' || password === '' || confirmPassword === '') {
            throw new Error('Please fill in all fields');
        }
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
      } catch (error) {
        alert(error.message);
      }
    }

    return (
    <div className="full-height" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize:'cover', backgroundPosition: 'bottom right'}}>
      <div className="auth-container">
        <h1>ProductForge</h1>
        <div className="buttons-container">
          <div className={`slider ${isLogin ? 'left' : 'right'}`}></div>
          <button className="login-btn" onClick={handleLoginClick}>Sign In</button>
          <button className="signup-btn" onClick={handleSignupClick}>Signup</button>
        </div>
        {isLogin ? (
          <div className='form-container'>
            <p className="form-title">Login</p>
            <p>Username</p>
            <input className='input' type="text" name="username" id="loginUsername" data-testid="loginUsername"/>
            <p>Password</p>
            <input className='input' type="password" name="password" id="loginPassword" data-testid="loginPassword"/>
            <p className="forgot-password">Forgot Password?</p>
            <button className="submit-btn" onClick={handleLogin} data-testid="loginBttn">Login</button>
          </div>
        ) : (
          <div className='form-container'>
            <p className="form-title">Signup</p>
            <p>Username</p>
            <input className='input' type="text" name="username" id="signupUsername" data-testid="signupUsername"/>
            <p>Password</p>
            <input className='input' type="password" name="password" id="password" data-testid="signupPassword" />
            <p>Confirm Password</p>
            <input className='input' type="password" name="password" id="confirmPassword" data-testid="confirmPassword" />
            <button className="submit-btn" onClick={handleRegister} data-testid="signupBttn">Signup</button>
          </div>
        )}
      </div>
    </div>
    );
}

export default Authentication;
