import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {isAdmin ? (
        <div className="grid sm:grid-cols-3 gap-4">
          <Card to="/users" title="Usuarios" desc="Gestiona usuarios" />
          <Card to="/studies" title="Estudios" desc="Ver/editar todos" />
          <Card to="/addresses" title="Direcciones" desc="Ver/editar todas" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <Card to="/profile" title="Mi perfil" desc="Editar mis datos" />
          <Card to="/studies" title="Mis estudios" desc="Gestionar mis estudios" />
          <Card to="/addresses" title="Mis direcciones" desc="Gestionar mis direcciones" />
        </div>
      )}
    </div>
  );
}

function Card({ to, title, desc }) {
  return (
    <Link to={to} className="block bg-white rounded-lg shadow p-4 hover:shadow-md">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm opacity-70">{desc}</p>
    </Link>
  );
}
