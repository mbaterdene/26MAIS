import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './features/home/HomePage';
import { AboutPage } from './features/about/AboutPage';
import { AcademicsPage } from './features/academics/AcademicsPage';
import { PDQPage } from './features/academics/PDQPage';
import { AdmissionsPage } from './features/admissions/AdmissionsPage';
import { StudentLifePage } from './features/student-life/StudentLifePage';
import { StudentSupportPage } from './features/student-support/StudentSupportPage';
import { NewsPage } from './features/news/NewsPage';
import { NewsDetailPage } from './features/news/NewsDetailPage';
import { TeachersPage } from './features/teachers/TeachersPage';
import { FAQPage } from './features/contact/FAQPage';
import { ContactPage } from './features/contact/ContactPage';
import { ArchiveIndexPage } from './features/archive/ArchiveIndexPage';
import { ArchiveReaderPage } from './features/archive/ArchiveReaderPage';
import { NotFoundPage } from './features/errors/NotFoundPage';

// Admin Imports
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { AdminNewsList } from './features/admin/AdminNewsList';
import { NewsEditorPage } from './features/admin/NewsEditor';
import { ContentEditorPage } from './features/admin/ContentEditorPage';
import { AdminLogin } from './features/admin/AdminLogin';
import { AdminCloudConfig } from './features/admin/AdminCloudConfig';
import { AdminBrandColors } from './features/admin/AdminBrandColors';
import { AdminUsers } from './features/admin/AdminUsers';

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
              <Route element={<MainLayout />}>
                <Route index path="/" element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="academics" element={<AcademicsPage />} />
                <Route path="courses/pdq" element={<PDQPage />} />
                <Route path="admissions" element={<AdmissionsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="student-life/*" element={<StudentLifePage />} />
                <Route path="student-support" element={<StudentSupportPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/:slug" element={<NewsDetailPage />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="archive" element={<ArchiveIndexPage />} />
                <Route path="archive/:bookId" element={<ArchiveReaderPage />} />
              </Route>

              {/* ── Admin Routes ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="news" element={
                  <ProtectedRoute allowedRoles={['super_admin', 'news_editor', 'news_drafter']}>
                    <AdminNewsList />
                  </ProtectedRoute>
                } />
                <Route path="news/new" element={
                  <ProtectedRoute allowedRoles={['super_admin', 'news_editor', 'news_drafter']}>
                    <NewsEditorPage mode="create" />
                  </ProtectedRoute>
                } />
                <Route path="news/:id/edit" element={
                  <ProtectedRoute allowedRoles={['super_admin', 'news_editor', 'news_drafter']}>
                    <NewsEditorPage mode="edit" />
                  </ProtectedRoute>
                } />
                <Route path="content" element={
                  <ProtectedRoute allowedRoles={['super_admin', 'content_editor']}>
                    <ContentEditorPage />
                  </ProtectedRoute>
                } />
                <Route path="users" element={
                  <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                } />
                <Route path="clouds" element={
                  <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminCloudConfig />
                  </ProtectedRoute>
                } />
                <Route path="brand" element={
                  <ProtectedRoute allowedRoles={['super_admin']}>
                    <AdminBrandColors />
                  </ProtectedRoute>
                } />
                <Route path="*" element={
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
