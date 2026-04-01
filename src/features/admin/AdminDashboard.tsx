import { Users, BookOpen, FileText, Newspaper } from 'lucide-react';

const metrics = [
  { label: 'Total Students', value: '1,248', icon: <Users size={24} />, bgColor: 'bg-digital-blue', txColor: 'text-digital-blue' },
  { label: 'Active Courses', value: '54', icon: <BookOpen size={24} />, bgColor: 'bg-purple-600', txColor: 'text-purple-600' },
  { label: 'Pending Apps', value: '312', icon: <FileText size={24} />, bgColor: 'bg-orange-500', txColor: 'text-orange-500' },
  { label: 'Published News', value: '87', icon: <Newspaper size={24} />, bgColor: 'bg-green-500', txColor: 'text-green-500' },
];

const recentActivities = [
  { id: 1, action: 'Published New Article', subject: 'Robotics Team Regional Win', time: '2 hours ago', user: 'Admin User' },
  { id: 2, action: 'Updated Course', subject: 'Multivariable Calculus 101', time: '5 hours ago', user: 'Admin User' },
  { id: 3, action: 'Reviewed Application', subject: 'App ID #89204', time: '1 day ago', user: 'Admissions Staff' },
  { id: 4, action: 'Changed Setting', subject: 'Global Site Banner', time: '2 days ago', user: 'System Admin' },
  { id: 5, action: 'Added New Staff', subject: 'Dr. Jane Smith', time: '3 days ago', user: 'HR Coordinator' },
];

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is a summary of your site's activity.</p>
      </div>

      {/* Metric Cards */}
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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mock Chart / Activity List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm font-medium text-cardinal-red hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-gray-300 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold">{activity.user}</span> {activity.action.toLowerCase()}: <span className="font-semibold text-black">{activity.subject}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Site Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Database</span>
              <span className="text-sm font-semibold text-gray-900">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Last Backup</span>
              <span className="text-sm font-semibold text-gray-900">Today, 02:00 AM</span>
            </div>
          </div>

          <hr className="my-6 border-gray-100" />

          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Create New Article
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Approve Admissions Batch
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Update Site Banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
