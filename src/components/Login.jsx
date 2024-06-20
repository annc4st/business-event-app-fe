import React, { useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setCredentials({
      ...credentials, [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login(credentials);
      if (!success) {
          console.error("Login failed: Invalid credentials or server error");
      }
      navigate('/');
  } catch (error) {
      console.error("Error logging in:", error);
  }
  };

  return (
    <div className="container">
       <div className="form-wrapper">
      <h1>Login</h1>
     
      <form onSubmit={handleLogin} >
        <input
          onChange={handleChange}
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          placeholder="Enter your username"
          required
        />

        <input
          onChange={handleChange}
          type="text"
          name="password"
          id="password"
          value={credentials.password}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
    <div className="login-p">
    <p>If you have not registered, please <Link to={'/register'}>Register</Link>. </p>
     </div>
     </div>
  );
};

export default Login;
