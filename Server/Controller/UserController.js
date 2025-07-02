const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 7);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, author: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // refresh token
    const refreshToken = jwt.sign(
      { id: user._id, author: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // Save refresh token in user document
     user.refreshToken = refreshToken;
     await user.save();
    // Respond with success message and user details
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

const refreshTokenUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }
    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      // Find user by ID
      const foundUser = await User.findById(user._id);
      if (!foundUser || foundUser.refreshToken !== refreshToken) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
      // Generate new access token
      const newToken = jwt.sign(
        { id: foundUser._id, author: foundUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Token refreshed successfully",
        token: newToken,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error refreshing token" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
    }
    // Find user by refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(400).json({ error: "Invalid refresh token" });
    }
    // Clear the refresh token in the user document
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging out user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshTokenUser,
  logoutUser,
};
