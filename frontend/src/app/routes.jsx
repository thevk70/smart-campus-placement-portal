import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Landing from "../pages/public/Landing";

import JobList from "../pages/student/JobList";
import Profile from "../pages/student/Profile";
import MyApplications from "../pages/student/MyApplication";

import Dashboard from "../pages/admin/Dashboard";
import CreateJob from "../pages/admin/CreateJob";
import Applications from "../pages/admin/Application";

import ProtectedRoute from "./ProtectedRoute";
import JobDetails from "../pages/student/JobDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👩‍🎓 Student Routes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute role="student">
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute role="student">
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <ProtectedRoute role="student">
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💼 Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:jobId"
          element={
            <ProtectedRoute role="admin">
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-job"
          element={
            <ProtectedRoute role="admin">
              <CreateJob />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
