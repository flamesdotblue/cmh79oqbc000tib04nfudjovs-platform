import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Veridia Careers</h3>
          <p className="mt-2 text-sm text-slate-600">Building a future where talent meets opportunity. Join us to craft meaningful work.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/" className="text-slate-600 hover:text-blue-600">Home</Link></li>
              <li><a href="#openings" className="text-slate-600 hover:text-blue-600">Openings</a></li>
              <li><Link to="/apply" className="text-slate-600 hover:text-blue-600">Apply Now</Link></li>
              <li><Link to="/login" className="text-slate-600 hover:text-blue-600">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>careers@veridia.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Innovation Drive, Palo Alto, CA</li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Follow Us</h4>
          <div className="mt-2 flex items-center gap-3 text-slate-600">
            <a href="#" aria-label="Twitter" className="hover:text-blue-600"><Twitter className="size-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><Linkedin className="size-5" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-blue-600"><Github className="size-5" /></a>
          </div>
          <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} Veridia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
