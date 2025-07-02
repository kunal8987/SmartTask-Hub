import React from "react";
import { Link } from "react-router-dom";
import api from "../utils/Api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/Common";


const Login = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  // let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await api.post("api/user/login", formData);
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        // Store tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
        // Optionally redirect or show a success message
        alert("Login successful! Redirecting...");
        window.location.href = "/";
      } else {
        console.error("Login failed:", response.data);
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setFormData({ username: "", password: "" });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 drop-shadow-sm">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              name="username"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your username"
              autoComplete="username"
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
              name="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-purple-600 hover:underline"
            role="link"
            aria-label="Register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
