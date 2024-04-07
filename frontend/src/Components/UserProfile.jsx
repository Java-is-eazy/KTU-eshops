import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './userProfile.css';

export default function UserProfile({ myUsername, token, handleLogout }) {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch(`${window.location.protocol}//${window.location.hostname}:3001/user?username=${username}`)
        .then(async (response) => {
            if (response.ok) {
                const userData = await response.json();
            if (userData.created_at) {
                userData.created_at = userData.created_at.slice(0, 10);
            }
                setUser(userData);
            } else {
                alert("Unable to fetch user data");
            }
            setIsLoaded(true);
        });
    }, [username]);
    

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            fetch(`${window.location.protocol}//${window.location.hostname}:3001/user`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ username: username })
            })
            .then(async (response) => {
                if (response.ok) {
                    alert("Account deleted successfully");
                    handleLogout();
                    window.location.href = '/';
                } else {
                    alert("Unable to delete account");
                }
            })
            .catch(error => {
                console.error("Error deleting account:", error);
                alert("Error deleting account");
            });
        }
    };
    


    return (
        <div className="user-profile-container">
            { !isLoaded && (
                <div className="loading-container">Loading...</div>
            )}
    
            { isLoaded && !user && (
                <div className="user-not-found-container">User not found</div>
            )}
    
            { isLoaded && user && (
                <div className="user-profile-content">
                    <h1>{`${username}`}</h1>
                    <img src="https://i.pinimg.com/originals/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg" alt="profilePicture" className="profile-picture"/>
                    <div className="account-info">
                        <p>Account Created:</p>
                        <p>{user.created_at}</p>
                        <p>Email</p>
                        <p>{user.email}</p>
                        {username === myUsername && (
                            <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
    
}
