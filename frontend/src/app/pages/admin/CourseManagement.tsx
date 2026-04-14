import { Navbar } from '../../components/Navbar';
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Users } from 'lucide-react';

interface Course {
  id: number;
  code: string;
  name: string;
  faculty: string;
  students: number;
  semester: string;
  status: 'active' | 'inactive';
}

const initialCourses: Course[] = [
  { id: 1, code: 'CS101', name: 'Computer Science 101', faculty: 'Dr. Sarah Johnson', students: 45, semester: 'Spring 2026', status: 'active' },
  { id: 2, code: 'CS201', name: 'Data Structures', faculty: 'Dr. Sarah Johnson', students: 42, semester: 'Spring 2026', status: 'active' },
  { id: 3, code: 'CS301', name: 'Algorithms', faculty: 'Dr. Michael Chen', students: 38, semester: 'Spring 2026', status: 'active' },
  { id: 4, code: 'CS202', name: 'Database Systems', faculty: 'Dr. Emily Rodriguez', students: 40, semester: 'Spring 2026', status: 'active' },
  { id: 5, code: 'CS302', name: 'Operating Systems', faculty: 'Dr. Michael Chen', students: 36, semester: 'Spring 2026', status: 'active' },
  { id: 6, code: 'CS401', name: 'Machine Learning', faculty: 'Dr. Emily Rodriguez', students: 30, semester: 'Spring 2026', status: 'inactive' },
];

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    faculty: '',
    students: 0,
    semester: 'Spring 2026',
    status: 'active' as Course['status'],
  });

  const filteredCourses = courses.filter(course =>
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ code: '', name: '', faculty: '', students: 0, semester: 'Spring 2026', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      faculty: course.faculty,
      students: course.students,
      semester: course.semester,
      status: course.status,
    });
    setShowModal(true);
  };

  const handleDelete = (courseId: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...formData } : c));
    } else {
      const newCourse: Course = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        ...formData,
      };
      setCourses([...courses, newCourse]);
    }
    setShowModal(false);
  };

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? 'bg-green-600/20 text-green-500'
      : 'bg-red-600/20 text-red-500';
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Course Management" userName="Administrator" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-foreground mb-2">Manage Courses</h2>
            <p className="text-muted-foreground">
              Add, edit, or remove courses from the system
            </p>
          </div>

          {/* Actions Bar */}
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Add Button */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <Plus className="size-5" />
                Add Course
              </button>
            </div>
          </div>

          {/* Courses Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-4 text-left text-foreground">Course Code</th>
                    <th className="px-6 py-4 text-left text-foreground">Course Name</th>
                    <th className="px-6 py-4 text-left text-foreground">Faculty</th>
                    <th className="px-6 py-4 text-center text-foreground">Students</th>
                    <th className="px-6 py-4 text-center text-foreground">Semester</th>
                    <th className="px-6 py-4 text-center text-foreground">Status</th>
                    <th className="px-6 py-4 text-center text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, index) => (
                    <tr 
                      key={course.id}
                      className={`border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                        index % 2 === 0 ? 'bg-background/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-foreground font-medium">
                        {course.code}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {course.faculty}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                          <Users className="size-4" />
                          <span>{course.students}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {course.semester}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm ${getStatusBadge(course.status)}`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="p-2 hover:bg-blue-600/20 text-blue-500 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="p-2 hover:bg-red-600/20 text-red-500 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-foreground">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-foreground mb-2">Course Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  placeholder="e.g., CS101"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Course Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  placeholder="e.g., Computer Science 101"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Faculty</label>
                <input
                  type="text"
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  placeholder="e.g., Dr. Sarah Johnson"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Number of Students</label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Semester</label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  placeholder="e.g., Spring 2026"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Course['status'] })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all"
                >
                  {editingCourse ? 'Update' : 'Add'} Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
