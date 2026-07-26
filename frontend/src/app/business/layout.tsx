import React from 'react';

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Business Panel</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/business/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/business/profile" className="hover:underline">
                Profile
              </a>
            </li>
            <li>
              <a href="/business/settings" className="hover:underline">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}