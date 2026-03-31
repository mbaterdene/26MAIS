import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './features/home/HomePage';
import { AboutPage } from './features/about/AboutPage';
import { AcademicsPage } from './features/academics/AcademicsPage';
import { AdmissionsPage } from './features/admissions/AdmissionsPage';
import { StudentLifePage } from './features/student-life/StudentLifePage';
import { StudentSupportPage } from './features/student-support/StudentSupportPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/about"           element={<AboutPage />} />
          <Route path="/academics"       element={<AcademicsPage />} />
          <Route path="/admissions"      element={<AdmissionsPage />} />
          <Route path="/student-life"    element={<StudentLifePage />} />
          <Route path="/student-support" element={<StudentSupportPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
