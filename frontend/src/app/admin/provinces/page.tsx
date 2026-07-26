import React, { useState, useEffect } from 'react';

interface Province {
  id: number;
  name: string;
}

const ProvincesPage: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ name: string }>({ name: '' });

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/provinces');
        if (!res.ok) throw new Error('Failed to fetch provinces');
        const data: Province[] = await res.json();
        setProvinces(data);
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle submit (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        // Update
        const res = await fetch(`/api/provinces/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update province');
      } else {
        // Create
        const res = await fetch('/api/provinces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to create province');
      }
      // Reset form and close modal
      setFormData({ name: '' });
      setEditId(null);
      setShowModal(false);
      // Refetch list
      const res = await fetch('/api/provinces');
      if (!res.ok) throw new Error('Failed to refetch provinces');
      const data: Province[] = await res.json();
      setProvinces(data);
    } catch (err: any) {
      alert(err.message ?? 'An error occurred');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this province?')) return;
    try {
      const res = await fetch(`/api/provinces/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete province');
      // Refetch list
      const res2 = await fetch('/api/provinces');
      if (!res2.ok) throw new Error('Failed to refetch provinces');
      const data: Province[] = await res2.json();
      setProvinces(data);
    } catch (err: any) {
      alert(err.message ?? 'An error occurred');
    }
  };

  // Handle edit click
  const handleEdit = (province: Province) => {
    setEditId(province.id);
    setFormData({ name: province.name });
    setShowModal(true);
  };

  // Handle add new button
  const handleAddNew = () => {
    setEditId(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Provinces</h1>
      <div className="mb-4">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Province
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map(province => (
              <tr key={province.id} className="border-t">
                <td className="px-4 py-2">{province.id}</td>
                <td className="px-4 py-2">{province.name}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(province)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(province.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {provinces.length === 0 && (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                  No provinces found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editId !== null ? 'Edit Province' : 'Add New Province'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />