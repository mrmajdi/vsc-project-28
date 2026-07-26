import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex h-screen bg-gray-50">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              <span>داشبورد</span>
            </Link>
            <Link href="/admin/users" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              <span>کاربران</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
              <span>تنظیمات</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <header className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">پنل مدیریت</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">سلام، admin</span>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">خروج</button>
            </div>
          </header>
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}