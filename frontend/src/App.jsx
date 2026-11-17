import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '././context/AuthContext';

//public
import Login from './pages/Login';

//shared
import Profile from './pages/shared/Profile';
import SharedHome from './pages/shared/Home';
import Calendar from './pages/shared/Calendar';
import Archive from './pages/shared/Archive';

//coach pages
import CoachedPlayers from './pages/coach/CoachedPlayers';

//admin pages
import AdminHome from './pages/admin/Home';
import UsersPage from './pages/admin/UsersPage';
import Transfers from './pages/admin/Transfers';


const RoleHomes = {
  admin: '/admin/home',
  coach: '/coach/home',
  player: '/player/home',
};

function ProtectedRoute({ allowedRoles, children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const fallback = RoleHomes[currentUser.role] || '/login';
    return <Navigate to={fallback} replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-(--bg-page) text-(--text-main)">
          <Routes>
            {/*public*/}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            {/*player*/}
            <Route
              path="/player/home"
              element={
                <ProtectedRoute allowedRoles={['player']}>
                  <SharedHome role="player" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/calendar"
              element={
                <ProtectedRoute allowedRoles={['player']}>
                  <Calendar role="player" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/player/profile"
              element={
                <ProtectedRoute allowedRoles={['player']}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/*coach*/}
            <Route
              path="/coach/home"
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <SharedHome role="coach" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/calendar"
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <Calendar role="coach" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/archive"
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <Archive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/players"
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <CoachedPlayers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach/profile"
              element={
                <ProtectedRoute allowedRoles={['coach']}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/*admin*/}
            <Route
              path="/admin/home"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/transfers"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Transfers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/archive"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Archive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}