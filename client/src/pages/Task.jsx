import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import Loader from "../component/Loader";

const Task = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/task/get-task");
      if (response.data.tasks.length === 0) {
        setLoading(false);
        return;
      }

      setTask(response.data.tasks);
      console.log("Task fetched successfully:", response.data.tasks);
      console.log(task);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  } else if (task.length == 0) {
    return (
      <div className="flex justify-center items-center h-64">
        No task found.
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4">
        <h1 className="text-4xl font-bold text-indigo-700 mb-10 drop-shadow-lg">
          Your Tasks
        </h1>
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {task.map((t) => (
              <div
                key={t._id}
                className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {t.title}
                  </h2>
                  <div className="flex flex-col items-end">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border mb-2 ${
                        t.status === "completed"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {t.status}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{t.description}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    className="flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition duration-150"
                    // onClick={() => handleEdit(t._id)}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    className="flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-red-600 hover:to-pink-600 transition duration-150"
                    // onClick={() => handleDelete(t._id)}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zm-2 6h8"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Task;
