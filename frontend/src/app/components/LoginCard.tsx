import { useState } from 'react';
import { useNavigate } from 'react-router';
import { authAPI } from '../../services/api';

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'faculty' | 'student' | 'admin'>('faculty');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authAPI.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      const role = user.role;
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Failed to login. Please check credentials.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50">
        {/* Title */}
        <h1 className="text-center mb-8 text-foreground">Login</h1>
        
        {/* Subtitle */}
        <p className="text-center text-muted-foreground mb-8">
          Intelligent Attendance System
        </p>

        {/* User Type Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setUserType('faculty')}
              className={`py-3 rounded-xl transition-all text-sm ${
                userType === 'faculty'
                  ? 'bg-green-600 text-white'
                  : 'bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              Faculty
            </button>
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`py-3 rounded-xl transition-all text-sm ${
                userType === 'student'
                  ? 'bg-green-600 text-white'
                  : 'bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`py-3 rounded-xl transition-all text-sm ${
                userType === 'admin'
                  ? 'bg-green-600 text-white'
                  : 'bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-foreground mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Login as {userType === 'faculty' ? 'Faculty' : userType === 'student' ? 'Student' : 'Admin'}
          </button>
        </form>

        {/* Optional Footer */}
        <div className="mt-6 text-center">
          <a href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}