import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetching from your live Render backend
    fetch('https://fffinal-2.onrender.com/api/visitors')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(logs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Logs");
    XLSX.writeFile(workbook, "Visitor_Logs.xlsx");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          Export to Excel
        </button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold">Action</th>
              <th className="p-3 font-semibold">Timestamp</th>
              <th className="p-3 font-semibold">Pass ID</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{log.action || 'Check-In'}</td>
                <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="p-3">{log.passId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;