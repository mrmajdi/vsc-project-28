'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

export default function EditProviderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProvider() {
      try {
        setLoading(true);
        const res = await fetch(`/api/providers/${id}`);
        if (!res.ok) throw new Error('Failed to fetch provider');
        const data = await res.json();
        setProvider(data);
      } catch (err: any) {
        setError(err.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProvider();
    }
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!provider) return <div className="p-6">Provider not found.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string | undefined,
        address: formData.get('address') as string | undefined,
      };
      const res = await fetch(`/api/providers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });