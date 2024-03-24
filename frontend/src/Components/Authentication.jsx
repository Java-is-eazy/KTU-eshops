import React, { useState } from 'react';
import './authPage.css';
import backgroundImage from '../assets/auth-bg.jpg';
import { useNavigate } from 'react-router-dom';


const Authentication = ({setToken, setUser}) => {
  const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const handleLoginClick = () => {
        setIsLogin(true);
    };
    const handleSignupClick = () => {
        setIsLogin(false);
    };

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^\+\d{11}$/;
      if (!phoneRegex.test(phoneNumber)) {
          throw Error("Invalid phone number");
      }
    };
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw Error("Invalid email");
      }
    };
    const isStrongPassword = (password) => {
      if (password.length < 8) {
        throw Error("Password is too short"); 
      }
  
      if (!/[A-Z]/.test(password)) {
        throw Error("Missing uppercase letters"); 
      }
  
      if (!/[a-z]/.test(password)) {
        throw Error("Missing lowercase letters");
      }
  
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        throw Error("Missing special characters");
      }
      return true;
  };
  
    const handleLogin = () => {
      try {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        if (username === '' || password === '') {
            throw new Error('Please fill in all fields');
        }
        isStrongPassword(password);
        fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(await response.text());
            }
            const data = await response.json();
            setToken(await data.token);
            setUser(await data.username);
            alert('User logged in successfully');
            navigate('/');
          });
      } catch (error) {
        alert(error.message);
      }
    };

    const handleRegister = () => {
      try {
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (username === '' || password === '' || confirmPassword === '') {
            throw new Error('Please fill in all fields');
        }
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }
        isValidPhoneNumber(phone);
        isValidEmail(email);
        isStrongPassword(password);
        fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, email, phone }),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(await response.text());
            }
            alert('User registered successfully');
          })

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
            <p>Email</p>
            <input className='input' type="email" name="email" id="email" data-testid="signupEmail"/>
            <p>Phone</p>
            <input className='input' type="text" name="phone" id="phone" data-testid="signupPhone"/>
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
