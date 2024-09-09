import { useState } from 'react';
import axios from 'axios';

export default function TrackPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://gqk2bgt5-5001.asse.devtunnels.ms/user/track/${trackingCode}`);
      setRequest(response.data);
      setError('');
    } catch (err) {
      setError('Tracking code tidak ditemukan!');
      setRequest(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lacak Permintaan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="trackingCode">Kode Pelacakan</label>
          <input
            type="text"
            id="trackingCode"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Lacak Permintaan</button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {request && (
          <div className="mt-4 p-2 border rounded bg-gray-100">
            <h2 className="text-lg font-bold">Detail Permintaan</h2>
            <p><strong>Nama:</strong> {request.name}</p>
            <p><strong>NIK:</strong> {request.nik}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Pesan:</strong> {request.message}</p>
            <p><strong>Status:</strong> {request.status}</p>
            {request.fileUrl && <p><strong>File URL:</strong> <a href={request.fileUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">Link</a></p>}
          </div>
        )}
      </form>
    </div>
  );
}
