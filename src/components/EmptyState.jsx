import { ClipboardX } from 'lucide-react';

export default function EmptyState({ title, subtitle }) {
  return (
    <div className="text-center py-10 bg-white border border-dashed border-slate-300 rounded-2xl">
      <ClipboardX className="mx-auto text-slate-400" />
      <h4 className="mt-3 font-semibold text-slate-700">{title}</h4>
      <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
    </div>
  );
}
