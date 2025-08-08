import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/admin/UserPage";
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/studies" element={<StudiesPage />} />
            <Route path="/addresses" element={<AddressesPage />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
