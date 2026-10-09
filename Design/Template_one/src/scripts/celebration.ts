const get = <T extends HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const welcome = get<HTMLElement>('#welcome');
const page = get<HTMLElement>('#page-content');
const openButton = get<HTMLButtonElement>('#open-invitation');
page.inert = true;
document.body.classList.add('invitation-locked');
openButton.addEventListener('click', () => {
  openButton.disabled = true;
  welcome.classList.add('opening');
  const finish = () => {
    welcome.hidden = true;
    page.inert = false;
    document.body.classList.remove('invitation-locked');
    page.classList.add('invitation-opened');
    startScrollAnimations();
    get<HTMLElement>('#page-title').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'instant'});
  };
  window.setTimeout(finish, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1500);
});
function startScrollAnimations() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }), {threshold: .12});
  document.querySelectorAll<HTMLElement>('.hand-note, .side-note, .bottom-note, .photo-caption, .handwritten, .forever').forEach(element => {
    element.classList.add('ink-note');
    observer.observe(element);
  });
  document.querySelectorAll<HTMLElement>('.invitation, .section-heading, .gallery-grid figure, .guest-form, .attendance-record, .bank-card, .closing').forEach(element => {
    element.classList.add('motion-item');
    observer.observe(element);
  });
}
const lightbox = get<HTMLDialogElement>('#lightbox');
document.querySelectorAll<HTMLButtonElement>('[data-photo]').forEach(button => button.addEventListener('click', () => {
  const image = get<HTMLImageElement>('#lightbox-image');
  image.src = button.dataset.photo!; image.alt = button.dataset.caption!;
  get('#lightbox-caption').textContent = image.alt; lightbox.showModal();
}));
get('#lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if(e.target === lightbox) { const box = lightbox.getBoundingClientRect(); if(e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) lightbox.close(); } });
type Rsvp = { name:string; attendance:'yes'|'no'; party:number; date:string };
type Wish = { name:string; message:string; date:string };
function readRecords<T>(key:string, valid:(x:any)=>boolean):T[] {
  try { const data = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(data) ? data.filter(valid).slice(0,500) : []; } catch { return []; }
}
let responses = readRecords<Rsvp>('little-forever-rsvps', x => x && typeof x.name==='string' && ['yes','no'].includes(x.attendance) && Number.isInteger(x.party) && x.party >= 0 && x.party <= 5 && typeof x.date === 'string');
let wishes = readRecords<Wish>('little-forever-wishes', x => x && typeof x.name==='string' && typeof x.message==='string' && typeof x.date==='string');
function save(key:string,data:unknown,status:HTMLElement) {
  try {localStorage.setItem(key,JSON.stringify(data));return true;} catch {status.textContent='Penyimpanan browser tidak tersedia atau penuh. Data belum disimpan.';return false;}
}
const rsvpForm = get<HTMLFormElement>('#rsvp-form');
const rsvpStatus = get('#rsvp-status');
const party = rsvpForm.elements.namedItem('party') as HTMLSelectElement;
rsvpForm.addEventListener('change', () => { const attending = new FormData(rsvpForm).get('attendance') === 'yes'; party.disabled = !attending; get('#party-label').hidden = !attending; });
function renderResponses() {
  const list = get('#attendance-list'); list.replaceChildren();
  responses.forEach(r => { const item = document.createElement('li'); const name = document.createElement('span'); name.textContent=r.name; const detail=document.createElement('small'); detail.textContent = r.attendance==='yes' ? `Hadir · ${r.party} orang` : 'Tidak hadir'; item.append(name,detail);list.append(item); });
  get('#attendance-summary').textContent = responses.length ? `${responses.length} konfirmasi · ${responses.filter(r=>r.attendance==='yes').reduce((sum,r)=>sum+r.party,0)} tamu akan hadir` : 'Belum ada konfirmasi.';
  get<HTMLButtonElement>('#export-rsvp').disabled = !responses.length;
}
rsvpForm.addEventListener('submit', e => {
  e.preventDefault(); const data = new FormData(rsvpForm); const name=String(data.get('guest')||'').trim();
  if(!name) {rsvpStatus.textContent='Silakan isi nama lengkap.';return;}
  const attendance = data.get('attendance') === 'yes' ? 'yes' : 'no';
  const record:Rsvp = {name,attendance,party:attendance==='yes'?Number(data.get('party')):0,date:new Date().toISOString()};
  const next=[...responses]; const existing=next.findIndex(r=>r.name.toLocaleLowerCase()===name.toLocaleLowerCase());
  if(existing>=0) next[existing]=record; else next.push(record);
  if(save('little-forever-rsvps',next,rsvpStatus)) {responses=next;renderResponses();rsvpStatus.textContent='Konfirmasi tersimpan di browser ini. Terima kasih ♡';}
});
const csvCell = (value:string) => '"'+(/^[\s]*[=+@\-]/.test(value)?"'":"")+value.replace(/"/g,'""')+'"';
get('#export-rsvp').addEventListener('click',()=>{
  const rows=[['Nama','Kehadiran','Jumlah tamu','Waktu'],...responses.map(r=>[r.name,r.attendance==='yes'?'Hadir':'Tidak hadir',String(r.party),r.date])];
  const blob=new Blob(['\uFEFF'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download='daftar-kehadiran.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const wishForm=get<HTMLFormElement>('#wish-form'); const wishStatus=get('#wish-status');
function renderWishes() {
  if(!wishes.length)return;
  const list=get('#wish-list');list.replaceChildren();
  wishes.slice().reverse().forEach(w=>{const article=document.createElement('article');article.className='wish-note';const message=document.createElement('p');message.textContent=w.message;const name=document.createElement('span');name.textContent=`♡ ${w.name}`;article.append(message,name);list.append(article);});
}
wishForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(wishForm);const name=String(data.get('author')||'').trim();const message=String(data.get('wish')||'').trim();if(!name||message.length<3){wishStatus.textContent='Isi nama dan ucapan minimal 3 karakter.';return;}const next=[...wishes,{name,message,date:new Date().toISOString()}];if(save('little-forever-wishes',next,wishStatus)){wishes=next;renderWishes();wishForm.reset();wishStatus.textContent='Ucapan tersimpan di browser ini. Terima kasih atas doanya ♡';}});
get('#copy-account').addEventListener('click',async()=>{
  const account=get('[data-output="account"]').textContent?.trim()||''; const status=get('#bank-status');
  if(!/^[\d\s-]{5,40}$/.test(account)){status.textContent='Nomor rekening belum diisi dengan benar.';return;}
  try{await navigator.clipboard.writeText(account.replace(/[\s-]/g,''));status.textContent='Nomor rekening berhasil disalin.';}catch{status.textContent='Salin manual: '+account;}
});
renderResponses();renderWishes();
