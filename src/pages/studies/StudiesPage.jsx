import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function StudiesPage() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", institution: "", userId: "" });
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [users, setUsers] = useState([]);

  const fetchStudies = async () => {
    try {
      const { data } = await api.get("/studies");
      setStudies(data);
    } finally {
      setLoading(false);
    }
  };
  const createStudy = async (e) => {
    e.preventDefault();
    if (isAdmin && !form.userId) {
      alert("Debes seleccionar un usuario para asignar el estudio.");
      return;
    }

    const payload = {
      title: form.title,
      institution: form.institution,
    };

    if (isAdmin) payload.userId = form.userId;

    try {
      const { data } = await api.post("/studies", payload);
      setStudies((prev) => [data, ...prev]);
      setForm({ title: "", institution: "", userId: "" });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al crear estudio");
    }
  };

  const updateStudy = async (id, patch) => {
    await api.put(`/studies/${id}`, patch);
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const deleteStudy = async (id) => {
    if (!confirm("¿Eliminar estudio?")) return;
    await api.delete(`/studies/${id}`);
    setStudies((prev) => prev.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchStudies();
  }, []);
  useEffect(() => {
    if (isAdmin) {
      api.get("/users").then(({ data }) => setUsers(data));
    }
  }, [isAdmin]);
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Estudios</h1>

      <form
        onSubmit={createStudy}
        className="bg-white p-4 rounded shadow grid sm:grid-cols-3 gap-3"
      >
        <input
          className="border p-2 rounded"
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Institución"
          value={form.institution}
          onChange={(e) => setForm({ ...form, institution: e.target.value })}
          required
        />
        {isAdmin && (
          <select
            className="border p-2 rounded"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          >
            <option value="">Asignar a...</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        )}
        <button className="bg-blue-600 text-white rounded px-3 py-2 sm:col-span-3">
          Crear
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Título</th>
              <th className="text-left p-2">Institución</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">
                  <InlineEdit
                    value={s.title}
                    onSave={(v) => updateStudy(s.id, { title: v })}
                  />
                </td>
                <td className="p-2">
                  <InlineEdit
                    value={s.institution}
                    onSave={(v) => updateStudy(s.id, { institution: v })}
                  />
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => deleteStudy(s.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {!studies.length && (
              <tr>
                <td className="p-4" colSpan={3}>
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InlineEdit({ value, onSave }) {
  const [val, setVal] = useState(value);
  const [editing, setEditing] = useState(false);
  const submit = () => {
    if (val !== value) onSave(val);
    setEditing(false);
  };
  return editing ? (
    <div className="flex gap-2">
      <input
        className="border p-1 rounded"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button className="text-blue-600" onClick={submit}>
        OK
      </button>
      <button
        className="text-gray-500"
        onClick={() => {
          setVal(value);
          setEditing(false);
        }}
      >
        X
      </button>
    </div>
  ) : (
    <span
      className="cursor-pointer hover:underline"
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
}
