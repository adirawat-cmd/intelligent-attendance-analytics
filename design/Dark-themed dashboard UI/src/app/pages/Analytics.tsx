import { Navbar } from '../components/Navbar';
import { DashboardCard } from '../components/DashboardCard';
import { TrendingUp, TrendingDown, Users, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// Mock data for attendance trends
const attendanceTrendData = [
  { week: 'Week 1', attendance: 92, target: 85 },
  { week: 'Week 2', attendance: 88, target: 85 },
  { week: 'Week 3', attendance: 95, target: 85 },
  { week: 'Week 4', attendance: 87, target: 85 },
  { week: 'Week 5', attendance: 91, target: 85 },
  { week: 'Week 6', attendance: 89, target: 85 },
  { week: 'Week 7', attendance: 93, target: 85 },
];

const courseAttendanceData = [
  { course: 'CS101', attendance: 92 },
  { course: 'CS201', attendance: 88 },
  { course: 'CS301', attendance: 95 },
  { course: 'CS202', attendance: 82 },
  { course: 'CS302', attendance: 90 },
];

const lowAttendanceStudents = [
  { name: 'Charlie Brown', rollNumber: '2021003', attendance: 65, status: 'critical' },
  { name: 'Fiona Gallagher', rollNumber: '2021006', attendance: 72, status: 'warning' },
  { name: 'Mike Ross', rollNumber: '2021012', attendance: 78, status: 'warning' },
  { name: 'Rachel Green', rollNumber: '2021018', attendance: 68, status: 'critical' },
];

export function Analytics() {
  const averageAttendance = 90.5;
  const totalStudents = 120;
  const lowAttendanceCount = lowAttendanceStudents.length;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Analytics & Reports" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <h2 className="text-foreground mb-2">Attendance Analytics</h2>
            <p className="text-muted-foreground">
              Comprehensive insights into attendance patterns and trends
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Average Attendance"
              value={`${averageAttendance}%`}
              icon={TrendingUp}
              iconColor="text-green-600"
              description="Overall semester average"
            />
            <DashboardCard
              title="Total Students"
              value={totalStudents}
              icon={Users}
              iconColor="text-blue-600"
              description="Across all courses"
            />
            <DashboardCard
              title="Low Attendance"
              value={lowAttendanceCount}
              icon={AlertCircle}
              iconColor="text-red-600"
              description="Below 80% threshold"
            />
            <DashboardCard
              title="Attendance Trend"
              value="+2.5%"
              icon={TrendingUp}
              iconColor="text-green-600"
              description="vs last month"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Attendance Trend */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground mb-4">Weekly Attendance Trend</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Attendance percentage over the past 7 weeks
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#888"
                    tick={{ fill: '#888' }}
                  />
                  <YAxis 
                    stroke="#888"
                    tick={{ fill: '#888' }}
                    domain={[70, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#888' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    name="Attendance %"
                    dot={{ fill: '#16a34a', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#888" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target %"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Course-wise Attendance */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-foreground mb-4">Course-wise Attendance</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Average attendance across different courses
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="course" 
                    stroke="#888"
                    tick={{ fill: '#888' }}
                  />
                  <YAxis 
                    stroke="#888"
                    tick={{ fill: '#888' }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="attendance" 
                    fill="#16a34a" 
                    radius={[8, 8, 0, 0]}
                    name="Attendance %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low Attendance Students */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="size-5 text-red-600" />
              <h3 className="text-foreground">Students with Low Attendance</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Students requiring immediate attention (below 80% attendance)
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-4 text-left text-foreground">Roll Number</th>
                    <th className="px-6 py-4 text-left text-foreground">Student Name</th>
                    <th className="px-6 py-4 text-center text-foreground">Attendance %</th>
                    <th className="px-6 py-4 text-center text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowAttendanceStudents.map((student, index) => (
                    <tr 
                      key={student.rollNumber}
                      className={`border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                        index % 2 === 0 ? 'bg-background/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-muted-foreground">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-medium ${
                          student.attendance < 70 ? 'text-red-600' : 'text-orange-500'
                        }`}>
                          {student.attendance}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                          student.status === 'critical' 
                            ? 'bg-red-600/20 text-red-500' 
                            : 'bg-orange-500/20 text-orange-500'
                        }`}>
                          <TrendingDown className="size-3" />
                          {student.status === 'critical' ? 'Critical' : 'Warning'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="size-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-green-600 mb-1">Positive Trend</h4>
                    <p className="text-muted-foreground text-sm">
                      Overall attendance has improved by 2.5% compared to last month, showing positive student engagement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="text-red-600 mb-1">Action Required</h4>
                    <p className="text-muted-foreground text-sm">
                      {lowAttendanceCount} students are below the 80% attendance threshold and may need counseling.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Users className="size-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-blue-600 mb-1">Best Performing Course</h4>
                    <p className="text-muted-foreground text-sm">
                      CS301 (Algorithms) has the highest average attendance at 95%, setting a benchmark for other courses.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-600/10 border border-orange-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingDown className="size-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="text-orange-600 mb-1">Needs Attention</h4>
                    <p className="text-muted-foreground text-sm">
                      CS202 (Database Systems) shows lower attendance at 82%. Consider reviewing class timings or teaching methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}