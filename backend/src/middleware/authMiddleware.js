import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authoriation &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authoriation.split('')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ mesage: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ mesage: 'Not authorized, no token' });
  }
};
