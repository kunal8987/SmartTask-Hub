import React from "react";
import { Link } from "react-router-dom";
import api from "../utils/Api";

// Initial state for the form
let initialState = { email: "", username: "", password: "" };

const Register = () => {
  const [formData, setFormData] = React.useState(initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    try {
      let response = await api.post("api/user/register", formData);
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        // Optionally redirect or show a success message
        alert("Registration successful! Please log in.");
        setFormData(initialState);
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
    setFormData(initialState);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 drop-shadow-sm">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
