import React from 'react';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import SymptomsPage from './pages/SymptomsPage';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';
import { getRiskAnalysis } from './utils/risk';
import { defaultProfile, initStorage, readStorage, seedSymptoms, STORAGE_KEYS, writeStorage } from './utils/storage';

export default function App() {
  const [tab, setTab] = React.useState('home');
  const [toast, setToast] = React.useState(null);
  const [profile, setProfile] = React.useState(defaultProfile);
  const [symptoms, setSymptoms] = React.useState(seedSymptoms);

  React.useEffect(() => {
    initStorage();
    setProfile(readStorage(STORAGE_KEYS.profile, defaultProfile));
    const loadedSymptoms = readStorage(STORAGE_KEYS.symptoms, seedSymptoms);
    setSymptoms(loadedSymptoms.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)));
  }, []);

  const latest = symptoms[0];
  const risk = getRiskAnalysis(latest);

  const stats = React.useMemo(() => ({
    totalEntries: symptoms.length,
    avgFatigue: symptoms.length ? (symptoms.reduce((a, c) => a + Number(c.fatigue || 0), 0) / symptoms.length).toFixed(1) : '0',
    latestRisk: risk.level,
  }), [symptoms, risk.level]);

  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2200);
  };

  const saveSymptoms = (entry) => {
    const updated = [entry, ...symptoms.filter((item) => item.id !== entry.id)].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    setSymptoms(updated);
    writeStorage(STORAGE_KEYS.symptoms, updated);
    notify('Data gejala berhasil disimpan.');
  };

  const deleteSymptom = (id) => {
    const updated = symptoms.filter((item) => item.id !== id);
    setSymptoms(updated);
    writeStorage(STORAGE_KEYS.symptoms, updated);
    notify('Data gejala berhasil dihapus.');
  };

  const saveProfile = (next) => {
    setProfile(next);
    writeStorage(STORAGE_KEYS.profile, next);
    notify('Profil berhasil diperbarui.');
  };

  const resetAll = () => {
    if (!window.confirm('Yakin ingin reset semua data lokal?')) return;
    localStorage.removeItem(STORAGE_KEYS.seeded);
    initStorage();
    const p = readStorage(STORAGE_KEYS.profile, defaultProfile);
    const s = readStorage(STORAGE_KEYS.symptoms, seedSymptoms);
    setProfile(p);
    setSymptoms(s);
    notify('Semua data berhasil direset.');
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 pt-4 md:pt-6">
      <Toast toast={toast} />
      {tab === 'home' && <HomePage profile={profile} latest={latest} risk={risk} stats={stats} onGoSymptoms={() => setTab('symptoms')} />}
      {tab === 'symptoms' && <SymptomsPage symptoms={symptoms} onSave={saveSymptoms} onDelete={deleteSymptom} toast={notify} />}
      {tab === 'alerts' && <AlertsPage symptoms={symptoms} risk={risk} />}
      {tab === 'profile' && <ProfilePage profile={profile} onSave={saveProfile} onReset={resetAll} toast={notify} />}
      <BottomNav current={tab} onChange={setTab} />
    </div>
  );
}
