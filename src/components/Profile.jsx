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
        <div className="">
            {user && profile ? (
                <div>
                    <div className="">
                        <h1>Profile</h1>
                    </div>
                    <div className="">
                        <p>userid: {user.id}</p>
                    </div>
                    <div className="">
                        <p>Email: {user.email}</p>
                    </div>
                    <div className="">
                        <p>Role: {user.role}</p>
                    </div>

                    <UserEvents />

                    {user.role === "admin" && (
                        <div className="">
                            <p>If user is admin you can see this</p>
                            <p><Link to={"/create-event"}>Create new event</Link></p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <p>You need to log in first.</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
