import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchBusinessStats } from '@/lib/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default async function BusinessStatsPage() {
  const stats = await fetchBusinessStats();

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Business Statistics</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <Bar
          data={{
            labels: stats.labels,
            datasets: [
              {
                label: 'Revenue',
                data: stats.data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Monthly Revenue' },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </section>
  );
}