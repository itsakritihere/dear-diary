const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token received in middleware:", token);
  console.log("JWT secret key:", JWT_SECRET_KEY);
  if (!token) {
    return res.status(401).json({ message: 'A token is required for authentication' });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log('JWT verification error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}


module.exports = authMiddleware;
