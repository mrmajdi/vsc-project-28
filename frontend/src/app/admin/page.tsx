import { useEffect, useState } from 'react';

type KPI = {
  title: string;
  value: string | number;
  icon: React.FC<{ className?: string }>;
  bgColor: string;
};

type Activity = {
  id: number;
  action: string;
  user: string;
  time: string;
  status: 'success' | 'pending' | 'error';
};

const AdminDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockKpis: KPI[] = [
        {
          title: 'Total Users',
          value: 2458,
          icon: UsersIcon,
          bgColor: 'bg-blue-100 text-blue-600',
        },
        {
          title: 'Total Sales',
          value: '$124,580',
          icon: ShoppingCartIcon,
          bgColor: 'bg-green-100 text-green-600',
        },
        {
          title: 'Active Orders',
          value: 132,
          icon: ClipboardIcon,
          bgColor: 'bg-purple-100 text-purple-600',
        },
        {
          title: 'Revenue',
          value: '$89,420',
          icon: TrendingUpIcon,
          bgColor: 'bg-amber-100 text-amber-600',
        },
      ];

      const mockActivities: Activity[] = [
        {
          id: 1,
          action: 'New User Signup',
          user: 'alice@example.com',
          time: '2 min ago',
          status: 'success',
        },
        {
          id: 2,
          action: 'Order Placed',
          user: 'bob@example.com',
          time: '5 min ago',
          status: 'success',
        },
        {
          id: 3,
          action: 'Payment Failed',
          user: 'charlie@example.com',
          time: '12 min ago',
          status: 'error',
        },
        {
          id: 4,
          action: 'Product Updated',
          user: 'diana@example.com',
          time: '20 min ago',
          status: 'pending',
        },
        {
          id: 5,
          action: 'Inventory Restocked',
          user: 'eve@example.com',
          time: '35 min ago',
          status: 'success',
        },
      ];

      setKpis(mockKpis);
      setActivities(mockActivities);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-4">Loading dashboard...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600">Overview of key metrics and recent activity</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className={`bg-white rounded-lg shadow flex items-center p-4 transition-transform hover:-translate-y-1 ${kpi.bgColor}`}
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-opacity-20">
              <kpi.icon className={`h-5 w-5 text-${kpi.bgColor.split(' ')[0].replace('bg-', '')}-600`} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Table */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Simple placeholder icons using SVG (Heroicons style)
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v