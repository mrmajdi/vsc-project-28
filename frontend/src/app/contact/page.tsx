import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setStatus('success');
      // reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px