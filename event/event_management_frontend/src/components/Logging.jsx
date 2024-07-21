import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Logging.css';

function Logging() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) errors.email = 'Email is required.';
    else if (!emailPattern.test(email)) errors.email = 'Email is not valid.';

    if (!password) errors.password = 'Password is required.';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters long.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; 

    try {
      const response = await axios.post('http://localhost:8085/api/v1/attendee/login', { email, password });
      if (response.status === 200 && response.data.message === "Login Success") { 
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          confirmButtonColor: '#48BB78',
        });
        setIsLoggedIn(true);
        fetchEventDetails();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || 'An unexpected error occurred.',
          confirmButtonColor: '#F56565',
        });
      } 
    }
      catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response ? error.response.data.message : 'An unexpected error occurred.',
        confirmButtonColor: '#F56565',
      });
    }
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/attendee/recent');
      setEventDetails(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEventDetails();
    }
  }, [isLoggedIn]);

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='login-head'>Login</h2>
        <div>
          <label className='login-email'>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className='login-email-input' />
          {errors.email && <p className='error-text'>{errors.email}</p>}
        </div>
        <div>
          <label className='login-password'>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className='login-password-input'/>
          {errors.password && <p className='error-text'>{errors.password}</p>}
        </div>
        <button type="submit" className='login-submit'>Login</button>
      </form>

      {isLoggedIn && (
        <div className="data-table-diagram">
          <h2>Event List</h2>
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Attendee</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(eventDetails) && eventDetails.map((event) => (
                <tr key={event.event.eventid}>
                  <td>{event.event.eventname}</td>
                  <td>{event.event.description}</td>
                  <td>{event.event.date}</td>
                  <td>{event.event.location}</td>
                  <td className="dt-cell-action">
                    Name:{event.name} <br/> Email:{event.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Logging;
