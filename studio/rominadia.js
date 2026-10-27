/* Editable botanical garden design, inspired by the supplied Romi & Nadia reference. */
var ROMINADIA = {
 renderer:'rominadia', rendererVersion:2, preset:'rominadia',
 content:{
  overlineCover:'THE WEDDING OF',groom:'Romi',bride:'Nadia',amp:'&',monogram:'RN',
  date:'2026-12-27T15:00:00+07:00',guestLabel:'Yth. Bapak/Ibu/Saudara/i,',guest:'Tamu Undangan',openButton:'Buka Undangan',
  tagline:'#ROManceforNADIA',arrivalText:'Awal dari sebuah perjalanan selamanya',sideTagline:'Together is a beautiful place to be.',
  blessingOver:'WITH GRATEFUL HEARTS',blessingTitle:'Dua hati. Satu janji.',blessingBody:'Dengan penuh syukur dan sukacita, kami mengundang Anda untuk merayakan hari pernikahan kami.',
  quote:'Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.',quoteSource:'Kolose 3:14',
  coupleOver:'WITH LOVE',coupleTitle:'The happy couple',groomFull:'Romi Wijaya',brideFull:'Nadia Miharsa',groomParents:'Putra dari\nBapak & Ibu Keluarga Mempelai Pria',brideParents:'Putri dari\nBapak & Ibu Keluarga Mempelai Wanita',
  storyOver:'EVERY LOVE HAS A STORY',storyTitle:'Our little journey',storyOneTitle:'2015 · Pertemuan',storyOneBody:'Dari sebuah pertemuan sederhana, tumbuh persahabatan yang perlahan menjadi rumah bagi kami.',storyTwoTitle:'2024 · Memilih selamanya',storyTwoBody:'Melalui jarak dan waktu, kami belajar bahwa cinta adalah keputusan untuk terus berjalan bersama.',storyThreeTitle:'2026 · Awal yang baru',storyThreeBody:'Dengan restu keluarga, kami mengikat janji untuk mengawali perjalanan selamanya.',
  eventOver:'SAVE THE DATE',eventTitle:'A day to remember',ceremonyLabel:'THE HOLY MATRIMONY',ceremonyName:'Pemberkatan',ceremonyTime:'16.00 WITA',teaName:'Teapai',teaTime:'17.00 WITA',receptionLabel:'THE CELEBRATION',receptionName:'Resepsi',receptionTime:'18.30 WITA',venue:'St. Regis Bali',address:'Nusa Dua, Bali',gpsCoordinates:'',mapQuery:'St. Regis Bali',mapButton:'Lihat Lokasi',calendarButton:'Ingatkan Acara',dressCode:'Formal · Sage, ivory & soft neutrals',
  rsvpOver:'YOUR PRESENCE MEANS THE WORLD',rsvpTitle:'RSVP & wishes',rsvpIntro:'Mohon konfirmasi kehadiran Anda dan tinggalkan doa untuk perjalanan baru kami.',rsvpNameLabel:'Nama',rsvpNamePlaceholder:'Nama Anda',rsvpAttendanceLabel:'Konfirmasi kehadiran',rsvpChoose:'Pilih kehadiran',rsvpYes:'Dengan senang hati, hadir',rsvpNo:'Maaf, belum bisa hadir',partyLabel:'Jumlah tamu',rsvpWishLabel:'Ucapan & doa',rsvpWishPlaceholder:'Tuliskan doa baik Anda…',rsvpButton:'Simpan Konfirmasi',rsvpThanks:'Terima kasih! Konfirmasi tersimpan di browser ini.',
  giftOver:'A LITTLE TOKEN OF LOVE',giftTitle:'Wedding gift',giftIntro:'Doa dan kehadiran Anda adalah hadiah terindah. Jika ingin berbagi tanda kasih, kami menerimanya dengan penuh syukur.',giftBankOne:'Nama Bank',giftNumberOne:'',giftOwnerOne:'Romi Wijaya',giftBankTwo:'Nama Bank',giftNumberTwo:'',giftOwnerTwo:'Nadia Miharsa',giftCopy:'Salin nomor rekening',
  streamTitle:'Celebrate from anywhere',streamIntro:'Ikuti momen istimewa kami melalui siaran langsung.',streamUrl:'',streamButton:'Buka siaran langsung',
  galleryOver:'OUR MOMENTS',galleryTitle:'The gallery',galleryIntro:'Sedikit dari banyak kenangan yang membawa kami ke hari ini.',galleryHint:'Ketuk foto untuk melihat lebih dekat.',closingOver:'WITH LOVE, ALWAYS',closingTitle:'Thank you',closingBody:'Terima kasih atas setiap doa, cinta, dan perhatian. Sampai bertemu di hari bahagia kami.',
  navCover:'Pembuka',navCouple:'Mempelai',navEvent:'Acara',navGallery:'Galeri',navRsvp:'RSVP',daysLabel:'Hari',hoursLabel:'Jam',minutesLabel:'Menit',secondsLabel:'Detik',scrollCue:'SCROLL TO DISCOVER'
 },
 theme:{bg:'#e4eeee',paper:'#f7f8f2',ink:'#46635d',gold:'#b49b6b',accent:'#78968a',soft:'#70857d',line:'#b7c9bd',dark:'#3e6866',darkFg:'#f7f8f2'},
 fonts:{display:"'Great Vibes',cursive",body:"'Cormorant Upright',Georgia,serif",link:'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Upright:wght@400;500;600&display=swap'},
 typography:{nameSize:62,headingSize:44,bodySize:18,lineHeight:1.7,letterSpacing:0},
 assets:{base:'/designs/rominadia/assets/',photosBase:'/designs/rominadia/assets/',arch:'',mountain:'bg_cover.webp',pavilion:'asset_bottom_jembatan.webp',floralLeft:'asset_top_flower_1.webp',floralRight:'asset_top_flower_1.webp',clouds:'asset_top_light.webp',gardenLeft:'asset_bottom_flower_1.webp',gardenMiddle:'asset_bottom_flower_2.webp',gardenRight:'asset_bottom_flower_1.webp',ornament:'asset_icon_butterfly.webp',gunungan:'',crown:'asset_top_pohon_1.webp',wayang:'',banana:'asset_bottom_daun_1.webp',accentBranch:'asset_top_flower_3.webp',portraitBride:'2.webp',portraitGroom:'1.webp',photoOne:'desktop.webp',photoTwo:'bg_content.webp',photos:['1.webp','2.webp','3.webp','4.webp','5.webp']},
 sections:{hero:true,blessing:true,couple:true,story:true,event:true,rsvp:true,gift:true,gallery:true,closing:true},
 order:['hero','blessing','couple','story','event','rsvp','gift','gallery','closing'],
 entrance:{style:'garden',duration:15,atmosphere:65},radius:140,cinematic:true,animations:{},elementPositions:{},music:{enabled:false,src:'',name:'',volume:45,autoplay:true}
};
var ROMINADIA_GROUPS=[
 ['Garden details',[['monogram','Monogram'],['quote','Opening quote','textarea'],['quoteSource','Quote source'],['teaName','Tea ceremony name'],['teaTime','Tea ceremony time'],['dressCode','Dress code'],['sideTagline','Desktop photo caption']]],
 ['Wedding gift',[['giftOver','Gift label'],['giftTitle','Gift heading'],['giftIntro','Gift introduction','textarea'],['giftBankOne','First bank'],['giftNumberOne','First account number'],['giftOwnerOne','First account owner'],['giftBankTwo','Second bank'],['giftNumberTwo','Second account number'],['giftOwnerTwo','Second account owner'],['giftCopy','Copy button label']]],
 ['Live streaming',[['streamTitle','Streaming heading'],['streamIntro','Streaming message','textarea'],['streamUrl','Live streaming URL'],['streamButton','Streaming button label']]]
];
