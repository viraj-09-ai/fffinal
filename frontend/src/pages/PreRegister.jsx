import React, { useState } from 'react';

const PreRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', date: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      // Posting to your live Render backend
      const response = await fetch('https://fffinal-2.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Registration successful! Email sent to visitor.');
        setFormData({ name: '', email: '', date: '' });
      } else {
        setStatus('Failed to register visitor.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error connecting to server.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Pre-Register Visitor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Visitor Name</label>
          <input 
            type="text" 
            required
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Visitor Email</label>
          <input 
            type="email" 
            required
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date of Visit</label>
          <input 
            type="date" 
            required
            className="w-full border p-2 rounded"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register & Send Pass
        </button>
      </form>
      {status && <p className="mt-4 font-medium text-center">{status}</p>}
    </div>
  );
};

export default PreRegister;