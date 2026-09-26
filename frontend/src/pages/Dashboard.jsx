import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/visitors/logs');
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs", error);
      }
    };
    fetchLogs();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(logs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CheckLogs");
    XLSX.writeFile(workbook, "Visitor_CheckLogs.xlsx");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Export to Excel
        </button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Action</th>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Pass ID</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="p-2">{log.action}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="p-2">{log.passId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}