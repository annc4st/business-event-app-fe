import React, { createContext, useState, useEffect , useContext} from 'react';
import { getUser } from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    
    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};