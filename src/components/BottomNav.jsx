import { BellRing, House, Stethoscope, UserRound } from 'lucide-react';

const menus = [
  { key: 'home', label: 'Home', icon: House },
  { key: 'symptoms', label: 'Daily Symptoms', icon: Stethoscope },
  { key: 'alerts', label: 'Alerts', icon: BellRing },
  { key: 'profile', label: 'Profile', icon: UserRound },
];

export default function BottomNav({ current, onChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-2 py-2 grid grid-cols-4 gap-1">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = current === menu.key;
          return (
            <button
              key={menu.key}
              onClick={() => onChange(menu.key)}
              className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-medium transition ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <Icon size={18} />
              {menu.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
