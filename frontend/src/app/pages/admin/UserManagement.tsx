import { Navbar } from '../../components/Navbar';
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'active' | 'inactive';
}

const initialUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', status: 'active' },
  { id: 2, name: 'Dr. Sarah Johnson', email: 'sarah@example.com', role: 'faculty', status: 'active' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'student', status: 'active' },
  { id: 4, name: 'Charlie Brown', email: 'charlie@example.com', role: 'student', status: 'inactive' },
  { id: 5, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'faculty', status: 'active' },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student' as User['role'],
    status: 'active' as User['status'],
  });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'student', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setShowModal(true);
  };

  const handleDelete = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      student: 'bg-blue-600/20 text-blue-500',
      faculty: 'bg-green-600/20 text-green-500',
      admin: 'bg-purple-600/20 text-purple-500',
    };
    return styles[role as keyof typeof styles] || styles.student;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? 'bg-green-600/20 text-green-500'
      : 'bg-red-600/20 text-red-500';
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="User Management" userName="Administrator" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-foreground mb-2">Manage Users</h2>
            <p className="text-muted-foreground">
              Add, edit, or remove users from the system
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
                  placeholder="Search users..."
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
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent">
                    <th className="px-6 py-4 text-left text-foreground">ID</th>
                    <th className="px-6 py-4 text-left text-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-foreground">Email</th>
                    <th className="px-6 py-4 text-center text-foreground">Role</th>
                    <th className="px-6 py-4 text-center text-foreground">Status</th>
                    <th className="px-6 py-4 text-center text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr 
                      key={user.id}
                      className={`border-b border-border last:border-b-0 hover:bg-accent transition-colors ${
                        index % 2 === 0 ? 'bg-background/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-muted-foreground">
                        #{user.id}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm ${getRoleBadge(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm ${getStatusBadge(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 hover:bg-blue-600/20 text-blue-500 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
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
                {editingUser ? 'Edit User' : 'Add New User'}
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
                <label className="block text-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-foreground"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-foreground mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
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
                  {editingUser ? 'Update' : 'Add'} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
