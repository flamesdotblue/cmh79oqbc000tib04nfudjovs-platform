import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut, LogIn, User } from 'lucide-react';
import { getAuth, logout } from '../utils/storage';
import { useToaster } from './Toaster';
import { useState } from 'react';

export default function Navbar() {
  const auth = getAuth();
  const { toast } = useToaster();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'You have been signed out successfully.' });
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium hover:text-blue-600 hover:bg-blue-50 transition ${
      isActive ? 'text-blue-700 bg-blue-50' : 'text-slate-700'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="size-9 grid place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
              <Briefcase className="size-5" />
            </div>
            <span className="text-lg tracking-tight">Veridia Careers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <a href="#openings" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition">
              Openings
            </a>
            <NavLink to="/apply" className={linkClass}>
              Apply Now
            </NavLink>
            {!auth?.user && !auth?.admin && (
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {auth?.user && (
              <>
                <NavLink to="/dashboard" className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  <User className="size-4" /> Dashboard
                </NavLink>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50">
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            )}
            {auth?.admin && (
              <>
                <NavLink to="/admin/dashboard" className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                  <User className="size-4" /> Admin
                </NavLink>
                <button onClick={handleLogout} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50">
                  <LogOut className="size-4" />
                  Logout
                </button>
              </>
            )}
            {!auth?.user && !auth?.admin && (
              <NavLink to="/login" className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50">
                <LogIn className="size-4" />
                Sign In
              </NavLink>
            )}
          </div>

          <button aria-label="Toggle Menu" className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100" onClick={() => setOpen((v) => !v)}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <a href="#openings" className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition" onClick={() => setOpen(false)}>
              Openings
            </a>
            <NavLink to="/apply" className={linkClass} onClick={() => setOpen(false)}>Apply Now</NavLink>
            {!auth?.user && !auth?.admin && (
              <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</NavLink>
            )}
            {auth?.user && (
              <>
                <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition">Logout</button>
              </>
            )}
            {auth?.admin && (
              <>
                <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setOpen(false)}>Admin</NavLink>
                <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
