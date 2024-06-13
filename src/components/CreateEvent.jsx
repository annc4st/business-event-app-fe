import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { postEvent } from '../api';

const CreateEvent= () => {
    const { user, loading } = useContext(UserContext);
    
    const handlePostEvent = (e) => {
        e.preventDefault();
        if(user.role===admin && )
    }

  return (
    <>
    {
        (user&&user.role===admin )? (
            <div className="create-event">
            <form onSubmit={(e) => handlePostEvent(e)}>

            </form>


            </div>


        ) : (
            <p>You need to login first.</p>
        )
    }
      
    </>
  )
}

export default Create
