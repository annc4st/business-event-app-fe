import React, { useState, useContext } from "react";
import { UserContext, UserProvider } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

import "./Header.css";

const Header = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  if (!context) {
    //// Context is undefined, return null or a fallback UI
    return null;
  }
  const { user, loading, isLogged} = context;
 

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


      {isLogged && user && (
        <div className="header-greet">
          <div className="logged-user">
            <p>Welcome, {user.username}!</p>
          </div>
          <LogoutBtn />
        </div>
        
      ) }

      {!isLogged && !user && (

        <div className="header-greet">
          <div className="logged-user">
            <p>Welcome, Stranger!</p>
            <Link to={'/login'}><button>Login</button></Link>
          </div>
          <div className="logged-user">
           
            <Link to={'/register'}><button>Register</button></Link>          
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
