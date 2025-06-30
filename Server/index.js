const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./Utils/Db");
const taskRoutes = require("./Routes/TaskRoutes");
const userRoutes = require("./Routes/UserRoutes");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  connection();
  console.log(`Server is running on port ${PORT}`);
});
