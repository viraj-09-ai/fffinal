import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [status, setStatus] = useState('');

  const handleScan = async (result) => {
    if (result) {
      const passId = result?.text;
      setScanResult(passId);
      
      try {
        // Verifying scan against your live Render backend
        const response = await fetch('https://fffinal-2.onrender.com/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passId })
        });

        if (response.ok) {
          setStatus('Scan successful! Check-in recorded.');
        } else {
          setStatus('Invalid Pass ID.');
        }
      } catch (error) {
        console.error(error);
        setStatus('Error connecting to server.');
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Scan Visitor Pass</h1>
      
      <div className="border-4 border-dashed border-gray-300 p-2 mb-4">
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'environment' }}
          containerStyle={{ width: '100%' }}
        />
      </div>

      {scanResult && <p className="text-gray-600 mb-2">Scanned ID: {scanResult}</p>}
      {status && (
        <p className={`font-bold ${status.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default Scanner;