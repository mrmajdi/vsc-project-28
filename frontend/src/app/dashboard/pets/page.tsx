import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Pet {
  id: string;
  name: string;
  type: string;
  age: number;
}

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPets() {
      try {
        setLoading(true);
        const res = await fetch('/api/pets', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch pets: ${res.status}`);
        }
        const data: Pet[] = await res.json();
        setPets(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  if (loading) return <div className="flex min-h-[20rem] items-center justify-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <Link href="/dashboard/pets/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Add New Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <p className="text-gray-500">You haven't added any pets yet.</p>
      ) : (
        <div className="space-y-4">
          {pets.map((pet) => (
            <Link key={pet.id} href={`/dashboard/pets/${pet.id}`} className="block">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold">{pet.name}</h2>
                    <p className="text-sm text-gray-600">{pet.type} • {pet.age} year{pet.age !== 1 ? 's' : ''} old</p>
                  </div>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">{pet.type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}