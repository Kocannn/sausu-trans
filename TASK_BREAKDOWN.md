# Breakdown Tugas Pengembangan Website Profil Desa

Berdasarkan dokumen `PRD.md`, berikut adalah breakdown tugas (Task Breakdown) yang disusun secara terstruktur untuk memudahkan proses pengembangan (development). Proses dibagi menjadi beberapa fase (epics/milestones).

## Fase 1: Setup & Infrastruktur Dasar (Project Setup)
*Fokus: Mempersiapkan lingkungan kerja, repositori, dan kerangka kerja.*
- [X] Inisialisasi repositori Git dan atur aturan percabangan (branching strategy).
- [X] Instalasi dan setup framework backend (misal: Laravel 11+).
- [X] Setup koneksi database (PostgreSQL/MySQL).
- [X] Konfigurasi environment (development, staging, production).
- [X] Inisialisasi frontend framework/tools (Tailwind CSS, Vite, dll).
- [ ] Setup Authentication (Login/Logout) untuk Admin.
- [ ] Setup Role-Based Access Control (RBAC) dengan *Spatie Permission* (Super Admin & Editor).

## Fase 2: Desain & Skema Database (Data Modeling)
*Fokus: Membuat tabel-tabel dan relasi antar tabel (Migration & Seeder).*
- [x] **Tabel Users & Roles:** Akun admin dan staf.
- [x] **Tabel Profil/Pengaturan Desa:** Menyimpan konfigurasi tunggal (Nama, Logo, Sejarah, Visi Misi, Kontak, Link Sosmed, Peta).
- [x] **Tabel Aparatur Desa:** Nama, Jabatan, Foto, Urutan tampil.
- [x] **Tabel Berita & Kategori Berita:** Judul, slug, konten, thumbnail, penulis, status (draft/publish), waktu rilis.
- [x] **Tabel Galeri (Album & Media):** Nama album, kategori (foto/video), multi-upload media.
- [x] **Tabel Layanan Publik:** Nama layanan, deskripsi, persyaratan (bisa berupa teks/HTML), jam operasional, status.
- [x] **Tabel Potensi Desa (UMKM/Wisata):** Nama entitas, kategori (wisata/produk), deskripsi, gambar, info tambahan (harga/kontak).
- [x] **Tabel Audit Trail (Log Aktivitas):** Mencatat entitas yang diubah, aksi (create/update/delete), siapa yang mengubah, dan waktu.

## Fase 3: Pengembangan Admin Panel (Backend/CMS)
*Fokus: Membuat antarmuka dan fungsi bagi Admin untuk mengelola konten web.*
- [x] **Setup Layout & Dashboard Admin:** Template layout admin panel dan statistik singkat (jumlah berita, pengunjung, dll).
- [x] **Manajemen Pengaturan Desa:** Halaman form tunggal untuk mengatur logo, nama, kontak, dan sejarah desa.
- [x] **Manajemen Aparatur Desa:** Fitur CRUD dan unggah pas foto aparatur.
- [x] **Manajemen Berita/Artikel:** 
  - CRUD Berita.
  - Integrasi *Rich Text Editor* (contoh: TinyMCE/CKEditor).
  - Manajemen kategori berita.
- [x] **Manajemen Galeri:** Fitur upload multi-gambar (*mass upload*), kompresi gambar otomatis, dan CRUD album/kategori galeri.
- [x] **Manajemen Layanan Publik:** CRUD persyaratan dan informasi layanan administrasi desa.
- [x] **Manajemen Etalase Potensi:** CRUD untuk daftar potensi/UMKM/wisata.
- [x] **Manajemen User (Admin/Staf):** CRUD akun admin dan penetapan peran (*Role*).
- [ ] **Implementasi Audit Trail & Soft-Deletes:** Terapkan perlindungan dan pencatatan riwayat setiap aksi hapus/ubah di semua modul.

## Fase 4: Pengembangan Halaman Publik (Frontend)
*Fokus: Mengembangkan antarmuka (UI) yang dapat diakses oleh masyarakat umum.*
- [x] **Setup Layout Utama:** Header (Navbar & Logo), Footer, Breadcrumb navigation, dan tombol "Back to top".
- [x] **Halaman Beranda (Homepage):**
  - Komponen Hero Banner.
  - Seksi Statistik Desa Singkat (luas, demografi).
  - Seksi Akses Cepat Layanan.
  - Highlight 3-5 Berita/Kegiatan terbaru.
- [x] **Halaman Profil Desa:** Menampilkan sejarah, visi misi, dan *card list* aparatur desa.
- [x] **Halaman Portal Layanan Publik:** Daftar layanan yang bisa di-klik untuk melihat rincian syarat dan jam kerja.
- [x] **Halaman Pusat Informasi (Berita/Kegiatan):** 
  - Daftar semua berita dengan pagination.
  - Fitur pencarian artikel/berita (Search).
  - Halaman Detail Berita.
- [x] **Halaman Etalase Potensi Desa:** Katalog bergambar untuk produk UMKM dan Wisata.
- [x] **Halaman Galeri Media:** Grid layout untuk foto & video, filter berdasarkan album/kategori.
- [x] **Halaman Kontak:** Peta lokasi interaktif (Google Maps iframe) dan formulir kontak/daftar info nomor penting.

## Fase 5: Pengujian, Keamanan, & Optimasi (Refinement)
*Fokus: Memastikan kualitas, kecepatan, SEO, dan keamanan aplikasi.*
- [ ] **Responsiveness Check:** Uji tampilan di berbagai ukuran layar (Mobile, Tablet, Desktop).
- [ ] **Optimasi Performa & Gambar:** Pastikan gambar terkompresi dan website loading cepat.
- [ ] **Optimasi SEO:** Terapkan Meta Tags (Title, Description) dinamis, OpenGraph tag, HTML semantik, dan URL *slug* yang ramah SEO.
- [ ] **Keamanan:** 
  - Pastikan semua form terproteksi CSRF.
  - Sanitasi input untuk menghindari XSS dan SQL Injection.
  - Enforce HTTPS (pada tingkat server/kode).
- [ ] **Pengujian Aksesibilitas (A11y):** Pastikan kontras warna memadai dan elemen bisa dinavigasi (dasar WCAG 2.1).

## Fase 6: Rilis & Persiapan Produksi (Deployment)
*Fokus: Mempersiapkan aplikasi untuk live di server publik.*
- [ ] Siapkan server/hosting dan domain desa (contoh: .desa.id).
- [ ] Setup SSL (Let's Encrypt / Cloudflare).
- [ ] Deployment kode dari repositori ke server produksi.
- [ ] Siapkan dokumentasi (Buku Panduan Admin).
- [ ] Training/Panduan singkat untuk perwakilan desa.
