import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="space-y-2">
        <Link href="/" className="block px-3 py-2 rounded-md hover:bg-gray-700">
          Dashboard
        </Link>
        <Link href="/analytics" className="block px-3 py-2 rounded-md hover:bg-gray-700">
          Analytics
        </Link>
        <Link href="/reports" className="block px-3 py-2 rounded-md hover:bg-gray-700">
          Reports
        </Link>
        <Link href="/settings" className="block px-3 py-2 rounded-md hover:bg-gray-700">
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}