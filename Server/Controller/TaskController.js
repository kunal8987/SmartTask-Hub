const Task = require("../Models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newTask = new Task({
      title,
      description,
      status,
      userId: req.user.id, // Assuming user ID is available in req.user
      username: req.user.author, // Assuming username is available in req.user
    });
    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const task = await Task.find({ userId: req.user.id, _id: taskId });
    if (task.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.find({ userId: req.user.id, _id: taskId });
    if (task.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
