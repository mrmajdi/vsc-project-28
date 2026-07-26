import { useState, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewPetPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      color: '',
      microchipNumber: '',
      vaccinated: false,
      neutered: false,
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to create pet');
      }

      // Optionally refetch or show success
      alert('Pet created successfully!');
      router.push('/dashboard/pets');
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Pet</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name
              </label>
              <input
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md ${
                  errors.name ? 'border-red-500' : ''
                }`}
                placeholder="Enter pet name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
                  Species
                </label>
                <select
                  id="species"
                  {...register('species', { required: 'Species is required' })}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md ${
                    errors.species ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select species</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
                {errors.species && (
                  <p className="mt-1 text-sm text-red-600">{errors.species.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
                  Breed
                </label>
                <input
                  id="breed"
                  {...register('breed')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                  placeholder="Enter breed (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years)
                </label>
                <input
                  id="age"
                  type="number"
                  min="0"
                  {...register('age', {
                    validate: (value) =>
                      value === '' || Number(value) >= 0 || 'Age must be a positive number',
                  })}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md ${
                    errors.age ? 'border-red-500' : ''
                  }`}
                  placeholder="Age"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  {...register('weight', {
                    validate: (value) =>
                      value === '' || parseFloat(value) >= 0 || 'Weight must be positive',
                  })}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md ${
                    errors.weight ? 'border-red-500' : ''
                  }`}
                  placeholder="Weight"
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  id="color"
                  {...register('color')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
                  placeholder="Color"
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-start h-4">
                <input
                  id="vaccinated"
                  {...register('vaccinated')}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 mt-0.5">
                <label htmlFor="vaccinated" className="block text-sm font-medium text-gray-900">
                  Vaccinated
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-start h-4">
                <input
                  id="neutered"
                  {...register('neutered')}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 mt-0.5">
                <label htmlFor="neutered" className="block text-sm font-medium text