import { CheckCircle, XCircle, Calendar, BookOpen, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  attended: number;
  total: number;
  percentage: number;
}

import { useEffect, useState } from 'react';
import { studentAPI } from '../../services/api';

interface CourseAttendance {
  course_id: number;
  course_name: string;
  attended: number;
  total_classes: number;
  percentage: number;
  eligible: boolean;
}

export function StudentDashboard() {
  const [courses, setCourses] = useState<CourseAttendance[]>([]);
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(usr);
    studentAPI.getSummary().then(res => setCourses(res.data)).catch(console.error);
  }, []);

  const totalAttended = courses.reduce((sum, course) => sum + course.attended, 0);
  const totalClasses = courses.reduce((sum, course) => sum + course.total_classes, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '0.0';
  
  const isEligible = parseFloat(overallPercentage) >= 75;
  const requiredAttendance = 75;

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <div className="w-full max-w-4xl relative">
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="absolute top-0 right-0 p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground md:-top-4 md:-right-4"
          title="Logout"
        >
          <LogOut className="size-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-foreground mb-2">My Attendance</h1>
          <p className="text-muted-foreground">
            {user.name} • {user.email}
          </p>
        </div>

        {/* Overall Attendance Card */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6 shadow-2xl">
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">Overall Attendance</p>
            <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-accent border-4 border-green-600 mb-4">
              <div className="text-center">
                <div className="text-foreground mb-1" style={{ fontSize: '2.5rem', fontWeight: '600' }}>
                  {overallPercentage}%
                </div>
                <div className="text-muted-foreground text-sm">
                  {totalAttended}/{totalClasses} classes
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
            isEligible 
              ? 'bg-green-600/20 border border-green-600/30' 
              : 'bg-red-600/20 border border-red-600/30'
          }`}>
            {isEligible ? (
              <>
                <CheckCircle className="size-6 text-green-600" />
                <div>
                  <p className="text-green-600 font-medium">Eligible for Examination</p>
                  <p className="text-muted-foreground text-sm">
                    You meet the {requiredAttendance}% attendance requirement
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="size-6 text-red-600" />
                <div>
                  <p className="text-red-600 font-medium">Not Eligible for Examination</p>
                  <p className="text-muted-foreground text-sm">
                    Minimum {requiredAttendance}% attendance required
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Course-wise Attendance */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
          <h3 className="text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="size-5" />
            Course-wise Breakdown
          </h3>
          
          <div className="space-y-4">
            {courses.map((course) => {
              const isCourseEligible = course.percentage >= requiredAttendance;
              
              return (
                <div key={course.course_id} className="bg-accent rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-foreground font-medium">{'Course ID: ' + course.course_id}</p>
                      <p className="text-muted-foreground text-sm">{course.course_name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        isCourseEligible ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {course.percentage.toFixed(1)}%
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {course.attended}/{course.total_classes} classes
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isCourseEligible ? 'bg-green-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(course.percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            <Calendar className="size-4" />
            Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
