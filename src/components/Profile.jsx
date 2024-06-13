import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";


const Profile = () => {
    const { user, loading } = useContext(UserContext);
    if (loading) return <p>Loading...</p>;
    
  return (
    <div>
       {user ? (
                <div>
                    <h1>Profile</h1>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.thumbnail} alt="User Thumbnail" />
                </div>
            ) : (
                <p>You need to login first.</p>
            )}

            <h2>You signed up for the following events:</h2>
           <p> event name, date, location</p>

          <div className = "admin-part">

          <h3>If user is admin</h3>
          <p> event name, date, location, guests or number of guests</p>

          <button>Create new event</button>

          </div> 
    </div>
  )
}

export default Profile
