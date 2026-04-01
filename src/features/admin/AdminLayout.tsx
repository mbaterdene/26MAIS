import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Calendar, BookOpen, Users, Settings, LogOut, Globe, User } from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'News & Articles', path: '/admin/news', icon: <Newspaper size={20} /> },
    { label: 'Events', path: '/admin/events', icon: <Calendar size={20} /> },
    { label: 'Course Catalog', path: '/admin/courses', icon: <BookOpen size={20} /> },
    { label: 'Admissions Data', path: '/admin/admissions', icon: <Users size={20} /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-10 flex flex-col">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
          <Link to="/admin" className="font-serif font-bold text-xl text-cardinal-red flex items-center gap-2 tracking-tight">
            Stanford OHS <span className="font-sans text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase tracking-wider">Admin</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cardinal-red/10 text-cardinal-red'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className={isActive ? 'text-cardinal-red' : 'text-gray-400'}>
                  {item.icon}
                </div>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ── Main Content Area ────────────────────────────────────────── */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-8">
          <div className="text-gray-500 font-medium text-sm">
            Content Management System
          </div>

          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              <Globe size={18} />
              View Live Site
            </Link>
            
            <div className="w-px h-6 bg-gray-200" />
            
            <div className="flex items-center gap-3 text-sm font-medium text-gray-800 cursor-default">
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                <User size={16} className="text-gray-500" />
              </div>
              Admin User
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-cardinal-red transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Views Wrapper */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
