import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import SecurityDashboard from '../pages/SecurityDashboard';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  if (!user) return <Routes><Route path="*" element={<Login />} /></Routes>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${user.role}`} />} />
      {user.role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
      {user.role === 'security' && <Route path="/security" element={<SecurityDashboard />} />}
      <Route path="*" element={<Navigate to={`/${user.role}`} />} />
    </Routes>
  );
}