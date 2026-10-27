const gzTimers=[];function gzSchedule(fn,ms){const timer=setTimeout(fn,ms);gzTimers.push(timer);return timer;}
const body=document.body;
const opening=document.querySelector('#opening');
const openBtn=document.querySelector('#openInvitation');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const saveData=navigator.connection?.saveData===true;

// Device hints are incomplete on many Android browsers, so combine them with
// a short, one-off frame sample instead of trusting core/RAM counts alone.
const isMobileDevice=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||matchMedia('(pointer:coarse)').matches;
const cores=navigator.hardwareConcurrency||4;
const memory=navigator.deviceMemory||4;
const cachedPerformance=sessionStorage.getItem('device-perf-v3');
// Unknown mobile hardware starts conservatively. The sample is cached for the
// next navigation so animation names never change halfway through an intro.
let isLowEndDevice=isMobileDevice&&(saveData||cachedPerformance!=='high');

function applyLowPerformanceMode(){
  if(!isLowEndDevice)return;
  document.documentElement.classList.add('low-performance');
  opening?.style.setProperty('--animation-speed','1.5');
  document.querySelectorAll('.falling-leaf').forEach((leaf,index)=>{if(index>1)leaf.remove()});
}

applyLowPerformanceMode();

if(isMobileDevice&&!reduceMotion.matches&&!saveData){
  let previous=0;
  const samples=[];
  const sampleFrames=timestamp=>{
    if(previous)samples.push(timestamp-previous);
    previous=timestamp;
    if(samples.length<32)return requestAnimationFrame(sampleFrames);
    const average=samples.reduce((sum,value)=>sum+value,0)/samples.length;
    const longFrames=samples.filter(value=>value>28).length;
    const measuredLow=cores<=4||memory<=4||average>20.5||longFrames>=4;
    sessionStorage.setItem('device-perf-v3',measuredLow?'low':'high');
  };
  requestAnimationFrame(sampleFrames);
}

if(opening&&location.hash)history.replaceState(null,'',location.pathname+location.search);
window.scrollTo(0,0);

const music=document.querySelector('#musicToggle');
const audio=document.querySelector('#backgroundMusic');
let audioLoaded=false;

function loadAudio(){
  if(!audioLoaded&&audio){
    audio.load();
    audioLoaded=true;
  }
}

// Never start MP3 download/decode from scroll; it competes with rendering.
['pointerdown','touchstart'].forEach(evt=>document.addEventListener(evt,loadAudio,{once:true,passive:true}));

audio.volume=.55;

function setMusicUI(playing){
  music.classList.toggle('is-playing',playing);
  music.setAttribute('aria-pressed',String(playing));
  music.setAttribute('aria-label',playing?'Jeda musik latar':'Putar musik latar');
}

async function playMusic(){
  try{await audio.play();setMusicUI(true)}catch{setMusicUI(false)}
}

function pauseMusic(){audio.pause();setMusicUI(false)}

