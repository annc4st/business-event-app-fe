import React, { useState, useContext } from "react";
import { UserContext, UserProvider } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const context = useContext(UserContext);
  let navigate = useNavigate();

  if (!context) {
    //// Context is undefined, return null or a fallback UI
    return null;
  }
  const { user, loading, logout } = context;
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <header className="header">
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <div className="menu">
 
      <Link to="/">All Events</Link>{' '}
        <Link to="/profile">Profile</Link>{' '}
        <Link to="/create-event">Create Event</Link>{' '}
      </div>


      {user ? (
        <div className="header-greet">
          <div className="logged-user">
            <p>Welcome, {user.username}!</p>
            <img src={user.thumbnail} alt="User Thumbnail" />
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="header-greet">
          <div className="logged-user">
            <p>Welcome, Stranger!</p>
            <a href="http://localhost:9000/api/auth/google">
              <button>Login with Google+</button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
