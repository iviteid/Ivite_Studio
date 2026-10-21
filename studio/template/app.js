'use strict';
// Replace the illustrative details here when preparing a real invitation.
const invitation = {
  bride: 'Sekar', groom: 'Bagas', brideFull: 'Sekar Ayuningtyas', groomFull: 'Bagas Pradipta',
  brideParents: 'Putri dari Bapak & Ibu Keluarga Mempelai Wanita',
  groomParents: 'Putra dari Bapak & Ibu Keluarga Mempelai Pria',
  date: '2026-12-20T08:00:00+07:00', endDate: '2026-12-20T14:00:00+07:00',
  ceremonyTime: '08.00 – 09.00 WIB', receptionTime: '11.00 – 14.00 WIB',
  venue: 'Pendopo Keluarga', address: 'Yogyakarta, Daerah Istimewa Yogyakarta',
  mapQuery: 'Yogyakarta', demo: true,
  // Set to your RSVP HTTPS endpoint to receive submissions. It must accept JSON.
  rsvpEndpoint: ''
};
if(window.IVITE_CONFIG&&window.IVITE_CONFIG.content)Object.assign(invitation,window.IVITE_CONFIG.content);
const field = key => key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
for (const key of ['bride', 'groom', 'brideFull', 'groomFull', 'brideParents', 'groomParents', 'ceremonyTime', 'receptionTime', 'venue', 'address']) {
  document.querySelectorAll('[data-' + field(key) + ']').forEach(el => {el.textContent = invitation[key];});
}
let weddingDate = new Date(invitation.date);
const longDate = new Intl.DateTimeFormat('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Jakarta'}).format(weddingDate);
const shortDate = new Intl.DateTimeFormat('id-ID', {day:'2-digit', month:'2-digit', year:'numeric', timeZone:'Asia/Jakarta'}).format(weddingDate).replaceAll('/', ' · ');
document.querySelectorAll('[data-long-date]').forEach(el => {el.textContent=longDate;});
document.querySelectorAll('[data-short-date]').forEach(el => {el.textContent=shortDate;});
function parseGPSCoordinates(value){
 const match=String(value||'').trim().match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/);
 if(!match)return null;
 const lat=Number(match[1]),lng=Number(match[2]);
 return Math.abs(lat)<=90&&Math.abs(lng)<=180?lat+','+lng:null;
}
function updateMapLink(details){
 const link=document.getElementById('map-link'),raw=String(details.gpsCoordinates||'').trim(),gps=parseGPSCoordinates(raw);
 const invalid=!!raw&&!gps;
 if(invalid){link.removeAttribute('href');link.setAttribute('aria-disabled','true');link.title='Please correct the venue GPS coordinates.';}
 else{link.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(gps||details.mapQuery||details.address||details.venue||'');link.removeAttribute('aria-disabled');link.removeAttribute('title');}
}
updateMapLink(invitation);
const guest = (new URLSearchParams(location.search).get('to') || 'Tamu Undangan').trim().slice(0, 80) || 'Tamu Undangan';
document.querySelectorAll('[data-guest]').forEach(el => {el.textContent=guest;});
if (guest !== 'Tamu Undangan') document.getElementById('guest-name').value=guest;
const studioMusic=createStudioMusic();
const studioAnimations=createStudioAnimations({navigate:section=>navigateStudio(section)});
const content=document.getElementById('invitation');
content.inert=true;
// The landscape stays behind the content; the botanical frame stays in front.
const stage=document.querySelector('.invitation-stage');
const frame=document.createElement('div');
frame.className='viewport-frame';frame.setAttribute('aria-hidden','true');
for(const selector of ['.stage-arch','.stage-flower-left','.stage-flower-right','.stage-pendant','.stage-garden'])frame.append(stage.querySelector(selector));
content.append(frame);
const coverGarden=frame.querySelector('.stage-garden').cloneNode(true);
coverGarden.classList.add('cover-garden');coverGarden.setAttribute('aria-hidden','true');
document.getElementById('cover').append(coverGarden);
const main=document.getElementById('main');
const navigation=document.querySelector('.bottom-nav');
let arrivalTimer;
function finishArrival(immediate=false){
  clearTimeout(arrivalTimer);
  if(immediate){
    // Skipping and section jumps settle the same finite tracks to their end.
    void document.body.offsetWidth;
    for(const animation of document.getAnimations()){
      if(animation.id.startsWith('ivite-element:')||animation.id.startsWith('ivite-position:'))continue;
      const timing=animation.effect?.getComputedTiming();
      if(timing&&Number.isFinite(timing.iterations)&&Number.isFinite(timing.endTime)){
        try{animation.finish();}catch{}
      }
    }
  }
  document.getElementById('cinema-skip').hidden=true;
  document.body.classList.add('scene-ready');
  document.body.classList.remove('locked','arriving');
  main.inert=false;navigation.inert=false;
  document.getElementById('arrival-caption').textContent='';
  main.focus({preventScroll:true});
}
const cover=document.getElementById('cover');
const openButton=document.getElementById('open-invitation');
openButton.focus({preventScroll:true});
cover.addEventListener('keydown', event => {
  if(event.key==='Tab'){event.preventDefault();openButton.focus();}
});
openButton.addEventListener('click', () => {
  studioMusic.open();
  content.inert=false;
  main.inert=true;navigation.inert=true;
  window.scrollTo({top:0,behavior:'instant'});
  document.body.classList.add('has-opened','arriving');
  cover.classList.add('opening');
  cover.setAttribute('aria-hidden','true');
  cover.inert=true;
  if((window.IVITE_CONFIG&&window.IVITE_CONFIG.cinematic===false)||matchMedia('(prefers-reduced-motion: reduce)').matches){finishArrival(true);return;}
  document.getElementById('arrival-caption').textContent=invitation.arrivalText||'Sebuah kisah akan dimulai…';
  document.getElementById('arrival-caption').focus({preventScroll:true});
  document.getElementById('cinema-skip').hidden=false;
  const duration=window.IVITE_CONFIG?.entrance?.style==='classic'?5400:Math.max(6,Math.min(14,Number(window.IVITE_CONFIG?.entrance?.duration)||9))*1000;
  // The overlay is the entrance clock: finish after its actual last painted frame.
  // A delayed fallback handles browsers that suppress animation events.
  arrivalTimer=setTimeout(()=>finishArrival(true),duration+(document.body.classList.contains('cinema-mode')?750:0));
});
const observer=new IntersectionObserver(entries => {
  entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const navLinks=[...document.querySelectorAll('.bottom-nav a')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});
},{rootMargin:'-10% 0px -55% 0px'});
['home','couple','event','gallery','rsvp'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
function tick(){
  const seconds=Math.max(0,Math.floor((Number.isFinite(weddingDate.getTime())?weddingDate-Date.now():0)/1000));
  const values={days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
  for(const [id,value] of Object.entries(values))document.getElementById(id).textContent=String(value).padStart(2,'0');
  if(!seconds)document.getElementById('countdown-message').textContent='Hari bahagia telah tiba.';
}
tick();setInterval(tick,1000);
const motion=document.getElementById('motion');
function setMotion(paused){document.body.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Lanjutkan animasi':'Jeda animasi');motion.textContent=paused?'▶':'Ⅱ';}
setMotion(matchMedia('(prefers-reduced-motion: reduce)').matches);
motion.addEventListener('click',()=>setMotion(!document.body.classList.contains('paused')));
const stamp=value=>new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
const escapeICS=value=>value.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
document.getElementById('calendar').addEventListener('click',()=>{
  if(!Number.isFinite(new Date(invitation.date).getTime()))return;
  const title=(invitation.demo?'[CONTOH] ':'')+'Pernikahan '+invitation.bride+' & '+invitation.groom;
  const calendar=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ivite//Sekar Sage//ID','BEGIN:VEVENT','UID:sekar-sage-'+stamp(invitation.date)+'@ivite.local','DTSTAMP:'+stamp(Date.now()),'DTSTART:'+stamp(invitation.date),'DTEND:'+stamp(new Date(new Date(invitation.date).getTime()+6*3600000)),'SUMMARY:'+escapeICS(title),'LOCATION:'+escapeICS(invitation.venue+', '+invitation.address),'DESCRIPTION:'+escapeICS(invitation.demo?'Contoh acara untuk pratinjau tema. Tanggal dan lokasi belum dikonfirmasi.':'Kami menantikan kehadiran Anda.'),'END:VEVENT','END:VCALENDAR',''].join('\r\n');
  const url=URL.createObjectURL(new Blob([calendar],{type:'text/calendar;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='undangan-sekar-sage.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const storageKey='ivite-sekar-sage-rsvp-v1';
function showSaved(data){
  document.getElementById('saved-message').textContent=data.wish || 'Terima kasih atas konfirmasi Anda.';
  document.getElementById('saved-name').textContent=data.name;
  document.getElementById('saved-wish').hidden=false;
}
try{const saved=JSON.parse(localStorage.getItem(storageKey));if(saved && typeof saved.name==='string' && typeof saved.wish==='string')showSaved(saved);}catch{}
if(invitation.rsvpEndpoint){document.getElementById('rsvp-mode').textContent='Konfirmasi dan ucapan Anda akan dikirim kepada mempelai.';document.getElementById('rsvp-submit').firstChild.textContent='Kirim Konfirmasi ';}
const attendance=document.getElementById('attendance');
attendance.addEventListener('change',()=>{document.getElementById('party').disabled=attendance.value==='no';});
document.getElementById('rsvp-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const name=form.elements.name.value.trim();
  if(!name){form.elements.name.setCustomValidity('Mohon tuliskan nama Anda.');form.elements.name.reportValidity();return;}
  const data={name,attendance:form.elements.attendance.value,party:attendance.value==='no'?0:Number(form.elements.party.value),wish:form.elements.wish.value.trim(),submittedAt:new Date().toISOString()};
  const status=document.getElementById('form-status');const button=document.getElementById('rsvp-submit');button.disabled=true;
  try{
    if(invitation.rsvpEndpoint){const response=await fetch(invitation.rsvpEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(!response.ok)throw new Error('send');status.textContent='Terima kasih. Konfirmasi Anda telah dikirim.';}
    else{localStorage.setItem(storageKey,JSON.stringify(data));status.textContent=invitation.rsvpThanks||'Tersimpan di browser ini. Mode demo belum mengirim kepada mempelai.';}
    showSaved(data);
  }catch(error){status.textContent=invitation.rsvpEndpoint?'Konfirmasi belum terkirim. Silakan coba kembali.':'Browser tidak mengizinkan penyimpanan. Konfirmasi belum tersimpan.';}
  finally{button.disabled=false;}
});
document.getElementById('guest-name').addEventListener('input',event=>event.target.setCustomValidity(''));

// Native dialog provides keyboard focus containment and Escape-to-close.
let photoButtons=[...document.querySelectorAll('[data-photo]')];
const photoViewer=document.getElementById('photo-viewer');
let currentPhoto=0;
function displayPhoto(index){
  if(!photoButtons.length)return;
  currentPhoto=(index+photoButtons.length)%photoButtons.length;
  const tile=photoButtons[currentPhoto];
  const source=tile.querySelector('img');
  const image=document.getElementById('viewer-image');
  image.src=source.getAttribute('src');image.alt=source.alt;
  document.getElementById('viewer-caption').textContent=tile.querySelector('span').firstChild.textContent.trim();
  document.getElementById('viewer-count').textContent=(currentPhoto+1)+' / '+photoButtons.length;
}
function bindPhotos(){photoButtons=[...document.querySelectorAll('[data-photo]')];photoButtons.forEach((button,index)=>button.onclick=()=>{displayPhoto(index);photoViewer.showModal();document.body.classList.add('photo-open');});}
bindPhotos();
document.getElementById('viewer-close').addEventListener('click',()=>photoViewer.close());
document.getElementById('viewer-prev').addEventListener('click',()=>displayPhoto(currentPhoto-1));
document.getElementById('viewer-next').addEventListener('click',()=>displayPhoto(currentPhoto+1));
photoViewer.addEventListener('close',()=>document.body.classList.remove('photo-open'));
photoViewer.addEventListener('click',event=>{if(event.target===photoViewer)photoViewer.close();});
photoViewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();displayPhoto(currentPhoto-1);}
  if(event.key==='ArrowRight'){event.preventDefault();displayPhoto(currentPhoto+1);}
});

/* Editable bindings for the original Sekar Sage renderer. */
const RENDER_DEFAULT={"content": {"overlineCover": "THE WEDDING OF", "bride": "Sekar", "groom": "Bagas", "amp": "&", "guestLabel": "Kepada Bapak/Ibu/Saudara/i", "guest": "Tamu Undangan", "tagline": "Dua hati, satu perjalanan.", "date": "2026-12-20T08:00:00+07:00", "brideFull": "Sekar Ayuningtyas", "groomFull": "Bagas Pradipta", "brideParents": "Putri dari Bapak & Ibu Keluarga Mempelai Wanita", "groomParents": "Putra dari Bapak & Ibu Keluarga Mempelai Pria", "blessingOver": "DENGAN RAHMAT & RESTU", "blessingTitle": "Tentang dua hati\nyang dipertemukan.", "blessingBody": "Di antara banyaknya langkah, kami menemukan jalan untuk saling pulang. Dengan penuh syukur dan bahagia, kami mengundang Anda menjadi bagian dari hari istimewa kami.", "coupleOver": "SANG MEMPELAI", "eventOver": "HARI YANG DINANTI", "eventTitle": "Janji suci,\nkisah yang baru.", "ceremonyName": "Akad Nikah", "ceremonyTime": "08.00 \u2013 09.00 WIB", "receptionName": "Resepsi", "receptionTime": "11.00 \u2013 14.00 WIB", "venue": "Pendopo Keluarga", "address": "Yogyakarta, Daerah Istimewa Yogyakarta", "mapQuery": "Yogyakarta", "gpsCoordinates": "", "rsvpOver": "YOUR PRESENCE, OUR HAPPINESS", "rsvpTitle": "Hadir &\ntitipkan doa.", "closingOver": "TERIMA KASIH", "closingTitle": "Sampai bertemu\ndi hari bahagia.", "galleryOver": "OUR MOMENTS", "galleryTitle": "Cerita dalam\nsebuah bingkai.", "arrivalText": "Sebuah kisah akan dimulai\u2026", "coupleTitle": "Bersama,\nmenjadi selamanya.", "brideLabel": "MEMPELAI WANITA", "groomLabel": "MEMPELAI PRIA", "openButton": "Buka Undangan", "ceremonyLabel": "01 / THE PROMISE", "receptionLabel": "02 / THE CELEBRATION", "calendarButton": "Simpan Tanggal", "mapButton": "Lihat lokasi", "rsvpNameLabel": "Nama Anda", "rsvpNamePlaceholder": "Tulis nama Anda", "rsvpAttendanceLabel": "Konfirmasi kehadiran", "rsvpYes": "Dengan senang hati, hadir", "rsvpNo": "Maaf, belum bisa hadir", "rsvpWishLabel": "Ucapan & doa", "rsvpWishPlaceholder": "Tuliskan doa baik Anda\u2026", "rsvpButton": "Simpan Konfirmasi", "rsvpThanks": "Terima kasih. Konfirmasi disimpan di browser ini.", "navCover": "Pembuka", "navCouple": "Mempelai", "navEvent": "Acara", "navRsvp": "RSVP", "daysLabel": "Hari", "hoursLabel": "Jam", "minutesLabel": "Menit", "secondsLabel": "Detik", "galleryIntro": "Momen sederhana, kenangan yang akan selalu kami simpan.", "rsvpIntro": "Kehadiran dan doa baik Anda adalah hadiah terindah bagi kami.", "closingBody": "Dengan cinta dan rasa syukur,", "sideOver": "A LOVE ROOTED IN TRADITION", "sideTagline": "Sepenggal kisah, selamanya bersama.", "storyOver": "OUR LITTLE STORY", "storyTitle": "Setiap langkah,\nmenuju kamu.", "storyOneTitle": "Pertemuan", "storyOneBody": "Sebuah sapa sederhana membuka cerita. Dari percakapan kecil, tumbuh rasa yang membawa kami lebih dekat.", "storyTwoTitle": "Memilih bersama", "storyTwoBody": "Kami belajar mendengar, memahami, dan saling menguatkan. Bersama, hari biasa menjadi begitu berarti.", "storyThreeTitle": "Awal selamanya", "storyThreeBody": "Dengan restu keluarga, kami melangkah menuju janji untuk terus memilih satu sama lain.", "galleryHint": "Ketuk foto untuk melihat lebih dekat.", "scrollCue": "GULIR UNTUK MENJELAJAH", "partyLabel": "Jumlah tamu", "rsvpChoose": "Pilih kehadiran", "navGallery": "Galeri"}, "theme": {"bg": "#dcded1", "paper": "#f5f0e5", "ink": "#354a3d", "gold": "#ae8951", "accent": "#8e784c", "soft": "#6c775c", "line": "#b9a578", "dark": "#354a3d", "darkFg": "#f4edde"}, "fonts": {"display": "'Cormorant Garamond',Georgia,serif", "body": "'DM Sans',Arial,sans-serif", "link": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600&family=DM+Sans:wght@400;500;600&display=swap"}, "assets": {"base": "../assets/sage/", "arch": "ceremonial-arch.svg", "floralLeft": "floral-left.webp", "floralRight": "floral-right.webp", "mountain": "mountain.webp", "pavilion": "pavilion.webp", "ornament": "ornament.webp", "photosBase": "../assets/photos/", "portraitBride": "09-pengantin-wanita.webp", "portraitGroom": "10-pengantin-pria.webp", "photos": ["01-formal.webp", "02-berjalan.webp", "03-saling-menatap.webp", "04-duduk-bersama.webp", "05-sentuhan-dahi.webp", "06-tampak-belakang.webp", "07-sungkem.webp", "08-potret-dekat.webp"], "clouds": "clouds.webp", "gardenLeft": "blossom.webp", "gardenMiddle": "bouquet.webp", "gardenRight": "blossom.webp", "gunungan": "gunungan.webp"}, "sections": {"hero": true, "blessing": true, "couple": true, "event": true, "gallery": true, "rsvp": true, "closing": true, "story": true}, "radius": 120, "cinematic": true, "typography": {"headingSize": 40, "nameSize": 49, "bodySize": 14, "lineHeight": 1.9, "letterSpacing": -1}, "elementStyles": {}, "order": ["hero", "blessing", "couple", "story", "event", "gallery", "rsvp", "closing"], "preset": "sage", "rendererVersion": 2, "entrance": {"style": "cinema", "duration": 9, "atmosphere": 65}};
function designMerge(t,s){for(const k of Object.keys(s||{})){if(['__proto__','constructor','prototype'].includes(k))continue;const v=s[k];if(v&&typeof v==='object'&&!Array.isArray(v)){if(!t[k]||typeof t[k]!=='object'||Array.isArray(t[k]))t[k]={};designMerge(t[k],v);}else t[k]=v;}return t;}
let studioState=designMerge(JSON.parse(JSON.stringify(RENDER_DEFAULT)),window.IVITE_CONFIG||{});
let gallerySignature='',previewSection='cover';
const originalGalleryTiles=[...document.querySelectorAll('[data-photo]')].map(n=>n.cloneNode(true));
const galleryCaptions=originalGalleryTiles.map(n=>n.querySelector('span').firstChild.textContent.trim());
function assetURL(base,file){return !file?'':/^(data:|https?:|\.\.\/|\/)/.test(file)?file:(base||'')+file;}
function slotSource(k){return assetURL(k.startsWith('portrait')?studioState.assets.photosBase:studioState.assets.base,studioState.assets[k]);}
function renderStudioGallery(){const sources=(studioState.assets.photos||[]).map(f=>assetURL(studioState.assets.photosBase,f));const signature=JSON.stringify(sources);if(signature===gallerySignature)return;gallerySignature=signature;const grid=document.querySelector('.gallery-grid');grid.replaceChildren();sources.forEach((src,i)=>{const tile=originalGalleryTiles[i%originalGalleryTiles.length].cloneNode(true);tile.dataset.photo=i;tile.classList.remove('visible');observer.observe(tile);tile.setAttribute('aria-label','Buka foto '+(i+1));const image=tile.querySelector('img');image.src=src;image.alt=galleryCaptions[i]||'Foto '+(i+1);tile.querySelector('span').firstChild.textContent=(galleryCaptions[i]||'Momen '+(i+1))+' ';grid.append(tile);});bindPhotos();}
function richHeading(node,value){node.replaceChildren();const lines=String(value).split('\n');node.append(document.createTextNode(lines[0]));if(lines.length>1){node.append(document.createElement('br'));const em=document.createElement('em');em.textContent=lines.slice(1).join('\n');node.append(em);}}
function applyStudioDesign(){
 studioMusic.apply(studioState.music);window.IVITE_CONFIG=studioState;const c=studioState.content,a=studioState.assets,theme=studioState.theme,root=document.documentElement;
 Object.assign(invitation,c);weddingDate=new Date(c.date);
 try{c.longDate=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'}).format(weddingDate);c.shortDate=new Intl.DateTimeFormat('id-ID',{day:'2-digit',month:'2-digit',year:'numeric',timeZone:'Asia/Jakarta'}).format(weddingDate).replaceAll('/',' · ');}catch{c.longDate='';c.shortDate='';}
 const to=new URLSearchParams(location.search).get('to');if(to)c.guest=to.trim().slice(0,80);
 document.querySelectorAll('[data-field]').forEach(n=>{const key=n.dataset.field;if(c[key]!=null){if(n.hasAttribute('data-rich-heading'))richHeading(n,c[key]);else n.textContent=c[key];}});
 document.querySelectorAll('[data-placeholder]').forEach(n=>n.placeholder=c[n.dataset.placeholder]||'');
 document.querySelectorAll('.cover h1 i,.hero h2 i,.side-title i,.ampersand').forEach(n=>n.textContent=c.amp);
 const colors={'--studio-bg':theme.bg,'--paper':theme.paper,'--ink':theme.ink,'--gold':theme.gold,'--line':theme.line,'--sage':theme.soft,'--studio-accent':theme.accent,'--studio-dark':theme.dark,'--studio-dark-fg':theme.darkFg};
 Object.entries(colors).forEach(([k,v])=>root.style.setProperty(k,v));root.style.setProperty('--display',studioState.fonts.display);root.style.setProperty('--body',studioState.fonts.body);document.getElementById('font-link').href=studioState.fonts.link;
 root.toggleAttribute('data-custom-paper',theme.paper!=='#f5f0e5');root.toggleAttribute('data-custom-event',theme.dark!==theme.ink);root.toggleAttribute('data-custom-accent',theme.accent!=='#8e784c');root.style.setProperty('--studio-radius',studioState.radius+'px');
 const ty=studioState.typography||{};[['nameSize',49,'names','--studio-name','px'],['headingSize',40,'heading','--studio-heading','px'],['bodySize',14,'body','--studio-body','px'],['letterSpacing',-1,'spacing','--studio-spacing','px'],['lineHeight',1.9,'leading','--studio-leading','']].forEach(([key,baseline,flag,css,unit])=>{root.toggleAttribute('data-custom-'+flag,ty[key]!=null&&ty[key]!==baseline);root.style.setProperty(css,(ty[key]??baseline)+unit);});
 document.querySelectorAll('[data-slot]').forEach(n=>{const key=n.dataset.slot,src=slotSource(key),adjust=(studioState.elementStyles||{})[key]||{};if(n.dataset.originalTransform==null){n.dataset.originalTransform=n.matches('.cover-mountain,.cover-pavilion,.side-pavilion')?'translateX(-50%)':getComputedStyle(n).transform;n.dataset.originalOpacity=getComputedStyle(n).opacity;}if(src){n.src=src;n.style.display='';}else{n.removeAttribute('src');n.style.display='none';}const base=n.dataset.originalTransform==='none'?'':n.dataset.originalTransform;n.style.transform=base+' translate('+(+adjust.x||0)+'px,'+(+adjust.y||0)+'px) rotate('+(+adjust.rotation||0)+'deg) scale('+(adjust.size==null?1:adjust.size/100)+')';n.style.opacity=(+n.dataset.originalOpacity)*(adjust.opacity==null?1:adjust.opacity/100);n.style.setProperty('--studio-layer-transform',n.style.transform);n.style.setProperty('--studio-layer-opacity',n.style.opacity);if(key.startsWith('portrait'))n.alt=(key==='portraitBride'?c.brideFull:c.groomFull);});
 ['arch','ornament'].forEach(k=>root.style.setProperty('--art-'+k,slotSource(k)?'url('+JSON.stringify(slotSource(k))+')':'none'));
 const sequence=[...main.children].filter(n=>n.dataset.section).map(n=>n.dataset.section);if(studioState.order&&sequence.join('|')!==studioState.order.join('|')){studioState.order.forEach(k=>{const n=main.querySelector('[data-section="'+k+'"]');if(n)main.append(n);});if(previewSection!=='cover')navigateStudio(previewSection);}
 document.querySelectorAll('[data-section]').forEach(n=>n.toggleAttribute('data-hidden',studioState.sections[n.dataset.section]===false));
 navLinks.forEach(link=>{const key=link.hash==='#home'?'hero':link.hash.slice(1);link.hidden=studioState.sections[key]===false;});
 const entrance=studioState.entrance||{style:'cinema',duration:9,atmosphere:65};document.body.classList.toggle('cinema-mode',entrance.style!=='classic');document.body.classList.toggle('gateway-mode',entrance.style==='gateway');root.style.setProperty('--cinema-time',Math.max(6,Math.min(14,Number(entrance.duration)||9))+'s');root.style.setProperty('--cinema-atmosphere',Math.max(0,Math.min(100,Number(entrance.atmosphere)||0))/100);
 document.body.classList.toggle('no-cinematic',studioState.cinematic===false);
 updateMapLink(c);document.getElementById('calendar').disabled=!Number.isFinite(weddingDate.getTime());
 renderStudioGallery();studioAnimations.apply(studioState.animations,studioState.cinematic!==false,studioState.elementPositions);tick();
}
function reportSection(key){if(window.parent!==window)window.parent.postMessage({type:'ivite:section',section:key},location.origin);}
function navigateStudio(key){clearTimeout(arrivalTimer);document.getElementById('cinema-skip').hidden=true;previewSection=key;if(key==='cover'){studioMusic.stop();cover.classList.remove('opening');cover.removeAttribute('aria-hidden');cover.inert=false;content.inert=true;main.inert=false;navigation.inert=false;document.body.classList.add('locked');document.body.classList.remove('has-opened','arriving','scene-ready');void document.body.offsetWidth;document.getElementById('arrival-caption').textContent='';window.scrollTo({top:0,behavior:'instant'});}else{content.inert=false;cover.classList.add('opening');cover.setAttribute('aria-hidden','true');cover.inert=true;document.body.classList.add('has-opened');finishArrival(true);const section=main.querySelector('[data-section="'+key+'"]');if(section&&!section.hasAttribute('data-hidden')){section.querySelectorAll('.reveal').forEach(n=>n.classList.add('visible'));section.scrollIntoView({behavior:'instant'});}}reportSection(key);}
window.addEventListener('message',event=>{if(event.source!==window.parent||event.origin!==location.origin)return;const data=event.data;if(data?.type==='ivite:apply'&&data.config){studioState.elementPositions=data.config.elementPositions||{};studioState.animations=data.config.animations||{};designMerge(studioState,data.config);applyStudioDesign();}else if(data?.type==='ivite:navigate')navigateStudio(data.section);else if(data?.type==='ivite:play'){navigateStudio('cover');openButton.click();}});
openButton.addEventListener('click',()=>{previewSection='hero';reportSection('hero');});
document.getElementById('cinema-skip').addEventListener('click',()=>finishArrival(true));
document.querySelector('.cinema-overlay').addEventListener('animationend',event=>{
  if(event.target===event.currentTarget&&event.animationName==='cinema-veil'&&document.body.classList.contains('arriving'))finishArrival();
});
applyStudioDesign();
if(window.parent!==window)window.parent.postMessage({type:'ivite:ready'},location.origin);
