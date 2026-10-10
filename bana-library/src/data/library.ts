export type Category = {
  name: string;
  slug: string;
  description: string;
  icon: string;
};

export type Book = {
  title: string;
  slug: string;
  author: string;
  category: string;
  description: string;
  longDescription: string;
  publishedYear: number;
  publisher: string;
  format: 'PDF' | 'EPUB';
  available: boolean;
  featured?: boolean;
  color: string;
};

export const categories: Category[] = [
  { name: 'Teknologi & Informatika', slug: 'teknologi', icon: '⌘', description: 'Komputasi, kecerdasan buatan, desain produk, dan dunia digital.' },
  { name: 'Sains', slug: 'sains', icon: '✦', description: 'Cara kerja alam melalui pengamatan, bukti, dan eksperimen.' },
  { name: 'Biologi', slug: 'biologi', icon: '⌁', description: 'Kehidupan, ekosistem, genetika, dan keragaman hayati.' },
  { name: 'Matematika', slug: 'matematika', icon: '∑', description: 'Pola, logika, bilangan, dan bahasa universal ilmu pengetahuan.' },
  { name: 'Fisika', slug: 'fisika', icon: 'φ', description: 'Materi, energi, ruang, waktu, dan hukum dasar semesta.' },
  { name: 'Kimia', slug: 'kimia', icon: '⚗', description: 'Unsur, molekul, reaksi, dan materi di sekitar kita.' },
  { name: 'Sejarah', slug: 'sejarah', icon: '◷', description: 'Perjalanan masyarakat, gagasan, dan peristiwa pembentuk dunia.' },
  { name: 'Filsafat', slug: 'filsafat', icon: '◇', description: 'Pertanyaan mendasar tentang pengetahuan, etika, dan kehidupan.' },
  { name: 'Ekonomi & Bisnis', slug: 'ekonomi-bisnis', icon: '↗', description: 'Ekonomi, organisasi, kewirausahaan, dan keputusan bisnis.' },
  { name: 'Pendidikan', slug: 'pendidikan', icon: '⌂', description: 'Belajar, mengajar, pedagogi, dan masa depan pendidikan.' },
  { name: 'Sastra & Bahasa', slug: 'sastra-bahasa', icon: '¶', description: 'Karya sastra, linguistik, budaya, dan kekuatan bahasa.' },
  { name: 'Psikologi', slug: 'psikologi', icon: '◎', description: 'Pikiran, perilaku, emosi, dan relasi manusia.' },
];

const descriptions: Record<string, string> = {
  teknologi: 'Panduan jernih untuk memahami teknologi dan dampaknya pada kehidupan sehari-hari.',
  sains: 'Pengantar berbasis bukti untuk melihat fenomena alam dengan rasa ingin tahu.',
  biologi: 'Menyelami sistem kehidupan dari sel terkecil hingga ekosistem yang luas.',
  matematika: 'Menemukan keindahan pola dan penalaran matematis dalam persoalan nyata.',
  fisika: 'Membaca hukum alam lewat gerak, cahaya, energi, dan struktur semesta.',
  kimia: 'Memahami perubahan materi dan reaksi yang membentuk dunia di sekitar kita.',
  sejarah: 'Menelusuri jejak masa lalu untuk memahami dunia yang kita huni hari ini.',
  filsafat: 'Undangan untuk berpikir cermat tentang makna, nilai, dan kebenaran.',
  'ekonomi-bisnis': 'Kerangka praktis untuk membaca pasar, organisasi, dan keputusan ekonomi.',
  pendidikan: 'Gagasan dan praktik belajar yang berpihak pada rasa ingin tahu peserta didik.',
  'sastra-bahasa': 'Menjelajahi cerita, bahasa, dan cara manusia menyusun pengalaman.',
  psikologi: 'Memahami proses mental dan perilaku manusia secara hangat dan ilmiah.',
};

