'use client';

import { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category?: string;
  rating?: number;
};

const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/providers', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch providers');
        const data: Provider[] = await res.json();
        setProviders(data);
        setFilteredProviders(data); // initially show all
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
        setProviders([]);
        setFilteredProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Re-filter when search term or category changes
  useEffect(() => {
    const results = providers.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === null || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProviders(results);
  }, [providers, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600">
        <p className="text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Providers</h1>
      </header>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory ?? ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {/* Dynamically generate categories from providers */}
          {[
            ...new Set(
              providers
                .map((p) => p.category)
                .filter((c): c is string => !!c)
            ),
          ].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setView('grid')}
          className={`px-4 py-2 rounded-md font-medium ${
            view === 'grid'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setView('map')}
          className={`px-4 py-2 rounded-md font-medium ${
            view === 'map'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Map View
        </button>
      </div>

      {/* Content */}
      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No providers match the filters.
            </p>
          ) : (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {provider.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {provider.address}
                  </p>
                  {provider.category && (
                    <span
                      className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gray-100 rounded-full"
                    >
                      {provider.category}
                    </span>
                  )}
                  {provider.rating !== undefined && (
                    <div className="mt-2 flex items-center text-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-yellow-400 ${
                            star <= provider.rating ? '' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="ml-1 text-gray-600">
                        ({provider.rating.toFixed(1)})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (