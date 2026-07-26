import { useState, useEffect, useCallback } from 'react';
import * as Fi from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const ICONS = Object.keys(Fi)
  .filter(key => typeof Fi[key as keyof typeof Fi] === 'function')
  .map(key => ({ name: key, Component: Fi[key as keyof typeof Fi] }));

type Category = {
  id: string;
  name: string;
  icon: string; // icon name from ICONS
};

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create category
  const createCategory = async (name: string, icon: string) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon }),
      });
      if (!res.ok) throw new Error('Failed to create category');
      await fetchCategories();
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    }
  };

  // Update category
  const updateCategory = async (id: string, name: string, icon: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon }),
      });
      if (!res.ok) throw new Error('Failed to update category');
      await fetchCategories();
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    }
  };

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete category');
      await fetchCategories();
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setDeletingId(null);
    }
  };

  // Open form for create
  const handleCreate = () => {
    setEditId(null);
    setFormName('');
    setSelectedIcon(null);
    setShowForm(true);
  };

  // Open form for edit
  const handleEdit = (category: Category) => {
    setEditId(category.id);
    setFormName(category.name);
    setSelectedIcon(category.icon);
    setShowForm(true);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormName('');
    setSelectedIcon(null);
    setShowIconPicker(false);
  };

  // Handle icon selection
  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    setShowIconPicker(false);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !selectedIcon) return;
    if (editId) {
      await updateCategory(editId, formName, selectedIcon);
    } else {
      await createCategory(formName, selectedIcon);
    }
    handleCloseForm();
  };

  // Handle delete confirm
  const handleDeleteConfirm = (id: string) => {
    setDeletingId(id);
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
  };

  const handleDelete = async () => {
    if (deletingId) await deleteCategory(deletingId);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <div className="flex h-[calc(100vh-4rem)] items-center justify-center">Loading...</div>;
  if (error) return <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">{error}</div>;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-gray-50">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2