import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/storage';
import { useToaster } from '../components/Toaster';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', resume: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToaster();

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast({ title: 'Missing fields', description: 'Please fill out all required fields.', variant: 'error' });
      return;
    }
    if (form.password !== form.confirm) {
      toast({ title: 'Password mismatch', description: 'Passwords do not match.', variant: 'error' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveUser({ name: form.name, email: form.email, password: form.password, resumeName: form.resume?.name });
      toast({ title: 'Welcome to Veridia', description: 'Account created. Please login.', variant: 'success' });
      navigate('/login');
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
      <form onSubmit={submit} className="mt-6 rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Full Name</label>
          <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input type="password" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input type="password" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Upload Resume (PDF)</label>
          <input type="file" accept="application/pdf" className="mt-1 w-full" onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] })} />
          {form.resume && <p className="mt-1 text-xs text-slate-500">Selected: {form.resume.name}</p>}
        </div>
        <button type="submit" disabled={loading} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
