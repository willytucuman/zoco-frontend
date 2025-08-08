import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProfilePage() {
  const [me, setMe] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchMe = async () => {
    const { data } = await api.get("/users/me");
    setMe(data);
    setForm({ name: data.name, email: data.email });
  };

  const save = async (e) => {
    e.preventDefault();
    await api.put("/users/me", form);
    await fetchMe();
    alert("Perfil actualizado");
  };

  useEffect(() => { fetchMe(); }, []);

  if (!me) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Mi perfil</h1>
      <form onSubmit={save} className="bg-white p-4 rounded shadow space-y-3">
        <input className="border p-2 w-full rounded" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="border p-2 w-full rounded" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
      </form>
    </div>
  );
}
