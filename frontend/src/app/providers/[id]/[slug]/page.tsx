'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

// Types
interface Provider {
  id: string;
  name: string;
  description: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  // add other fields as needed
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Client component for tabs
function ProviderProfileTabs({ provider, reviews }: { provider: Provider; reviews: Review[] }) {
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{provider.name}</h1>
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('info')}
          className={`
            px-4 py-2 font-medium
            ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          Info
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`
            px-4 py-2 font-medium
            ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}
          `}
        >
          Reviews
        </button>
      </div>
      {activeTab === 'info' ? <InfoTab provider={provider} /> : <ReviewsTab reviews={reviews} />}
    </div>
  );
}

function InfoTab({ provider }: { provider: Provider }) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">{provider.description}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-gray-500">Specialty</p>
          <p className="text-lg">{provider.specialty}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Rating</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                {i < provider.rating ? '★' : '☆'}
              </span>
            ))}
            <span className="ml-2 text-gray-600"> ({provider.rating.toFixed(1)})</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Review Count</p>
          <p className="text-lg">{provider.reviewCount}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">{review.userName}</div>
            <div className="text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="mr-1">
                  {i < review.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

// Page component (Server Component)
export default async function Page({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const { id, slug } = params;

  // In a real app, you would validate that slug matches the provider's slug
  const [id: 
  try {
    const [providerRes, reviewsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/providers/${id}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/providers/${id}/reviews`),
    ]);

    if (!providerRes.ok) {
      if (providerRes.status === 404) notFound();
      throw new Error('Failed to fetch provider');
    }
    if (!reviewsRes.ok) {
      // If reviews fail, we can still show provider info with empty reviews
      console.warn('Failed to fetch reviews');
    }

    const provider: Provider = await providerRes.json();
    const reviews: Review[] = reviewsRes.ok ? await reviewsRes.json() : [];

    return <ProviderProfileTabs provider={provider} reviews={reviews} />;
  } catch (error) {
    console.error(error);
    // You could render an error UI; for simplicity, we throw to trigger Next.js error boundary
    throw error;
  }
}