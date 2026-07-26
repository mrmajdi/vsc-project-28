import React from 'react';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Users" value="1,234" icon={<UsersIcon />} />
        <StatCard title="Active Sessions" value="567" icon={<ActivityIcon />} />
        <StatCard title="Revenue" value="$12,340" icon={<TrendingUpIcon />} />
      </div>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">No recent activity yet.</p>
      </section>
    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow flex items-center p-4">
      <div className="p-3 bg-indigo-100 rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-indigo-600">{value}</p>
      </div>
    </div>
  );
}

// Simple placeholder icons (could be replaced with actual icon library)
function UsersIcon() {
  return (
    <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 4a4 4 0 100 8 4 4 0 000-8zM0 2a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V2z" clipRule="evenodd" />
    </svg>
  );
}
function ActivityIcon() {
  return (
    <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
    </svg>
  );
}
function TrendingUpIcon() {
  return (