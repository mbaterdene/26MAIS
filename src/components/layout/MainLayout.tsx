import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { TopBar } from './TopBar';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
