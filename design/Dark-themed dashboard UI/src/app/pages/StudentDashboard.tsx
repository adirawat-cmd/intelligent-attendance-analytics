import { CheckCircle, XCircle, Calendar, BookOpen } from 'lucide-react';

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  attended: number;
  total: number;
  percentage: number;
}

const studentData = {
  name: 'Alex Mitchell',
  rollNumber: '2021045',
  courses: [
    { courseCode: 'CS101', courseName: 'Computer Science 101', attended: 42, total: 45, percentage: 93.3 },
    { courseCode: 'CS201', courseName: 'Data Structures', attended: 38, total: 40, percentage: 95.0 },
    { courseCode: 'CS301', courseName: 'Algorithms', attended: 35, total: 42, percentage: 83.3 },
    { courseCode: 'CS202', courseName: 'Database Systems', attended: 30, total: 38, percentage: 78.9 },
    { courseCode: 'CS302', courseName: 'Operating Systems', attended: 36, total: 40, percentage: 90.0 },
  ] as CourseAttendance[],
};

export function StudentDashboard() {
  // Calculate overall attendance
  const totalAttended = studentData.courses.reduce((sum, course) => sum + course.attended, 0);
  const totalClasses = studentData.courses.reduce((sum, course) => sum + course.total, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);
  
  const isEligible = parseFloat(overallPercentage) >= 75;
  const requiredAttendance = 75;

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-foreground mb-2">My Attendance</h1>
          <p className="text-muted-foreground">
            {studentData.name} • {studentData.rollNumber}
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
            {studentData.courses.map((course) => {
              const isCourseEligible = course.percentage >= requiredAttendance;
              
              return (
                <div key={course.courseCode} className="bg-accent rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-foreground font-medium">{course.courseCode}</p>
                      <p className="text-muted-foreground text-sm">{course.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        isCourseEligible ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {course.percentage.toFixed(1)}%
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {course.attended}/{course.total} classes
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
