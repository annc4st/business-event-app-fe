import React, { createContext, useState, useEffect , useContext} from 'react';
import { getUserProfile, logoutUser, loginUser } from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);


    
    //Log in
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const profile = await getUserProfile();
          setUser(profile);
          setIsLogged(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, []);

    const login = async (credentials) => {
      try {
          const response = await loginUser(credentials);
          if (response && response.user) {
              setUser(response.user);
              setIsLogged(true);
              return true;
          } else {
              console.error('Error logging in: User data not found in response');
              return false;
          }
      } catch (error) {
          console.error('Error logging in:', error);
          return false;
      }
  };

    const logout = async () => {
      try {
        await logoutUser();
        setUser(null);
        setIsLogged(false); 
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    
    
    return (
        <UserContext.Provider value={{ user, loading, logout, login, isLogged }}>
            {children}
        </UserContext.Provider>
    );
};