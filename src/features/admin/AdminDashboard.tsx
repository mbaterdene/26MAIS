import { useEffect, useState } from 'react';
import { Users, BookOpen, FileText, Newspaper } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

interface OverviewData {
  totalViews: number;
  totalArticles: number;
  publishedArticles: number;
  pendingArticles: number;
  draftArticles: number;
}

export function AdminDashboard() {
  const { token } = useAuth();
  const [overview, setOverview] = useState<OverviewData | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${BACKEND_URL}/api/analytics/overview`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setOverview)
      .catch(() => {});
  }, [token]);

  const metrics = [
    { label: 'Total Articles', value: overview?.totalArticles?.toString() ?? '—', icon: <FileText size={24} />, bgColor: 'bg-digital-blue', txColor: 'text-digital-blue' },
    { label: 'Published', value: overview?.publishedArticles?.toString() ?? '—', icon: <Newspaper size={24} />, bgColor: 'bg-green-500', txColor: 'text-green-500' },
    { label: 'Pending', value: overview?.pendingArticles?.toString() ?? '—', icon: <BookOpen size={24} />, bgColor: 'bg-orange-500', txColor: 'text-orange-500' },
    { label: 'Drafts', value: overview?.draftArticles?.toString() ?? '—', icon: <Users size={24} />, bgColor: 'bg-purple-600', txColor: 'text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is a summary of your site's activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:border-gray-300 transition-colors">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-opacity-10 ${metric.bgColor} ${metric.txColor}`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{metric.label}</p>
              <h3 className="text-3xl font-bold font-sans text-gray-900 mt-1">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
