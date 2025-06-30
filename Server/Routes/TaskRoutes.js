const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controller/TaskController");
const accessMiddleware = require("../Middleware/AccessMiddleware");

const taskRoutes = express.Router();

// Create a new task
taskRoutes.post("/create", accessMiddleware, createTask);
// Get all tasks for the authenticated user
taskRoutes.get("/get-task", accessMiddleware, getTasks);
// Update a task by ID
taskRoutes.put("/update/:taskId", accessMiddleware, updateTask);
// Delete a task by ID
taskRoutes.delete("/delete/:taskId", accessMiddleware, deleteTask);

// Export the task routes
module.exports = taskRoutes;
