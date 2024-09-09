import { useState } from 'react';
import axios from 'axios';

export default function RequestPage() {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gqk2bgt5-5001.asse.devtunnels.ms/user/request', {
        name,
        nik,
        email,
        message,
      });
      setTrackingCode(response.data.trackingCode);
      setSuccess('Request berhasil dibuat!');
      setError('');
    } catch (err) {
      setError('Terjadi kesalahan!');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buat Permintaan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="nik">NIK</label>
          <input
            type="text"
            id="nik"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">Pesan</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Kirim Permintaan</button>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {trackingCode && (
          <div className="mt-4 p-2 border rounded bg-gray-100">
            <p>Kode Pelacakan Anda: <span className="font-bold">{trackingCode}</span></p>
          </div>
        )}
      </form>
    </div>
  );
}
