import React from "react";
import api from "../utils/Api";


// Initial state for the form
let initialState = {
  title: "",
  description: "",
  status: "pending",
};

const CerateTask = () => {
  const [form, setForm] = React.useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("api/task/create", form);
      if (response.status === 201) {
        alert("Task created successfully!");
        setForm(initialState); // Reset form after successful submission
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setForm(initialState); // Reset form on error
        alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">
          Create Task
        </h2>
        <div className="mb-6">
          <label
            className="block mb-2 font-semibold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 font-semibold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Enter task description"
            rows={4}
          />
        </div>
        <div className="mb-8">
          <label
            className="block mb-2 font-semibold text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CerateTask;
