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
    return (
    <div className="full-height" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize:'cover', backgroundPosition: 'bottom right'}}>
      <div className="auth-container">
        <h1>ProductForge</h1>
        <div className="buttons-container">
          <div className={`slider ${isLogin ? 'left' : 'right'}`}></div>
          <button className="login-btn" onClick={handleLoginClick}>Login</button>
          <button className="signup-btn" onClick={handleSignupClick}>Signup</button>
        </div>
        {isLogin ? (
          <div className='form-container'>
            <p className="form-title">Login</p>
            <p>Username</p>
            <input className='input' type="text" name="username" id="username" />
            <p>Password</p>
            <input className='input' type="password" name="password" id="password" />
            <p className="forgot-password">Forgot Password?</p>
            <button className="submit-btn">Login</button>
          </div>
        ) : (
          <div className='form-container'>
            <p className="form-title">Signup</p>
            <p>Username</p>
            <input className='input' type="text" name="username" id="username" />
            <p>Password</p>
            <input className='input' type="password" name="password" id="password" />
            <p>Confirm Password</p>
            <input className='input' type="password" name="password" id="confirmPassword" />
            <button className="submit-btn">Signup</button>
          </div>
        )}
      </div>
    </div>
    );
}

export default Authentication;
