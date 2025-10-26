import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveApplication, getAuth } from '../utils/storage';
import { useToaster } from '../components/Toaster';

const steps = ['Personal', 'Education', 'Experience', 'Resume'];

export default function Apply() {
  const auth = getAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToaster();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    position: state?.position || '',
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    phone: '',
    education: '',
    university: '',
    experience: '',
    company: '',
    resumeLink: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [current]);

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      saveApplication({ ...form, status: 'Pending', createdAt: new Date().toISOString() });
      setLoading(false);
      toast({ title: 'Application submitted', description: 'We will get back to you soon.', variant: 'success' });
      navigate('/dashboard');
    }, 900);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Application Form</h1>
      <p className="text-sm text-slate-600">Please complete all steps to submit your application.</p>

      <div className="mt-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`size-8 grid place-items-center rounded-full text-sm font-medium ${i <= current ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{i + 1}</div>
            <span className={`text-sm ${i <= current ? 'text-slate-900' : 'text-slate-500'}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-[2px] bg-slate-200" />}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        {current === 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Phone</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Position</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="e.g. Senior Frontend Engineer" required />
            </div>
          </div>
        )}

        {current === 1 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Highest Education</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">University</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} required />
            </div>
          </div>
        )}

        {current === 2 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Years of Experience</label>
              <input type="number" min="0" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Recent Company</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
            </div>
          </div>
        )}

        {current === 3 && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Resume Link (Google Drive / URL)</label>
            <input type="url" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="https://..." value={form.resumeLink} onChange={(e) => setForm({ ...form, resumeLink: e.target.value })} required />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={prev} disabled={current === 0} className="inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60">Back</button>
          {current < steps.length - 1 ? (
            <button type="button" onClick={next} className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Next</button>
          ) : (
            <button type="submit" disabled={loading} className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-60">{loading ? 'Submitting...' : 'Submit Application'}</button>
          )}
        </div>
      </form>
    </div>
  );
}
