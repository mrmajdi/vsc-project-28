import { useState, useEffect } from 'react';

type Favorite = {
  id: string;
  title: string;
  // optional: imageUrl?: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const res = await fetch('/api/favorites', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data: Favorite[] = await res.json();
        setFavorites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      const res = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to remove favorite');
      // Optimistically remove from state
      setFavorites(prev => prev.filter(fav => fav.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Optionally revert optimistic update
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[20vh]">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favorite Items</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map(fav => (
            <li key={fav.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
              <div>
                <h2 className="font-medium">{fav.title}</h2>
                {/* Optional: <img src={fav.imageUrl} alt={fav.title} className="mt-2 h-16 w-auto rounded" /> */}
              </div>
              <button
                onClick={() => handleRemove(fav.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                aria-label={`Remove ${fav.title} from favorites`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}