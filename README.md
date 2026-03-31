# RADAR-360 (Frontend-Only)

Aplikasi web frontend-only untuk pasien onkologi radiasi dengan React + Vite + Tailwind CSS.
Semua data disimpan di `localStorage` (tanpa backend, tanpa API eksternal).

## Jalankan Project

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Struktur Folder

```text
src/
  components/
    Badge.jsx          # Badge status risiko (Low/Moderate/High)
    BottomNav.jsx      # Bottom navigation fixed (Home/Symptoms/Alerts/Profile)
    Card.jsx           # Kartu reusable
    EmptyState.jsx     # Empty state reusable
    Toast.jsx          # Feedback visual sederhana
  pages/
    HomePage.jsx       # Ringkasan status harian + progress + tips
    SymptomsPage.jsx   # Form input gejala + riwayat + edit/hapus
    AlertsPage.jsx     # Risk score + alasan + rekomendasi + tren 7 hari
    ProfilePage.jsx    # Profil pasien + reset data
  utils/
    storage.js         # LocalStorage key, seed data, helper baca/tulis
    risk.js            # Logika perhitungan skor risiko
  App.jsx              # State utama aplikasi + routing tab sederhana
  main.jsx             # Entry point React
  styles.css           # Tailwind + utilitas style input
```

## LocalStorage Key

- `radar360_profile`
- `radar360_symptoms`
- `radar360_seeded`

## Catatan

- UI mobile-first dengan bottom navigation fixed.
- Menggunakan functional component + hooks.
- Data dummy otomatis ter-seed saat aplikasi pertama kali dibuka.
- Bahasa UI sepenuhnya bahasa Indonesia.
