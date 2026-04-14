import { LayoutDashboard, ClipboardList, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: ClipboardList, label: 'Attendance', path: '/attendance' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <h2 className="text-foreground">Attendance System</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
