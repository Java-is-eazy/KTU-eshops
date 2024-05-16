/* eslint-disable no-alert */
import React, { useState } from "react";
import "./authPage.css";
import backgroundImage from "../assets/auth-bg.jpg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Authentication = ({ setToken, setUser }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const handleLoginClick = () => {
        setIsLogin(true);
    };
    const handleSignupClick = () => {
        setIsLogin(false);
    };
    const [showModal, setShowModal] = useState(false); 

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
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
            if (username === "" || password === "") {
                throw new Error("Please fill in all fields");
            }
            isStrongPassword(password);
            fetch(`${window.location.protocol}//${window.location.hostname}:3001/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        alert(await response.text());
                    }
                    else{
                        const data = await response.json();
                        setToken(await data.token);
                        setUser(await data.username);
                        alert("User logged in successfully");
                        navigate("/");
                    }
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSendRequest = (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById("email").value;
            if (email === "") {
                throw new Error("Please fill in all fields");
            }
            isValidEmail(email);
            fetch(`${window.location.protocol}//${window.location.hostname}:3001/passwordrecovery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        alert(await response.text());
                    }
                    else{
                        alert("Password recovery email sent successfully");
                        setShowModal(false);
                    }
                });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleForgotPassword = () => {
        setShowModal(true);
    };
    

    const handleRegister = () => {
        try {
            const username = document.getElementById("signupUsername").value;
            const password = document.getElementById("password").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (username === "" || password === "" || confirmPassword === "") {
                throw new Error("Please fill in all fields");
            }
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            isValidPhoneNumber(phone);
            isValidEmail(email);
            isStrongPassword(password);
            fetch(`${window.location.protocol}//${window.location.hostname}:3001/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email, phone }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        alert(await response.text());
                    }
                    else{
                        alert("User registered successfully");
                        setIsLogin(true);
                    }
                });

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="full-height" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize:"cover", backgroundPosition: "bottom right"}}>
            <div className={`auth-container ${showModal && "full-window-modal"}`}>
                <h1>ProductForge</h1>
                <div className="buttons-container">
                    <div className={`slider ${isLogin ? "left" : "right"}`}></div>
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
                        <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p>
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
            {showModal && (
                <div className="modal-recovery">
                    <div className="modal-content">
                        <span style={{color:"white", float:"left"}} onClick={() => setShowModal(false)}>&times;</span>
                        <h1 style={{color:"white"}}>ProductForge password recovery</h1>
                        <form>
                            <p className='modal-label'>Email address of the account</p>
                            <input className='input' type="email" id="email" name="email" required />
                            <button type="submit" onClick={handleSendRequest} className='submit-btn'>Recover Password</button>
                        </form>
                    </div>
                </div>
            )}  
        </div>
    );
};

Authentication.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
};


export default Authentication;