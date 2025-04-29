import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/jwtUtils';

const mockUser = {
  id: '123',
  username: 'testuser',
  password: 'password123',
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = generateToken(mockUser);
    return res.json({
      message: 'Login successful',
      token,
    });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
};
