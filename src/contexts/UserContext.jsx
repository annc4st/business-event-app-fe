import React, { createContext, useState, useEffect , useContext} from 'react';
import { getUserProfile, logoutUser, loginUser } from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(false);


    const login = async (credentials) => {
      setLoading(true);
      try {
          const response = await loginUser(credentials);
          // const profile = await getUserProfile();
          // console.log(" >> ", profile)
          if (response && response.user) {
            // console.log("response.user >> ", response.user)
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