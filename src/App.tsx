import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './features/home/HomePage';
import { AboutPage } from './features/about/AboutPage';
import { AcademicsPage } from './features/academics/AcademicsPage';
import { PDQPage } from './features/academics/PDQPage';
import { AdmissionsPage } from './features/admissions/AdmissionsPage';
import { StudentLifePage } from './features/student-life/StudentLifePage';
import { ClubsPage } from './features/student-life/ClubsPage';
import { DOFEPage } from './features/student-life/DOFEPage';
import { StudentSupportPage } from './features/student-support/StudentSupportPage';
import { NewsPage } from './features/news/NewsPage';
import { NewsDetailPage } from './features/news/NewsDetailPage';
import { EventsPage } from './features/events/EventsPage';
import { TeachersPage } from './features/teachers/TeachersPage';
import { NotFoundPage } from './features/errors/NotFoundPage';

// Admin Imports
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { AdminNewsList } from './features/admin/AdminNewsList';
import { NewsEditorPage } from './features/admin/NewsEditor';
import { ContentEditorPage } from './features/admin/ContentEditorPage';
import { AdminLogin } from './features/admin/AdminLogin';

// Providers
import { QueryProvider } from './context/QueryProvider';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Layout wrapper for public pages
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* ── Public Site Routes ── */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="academics" element={<AcademicsPage />} />
                <Route path="courses/pdq" element={<PDQPage />} />
                <Route path="admissions" element={<AdmissionsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="student-life" element={<StudentLifePage />} />
                <Route path="clubs" element={<ClubsPage />} />
                <Route path="dofe" element={<DOFEPage />} />
                <Route path="student-support" element={<StudentSupportPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:slug" element={<NewsDetailPage />} />
                <Route path="events" element={<EventsPage />} />
              </Route>

              {/* ── Admin Routes ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="news" element={<AdminNewsList />} />
                <Route path="news/new" element={<NewsEditorPage mode="create" />} />
                <Route path="news/:id/edit" element={<NewsEditorPage mode="edit" />} />                <Route path="content" element={<ContentEditorPage />} />                <Route path="*" element={
                  <div className="p-8"><h2 className="text-2xl font-bold">Module coming soon</h2></div>
                } />
              </Route>

              {/* ── 404 Page ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryProvider>
  );
}

export default App;