const seed = [
  ['Algoritma untuk Semua', 'Nara Widjaja', 'teknologi', 2025, 'Nusa Aksara', 'PDF', true, true, '#275b50'],
  ['Desain yang Manusiawi', 'Raka Pradipta', 'teknologi', 2024, 'Ruang Digital', 'EPUB', false, false, '#b75b3e'],
  ['Semesta dalam Secangkir Kopi', 'Maya Anindita', 'sains', 2025, 'Cakrawala', 'EPUB', true, true, '#324d73'],
  ['Cara Ilmuwan Bertanya', 'Bima Kusuma', 'sains', 2022, 'Cakrawala', 'PDF', false, false, '#796339'],
  ['Hutan yang Bernapas', 'Ayu Lestari', 'biologi', 2024, 'Rimba Kata', 'PDF', false, true, '#497744'],
  ['Gen dan Kehidupan', 'Damar Harsono', 'biologi', 2021, 'Nusa Aksara', 'EPUB', false, false, '#8b4f67'],
  ['Matematika di Sekitar Kita', 'Nadia Paramita', 'matematika', 2025, 'Angka Press', 'PDF', true, true, '#4d5e9a'],
  ['Logika Tanpa Takut', 'Reza Maulana', 'matematika', 2023, 'Angka Press', 'EPUB', false, false, '#9a713c'],
  ['Cahaya dan Bayangan', 'Surya Adikara', 'fisika', 2024, 'Spektrum', 'PDF', false, true, '#485f80'],
  ['Waktu, Ruang, Gerak', 'Laras Sekar', 'fisika', 2020, 'Spektrum', 'EPUB', false, false, '#655884'],
  ['Molekul yang Mengubah Dunia', 'Tania Prameswari', 'kimia', 2025, 'Unsur Media', 'PDF', false, true, '#3a7770'],
  ['Kimia dalam Dapur', 'Farid Akbar', 'kimia', 2022, 'Unsur Media', 'EPUB', false, false, '#a8623c'],
  ['Jejak Nusantara', 'Gilang Ramadhan', 'sejarah', 2024, 'Waktu Pustaka', 'PDF', true, true, '#87513f'],
  ['Kota dan Ingatan', 'Sekar Wening', 'sejarah', 2019, 'Waktu Pustaka', 'EPUB', false, false, '#5d594d'],
  ['Seni Bertanya', 'Aldo Mahendra', 'filsafat', 2025, 'Agora', 'EPUB', false, true, '#655b87'],
  ['Etika untuk Hari Ini', 'Ratri Kinanti', 'filsafat', 2021, 'Agora', 'PDF', false, false, '#445b4a'],
  ['Ekonomi yang Membumi', 'Hana Wiratama', 'ekonomi-bisnis', 2024, 'Arus Buku', 'PDF', false, true, '#47636e'],
  ['Bisnis Berkelanjutan', 'Kevin Santosa', 'ekonomi-bisnis', 2023, 'Arus Buku', 'EPUB', false, false, '#587d64'],
  ['Kelas yang Bertumbuh', 'Putri Maheswari', 'pendidikan', 2025, 'Pelita Ilmu', 'PDF', true, true, '#b06943'],
  ['Belajar Sepanjang Hayat', 'Ahmad Fikri', 'pendidikan', 2020, 'Pelita Ilmu', 'EPUB', false, false, '#4f7180'],
  ['Bahasa dan Kita', 'Ningrum Sari', 'sastra-bahasa', 2024, 'Kata Kita', 'EPUB', false, true, '#9b4e46'],
  ['Cerita dari Selatan', 'Jati Permana', 'sastra-bahasa', 2022, 'Kata Kita', 'PDF', false, false, '#7f5c3f'],
  ['Pikiran yang Tenang', 'Dewi Kartika', 'psikologi', 2025, 'Tumbuh Media', 'PDF', true, true, '#506a68'],
  ['Mengenal Emosi', 'Reno Baskara', 'psikologi', 2023, 'Tumbuh Media', 'EPUB', false, false, '#8e5863'],
] as const;

export const books: Book[] = seed.map(([title, author, category, publishedYear, publisher, format, available, featured, color]) => ({
  title, author, category, publishedYear, publisher, format, available, featured, color,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  description: descriptions[category],
  longDescription: `${descriptions[category]} Buku demonstrasi ini disusun sebagai bagian dari katalog Bana untuk memperlihatkan pengalaman menjelajah koleksi digital. Metadata bersifat contoh dan tidak merepresentasikan terbitan komersial yang sebenarnya.`,
}));

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getBooksByCategory = (slug: string) => books.filter((book) => book.category === slug);
export const getCategoryName = (slug: string) => getCategory(slug)?.name ?? slug;
