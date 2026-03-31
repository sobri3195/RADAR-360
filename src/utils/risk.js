export const getRiskAnalysis = (entry) => {
  if (!entry) {
    return {
      score: 0,
      level: 'Low',
      reasons: ['Belum ada data gejala terbaru.'],
      recommendations: ['Isi gejala harian untuk mendapatkan pemantauan risiko.'],
    };
  }

  let score = 0;
  const reasons = [];

  if (entry.nyeri >= 7) {
    score += 2;
    reasons.push('Nyeri tinggi (≥7).');
  }
  if (entry.fatigue >= 7) {
    score += 2;
    reasons.push('Fatigue tinggi (≥7).');
  }
  if (entry.sulitMenelan >= 6) {
    score += 2;
    reasons.push('Sulit menelan bermakna (≥6).');
  }
  if (['sedang', 'berat'].includes(entry.mukositis)) {
    score += 2;
    reasons.push(`Mukositis ${entry.mukositis}.`);
  }
  if (['sedang', 'berat'].includes(entry.dermatitis)) {
    score += 1;
    reasons.push(`Dermatitis radiasi ${entry.dermatitis}.`);
  }
  if (entry.demam === 'ya') {
    score += 3;
    reasons.push('Demam terdeteksi.');
  }
  if (entry.nafsuMakan === 'buruk') {
    score += 1;
    reasons.push('Nafsu makan buruk.');
  }

  let level = 'Low';
  if (score >= 8) level = 'High';
  else if (score >= 4) level = 'Moderate';

  const recommendations = {
    Low: ['Lanjutkan perawatan rutin dan hidrasi cukup.', 'Tetap isi gejala setiap hari.'],
    Moderate: ['Hubungi perawat/klinik jika gejala menetap >24 jam.', 'Perhatikan asupan nutrisi lunak dan cairan.'],
    High: ['Segera kontak tim onkologi radiasi hari ini.', 'Jika disertai demam tinggi/lemah berat, pertimbangkan ke IGD.'],
  };

  return {
    score,
    level,
    reasons: reasons.length ? reasons : ['Gejala relatif stabil hari ini.'],
    recommendations: recommendations[level],
  };
};

export const riskBadge = {
  Low: 'bg-emerald-100 text-emerald-700',
  Moderate: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700',
};
