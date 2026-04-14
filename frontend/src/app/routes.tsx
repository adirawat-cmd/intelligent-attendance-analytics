import { createBrowserRouter, Navigate } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Analytics } from './pages/Analytics';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { CourseManagement } from './pages/admin/CourseManagement';
import { Settings } from './pages/admin/Settings';
import { DashboardLayout } from './layout/DashboardLayout';
import { AdminLayout } from './layout/AdminLayout';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  try {
    const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/student',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <ProtectedRoute allowedRoles={['faculty']}><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'attendance',
        element: <Attendance />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'courses',
        element: <CourseManagement />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);