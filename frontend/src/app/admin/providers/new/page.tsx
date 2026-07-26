import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ProviderFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  taxId?: string;
};

export default function NewProviderPage() {
  const router = useRouter();
  const [values, setValues] = useState<ProviderFormValues>({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    taxId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();