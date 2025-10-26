export default function Loader() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
      </span>
      <span className="text-sm text-slate-600">Loading...</span>
    </div>
  );
}
