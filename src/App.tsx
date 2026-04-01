import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PlaceholderPage } from './components/layout/PlaceholderPage';
import { HomePage } from './features/home/HomePage';
import { AboutPage } from './features/about/AboutPage';
import { TourPage } from './features/about/TourPage';
import { AcademicsPage } from './features/academics/AcademicsPage';
import { CourseCatalogPage } from './features/academics/CourseCatalogPage';
import { AdmissionsPage } from './features/admissions/AdmissionsPage';
import { ApplyPage } from './features/admissions/ApplyPage';
import { StudentLifePage } from './features/studentLife/StudentLifePage';
import { EventsPage } from './features/events/EventsPage';
import { StudentSupportPage } from './features/support/StudentSupportPage';
import { NewsPage } from './features/news/NewsPage';

// Admin Imports
import { AdminLayout } from './features/admin/AdminLayout';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { AdminNewsList } from './features/admin/AdminNewsList';

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
    <Router>
      <Routes>
        {/* ── Public Site Routes ── */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="student-life" element={<StudentLifePage />} />
          <Route path="student-support" element={<StudentSupportPage />} />
          
          {/* New dynamically generated missing pages */}
          <Route path="news" element={<NewsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="course-catalog" element={<CourseCatalogPage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="tour" element={<TourPage />} />
          <Route path="placeholder" element={<PlaceholderPage />} />
          
          {/* Catch-all to placeholder */}
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        {/* ── Admin Dashboard Routes ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<AdminNewsList />} />
          <Route path="*" element={
             <div className="p-8"><h2 className="text-2xl font-bold">Admin module coming soon</h2></div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
