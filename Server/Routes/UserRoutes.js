const express = require("express");
const {
  registerUser,
  loginUser,
  refreshTokenUser,
} = require("../Controller/UserController");

const AccessMiddleware = require("../Middleware/AccessMiddleware");

const userRoutes = express.Router();

// User registration route
userRoutes.post("/register", registerUser);
// User login route
userRoutes.post("/login", loginUser);
//refresh token route
userRoutes.post("/refresh/token", AccessMiddleware, refreshTokenUser);

// Export the user routes
module.exports = userRoutes;
