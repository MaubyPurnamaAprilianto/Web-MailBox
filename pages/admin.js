import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch all requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://gqk2bgt5-5001.asse.devtunnels.ms/admin/requests');
        setRequests(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch requests.');
      }
    };

    fetchRequests();
  }, []);

  const handleProcessRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://gqk2bgt5-5001.asse.devtunnels.ms/admin/process', {
        trackingCode: selectedRequest.trackingCode,
        status,
        fileUrl,
      });
      setSuccess('Request processed successfully!');
      setError('');
      setStatus('');
      setFileUrl('');
    } catch (err) {
      console.error(err);
      setError('Failed to process request.');
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.trackingCode}
            className={`border p-4 rounded ${selectedRequest === request ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedRequest(request)}
          >
            <h2 className="text-lg font-semibold">{request.name}</h2>
            <p>NIK: {request.nik}</p>
            <p>Email: {request.email}</p>
            <p>Message: {request.message}</p>
            <p>Status: {request.status}</p>
          </div>
        ))}
      </div>
      {selectedRequest && (
        <form onSubmit={handleProcessRequest} className="mt-4 space-y-4 text-black">
          <h3 className="text-lg font-semibold">Process Request</h3>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="status">
              Status
            </label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fileUrl">
              File URL
            </label>
            <input
              type="text"
              id="fileUrl"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Process Request
          </button>
        </form>
      )}
    </div>
  );
}
