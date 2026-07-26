'use client';

import { useEffect, useState } from 'react';

type Claim = {
  id: string;
  claimantName: string;
  amount: number;
  date: string; // ISO date string
  status: 'pending' | 'approved' | 'rejected';
};

type ClaimsResponse = Claim[];

export default function ClaimsPage() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch claims from the API
  useEffect(() => {
    async function loadClaims() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/claims');
        if (!res.ok) {
          throw new Error(`Failed to fetch claims: ${res.status}`);
        }
        const data: ClaimsResponse = await res.json();
        setClaims(data);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadClaims();
  }, []);

  // Update claim status (approve/reject)
  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`/api/admin/claims/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update claim: ${res.status}`);
      }

      // Optimistically update the UI
      setClaims((prev) =>
        prev.map((claim) =>
          claim.id === id ? { ...claim, status: newStatus } : claim
        )
      );
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Optionally revert optimistic update here
    }
  };

  if (loading) return <div className="p-4">Loading claims...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Claims Approval</h1>
      {claims.length === 0 ? (
        <p className="text-gray-500">No claims found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Claimant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount ($)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {claim.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {claim.claimantName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {claim.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(claim.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      claim.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : claim.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  }
</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {claim.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(claim.id, 'approved')}
                        className="mr-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(claim.id, 'rejected')}
                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500"> — </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}