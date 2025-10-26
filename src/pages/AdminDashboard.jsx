import { useEffect, useMemo, useState } from 'react';
import { getAllApplications, setApplicationStatus } from '../utils/storage';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { useToaster } from '../components/Toaster';

export default function AdminDashboard() {
  const { toast } = useToaster();
  const [query, setQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setApps(getAllApplications());
  }, []);

  const positions = useMemo(() => Array.from(new Set(apps.map((a) => a.position))), [apps]);

  const filtered = apps.filter((a) => {
    const matchesQuery = `${a.name} ${a.email} ${a.position}`.toLowerCase().includes(query.toLowerCase());
    const matchesPosition = positionFilter ? a.position === positionFilter : true;
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    return matchesQuery && matchesPosition && matchesStatus;
  });

  const stats = {
    total: apps.length,
    shortlisted: apps.filter((a) => a.status === 'Shortlisted').length,
    rejected: apps.filter((a) => a.status === 'Rejected').length,
  };

  const updateStatus = (idx, status) => {
    setApplicationStatus(idx, status);
    setApps(getAllApplications());
    toast({ title: `Marked as ${status}`, variant: 'success' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">HR Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Total Applicants</div>
          <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Shortlisted</div>
          <div className="mt-1 text-2xl font-semibold text-green-700">{stats.shortlisted}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-600">Rejected</div>
          <div className="mt-1 text-2xl font-semibold text-red-700">{stats.rejected}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700">Search</label>
            <div className="mt-1 relative">
              <input className="w-full rounded-md border-slate-300 pl-9 focus:border-blue-500 focus:ring-blue-500" placeholder="Name, email, position" value={query} onChange={(e) => setQuery(e.target.value)} />
              <Search className="size-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Position</label>
            <select className="mt-1 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
              <option value="">All</option>
              {positions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select className="mt-1 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All</option>
              {['Pending', 'Shortlisted', 'Rejected'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Applied</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((a, idx) => (
                <tr key={`${a.email}-${idx}`} className="hover:bg-slate-50/50">
                  <td className="p-3 font-medium text-slate-900">{a.name}</td>
                  <td className="p-3 text-slate-700">{a.email}</td>
                  <td className="p-3 text-slate-700">{a.position}</td>
                  <td className="p-3 text-slate-700">{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs ${
                      a.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : a.status === 'Shortlisted' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>{a.status}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateStatus(apps.indexOf(a), 'Shortlisted')} className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1.5 text-white hover:bg-green-700">
                        <CheckCircle className="size-4" /> Shortlist
                      </button>
                      <button onClick={() => updateStatus(apps.indexOf(a), 'Rejected')} className="inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700">
                        <XCircle className="size-4" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-slate-600">No applications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
