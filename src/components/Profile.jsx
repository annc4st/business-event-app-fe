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
      

                {user.role== "admin" && (
                  <div className = "admin-part">
                    <h3>If user is admin</h3>
                    <p> event name, date, location, guests or number of guests</p>
                    <Link to={"/create-event"}>Create new event </Link>
                  </div> 
                )}

            <h2>You signed up for the following events:</h2>
           <p> event name, date, location</p>
           </div>
          ) : (
                <p>You need to log in first.</p>
            )}
    </div>
  )
}

export default Profile
