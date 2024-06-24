import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';// Adjust the import path
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/'); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

  return (
         
          <div>
        <button onClick={handleLogout}>Logout</button>
        </div>
    
       
  )
}

export default LogoutBtn;