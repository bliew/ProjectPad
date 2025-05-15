import { generateToken } from '../utils/jwtUtils.js';
import prisma from '../libs/prisma.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usename and Password required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal server error: Error logging in' });
  }
};

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const userExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('userExists', userExists);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'User successfully registered',
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error: Error registering user' });
  }
};
