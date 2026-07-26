'use client';

import { useEffect, useState } from 'react';

type Review = {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data: Review[] = await res.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to update review');
      const updated = await res.json();
      setReviews(prev =>
        prev.map(r => (r.id === id ? { ...r, ...updated } : r))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update review');
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete review');
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete review');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <div className="flex h-[calc(100vh-64px)] items-center justify-center">Loading...</div>;
  if (error) return <div className="p-4 bg-red-50 text-red-600 rounded">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews Moderation</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map(review => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.userName} ({review.userId})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.productName} ({review.productId})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {review.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-words max-w-[200px]">
                    {review.comment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        review.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : review.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => updateReviewStatus(review.id, 'approved')}
                      className={`mr-2 px-3 py-1 text-xs font-medium ${
                        review.status === 'approved'
                          ? 'bg-green-600 hover:bg-green-700 text-white disabled:opacity-50'
                          : 'bg-green-50 hover:bg-green-100 text-green-800'
                      } rounded`}
                      disabled={review.status === 'approved'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateReviewStatus(review.id, 'rejected')}
                      className={`mr-2 px-3 py-1 text-xs font-medium ${
                        review.status === 'rejected'
                          ? 'bg-red-600 hover:bg-red-700 text-white disabled:opacity-50'
                          : 'bg-red-50 hover:bg-red-100 text-red-800'
                      } rounded`}
                      disabled={review.status === 'rejected'}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="px-3 py-1 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-800 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))