import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { createLocation } from '../api'; // Adjust the import path as needed
import { UserContext } from '../contexts/UserContext';


const CreateLocation = () => {
    const { user, loading } = useContext(UserContext);
    const [address, setAddress] = useState({
        postcode: '',
        first_line_address: '',
        second_line_address: '',
        city: ''
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate();


  return (
    <div>
      
    </div>
  )
}

export default CreateLocation
