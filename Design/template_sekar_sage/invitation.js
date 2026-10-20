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
const field = key => key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
for (const key of ['bride', 'groom', 'brideFull', 'groomFull', 'brideParents', 'groomParents', 'ceremonyTime', 'receptionTime', 'venue', 'address']) {
  document.querySelectorAll('[data-' + field(key) + ']').forEach(el => {el.textContent = invitation[key];});
}
const weddingDate = new Date(invitation.date);
const longDate = new Intl.DateTimeFormat('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric', timeZone:'Asia/Jakarta'}).format(weddingDate);
const shortDate = new Intl.DateTimeFormat('id-ID', {day:'2-digit', month:'2-digit', year:'numeric', timeZone:'Asia/Jakarta'}).format(weddingDate).replaceAll('/', ' · ');
document.querySelectorAll('[data-long-date]').forEach(el => {el.textContent=longDate;});
document.querySelectorAll('[data-short-date]').forEach(el => {el.textContent=shortDate;});
document.getElementById('map-link').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(invitation.mapQuery);
const guest = (new URLSearchParams(location.search).get('to') || 'Tamu Undangan').trim().slice(0, 80) || 'Tamu Undangan';
document.querySelectorAll('[data-guest]').forEach(el => {el.textContent=guest;});
if (guest !== 'Tamu Undangan') document.getElementById('guest-name').value=guest;
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
function finishArrival(){
  clearTimeout(arrivalTimer);
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
  content.inert=false;
  main.inert=true;navigation.inert=true;
  window.scrollTo({top:0,behavior:'instant'});
  document.body.classList.add('has-opened','arriving');
  cover.classList.add('opening');
  cover.setAttribute('aria-hidden','true');
  cover.inert=true;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){finishArrival();return;}
  document.getElementById('arrival-caption').textContent='Sebuah kisah akan dimulai…';
  document.getElementById('arrival-caption').focus({preventScroll:true});
  arrivalTimer=setTimeout(finishArrival,5400);
});
const observer=new IntersectionObserver(entries => {
  entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const navLinks=[...document.querySelectorAll('.bottom-nav a')];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>{const active=link.hash==='#'+entry.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});
},{rootMargin:'-10% 0px -55% 0px'});
['home','couple','event','rsvp'].forEach(id=>sectionObserver.observe(document.getElementById(id)));
function tick(){
  const seconds=Math.max(0,Math.floor((weddingDate-Date.now())/1000));
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
  const title=(invitation.demo?'[CONTOH] ':'')+'Pernikahan '+invitation.bride+' & '+invitation.groom;
  const calendar=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ivite//Sekar Sage//ID','BEGIN:VEVENT','UID:sekar-sage-'+stamp(invitation.date)+'@ivite.local','DTSTAMP:'+stamp(Date.now()),'DTSTART:'+stamp(invitation.date),'DTEND:'+stamp(invitation.endDate),'SUMMARY:'+escapeICS(title),'LOCATION:'+escapeICS(invitation.venue+', '+invitation.address),'DESCRIPTION:'+escapeICS(invitation.demo?'Contoh acara untuk pratinjau tema. Tanggal dan lokasi belum dikonfirmasi.':'Kami menantikan kehadiran Anda.'),'END:VEVENT','END:VCALENDAR',''].join('\r\n');
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
    else{localStorage.setItem(storageKey,JSON.stringify(data));status.textContent='Tersimpan di browser ini. Mode demo belum mengirim kepada mempelai.';}
    showSaved(data);
  }catch(error){status.textContent=invitation.rsvpEndpoint?'Konfirmasi belum terkirim. Silakan coba kembali.':'Browser tidak mengizinkan penyimpanan. Konfirmasi belum tersimpan.';}
  finally{button.disabled=false;}
});
document.getElementById('guest-name').addEventListener('input',event=>event.target.setCustomValidity(''));
