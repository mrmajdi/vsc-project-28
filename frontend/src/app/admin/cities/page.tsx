import { useState, useEffect } from 'react';

interface City {
  id: number;
  name: string;
}

const AdminCitiesPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editCity, setEditCity] = useState<City | null>(null);
  const [formName, setFormName] = useState<string>('');

  // Fetch cities on mount
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/cities');
      if (!res.ok) throw new Error('Failed to fetch cities');
      const data: City[] = await res.json();
      setCities(data);
    } catch (err: any) {
      setError(err.message ?? 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditCity(null);
    setFormName('');
    setShowModal(true);
  };

  const handleOpenEditModal = (city: City) => {
    setEditCity(city);
    setFormName(city.name);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditCity(null);
    setFormName('');
  };

  const handleSave = async () => {
    if (!formName.trim()) return;
    try {
      if (editCity) {
        // Update
        const res = await fetch(`/api/cities/${editCity.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formName.trim() }),
        });
        if (!res.ok) throw new Error('Failed to update city');
      } else {
        // Create
        const res = await fetch('/api/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formName.trim() }),
        });
        if (!res.ok) throw new Error('Failed to create city');
      }
      await fetchCities();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message ?? 'An unknown error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this city?')) return;
    try {
      const res = await fetch(`/api/cities/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete city');
      await fetchCities();
    } catch (err: any) {
      setError(err.message ?? 'An unknown error occurred');
    }
  };

  if (loading) return <div className="p-6">Loading cities...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Cities</h1>
      <button
        onClick={handleOpenAddModal}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add New City
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editCity ? 'Edit City' : 'Add New City'}
            </h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">City Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {editCity ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
            {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      )}

      {/* Cities Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cities.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No cities found.
                </td>
              </tr>
            ) : (
              cities.map((city) => (
                <tr key={city.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {city.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {city.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenEditModal(city)}
                      className="mr-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(city.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </