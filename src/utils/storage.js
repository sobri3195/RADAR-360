const KEYS = {
  profile: 'radar360_profile',
  symptoms: 'radar360_symptoms',
  seeded: 'radar360_seeded',
};

export const STORAGE_KEYS = KEYS;

export const defaultProfile = {
  nama: 'Bapak Andi Pratama',
  usia: 52,
  diagnosis: 'Karsinoma Nasofaring',
  lokasiRadiasi: 'Kepala & Leher',
  totalFraksi: 30,
  fraksiDijalani: 12,
  kontakDarurat: 'Istri: 0812-0000-1111',
};

const createSymptom = (id, overrides = {}) => ({
  id,
  tanggal: new Date().toISOString().slice(0, 10),
  nyeri: 3,
  fatigue: 4,
  mual: 2,
  nafsuMakan: 'sedang',
  sulitMenelan: 3,
  mukositis: 'ringan',
  dermatitis: 'tidak ada',
  demam: 'tidak',
  beratBadan: 64,
  catatan: '',
  ...overrides,
});

export const seedSymptoms = [
  createSymptom('seed-1', {
    tanggal: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
    nyeri: 4,
    fatigue: 5,
    mual: 3,
    nafsuMakan: 'sedang',
    sulitMenelan: 4,
    mukositis: 'ringan',
    dermatitis: 'ringan',
    demam: 'tidak',
    catatan: 'Masih bisa makan bubur dan sup hangat.',
  }),
  createSymptom('seed-2', {
    tanggal: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    nyeri: 6,
    fatigue: 6,
    mual: 4,
    nafsuMakan: 'buruk',
    sulitMenelan: 6,
    mukositis: 'sedang',
    dermatitis: 'sedang',
    demam: 'tidak',
    catatan: 'Perlu minum lebih sering karena mulut terasa kering.',
  }),
];

export const initStorage = () => {
  if (!localStorage.getItem(KEYS.seeded)) {
    localStorage.setItem(KEYS.profile, JSON.stringify(defaultProfile));
    localStorage.setItem(KEYS.symptoms, JSON.stringify(seedSymptoms));
    localStorage.setItem(KEYS.seeded, 'true');
  }
};

export const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
