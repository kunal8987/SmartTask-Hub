import React from "react";
import { Route, Routes } from "react-router-dom";
import Task from "../pages/Task";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../component/ProtectedRoutes";
import CerateTask from "../pages/CerateTask";
const AllRoutes = () => {
  return (
    
      <Routes>
        {/* Define your routes here */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Task />
            </ProtectedRoutes>
          }
        />
         <Route
          path="/create-task"
          element={
            <ProtectedRoutes>
              <CerateTask />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
  );
};

export default AllRoutes;
