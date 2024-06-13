import React from 'react'
import {Link} from "react-router-dom";


const Nav = () => {
    
  
    return (
      <nav>
        <Link to="/">All Events</Link>{' '}
        <Link to="/profile">Profile</Link>{' '}
        <Link to="/create-event">Create Event</Link>{' '}
      </nav>
    );
  }

export default Nav
