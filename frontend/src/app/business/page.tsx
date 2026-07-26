import { useEffect, useState } from 'react';

type Stat = { label: string; value: number | string };
type Review = { id: string; author: string; rating: number; comment: string; date: string };

export default function BusinessPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      await new Promise(res => setTimeout(res, 500));
      setStats([
        { label: 'Total Sales', value: '$24,350' },
        { label: 'Active Customers', value: '1,234' },
        { label: 'Orders Today', value: '58' },
        { label: 'Conversion Rate', value: '3.2%' },
      ]);
      setReviews([
        { id: '1', author: 'Ali', rating: 5, comment: 'Excellent service!', date: '2025-08-20' },
        { id: '2', author: 'Sara', rating: 4, comment: 'Good product, fast delivery.', date: '2025-08-19' },
        { id: '3', author: 'Reza', rating: 5, comment: 'Will buy again.', date: '2025-08-18' },
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-medium">{review.author}</span>
                  <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-baseline mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
      </section>
    </div>
  );
}