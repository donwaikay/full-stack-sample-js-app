import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Browse from './pages/Browse';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div className="loading-screen">Loading…</div>;

  return (
    <>
      <Navbar user={user} onLogout={() => logout.mutate(undefined, { onSuccess: () => navigate('/') })} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/browse" replace /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/browse" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/browse" replace /> : <Signup />} />
        <Route path="/browse" element={user ? <Browse user={user} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
