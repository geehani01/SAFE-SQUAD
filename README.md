# SKUAD S.A.F.E.

Aplikasi psikopendidikan pencegahan buli untuk murid sekolah rendah. Antara muka menggunakan Bahasa Melayu Malaysia, empat avatar (ALFA, NOVA, BYTE dan AURA), empat peta misi, animasi pulau serta tema kaca responsif.

## Status pembangunan

- Pemilihan avatar dan halaman misi responsif tersedia.
- NEXUS mempunyai tiga kad pembelajaran, lima situasi cabaran, mod sentuhan, dan pilihan kamera untuk kawalan tangan.
- Lencana Mata Bijak membuka CYBER GRID.
- Kandungan misi CYBER GRID, EMPATHY CORE dan GUARDIAN ZONE serta sijil akhir belum siap.
- Tiada pra-ujian atau pasca-ujian. Kemajuan disimpan secara setempat pada peranti.

## Jalankan secara setempat

Fail laman berada dalam `dist/`. Hidangkan folder itu melalui pelayan statik supaya import modul, kamera dan aset boleh berfungsi. Contohnya:

```sh
python3 -m http.server 8000 --directory dist
```

Buka `http://localhost:8000`. Kamera memerlukan izin pengguna dan konteks selamat (`localhost` atau HTTPS). Mod sentuhan tersedia jika kamera tidak digunakan.

## Terbitan

Laman kerja: https://skuad-safe.geehani.chatgpt.site/

## Versi nama kod

Branch `codex/versi-nama-kod` menggunakan ALFA (Ketua Skuad), NOVA (Pakar Komunikasi), BYTE (Pakar Digital) dan AURA (Pakar Sokongan).
