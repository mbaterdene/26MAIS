import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, LogOut, BarChart2, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'News', href: '/admin/news', icon: <Newspaper size={18} /> },
  { label: 'Content', href: '/admin/content', icon: <FileText size={18} /> },
  { label: 'Users', href: '/admin/users', icon: <Users size={18} /> },
  { label: 'Analytics', href: '/admin/analytics', icon: <BarChart2 size={18} /> },
];

export function AdminLayout() {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="text-cardinal-red font-serif font-bold text-xl">MAIS</Link>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cardinal-red/10 text-cardinal-red'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-cardinal-red/10 flex items-center justify-center text-cardinal-red text-xs font-bold">
              {admin?.displayName?.charAt(0) ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{admin?.displayName ?? 'Admin'}</p>
              <p className="text-xs text-gray-400 capitalize">{admin?.role?.replace('_', ' ') ?? ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-cardinal-red hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
