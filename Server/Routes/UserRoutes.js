const express = require("express");
const { registerUser, loginUser } = require("../Controller/UserController");
const userRoutes = express.Router();

// User registration route
userRoutes.post("/register", registerUser);
// User login route
userRoutes.post("/login", loginUser);

// Export the user routes
module.exports = userRoutes;
