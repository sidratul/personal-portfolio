# Personal Portfolio

Next.js App Router, TypeScript, Tailwind CSS, dan animasi kartu berbasis Web Animations API.

## Menjalankan

```sh
pnpm install
pnpm dev
```

Buka http://localhost:3001.

## Pemeriksaan dan build

```sh
pnpm typecheck
pnpm build
```

Build menggunakan static export dan menghasilkan folder `out/`.

## Personalisasi

- Edit nama, profesi, karya, dan kontak di `app/page.tsx`.
- Edit judul serta deskripsi situs di `app/layout.tsx`.
- Edit warna serta layout di `app/globals.css`.
- Animasi kartu saat scroll ada di `components/animated-card.tsx`. Menghormati prefers-reduced-motion.
- Bookti DTI ditampilkan sebagai featured project dengan tautan Google Play; screenshot Android dan iOS disimpan lokal di `public/images/bookti/`, dengan pilihan platform pada galeri. Sumber aset dicatat di `public/images/bookti/sources.json`. Tidak membutuhkan koneksi ke CDN store untuk menampilkan gambar.
- Simpan `cv.pdf` dan `portfolio.pdf` di `public/documents/`, lalu aktifkan tautan download sesuai petunjuk di folder tersebut. Tombol belum ditampilkan karena dokumen belum tersedia.
- Kartu proyek masih merupakan contoh visual, belum terhubung ke studi kasus.

## Vercel

Impor repository ke Vercel dan pilih preset Next.js. Gunakan build command `pnpm build`. Proyek tidak membutuhkan database, environment variable, atau fungsi server.

## Port lokal

Atur `PORT=3001` di `.env`, lalu jalankan ulang `pnpm dev`. Jika `.env` belum tersedia, salin `.env.example` menjadi `.env`. Perintah dev membaca file env melalui API Node.js (minimal Node 20.12).
