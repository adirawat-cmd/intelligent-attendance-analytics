import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

interface NavbarProps {
  title: string;
  userName?: string;
}

export function Navbar({ title, userName = 'Dr. Sarah Johnson' }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-foreground">{title}</h1>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-accent rounded-lg">
            <div className="size-8 bg-green-600 rounded-full flex items-center justify-center">
              <User className="size-4 text-white" />
            </div>
            <span className="text-foreground">{userName}</span>
          </div>
          
          <button 
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Logout"
            onClick={handleLogout}
          >
            <LogOut className="size-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
