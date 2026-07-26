import { notFound } from 'next/navigation';

type Pet = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
};

async function fetchPet(petCode: string): Promise<Pet | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${petCode}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { petCode: string } }) {
  const pet = await fetchPet(params.petCode);
  return {
    title: pet ? `${pet.name} - Pet Profile` : 'Pet Not Found',
    description: pet
      ? `${pet.breed} ${pet.species} named ${pet.name}`
      : 'Pet profile not found',
  };
}

export default async function PetPage({
  params,
}: {
  params: { petCode: string };
}) {
  const pet = await fetchPet(params.petCode);

  if (!pet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={pet.imageUrl}
            alt={`${pet.name} the ${pet.species}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{pet.name}</h1>
            <p className="text-gray-600 mb-4">
              {pet.breed} {pet.species} • {pet.age} years old
            </p>
            <p className="text-gray-800 mb-6">{pet.description}</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}