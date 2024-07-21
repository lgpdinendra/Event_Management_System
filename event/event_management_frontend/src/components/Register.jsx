import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Register.css';

function Register() {
  const { eventid } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let valid = true;

   
    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      valid = false;
    } else {
      setEmailError('');
    }

    
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      console.log("Submitting registration:", { email, name, password, eventid });
      const response = await axios.post('http://localhost:8085/api/v1/attendee/add', { email, name, password, eventid });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        confirmButtonColor: '#48BB78',
      });
      navigate(`/EventListAttendee`);
    } catch (error) {
      console.error('Error registering:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response ? error.response.data.message : 'An unexpected error occurred.',
        confirmButtonColor: '#F56565',
      });
    }
  };

  return (
    <div className='register-container'>
      <form onSubmit={handleSubmit} className='register-form'>
        <h2 className='register-head'>Register</h2>
        <div>
          <label className='register-name'>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className='register-name-input'
          />
        </div>
        <div>
          <label className='register-email'>Email</label>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className='register-email-input'
          />
          {emailError && <p className='error-text'>{emailError}</p>}
        </div>
        <div>
          <label className='register-password'>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className='register-password-input'
          />
          {passwordError && <p className='error-text'>{passwordError}</p>}
        </div>
        <button type="submit" className='register-btn'>Register</button>
      </form>
    </div>
  );
}

export default Register;
