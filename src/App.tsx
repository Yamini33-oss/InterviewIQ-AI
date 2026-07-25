import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PageTransition from './components/PageTransition';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewSetupPage from './pages/InterviewSetupPage';
import InterviewPage from './pages/InterviewPage';
import ResultPage from './pages/ResultPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
          <Route
  path="/setup"
  element={
    <ProtectedRoute>
      <InterviewSetupPage />
    </ProtectedRoute>
  }
/>
          <Route
  path="/interview"
  element={
    <ProtectedRoute>
      <InterviewPage />
    </ProtectedRoute>
  }
/>
          <Route
  path="/result"
  element={
    <ProtectedRoute>
      <ResultPage />
    </ProtectedRoute>
  }
/>
          <Route path="/about" element={<AboutPage />} />
          <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </BrowserRouter>
  );
}
