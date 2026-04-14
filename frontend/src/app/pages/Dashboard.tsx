import { Navbar } from '../components/Navbar';
import { DashboardCard } from '../components/DashboardCard';
import { BookOpen, Calendar } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Faculty Panel" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here's what's happening with your classes today.
            </p>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Total Courses"
              value="6"
              icon={BookOpen}
              iconColor="text-green-600"
              description="Active this semester"
            />
            <DashboardCard
              title="Classes Today"
              value="3"
              icon={Calendar}
              iconColor="text-blue-600"
              description="9:00 AM - 4:00 PM"
            />
          </div>

          {/* Additional Content Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { class: 'Computer Science 101', time: '9:00 AM', attendance: '45/50' },
                { class: 'Data Structures', time: '11:00 AM', attendance: '38/42' },
                { class: 'Algorithms', time: '2:00 PM', attendance: 'Upcoming' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-accent rounded-lg"
                >
                  <div>
                    <p className="text-foreground">{item.class}</p>
                    <p className="text-muted-foreground text-sm">{item.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">Attendance</p>
                    <p className="text-foreground">{item.attendance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
