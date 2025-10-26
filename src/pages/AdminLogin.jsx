import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../utils/storage';
import { useToaster } from '../components/Toaster';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToaster();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = loginAdmin(email, password);
      setLoading(false);
      if (ok) {
        toast({ title: 'Admin login successful', variant: 'success' });
        navigate('/admin/dashboard');
      } else {
        toast({ title: 'Access denied', description: 'Invalid admin credentials.', variant: 'error' });
      }
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">HR Admin Login</h1>
      <form onSubmit={submit} className="mt-6 rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Admin Email</label>
          <input type="email" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
