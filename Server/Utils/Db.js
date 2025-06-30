const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbUrl = process.env.MONGODB_URL;
const connection = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully db file");
  } catch (error) {
    console.error("Database connection failed db file:", error);
  }
};

module.exports = connection;