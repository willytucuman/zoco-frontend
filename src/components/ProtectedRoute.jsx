import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, token } = useAuth();
  if (!token || !user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    alert("No tienes permisos para acceder a esta página.");
    return <Navigate to="/profile" replace />; // 403 visual
  }
  return children;
}
