import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      //TODO: make this more secure (ex: httponly cookies?)
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Error logging in');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen	bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          🍄 ProjectPad Login 🍄
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={handleToggle}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-emerald-500 transition duration-300"
          >
            Login
          </button>
          <p className="p-2">
            Not registered yet?
            <Link to="/register" className="text-blue-600 p-2 text-sm">
              Create your account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
