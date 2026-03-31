import Card from '../components/Card';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';

export default function AlertsPage({ symptoms, risk }) {
  const recent = symptoms.slice(0, 7).reverse();

  return (
    <div className="space-y-4">
      <Card className="border-2 border-brand-100 bg-brand-50/60" title="Status Risiko" right={<Badge level={risk.level} />}>
        <p className="text-sm text-slate-700">Skor risiko saat ini: <span className="font-bold text-lg">{risk.score}</span></p>
        <p className="text-xs text-slate-600 mt-2">Klasifikasi: 0–3 Low • 4–7 Moderate • ≥8 High</p>
      </Card>

      <Card title="Alasan Penilaian">
        <ul className="list-disc pl-4 text-sm text-slate-600 space-y-1">
          {risk.reasons.map((reason, idx) => <li key={idx}>{reason}</li>)}
        </ul>
      </Card>

      <Card title="Rekomendasi Tindakan">
        <ul className="space-y-2 text-sm text-slate-700">
          {risk.recommendations.map((item, idx) => <li key={idx} className="p-2 rounded-lg bg-slate-50">{item}</li>)}
        </ul>
      </Card>

      <Card title="Tren 7 Hari Terakhir">
        {recent.length === 0 ? (
          <EmptyState title="Belum ada tren" subtitle="Isi data gejala untuk melihat tren sederhana." />
        ) : (
          <div className="space-y-2">
            {recent.map((item) => {
              const trendScore = item.nyeri + item.fatigue + item.sulitMenelan + (item.demam === 'ya' ? 3 : 0);
              const bar = Math.min(100, trendScore * 5);
              return (
                <div key={item.id}>
                  <div className="flex justify-between text-xs text-slate-500 mb-1"><span>{item.tanggal}</span><span>Skor tren {trendScore}</span></div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-brand-500" style={{ width: `${bar}%` }} /></div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
