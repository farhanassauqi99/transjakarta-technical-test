# Technical Test – Cypress Automation (PT Transportasi Jakarta)

Repositori ini berisi implementasi automasi pengujian untuk asesmen teknis posisi Quality Assurance Automation di PT Transportasi Jakarta. Pengujian mencakup skenario **Positive Test**, **Negative Test**, serta skenario **Interactions Test case** menggunakan Cypress, Page Object Model (POM), dan Data-Driven Testing berbasis file CSV.

---

## Ruang Lingkup Pengujian

### 1. Web Tables (DemoQA)
- **Positive Test Case (Data-Driven Testing)**:
  - Membaca kumpulan data user dari file CSV (`cypress/fixtures/users.csv`).
  - Mendaftarkan banyak user (*bulk insert*) secara berulang via modal registrasi.
  - Memvalidasi data setiap user berhasil tersimpan dan tampil di baris tabel.
- **Negative Test Case**:
  - Menguji validasi form saat field wajib (**Email**) dikosongkan.
  - Memastikan form memicu status validasi error (`was-validated`) dan data tidak tersimpan ke dalam tabel.

### 2. Nilai Plus (Bonus Skenario)
- **Droppable**: Melakukan aksi *drag and drop* elemen hingga status berubah menjadi *Dropped!*.
- **Resizable**: Melakukan aksi *resize* container element hingga mencapai dimensi ukuran 400x200 piksel.

---

## Arsitektur & Pola Desain

- **Design Pattern**: **Page Object Model (POM)** memisahkan selector dan aksi antarmuka (`cypress/pages/WebTablesPage.js`) dari skenario pengujian agar kode modular dan mudah dipelihara.
- **Data Parser**: Menggunakan library `neat-csv` untuk parsing file CSV mentah menjadi array objek JavaScript.
- **Resilience Strategy**: Menambahkan penanganan `blockHosts` pada konfigurasi Cypress untuk memblokir script iklan pihak ketiga di DemoQA agar proses uji berjalan stabil dan lancar.

---

## Struktur Proyek

```text
├── cypress/
│   ├── e2e/
│   │   ├── bulk_registration.cy.js    # Skenario 4.1 (Positive) & 4.2 (Negative)
│   │   └── bonus_interactions.cy.js   # Skenario 5 (Droppable & Resizable)
│   ├── fixtures/
│   │   └── users.csv                 # Test data registrasi massal
│   ├── pages/
│   │   └── WebTablesPage.js          # Implementasi Page Object Model
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .gitignore
├── cypress.config.js                 # Konfigurasi timeout & blockHosts
├── package.json
└── README.md

```

---

## Prasyarat

* Node.js versi 16.x atau lebih baru
* npm versi 8.x atau lebih baru

---

## Panduan Menjalankan Pengujian

1. Clone repositori dan masuk ke direktori proyek:
```bash
git clone [https://github.com/farhanassauqi99/](https://github.com/farhanassauqi99/)<NAMA_REPO>.git
cd <NAMA_REPO>

```


2. Instal dependencies:
```bash
npm install

```


3. Eksekusi Pengujian:
* **Mode Interaktif (Cypress UI Runner):**
```bash
npx cypress open

```


* **Mode Headless (Terminal / CLI):**
```bash
# Menjalankan pengujian Web Tables (Positive & Negative)
npx cypress run --spec "cypress/e2e/bulk_registration.cy.js"

# Menjalankan skenario Nilai Plus (Droppable & Resizable)
npx cypress run --spec "cypress/e2e/bonus_interactions.cy.js"

# Menjalankan seluruh skenario sekaligus
npx cypress run

```





---

## Penulis

* **Nama**: Mohammad Farhan
* **Posisi**: Quality Assurance Engineer

