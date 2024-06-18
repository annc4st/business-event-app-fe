import React, { createContext, useState, useEffect , useContext} from 'react';
import { getUser } from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Log in
    useEffect(() => {
        getUser().then((fetchedUser) => {
            // console.log("from usercontext>> ", fetchedUser)
            setUser(fetchedUser)
            setLoading(false);
        })
        .catch(error => {
            console.log('Error fetching user:', error);
            setLoading(false);
            });
    }, []);

    //log out
    const logout = async () => {
        try {
          await fetch('https://business-event-app.onrender.com/api/auth/logout', {
            method: 'GET',
            credentials: 'include', // Include credentials for cross-origin requests
          });
          setUser(null);
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
    
    
    return (
        <UserContext.Provider value={{ user, setUser, loading, logout }}>
            {children}
        </UserContext.Provider>
    );
};