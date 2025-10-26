import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import jobs from '../data/jobs';

export default function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-32 right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 py-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Your next chapter starts at Veridia
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-lg text-slate-600"
            >
              Join a culture that values growth, ownership, and craftsmanship. Build impactful products with a world-class team.
            </motion.p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/apply" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white shadow-sm hover:bg-blue-700 transition">
                <Briefcase className="size-4" /> Apply Now
              </Link>
              <a href="#openings" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-50 transition">View Openings</a>
            </div>
          </div>
          <div className="h-[420px] rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur overflow-hidden shadow-sm">
            <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">Life at Veridia</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[{ title: 'People-first culture', icon: Star, text: 'We celebrate diverse perspectives and build with empathy.' }, { title: 'Benefits that matter', icon: CheckCircle, text: 'Comprehensive health, flexible hours, remote-first.' }, { title: 'Grow with us', icon: Briefcase, text: 'Mentorship, learning budgets, and clear growth paths.' }].map((c) => (
            <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 grid place-items-center rounded-lg bg-blue-50 text-blue-700">
                  <c.icon className="size-5" />
                </div>
                <h3 className="font-medium text-slate-900">{c.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Open Positions</h2>
            <p className="text-sm text-slate-600">We are hiring across product, engineering, and design.</p>
          </div>
          <Link to="/apply" className="hidden sm:inline-flex rounded-md border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Apply</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                  <p className="text-sm text-slate-600">{job.location} • {job.type}</p>
                </div>
                <span className="text-xs rounded-full bg-blue-50 text-blue-700 px-3 py-1">{job.department}</span>
              </div>
              <p className="mt-3 text-sm text-slate-700 line-clamp-2">{job.description}</p>
              <div className="mt-4 flex items-center gap-3">
                <Link to="/apply" state={{ position: job.title }} className="inline-flex rounded-md bg-blue-600 text-white text-sm px-4 py-2 hover:bg-blue-700">Apply</Link>
                <a href="#" className="inline-flex rounded-md border border-slate-200 text-sm px-4 py-2 hover:bg-slate-50">Learn More</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
