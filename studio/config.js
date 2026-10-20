'use strict';
/* ivite Studio — mengendalikan template/ lewat postMessage; ekspor undangan. */
var DEFAULTS = {
  content:{ overlineCover:'THE WEDDING OF', bride:'Sekar', groom:'Bagas', amp:'&',
    guestLabel:'Kepada Bapak/Ibu/Saudara/i', guest:'Tamu Undangan', tagline:'Dua hati, satu perjalanan.',
    date:'2026-12-20T08:00:00+07:00', brideFull:'Sekar Ayuningtyas', groomFull:'Bagas Pradipta',
    brideParents:'Putri dari Bapak & Ibu Mempelai Wanita', groomParents:'Putra dari Bapak & Ibu Mempelai Pria',
    blessingOver:'DENGAN RAHMAT & RESTU', blessingTitle:'Tentang dua hati.',
    blessingBody:'Dengan penuh syukur, kami mengundang Anda menjadi bagian dari hari istimewa kami.',
    coupleOver:'SANG MEMPELAI', eventOver:'HARI YANG DINANTI', eventTitle:'Janji suci.',
    ceremonyName:'Akad Nikah', ceremonyTime:'08.00 – 09.00 WIB', receptionName:'Resepsi', receptionTime:'11.00 – 14.00 WIB',
    venue:'Pendopo Keluarga', address:'Yogyakarta, DIY', mapQuery:'Yogyakarta',
    rsvpOver:'KONFIRMASI', rsvpTitle:'Hadir & titipkan doa.', closingOver:'TERIMA KASIH', closingTitle:'Sampai jumpa di hari bahagia.',
    galleryOver:'GALERI', galleryTitle:'Cerita dalam bingkai.', arrivalText:'Sebuah kisah akan dimulai…' },
  theme:{ bg:'#e7dec8', paper:'#f6eedc', ink:'#5e1b20', gold:'#ae8043', accent:'#8e6a3c', soft:'#8a6a4a', line:'#cdb48e', dark:'#5e1b20', darkFg:'#f4e8d6' },
  fonts:{ display:"'Cormorant Garamond',Georgia,serif", body:"'DM Sans',Arial,sans-serif",
    link:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600&family=DM+Sans:wght@400;500;600&display=swap' },
  assets:{ base:'../assets/prada/', arch:'ceremonial-arch.svg', floralLeft:'floral-left.webp', floralRight:'floral-right.webp', mountain:'mountain.webp', pavilion:'pavilion.webp', ornament:'ornament.webp',
    photosBase:'../assets/photos/', portraitBride:'09-pengantin-wanita.webp', portraitGroom:'10-pengantin-pria.webp',
    photos:['01-formal.webp','02-berjalan.webp','03-saling-menatap.webp','04-duduk-bersama.webp','05-sentuhan-dahi.webp','06-tampak-belakang.webp'] },
  sections:{ hero:true, blessing:true, couple:true, event:true, gallery:true, rsvp:true, closing:true },
  radius:120, cinematic:true
};
var PRESETS = {
  prada:{ label:'Prada (Maroon)', theme:DEFAULTS.theme, assets:{base:'../assets/prada/'} },
  sage:{ label:'Sage (Hijau)', theme:{ bg:'#dcded1', paper:'#f5f0e5', ink:'#354a3d', gold:'#ae8951', accent:'#8e784c', soft:'#6c775c', line:'#b9a578', dark:'#354a3d', darkFg:'#f4edde' }, assets:{base:'../assets/sage/'} }
};
var DISPLAY_FONTS=[
 {n:'Cormorant Garamond',q:'Cormorant+Garamond:ital,wght@0,400;0,500;0,600',s:"'Cormorant Garamond',Georgia,serif"},
 {n:'Playfair Display',q:'Playfair+Display:wght@400;500;600',s:"'Playfair Display',Georgia,serif"},
 {n:'Cinzel',q:'Cinzel:wght@400;500;600',s:"'Cinzel',Georgia,serif"},
 {n:'Cormorant',q:'Cormorant:wght@400;500;600',s:"'Cormorant',Georgia,serif"},
 {n:'EB Garamond',q:'EB+Garamond:wght@400;500;600',s:"'EB Garamond',Georgia,serif"}];
var BODY_FONTS=[
 {n:'DM Sans',q:'DM+Sans:wght@400;500;600',s:"'DM Sans',Arial,sans-serif"},
 {n:'Inter',q:'Inter:wght@400;500',s:"'Inter',Arial,sans-serif"},
 {n:'Nunito Sans',q:'Nunito+Sans:wght@400;600',s:"'Nunito Sans',Arial,sans-serif"},
 {n:'Jost',q:'Jost:wght@400;500',s:"'Jost',Arial,sans-serif"}];
var SLOTS=[
 {k:'arch',label:'Bingkai (arch)',opts:['ceremonial-arch.svg']},
 {k:'floralLeft',label:'Bunga Kiri',opts:['floral-left.webp','blossom.webp','bouquet.webp','gunungan.webp']},
 {k:'floralRight',label:'Bunga Kanan',opts:['floral-right.webp','blossom.webp','bouquet.webp','gunungan.webp']},
 {k:'mountain',label:'Latar Gunung',opts:['mountain.webp','clouds.webp']},
 {k:'pavilion',label:'Paviliun',opts:['pavilion.webp']},
 {k:'ornament',label:'Ornamen / Divider',opts:['ornament.webp','gunungan.webp','blossom.webp']}];
var CONTENT_FIELDS=[
 ['bride','Nama Mempelai Wanita'],['groom','Nama Mempelai Pria'],['date','Tanggal & Waktu','dt'],
 ['guestLabel','Label Tamu'],['guest','Nama Tamu (default)'],['overlineCover','Overline Cover'],['tagline','Tagline'],
 ['brideFull','Nama Lengkap Wanita'],['brideParents','Orang Tua Wanita'],['groomFull','Nama Lengkap Pria'],['groomParents','Orang Tua Pria'],
 ['blessingOver','Blessing — Overline'],['blessingTitle','Blessing — Judul'],['blessingBody','Blessing — Teks','ta'],
 ['eventTitle','Acara — Judul'],['ceremonyName','Nama Akad'],['ceremonyTime','Waktu Akad'],['receptionName','Nama Resepsi'],['receptionTime','Waktu Resepsi'],
 ['venue','Lokasi'],['address','Alamat'],['mapQuery','Query Peta'],
 ['galleryTitle','Galeri — Judul'],['rsvpTitle','RSVP — Judul'],['closingTitle','Penutup — Judul'],['arrivalText','Teks Sekuens Masuk']];
var COLORS=[['ink','Teks / Ink'],['gold','Emas'],['paper','Kertas'],['bg','Latar'],['accent','Aksen'],['soft','Teks Lembut'],['line','Garis'],['dark','Panel Gelap'],['darkFg','Teks di Panel Gelap']];
