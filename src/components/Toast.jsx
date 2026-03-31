import { CheckCircle2, TriangleAlert } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-soft text-sm ${isError ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}>
        {isError ? <TriangleAlert size={16} /> : <CheckCircle2 size={16} />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
