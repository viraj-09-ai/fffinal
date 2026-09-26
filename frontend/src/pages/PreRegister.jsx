import { useState } from 'react';
import axios from 'axios';

export default function PreRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', purpose: '', validUntil: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/visitors/register', formData);
      setMessage('Pre-registration successful! Pass generated and email sent.');
      setFormData({ name: '', email: '', purpose: '', validUntil: '' });
    } catch (error) {
      setMessage('Error registering visitor. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Visitor Pre-Registration</h2>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required className="w-full p-2 border rounded"
          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required className="w-full p-2 border rounded"
          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="text" placeholder="Purpose of Visit" required className="w-full p-2 border rounded"
          value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})}
        />
        <input 
          type="date" required className="w-full p-2 border rounded"
          value={formData.validUntil} onChange={(e) => setFormData({...formData, validUntil: e.target.value})}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Register Visitor
        </button>
      </form>
    </div>
  );
}