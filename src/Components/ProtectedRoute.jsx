import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem("type"); // ← fixed key

  if (!userType) {
    return <Navigate to="/auth/signin" replace />; // ← fixed path
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
