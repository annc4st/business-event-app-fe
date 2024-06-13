import React from 'react'

const LogoutButton = () => {
  const { user, loading, } = useContext(UserContext);
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await fetch('http://localhost:9000/api/auth/logout', {
            method: 'GET',
            credentials: 'include', // Include credentials for cross-origin requests
          });
          navigate('/'); // Redirect to the homepage after logout
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

  return (
        <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton
