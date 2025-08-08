import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ street: "", city: "", userId: "" });
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  const [users, setUsers] = useState([]);

  const fetchAddresses = async () => {
    try {
      const { data } = await api.get("/addresses");
      setAddresses(data);
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (e) => {
    e.preventDefault();
    if (isAdmin && !form.userId) {
      alert("Debes seleccionar un usuario para asignar la dirección.");
      return;
    }

    const payload = {
      street: form.street,
      city: form.city,
    };

    if (isAdmin) payload.userId = form.userId;

    try {
      const { data } = await api.post("/addresses", payload);
      setAddresses((prev) => [data, ...prev]);
      setForm({ street: "", city: "", userId: "" });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al crear dirección");
    }
  };

  const updateAddress = async (id, patch) => {
    await api.put(`/addresses/${id}`, patch);
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );
  };

  const deleteAddress = async (id) => {
    if (!confirm("¿Eliminar dirección?")) return;
    await api.delete(`/addresses/${id}`);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  useEffect(() => {
    fetchAddresses();
  }, []);
  useEffect(() => {
    if (isAdmin) {
      api.get("/users").then(({ data }) => setUsers(data));
    }
  }, [isAdmin]);
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Direcciones</h1>

      <form
        onSubmit={createAddress}
        className="bg-white p-4 rounded shadow grid sm:grid-cols-3 gap-3"
      >
        <input
          className="border p-2 rounded"
          placeholder="Calle"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Ciudad"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
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
              <th className="text-left p-2">Calle</th>
              <th className="text-left p-2">Ciudad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">
                  <InlineEdit
                    value={a.street}
                    onSave={(v) => updateAddress(a.id, { street: v })}
                  />
                </td>
                <td className="p-2">
                  <InlineEdit
                    value={a.city}
                    onSave={(v) => updateAddress(a.id, { city: v })}
                  />
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => deleteAddress(a.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {!addresses.length && (
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
