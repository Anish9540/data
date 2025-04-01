import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, requireManager = false }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (requireManager && currentUser.role !== "Manager") {
        return <Navigate to="/scorecard" replace />;
    }

    return children;
};

export default ProtectedRoute;