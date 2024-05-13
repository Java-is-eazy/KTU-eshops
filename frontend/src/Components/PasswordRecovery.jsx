import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';



const PasswordRecovery = () => {
    const { string } = useParams();
    
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

    const handleSendRequest = (e) => {
        try {
            e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        isStrongPassword(password);
        fetch(`${window.location.protocol}//${window.location.hostname}:3001/recover`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, string: string})
          })          
            .then(async (response) => {
                if (response.ok) {
                    alert("Password recovery successful");
                } else {
                    alert("Unable to change password");
                }
            })
            .catch(error => {
                console.error("Error changing password:", error);
                alert("Error changing password");
            });
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div style={{backgroundColor:"#334155", height:"100%", width:"100%"}}>
            <h1>Password Recovery</h1>
            <form className='recover-pass-form'>
                <label htmlFor="email">Email:</label>
                <input className='input' type="email" id="email" name="email" required />
                <label htmlFor="password">Input your new password:</label>
                <input className='input' type="password" id="password" name="password" required />
                <button className='submit-btn' type="submit" onClick={handleSendRequest}>Recover Password</button>
            </form>
        </div>
    );
}

export default PasswordRecovery;
