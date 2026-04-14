import { Outlet } from 'react-router';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminLayout() {
  return (
    <div className="size-full flex bg-background dark">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
