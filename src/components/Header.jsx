import React, { useContext } from 'react';
import { UserContext, UserProvider } from '../contexts/UserContext';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const context = useContext(UserContext);
  if (!context) {
    // Context is undefined, return null or a fallback UI
    return null;
}
  const { user, loading } = context;
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:9000/api/auth/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for cross-origin requests
      });
      navigate('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  if (loading) return <p>Loading...</p>;
  return (
    <header className="App-header">
    <h1>Welcome to My App</h1>

    {user ? (
        <div>
            <div>
            <p>Welcome, {user.username}!</p>
            <img src={user.thumbnail} alt="User Thumbnail" />
            </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
    ) : (
      <div>
      <div>
      <p>Welcome, Stranger!</p>
      <a href="http://localhost:9000/api/auth/google"><button>Login with Google+</button></a>
      </div>
      </div>
      
    )}
</header>
  )
}

export default Header
