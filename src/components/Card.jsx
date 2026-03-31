export default function Card({ title, right, children, className = '' }) {
  return (
    <section className={`bg-white rounded-2xl shadow-soft border border-slate-100 p-4 ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}
