const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const accessMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = accessMiddleware;
