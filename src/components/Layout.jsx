import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user?.role === "Admin" && (
            <>
              <Link to="/users" className="hover:underline">Usuarios</Link>
              <Link to="/studies" className="hover:underline">Estudios</Link>
              <Link to="/addresses" className="hover:underline">Direcciones</Link>
            </>
          )}
          {user?.role === "User" && (
            <>
              <Link to="/studies" className="hover:underline">Mis estudios</Link>
              <Link to="/addresses" className="hover:underline">Mis direcciones</Link>
              <Link to="/profile" className="hover:underline">Mi perfil</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </nav>
      <main className="p-4 flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
