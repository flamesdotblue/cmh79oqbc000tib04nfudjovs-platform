import { useEffect, useState } from 'react';
import { getApplications, getAuth, updateUser } from '../utils/storage';
import { CheckCircle, Clock, XCircle, Bell, FileText } from 'lucide-react';
import { useToaster } from '../components/Toaster';

function StatusBadge({ status }) {
  const map = {
    Pending: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
    Shortlisted: { color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
    Rejected: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
  };
  const { color, icon: Icon } = map[status] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs ${color}`}>
      <Icon className="size-4" /> {status}
    </span>
  );
}

export default function CandidateDashboard() {
  const { toast } = useToaster();
  const auth = getAuth();
  const [apps, setApps] = useState([]);
  const [profile, setProfile] = useState({ name: auth?.user?.name || '', email: auth?.user?.email || '', resumeLink: '' });

  useEffect(() => {
    setApps(getApplications().filter((a) => a.email === auth?.user?.email));
  }, [auth?.user?.email]);

  const save = () => {
    updateUser({ name: profile.name, email: profile.email, resumeLink: profile.resumeLink });
    toast({ title: 'Profile updated', description: 'Your profile has been saved.', variant: 'success' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Your Applications</h2>
          </div>
          <div className="mt-4 divide-y">
            {apps.length === 0 && <p className="text-sm text-slate-600">No applications yet. Start by applying to a role.</p>}
            {apps.map((a, i) => (
              <div key={i} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-slate-900">{a.position}</div>
                  <div className="text-sm text-slate-600">Applied on {new Date(a.createdAt).toLocaleDateString()}</div>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Resume Link</label>
              <input className="mt-1 w-full rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" placeholder="https://..." value={profile.resumeLink || ''} onChange={(e) => setProfile({ ...profile, resumeLink: e.target.value })} />
            </div>
            <button onClick={save} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Save Profile</button>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Bell className="size-5 text-blue-600" /> Notifications</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><FileText className="size-4 text-slate-500" /> Check your email for interview invites.</li>
            <li className="flex items-center gap-2"><FileText className="size-4 text-slate-500" /> Update your profile to stay current.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
