import React from 'react';
import Card from '../components/Card';

export default function ProfilePage({ profile, onSave, onReset, toast }) {
  const [form, setForm] = React.useState(profile);

  React.useEffect(() => {
    setForm(profile);
  }, [profile]);

  const onChange = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  function submit(e) {
    e.preventDefault();
    if (!form.nama || !form.diagnosis) {
      toast('Nama dan diagnosis wajib diisi.', 'error');
      return;
    }
    onSave({ ...form, usia: Number(form.usia), totalFraksi: Number(form.totalFraksi), fraksiDijalani: Number(form.fraksiDijalani) });
  }

  return (
    <div className="space-y-4">
      <Card title="Profil Pasien">
        <form className="space-y-3" onSubmit={submit}>
          {[
            ['nama', 'Nama', 'text'],
            ['usia', 'Usia', 'number'],
            ['diagnosis', 'Diagnosis', 'text'],
            ['lokasiRadiasi', 'Lokasi radiasi', 'text'],
            ['totalFraksi', 'Total fraksi', 'number'],
            ['fraksiDijalani', 'Fraksi yang sudah dijalani', 'number'],
            ['kontakDarurat', 'Kontak darurat', 'text'],
          ].map(([key, label, type]) => (
            <label key={key} className="block text-sm">
              <span className="text-slate-600 font-medium">{label}</span>
              <input type={type} value={form[key]} onChange={(e) => onChange(key, e.target.value)} className="input mt-1" />
            </label>
          ))}
          <button className="w-full bg-brand-600 text-white font-semibold py-2.5 rounded-xl hover:bg-brand-700 transition">Simpan Profil</button>
        </form>
      </Card>

      <Card title="Reset Data">
        <p className="text-sm text-slate-600">Hapus seluruh data lokal profil dan gejala pada perangkat ini.</p>
        <button
          onClick={onReset}
          className="mt-3 w-full bg-rose-600 text-white font-semibold py-2.5 rounded-xl hover:bg-rose-700 transition"
        >
          Reset Semua Data
        </button>
      </Card>
    </div>
  );
}
