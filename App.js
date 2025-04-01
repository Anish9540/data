import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ScorecardPage from "./pages/ScorecardPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDetailsPage from "./components/employeeDetails/EmployeeDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import { Navigate } from "react-router-dom";

const createAppRouter = () => createBrowserRouter([
  {
    path: "/", 
    element: <Layout />, 
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "scorecard", element: <ProtectedRoute><ScorecardPage /></ProtectedRoute> },
      { path: "manager", element: <ProtectedRoute requireManager={true}><ManagerDashboard /></ProtectedRoute> },
      { path: "employee/:id", element: <ProtectedRoute requireManager={true}><EmployeeDetailsPage /></ProtectedRoute> },
      { path: "*", element: <ErrorPage /> }
    ]
  }
]);

function App() {
  const router = createAppRouter();
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;