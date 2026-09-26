import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

export default function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (result, error) => {
    if (result) {
      setScanResult(result?.text);
      try {
        await axios.post('http://localhost:5000/api/visitors/scan', { qrData: result.text });
        alert('Pass verified and check-log updated!');
      } catch (err) {
        alert('Invalid or expired pass.');
      }
    }
    if (error) {
      console.info(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Scan Visitor Badge</h2>
      <div className="mb-4">
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      </div>
      {scanResult && <p className="text-green-600 font-semibold">Last Scanned: {scanResult}</p>}
    </div>
  );
}