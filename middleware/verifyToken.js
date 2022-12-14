const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if(!token) {
    return res.status(401).json("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json("Invalid Token");
  }
};

module.exports = auth;