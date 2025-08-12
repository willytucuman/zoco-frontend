import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useState } from "react";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try { await api.post("/auth/logout"); } catch(error) {
      throw new Error("Error al cerrar sesión: " + error.message);
    }
    logout();
    navigate("/login");
  };

  const adminLinks = (
    <>
      <Link to="/users" className="hover:underline">Usuarios</Link>
      <Link to="/studies" className="hover:underline">Estudios</Link>
      <Link to="/addresses" className="hover:underline">Direcciones</Link>
      <Link to="/session-logs" className="hover:underline">Logs</Link>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user?.role === "Admin" && (
            <>
              <button
                className="md:hidden mr-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
              <div className="hidden md:flex gap-4">
                {adminLinks}
              </div>
              {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col gap-2 px-4 py-2 md:hidden z-10">
                  {adminLinks}
                </div>
              )}
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
