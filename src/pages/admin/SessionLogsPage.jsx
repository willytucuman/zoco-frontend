// src/pages/admin/SessionLogsPage.jsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SessionLogsPage() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    api.get("/session-logs").then(({ data }) => setLogs(data));
  }, []);
  console.log(logs);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Session Logs</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Usuario</th>
              <th className="text-left p-2">Inicio</th>
              <th className="text-left p-2">Fin</th>
              <th className="text-left p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.userName}</td>
                <td className="p-2">{new Date(l.startTime).toLocaleString()}</td>
                <td className="p-2">
                  {l.endTime ? new Date(l.endTime).toLocaleString() : "-"}
                </td>
                <td className="p-2">{l.endTime ? "Finalizada" : "Activa"}</td>
              </tr>
            ))}
            {!logs.length && <tr><td className="p-4" colSpan={4}>Sin registros</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
