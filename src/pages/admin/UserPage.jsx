// src/pages/admin/UsersPage.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "User" });

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } finally { setLoading(false); }
  };

  const createUser = async (e) => {
    e.preventDefault();
    await api.post("/users", form);
    setForm({ name: "", email: "", password: "", role: "User" });
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    await api.delete(`/users/${id}`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  useEffect(() => { fetchUsers(); }, []);
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Usuarios</h1>

      <form onSubmit={createUser} className="bg-white p-4 rounded shadow grid sm:grid-cols-4 gap-3">
        <input className="border p-2 rounded" placeholder="Nombre"
          value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Email" type="email"
          value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Password" type="password"
          value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <select className="border p-2 rounded"
          value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option>User</option>
          <option>Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-3 py-2 rounded sm:col-span-4">Crear</button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 text-center">
                  <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {!users.length && <tr><td className="p-4" colSpan={4}>Sin usuarios</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
