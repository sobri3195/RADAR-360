import { Activity, CalendarCheck2, Sparkles } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function HomePage({ profile, latest, risk, stats, onGoSymptoms }) {
  const progress = profile.totalFraksi ? Math.min(100, Math.round((profile.fraksiDijalani / profile.totalFraksi) * 100)) : 0;

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-brand-600 to-brand-500 text-white border-none">
        <p className="text-sm opacity-90">Selamat datang kembali</p>
        <h2 className="text-xl font-bold">{profile.nama}</h2>
        <p className="text-sm mt-2 opacity-90">Pemantauan gejala radioterapi Anda hari ini.</p>
      </Card>

      <Card title="Status Hari Ini" right={<Badge level={risk.level} />}>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-500">Entri gejala</p>
            <p className="font-bold text-slate-800">{stats.totalEntries}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-500">Rata-rata fatigue</p>
            <p className="font-bold text-slate-800">{stats.avgFatigue}</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-50">
            <p className="text-xs text-slate-500">Skor risiko</p>
            <p className="font-bold text-slate-800">{risk.score}</p>
          </div>
        </div>
      </Card>

      <Card title="Progress Treatment" right={<CalendarCheck2 className="text-brand-600" size={18} />}>
        <p className="text-sm text-slate-600">Fraksi ke-{profile.fraksiDijalani} dari {profile.totalFraksi}</p>
        <div className="w-full h-3 rounded-full bg-slate-100 mt-3 overflow-hidden">
          <div className="h-full bg-brand-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-slate-500 mt-2">{progress}% selesai</p>
      </Card>

      <Card title="Ringkasan Gejala Terbaru" right={<Activity className="text-brand-600" size={18} />}>
        {latest ? (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>Nyeri: <span className="font-semibold">{latest.nyeri}/10</span></p>
            <p>Fatigue: <span className="font-semibold">{latest.fatigue}/10</span></p>
            <p>Mual: <span className="font-semibold">{latest.mual}/10</span></p>
            <p>Sulit menelan: <span className="font-semibold">{latest.sulitMenelan}/10</span></p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Belum ada input gejala.</p>
        )}
      </Card>

      <Card title="Quick Tips" right={<Sparkles className="text-brand-600" size={18} />}>
        <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
          <li>Minum air sedikit tapi sering untuk mencegah dehidrasi.</li>
          <li>Pilih makanan lunak saat sulit menelan.</li>
          <li>Laporkan demam atau nyeri berat ke tim medis segera.</li>
        </ul>
        <button onClick={onGoSymptoms} className="mt-4 w-full bg-brand-600 text-white py-2.5 rounded-xl font-semibold hover:bg-brand-700 transition">Input Gejala Hari Ini</button>
      </Card>
    </div>
  );
}
