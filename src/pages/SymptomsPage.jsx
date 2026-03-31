import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';

const initialForm = {
  tanggal: new Date().toISOString().slice(0, 10),
  nyeri: 0,
  fatigue: 0,
  mual: 0,
  nafsuMakan: 'baik',
  sulitMenelan: 0,
  mukositis: 'tidak ada',
  dermatitis: 'tidak ada',
  demam: 'tidak',
  beratBadan: '',
  catatan: '',
};

const numberFields = ['nyeri', 'fatigue', 'mual', 'sulitMenelan'];

export default function SymptomsPage({ symptoms, onSave, onDelete, toast }) {
  const [form, setForm] = React.useState(initialForm);
  const [editId, setEditId] = React.useState(null);

  function handleChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.tanggal) return 'Tanggal wajib diisi.';
    for (const field of numberFields) {
      const val = Number(form[field]);
      if (Number.isNaN(val) || val < 0 || val > 10) return `${field} harus di antara 0-10.`;
    }
    if (form.beratBadan !== '' && Number(form.beratBadan) < 20) return 'Berat badan tidak valid.';
    return null;
  }

  function submit(e) {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast(error, 'error');
      return;
    }
    onSave({ ...form, id: editId ?? crypto.randomUUID(), beratBadan: form.beratBadan === '' ? '' : Number(form.beratBadan) });
    setForm(initialForm);
    setEditId(null);
  }

  function onEdit(entry) {
    setEditId(entry.id);
    setForm({ ...entry, beratBadan: entry.beratBadan ?? '' });
  }

  return (
    <div className="space-y-4">
      <Card title="Input Gejala Harian">
        <form className="space-y-3" onSubmit={submit}>
          <Field label="Tanggal"><input type="date" value={form.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} className="input" /></Field>
          <RangeField label="Nyeri" name="nyeri" value={form.nyeri} onChange={handleChange} />
          <RangeField label="Fatigue" name="fatigue" value={form.fatigue} onChange={handleChange} />
          <RangeField label="Mual" name="mual" value={form.mual} onChange={handleChange} />
          <Field label="Nafsu makan"><Select value={form.nafsuMakan} onChange={(e) => handleChange('nafsuMakan', e.target.value)} options={['baik', 'sedang', 'buruk']} /></Field>
          <RangeField label="Sulit menelan" name="sulitMenelan" value={form.sulitMenelan} onChange={handleChange} />
          <Field label="Mukositis"><Select value={form.mukositis} onChange={(e) => handleChange('mukositis', e.target.value)} options={['tidak ada', 'ringan', 'sedang', 'berat']} /></Field>
          <Field label="Dermatitis radiasi"><Select value={form.dermatitis} onChange={(e) => handleChange('dermatitis', e.target.value)} options={['tidak ada', 'ringan', 'sedang', 'berat']} /></Field>
          <Field label="Demam"><Select value={form.demam} onChange={(e) => handleChange('demam', e.target.value)} options={['tidak', 'ya']} /></Field>
          <Field label="Berat badan (kg)"><input type="number" value={form.beratBadan} onChange={(e) => handleChange('beratBadan', e.target.value)} className="input" /></Field>
          <Field label="Catatan tambahan"><textarea rows="3" value={form.catatan} onChange={(e) => handleChange('catatan', e.target.value)} className="input" /></Field>
          <button className="w-full bg-brand-600 text-white font-semibold py-2.5 rounded-xl hover:bg-brand-700 transition">{editId ? 'Update Gejala' : 'Simpan Gejala'}</button>
        </form>
      </Card>

      <Card title="Riwayat Gejala">
        {symptoms.length === 0 ? (
          <EmptyState title="Belum ada data gejala" subtitle="Mulai isi gejala harian Anda sekarang." />
        ) : (
          <div className="space-y-3">
            {symptoms.map((entry) => (
              <div key={entry.id} className="border border-slate-200 rounded-xl p-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold">{entry.tanggal}</p>
                    <p className="text-sm text-slate-600">Nyeri {entry.nyeri} • Fatigue {entry.fatigue} • Demam {entry.demam}</p>
                    <p className="text-sm text-slate-500 mt-1">{entry.catatan || 'Tanpa catatan.'}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onEdit(entry)} className="p-2 rounded-lg hover:bg-slate-100"><Pencil size={16} /></button>
                    <button onClick={() => onDelete(entry.id)} className="p-2 rounded-lg hover:bg-rose-50 text-rose-600"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function RangeField({ label, name, value, onChange }) {
  return (
    <Field label={`${label} (${value})`}>
      <input type="range" min="0" max="10" value={value} onChange={(e) => onChange(name, Number(e.target.value))} className="w-full accent-brand-600" />
    </Field>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange} className="input">
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