if(opening&&openBtn){
  openBtn.disabled=true;
  opening.classList.add('intro-building');
  gzSchedule(()=>{
    opening.classList.add('intro-ready');
    openBtn.disabled=false;
    if('requestIdleCallback' in window)requestIdleCallback(loadAudio,{timeout:1800});
  },reduceMotion.matches?100:2400);

  const leafFall=document.querySelector('#leafFall');
  const leafCount=reduceMotion.matches||saveData?0:(isLowEndDevice?(innerWidth<760?2:4):(innerWidth<760?6:10));
  if(leafCount>0){
    const leafFragment=document.createDocumentFragment();
    for(let i=0;i<leafCount;i++){
      const leaf=document.createElement('i');
      leaf.className='falling-leaf';
      leaf.style.cssText=`left:${Math.random()*100}%;--duration:${8+Math.random()*6}s;--delay:${Math.random()*-12}s;--drift:${-70+Math.random()*140}px`;
      leafFragment.appendChild(leaf);
    }
    if('requestIdleCallback' in window){
      requestIdleCallback(()=>leafFall?.appendChild(leafFragment),{timeout:1000});
    }else{
      setTimeout(()=>leafFall?.appendChild(leafFragment),50);
    }
  }

  openBtn.addEventListener('click',()=>{
    if(opening.classList.contains('opening-sequence'))return;
    performance.mark('opening-animation-start');
    loadAudio();
    // Music playback is managed by Studio.
    document.documentElement.style.scrollBehavior='auto';
    window.scrollTo(0,0);
    opening.classList.add('opening-sequence');
    openBtn.disabled=true;
    gzSchedule(()=>body.classList.add('invitation-revealed'),reduceMotion.matches?50:1500);
    gzSchedule(()=>opening.classList.add('is-open'),reduceMotion.matches?80:1950);
    gzSchedule(()=>{
      body.classList.remove('locked');
      // Keep the opening available for Studio replay.
      opening.setAttribute('aria-hidden','true');opening.inert=true;
      document.querySelector('.hero')?.classList.remove('motion-paused');
      window.scrollTo(0,0);
      document.documentElement.style.scrollBehavior='';
      body.classList.add('animations-settled');
      if(bottomNav)bottomNav.classList.add('is-visible');
      performance.mark('opening-animation-end');
      try{
        performance.measure('opening-animation','opening-animation-start','opening-animation-end');
      }catch{}
    },reduceMotion.matches?140:2750);
  });
}else{
  body.classList.remove('locked');
}

music.addEventListener('click',()=>audio.paused?playMusic():pauseMusic());
audio.addEventListener('play',()=>setMusicUI(true));
audio.addEventListener('pause',()=>setMusicUI(false));
audio.addEventListener('error',()=>{setMusicUI(false);music.title='Musik belum dapat dimuat'});

let resumeMusic=false;

const navToggle=document.querySelector('.nav__toggle');
const navLinks=document.querySelector('.nav__links');
navToggle?.addEventListener('click',()=>{
  const isOpen=navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded',String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded','false');
}));

let target=new Date('2027-12-28T08:00:00+07:00').getTime();
const countdownNodes={days:document.querySelector('#days'),hours:document.querySelector('#hours'),minutes:document.querySelector('#minutes'),seconds:document.querySelector('#seconds')};
let countdownTimer=0;
function updateCountdown(){
  if(!countdownNodes.days)return;
  const distance=Math.max(0,target-Date.now()),day=86400000,hour=3600000,minute=60000;
  countdownNodes.days.textContent=String(Math.floor(distance/day)).padStart(2,'0');
  countdownNodes.hours.textContent=String(Math.floor(distance%day/hour)).padStart(2,'0');
  countdownNodes.minutes.textContent=String(Math.floor(distance%hour/minute)).padStart(2,'0');
  countdownNodes.seconds.textContent=String(Math.floor(distance%minute/1000)).padStart(2,'0');
  clearTimeout(countdownTimer);
  if(!document.hidden)countdownTimer=setTimeout(updateCountdown,1020-Date.now()%1000);
}
updateCountdown();

document.addEventListener('visibilitychange',()=>{
  body.classList.toggle('page-hidden',document.hidden);
  if(document.hidden){
    clearTimeout(countdownTimer);
    resumeMusic=!audio.paused;
    if(resumeMusic)audio.pause();
  }else{
    updateCountdown();
    if(resumeMusic){resumeMusic=false;playMusic()}
  }
});

const reveals=document.querySelectorAll('.reveal');
if(reduceMotion.matches){reveals.forEach(element=>element.classList.add('visible'))}
else{
  const observerConfig={threshold:isLowEndDevice?0.05:0.1,rootMargin:'0px 0px -6%'};
  const observer=new IntersectionObserver((entries,obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },observerConfig);
  if('requestIdleCallback' in window){
    requestIdleCallback(()=>reveals.forEach(el=>observer.observe(el)),{timeout:2000});
  }else{
    setTimeout(()=>reveals.forEach(el=>observer.observe(el)),100);
  }
}

