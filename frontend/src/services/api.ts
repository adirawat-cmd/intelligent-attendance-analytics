import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const authAPI = {
  login: (credentials: any) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
};

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  createUser: (data: any) => api.post('/admin/users', data),
  getCourses: () => api.get('/admin/courses'),
  createCourse: (data: any) => api.post('/admin/courses', data),
  deleteCourse: (id: number) => api.delete(`/admin/courses/${id}`),
};

export const facultyAPI = {
  getCourses: () => api.get('/faculty/courses'),
  getStudents: (courseId: number) => api.get(`/faculty/students?course_id=${courseId}`),
  markAttendance: (data: any) => api.post('/faculty/attendance/mark', data),
  getAnalytics: () => api.get('/faculty/analytics'),
};

export const studentAPI = {
  getAttendance: () => api.get('/student/attendance'),
  getSummary: () => api.get('/student/attendance/summary'),
};

export default api;
