import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token is invalid or expired');
  }
};