const bottomNav=document.querySelector('#bottomNav');
const navItems=bottomNav?[...bottomNav.querySelectorAll('.bottom-nav__item')]:[];
const sectionIds=['home','story','journey','event','gift','rsvp'];
function setActiveNav(current){
  navItems.forEach(a=>a.classList.toggle('bottom-nav__item--active',a.getAttribute('href')==='#'+current));
}
if(bottomNav){
  if(!opening)bottomNav.classList.add('is-visible');
  const sectionObserver=new IntersectionObserver(entries=>{
    const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top))[0];
    if(active)setActiveNav(active.target.id);
  },{rootMargin:'-12% 0px -72% 0px',threshold:0});
  sectionIds.forEach(id=>{const section=document.getElementById(id);if(section)sectionObserver.observe(section)});
}

const hero=document.querySelector('.hero');
if(hero){
  hero.classList.toggle('motion-paused',body.classList.contains('locked'));
  const motionObserver=new IntersectionObserver(([entry])=>{
    hero.classList.toggle('motion-paused',!entry.isIntersecting||body.classList.contains('locked'));
  },{threshold:.01});
  motionObserver.observe(hero);
}

const form=document.querySelector('#rsvpForm');
const note=document.querySelector('#formNote');
let formSubmitting=false;
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(formSubmitting)return;
  formSubmitting=true;
  const submitBtn=form.querySelector('.rsvp__submit');
  const originalText=submitBtn?.innerHTML;
  if(submitBtn)submitBtn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/></svg> Mengirim...';

  const data=new FormData(form);
  note.textContent=`Terima kasih, ${data.get('name')}. Konfirmasi Anda telah tercatat.`;

  const msg=data.get('message');
  if(msg&&msg.trim()){
    try{
      const gb=JSON.parse(localStorage.getItem('ivite-andika-guestbook')||'[]');
      gb.unshift({name:data.get('name'),message:msg.trim(),time:Date.now()});
      localStorage.setItem('ivite-andika-guestbook',JSON.stringify(gb));
      requestAnimationFrame(renderGuestbook);
    }catch{}
  }
  localStorage.setItem('ivite-andika-rsvp',JSON.stringify(Object.fromEntries(data)));
  form.reset();

  setTimeout(()=>{
    if(submitBtn)submitBtn.innerHTML=originalText;
    formSubmitting=false;
  },1500);
});

document.querySelectorAll('.gift-card__copy').forEach(btn=>{
  btn.addEventListener('click',async()=>{
    if(btn.disabled)return;
    const text=btn.dataset.copy;
    try{
      await navigator.clipboard.writeText(text);
      btn.disabled=true;
      btn.classList.add('copied');
      const orig=btn.textContent;
      btn.innerHTML=btn.querySelector('svg').outerHTML+' Tersalin!';
      setTimeout(()=>{
        btn.classList.remove('copied');
        btn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> ${orig.replace('Tersalin!','').trim()}`;
        btn.disabled=false;
      },2000);
    }catch(err){
      console.warn('Copy failed:',err);
      btn.disabled=false;
    }
  },{passive:true});
});

function renderGuestbook(){
  const list=document.querySelector('#guestbookList');
  const countEl=document.querySelector('#guestbookCount');
  if(!list)return;
  let gb=[];
  try{gb=JSON.parse(localStorage.getItem('ivite-andika-guestbook')||'[]')}catch{}
  if(countEl)countEl.textContent=`${gb.length} Pesan${gb.length>1?' Terbaru':''}`;
  if(!gb.length){list.innerHTML='<div class="guestbook__empty">Belum ada pesan. Jadilah yang pertama!</div>';return}
  list.innerHTML=gb.slice(0,10).map(m=>{
    const ago=timeAgo(m.time);
    const initial=m.name.charAt(0).toUpperCase();
    return `<div class="guestbook__item"><div class="guestbook__item-header"><span class="guestbook__avatar">${initial}</span><span class="guestbook__item-name">${esc(m.name)}</span><span class="guestbook__item-time">${ago}</span></div><p>${esc(m.message)}</p></div>`;
  }).join('');
}
function timeAgo(ts){const d=Date.now()-ts,m=Math.floor(d/60000),h=Math.floor(d/3600000),dy=Math.floor(d/86400000);if(m<1)return'Baru saja';if(m<60)return m+' menit lalu';if(h<24)return h+' jam lalu';return dy+' hari lalu'}
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
renderGuestbook();
