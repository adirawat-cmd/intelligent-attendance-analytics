import { Navbar } from '../components/Navbar';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  status: 'present' | 'absent';
}

const courses = [
  { id: 1, name: 'Computer Science 101', code: 'CS101' },
  { id: 2, name: 'Data Structures', code: 'CS201' },
  { id: 3, name: 'Algorithms', code: 'CS301' },
  { id: 4, name: 'Database Systems', code: 'CS202' },
  { id: 5, name: 'Operating Systems', code: 'CS302' },
];

const mockStudents: Student[] = [
  { id: 1, name: 'Alice Johnson', rollNumber: '2021001', status: 'present' },
  { id: 2, name: 'Bob Smith', rollNumber: '2021002', status: 'present' },
  { id: 3, name: 'Charlie Brown', rollNumber: '2021003', status: 'absent' },
  { id: 4, name: 'Diana Prince', rollNumber: '2021004', status: 'present' },
  { id: 5, name: 'Ethan Hunt', rollNumber: '2021005', status: 'present' },
  { id: 6, name: 'Fiona Gallagher', rollNumber: '2021006', status: 'absent' },
  { id: 7, name: 'George Wilson', rollNumber: '2021007', status: 'present' },
  { id: 8, name: 'Hannah Montana', rollNumber: '2021008', status: 'present' },
];

export function Attendance() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const [students, setStudents] = useState<Student[]>(mockStudents);

  const toggleAttendance = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
        : student
    ));
  };

  const handleSubmit = () => {
    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'absent').length;
    alert(`Attendance submitted!\nPresent: ${presentCount}\nAbsent: ${absentCount}`);
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const totalStudents = students.length;

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Record Attendance" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <h2 className="text-foreground mb-2">Mark Student Attendance</h2>
            <p className="text-muted-foreground">
              Select a course and mark attendance for all students
            </p>
          </div>

          {/* Course Selector Card */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <label htmlFor="course" className="block text-foreground mb-3">
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(Number(e.target.value))}
              className="w-full md:w-96 px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-foreground"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>

            {/* Summary Stats */}
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total Students:</span>
                <span className="text-foreground font-medium">{totalStudents}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Present:</span>
                <span className="text-green-600 font-medium">{presentCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Absent:</span>
                <span className="text-red-600 font-medium">{totalStudents - presentCount}</span>
              </div>
            </div>
          </div>

          {/* Attendance Table Card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-4 text-left text-foreground">Roll Number</th>
                    <th className="px-6 py-4 text-left text-foreground">Student Name</th>
                    <th className="px-6 py-4 text-center text-foreground">Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr 
                      key={student.id}
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
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => toggleAttendance(student.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                              student.status === 'present'
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-accent text-muted-foreground hover:bg-green-600/20'
                            }`}
                          >
                            <Check className="size-4" />
                            <span>Present</span>
                          </button>
                          <button
                            onClick={() => toggleAttendance(student.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                              student.status === 'absent'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-accent text-muted-foreground hover:bg-red-600/20'
                            }`}
                          >
                            <X className="size-4" />
                            <span>Absent</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Submit Attendance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}