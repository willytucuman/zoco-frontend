import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/admin/UserPage";
import SessionLogsPage from "./pages/admin/SessionLogsPage";
import StudiesPage from "./pages/studies/StudiesPage";
import AddressesPage from "./pages/addresses/AddressesPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login público */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas (requiere estar logueado) */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Solo Admin */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/session-logs"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <SessionLogsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin o User */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/studies" element={<StudiesPage />} />
            <Route path="/addresses" element={<AddressesPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
