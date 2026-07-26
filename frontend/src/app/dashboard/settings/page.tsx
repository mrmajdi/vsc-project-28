import { useEffect, useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);

  const [profileSubmitLoading, setProfileSubmitLoading] = useState(false);
  const [profileSubmitError, setProfileSubmitError] = useState<string | null>(null);
  const [profileSubmitSuccess, setProfileSubmitSuccess] = useState<boolean>(false);

  // Fetch user profile on mount
  useEffect(() => {
    async function fetchProfile() {
      setProfileLoading(true);
      setProfileError(null);
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data: UserProfile = await res.json();
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio ?? '');
      } catch (err: any) {
        setProfileError(err.message ?? 'An error occurred');
      } finally {
        setProfileLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSubmitLoading(true);
    setProfileSubmitError(null);
    setProfileSubmitSuccess(false);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, bio }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message ?? 'Failed to update profile');
      }
      setProfileSubmitSuccess(true);
      // Optionally update profile state
      setProfile((prev) => (prev ? { ...prev, name, email, bio } : prev));
    } catch (err: any) {
      setProfileSubmitError(err.message ?? 'An error occurred');
    } finally {
      setProfileSubmitLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      setPasswordLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message ?? 'Failed to update password');
      }
      setPasswordSuccess(true);
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordError(err.message ?? 'An error occurred');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (profileLoading) return <p>Loading...</p>;
  if (profileError) return <p>Error: {profileError}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>

      {/* Profile Form */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        {profileSubmitSuccess && (
          <p className="mb-4 text-green-600">Profile updated successfully!</p>
        )}
        {profileSubmitError && (
          <p className="mb-4 text-red-600">Error: {profileSubmitError}</p>
        )}
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={profileSubmitLoading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={profileSubmitLoading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio (optional)
            </label>
            <textarea
              id="bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={profileSubmitLoading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={profileSubmitLoading}
            className="w-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {profileSubmitLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </section>

      {/* Password Form */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        {passwordSuccess && (
          <p className="mb-4 text-green-600">Password changed successfully!</p>
        )}
        {passwordError && (
          <p className="mb-4 text-red-600">Error: {passwordError}</p>
        )}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={passwordLoading}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="newPassword