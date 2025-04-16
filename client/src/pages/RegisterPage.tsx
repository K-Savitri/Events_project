import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';


const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          year_of_study: yearOfStudy,
          password,
        }),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (response.ok) {
        toast.success('Registration successful!');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error in register:', err);
      toast.error('Something went wrong');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-title">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="auth-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="auth-input"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="auth-input"
      />
      <input
        type="text"
        placeholder="Year of Study"
        value={yearOfStudy}
        onChange={(e) => setYearOfStudy(e.target.value)}
        required
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="auth-input"
      />
      <button type="submit" className="auth-button register-button">
        Register
      </button>
    </form>
  );
};

export default Register;