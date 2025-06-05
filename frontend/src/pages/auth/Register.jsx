import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register({ username, setUsername }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch(
        'https://projectpad-vnxa.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Register failed');
      }
      const data = await response.json();
      console.log(`Successfully registered, token:${data.token}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Error registering in');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen	bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          ProjectPad Register
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-emerald-500 transition duration-300"
          >
            Create Account
          </button>
          <p>
            Already a user?
            <Link to="/" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
