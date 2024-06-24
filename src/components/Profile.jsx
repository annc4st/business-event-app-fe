import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import "./errors/errors.css";
import { getUserProfile } from '../api';
import UserEvents from './UserEvents';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const profile = await getUserProfile();
                    setProfile(profile);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
          <div className="loading-container">
                <p>No user logged in. Please, <Link to="/login">login</Link>.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return <p>Error loading profile</p>;
    }

    return (
        <div className="profile-page">
            { user && profile  && (
               <div> 
                    <div className="profile-dets">
                    <div className="content">
                    
                        <h2>Profile Information</h2>
                        
                    <div className="profile-el">
                        <p>user Id: {profile.id}</p>
                    </div>
                    <div className="profile-el">
                        <p>Email: {profile.email}</p>
                    </div>
                    <div className="profile-el">
                        <p>Role: {profile.role}</p>
                    </div>
                    </div>
                    </div>
                    
                    <UserEvents />

                    {user.role === "admin" && (
                        <div className="admin-section">
                            <p>If user is admin you can see this</p>
                            <p><Link to={"/create-event"}>Create new event</Link></p>
                        </div>
                    )}
               
                </div>
            ) }
        </div>
    );
};

export default Profile;
