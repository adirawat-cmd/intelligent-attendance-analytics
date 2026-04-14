import { Navbar } from '../../components/Navbar';
import { DashboardCard } from '../../components/DashboardCard';
import { Users, BookOpen, ClipboardCheck, Activity } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Admin Dashboard" userName="Administrator" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-foreground mb-2">System Overview</h2>
            <p className="text-muted-foreground">
              Monitor and manage the Intelligent Attendance System
            </p>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Users"
              value="156"
              icon={Users}
              iconColor="text-blue-600"
              description="125 Students, 31 Faculty"
            />
            <DashboardCard
              title="Active Courses"
              value="24"
              icon={BookOpen}
              iconColor="text-green-600"
              description="This semester"
            />
            <DashboardCard
              title="Attendance Records"
              value="3,245"
              icon={ClipboardCheck}
              iconColor="text-purple-600"
              description="This month"
            />
            <DashboardCard
              title="System Status"
              value="Active"
              icon={Activity}
              iconColor="text-green-600"
              description="All services running"
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New user registered', user: 'student@example.com', time: '5 minutes ago' },
                { action: 'Course created', user: 'Dr. Sarah Johnson', time: '1 hour ago' },
                { action: 'Attendance recorded', user: 'CS101 - Computer Science', time: '2 hours ago' },
                { action: 'User role updated', user: 'admin@example.com', time: '3 hours ago' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-accent rounded-lg"
                >
                  <div>
                    <p className="text-foreground">{item.action}</p>
                    <p className="text-muted-foreground text-sm">{item.user}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
