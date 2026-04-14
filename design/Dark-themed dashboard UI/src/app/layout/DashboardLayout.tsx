import { Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';

export function DashboardLayout() {
  return (
    <div className="size-full flex bg-background dark">
      <Sidebar />
      <Outlet />
    </div>
  );
}
