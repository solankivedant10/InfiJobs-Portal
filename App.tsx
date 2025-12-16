import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AuthOverlay from './components/AuthOverlay';
import { BookmarkSyncIndicator } from './components/BookmarkSyncIndicator';

// Eager load only the Home page (initial route)
import { Home } from './pages/Home';

// Lazy load heavy components and routes
const CodingPage = lazy(() => import('./pages/CodingPage'));
const TutorialPortalHub = lazy(() => import('./features/tutorial-portal/TutorialPortalHub'));

// Lazy load ML Portal
const MLPortalLayout = lazy(() => import('./features/ml-portal/MLPortalLayout'));
const TopicView = lazy(() => import('./features/ml-portal/TopicView'));

// Lazy load DA Portal
const DAPortalLayout = lazy(() => import('./features/da-portal/DAPortalLayout'));
const DaTopicView = lazy(() => import('./features/da-portal/DaTopicView'));

// Lazy load BA Portal
const BAPortalLayout = lazy(() => import('./features/ba-portal/BAPortalLayout').then(m => ({ default: m.BAPortalLayout })));
const BaTopicView = lazy(() => import('./features/ba-portal/BAPortalLayout').then(m => ({ default: m.BaTopicView })));

// Lazy load DS Portal
const DSPortalLayout = lazy(() => import('./features/ds-portal/DSPortalLayout').then(m => ({ default: m.DSPortalLayout })));
const DsTopicView = lazy(() => import('./features/ds-portal/DSPortalLayout').then(m => ({ default: m.DsTopicView })));

// Lazy load DE Portal
const DEPortalLayout = lazy(() => import('./features/de-portal/DEPortalLayout').then(m => ({ default: m.DEPortalLayout })));
const DeTopicView = lazy(() => import('./features/de-portal/DEPortalLayout').then(m => ({ default: m.DeTopicView })));

// Lazy load BI Portal
const BIPortalLayout = lazy(() => import('./features/bi-portal/BIPortalLayout').then(m => ({ default: m.BIPortalLayout })));
const BiTopicView = lazy(() => import('./features/bi-portal/BIPortalLayout').then(m => ({ default: m.BiTopicView })));

// Lazy load SCA Portal
const SCAPortalLayout = lazy(() => import('./features/sca-portal/SCAPortalLayout').then(m => ({ default: m.SCAPortalLayout })));
const ScaTopicView = lazy(() => import('./features/sca-portal/SCAPortalLayout').then(m => ({ default: m.ScaTopicView })));

// Lazy load FE Portal
const FEPortalLayout = lazy(() => import('./features/fe-portal/FEPortalLayout').then(m => ({ default: m.FEPortalLayout })));
const FeTopicView = lazy(() => import('./features/fe-portal/FEPortalLayout').then(m => ({ default: m.FeTopicView })));

// Lazy load Java Portal
const JavaPortalLayout = lazy(() => import('./features/java-portal/JavaPortalLayout').then(m => ({ default: m.JavaPortalLayout })));
const JavaTopicView = lazy(() => import('./features/java-portal/JavaPortalLayout').then(m => ({ default: m.JavaTopicView })));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="text-center">
      <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 text-lg">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  const { user } = useAuth();

  // Simple "Login Wall" - keeps user on AuthOverlay until logged in
  if (!user) return <AuthOverlay />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<CodingPage />} />

        {/* Tutorial Portal Hub - Main entry point */}
        <Route path="/tutorials" element={<TutorialPortalHub />} />

        {/* ML Portal with nested routing */}
        <Route path="/ml-portal" element={<MLPortalLayout />}>
          <Route index element={<TopicView />} />
          <Route path=":topicId" element={<TopicView />} />
        </Route>

        {/* DA Portal with nested routing */}
        <Route path="/da-portal" element={<DAPortalLayout />}>
          <Route index element={<DaTopicView />} />
          <Route path=":topicId" element={<DaTopicView />} />
        </Route>

        {/* BA Portal (Business Analyst) with nested routing */}
        <Route path="/ba-portal" element={<BAPortalLayout />}>
          <Route index element={<BaTopicView />} />
          <Route path=":topicId" element={<BaTopicView />} />
        </Route>

        {/* DS Portal (Data Scientist) with nested routing */}
        <Route path="/ds-portal" element={<DSPortalLayout />}>
          <Route index element={<DsTopicView />} />
          <Route path=":topicId" element={<DsTopicView />} />
        </Route>

        {/* DE Portal (Data Engineering) with nested routing */}
        <Route path="/de-portal" element={<DEPortalLayout />}>
          <Route index element={<DeTopicView />} />
          <Route path=":topicId" element={<DeTopicView />} />
        </Route>

        {/* BI Portal (Business Intelligence) with nested routing */}
        <Route path="/bi-portal" element={<BIPortalLayout />}>
          <Route index element={<BiTopicView />} />
          <Route path=":topicId" element={<BiTopicView />} />
        </Route>

        {/* SCA Portal (Supply Chain Analyst) with nested routing */}
        <Route path="/sca-portal" element={<SCAPortalLayout />}>
          <Route index element={<ScaTopicView />} />
          <Route path=":topicId" element={<ScaTopicView />} />
        </Route>

        {/* FE Portal (Frontend Developer) with nested routing */}
        <Route path="/fe-portal" element={<FEPortalLayout />}>
          <Route index element={<FeTopicView />} />
          <Route path=":topicId" element={<FeTopicView />} />
        </Route>

        {/* Java Portal (Java Full Stack Developer) with nested routing */}
        <Route path="/java-portal" element={<JavaPortalLayout />}>
          <Route index element={<JavaTopicView />} />
          <Route path=":topicId" element={<JavaTopicView />} />
        </Route>

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
        {/* Bookmark Sync Indicator */}
        <BookmarkSyncIndicator />
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;