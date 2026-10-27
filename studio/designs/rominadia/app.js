/* Original renderer for the editable botanical garden invitation. */
'use strict';
let gardenState=window.IVITE_CONFIG||window.IVITE_TEMPLATE_DEFAULTS||ROMINADIA, gallerySignature='', galleryIndex=0, giftIndex=0, opening=false, opened=false, introTimer=0, introAnimations=[], lastGuest=null;
const gardenMusic=createStudioMusic(), gardenMotion=createStudioAnimations({navigate:gardenNavigate});
const cover=document.querySelector('#cover'), main=document.querySelector('#main'), nav=document.querySelector('#bottom-nav'), openButton=document.querySelector('#open-invitation'), skipButton=document.querySelector('#skip-intro'), dialog=document.querySelector('#photo-dialog');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function gardenAsset(key){const a=gardenState.assets||{},v=a[key]||'';return /^(data:|https?:|\/|\.\.\/)/.test(v)?v:(key.startsWith('portrait')?a.photosBase:a.base)+v;}
function galleryAsset(v){return /^(data:|https?:|\/|\.\.\/)/.test(v)?v:(gardenState.assets.photosBase||'')+v;}
function safeWebURL(value){try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}}
function guestName(){return new URLSearchParams(location.search).get('to')?.slice(0,80)||gardenState.content.guest||'';}
function gardenApply(){
 const c=gardenState.content||{},a=gardenState.assets||{},root=document.documentElement,t=gardenState.typography||{};
 const names=gardenState.brideFirst?[c.bride||'',c.groom||'']:[c.groom||'',c.bride||''];document.title=names.join(' & ')+' · Wedding invitation';
 document.querySelectorAll('[data-field]').forEach(n=>{if(c[n.dataset.field]!=null)n.textContent=c[n.dataset.field];});
 document.querySelectorAll('[data-guest]').forEach(n=>n.textContent=guestName());
 if(lastGuest!==guestName()){lastGuest=guestName();document.querySelector('#guest-name').value=lastGuest;}
 document.querySelector('#guest-name').placeholder=c.rsvpNamePlaceholder||'';document.querySelector('[name=wish]').placeholder=c.rsvpWishPlaceholder||'';
 document.querySelectorAll('[data-slot]').forEach(n=>{const k=n.dataset.slot,v=a[k]?gardenAsset(k):'',s=(gardenState.elementStyles||{})[k]||{};if(v&&n.getAttribute('src')!==v)n.src=v;n.style.display=v?'':'none';n.style.translate=(Number(s.x)||0)+'px '+(Number(s.y)||0)+'px';n.style.rotate=(Number(s.rotation)||0)+'deg';n.style.scale=String((s.size??100)/100);n.style.opacity=s.opacity==null?'':String(s.opacity/100);});
 Object.entries(gardenState.theme||{}).forEach(([k,v])=>root.style.setProperty('--'+k,v));
 root.style.setProperty('--display',gardenState.fonts.display);root.style.setProperty('--body',gardenState.fonts.body);document.querySelector('#font-link').href=gardenState.fonts.link;
 Object.entries({'--name-size':(t.nameSize||62)+'px','--heading-size':(t.headingSize||44)+'px','--body-size':(t.bodySize||18)+'px','--leading':t.lineHeight||1.7,'--spacing':(t.letterSpacing||0)+'px','--card-radius':(gardenState.radius??140)+'px','--atmosphere':(gardenState.entrance?.atmosphere??65)/100}).forEach(([k,v])=>root.style.setProperty(k,v));
 const date=new Date(c.date);document.querySelectorAll('[data-date]').forEach(n=>{const second=n.dataset.date==='reception'&&c.receptionDate,value=second?new Date(c.receptionDate):date,zone=second?(c.receptionTimeZone||gardenState.timeZone):gardenState.timeZone;n.textContent=Number.isFinite(+value)?new Intl.DateTimeFormat(gardenState.locale||'id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:zone||'Asia/Makassar'}).format(value):'';});
 const calendar=document.querySelector('#calendar-link');if(Number.isFinite(+date)){const stamp=d=>d.toISOString().replace(/[-:]|\.\d{3}/g,'');calendar.href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Pernikahan '+c.groom+' & '+c.bride)+'&dates='+stamp(date)+'/'+stamp(new Date(+date+7200000))+'&location='+encodeURIComponent(c.venue+', '+c.address);calendar.removeAttribute('aria-disabled');}else{calendar.removeAttribute('href');calendar.setAttribute('aria-disabled','true');}
 document.querySelectorAll('.map-link').forEach(n=>{const second=n.dataset.event==='reception',coordinates=String(second&&c.receptionGPS!=null?c.receptionGPS:c.gpsCoordinates||'').trim(),m=coordinates.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/),valid=m&&Math.abs(+m[1])<=90&&Math.abs(+m[2])<=180;
  if(coordinates&&!valid){n.removeAttribute('href');n.setAttribute('aria-disabled','true');}else{const search=second?(c.receptionMapQuery||c.receptionAddress||c.mapQuery||c.address):c.mapQuery||c.address;n.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(valid?+m[1]+','+ +m[2]:search||'');n.removeAttribute('aria-disabled');}});
 document.querySelector('.tea-card').hidden=!c.teaName;
 const streaming=safeWebURL(c.streamUrl);document.querySelector('.stream-card').hidden=!streaming;document.querySelector('#stream-link').href=streaming;
 document.querySelectorAll('main>[data-section]').forEach(n=>n.hidden=gardenState.sections?.[n.dataset.section]===false);
 (gardenState.order||[]).forEach(k=>{const n=document.querySelector('main>[data-section="'+k+'"]');if(n)main.append(n);});
 nav.querySelectorAll('a').forEach(n=>n.hidden=document.querySelector(n.hash)?.hidden===true);
 const nextSection=[...main.children].find(n=>n.dataset.section&&n.dataset.section!=='hero'&&!n.hidden);document.querySelector('.scroll-cue').href=nextSection?'#'+nextSection.id:'#hero';
 const photos=a.photos||[],signature=JSON.stringify(photos);if(signature!==gallerySignature){gallerySignature=signature;const grid=document.querySelector('#photo-grid');grid.replaceChildren();photos.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Lihat foto '+(i+1));const img=document.createElement('img');img.src=galleryAsset(v);img.alt='Kenangan '+(i+1);img.loading='lazy';b.append(img);b.onclick=()=>showPhoto(i);grid.append(b);});if(dialog.open){if(photos.length)showPhoto(Math.min(galleryIndex,photos.length-1));else dialog.close();}}
 renderGift();renderWishes();tickCountdown();
 document.body.classList.toggle('no-motion',gardenState.cinematic===false);gardenMusic.apply(gardenState.music);gardenMotion.apply(gardenState.animations,gardenState.cinematic!==false,gardenState.elementPositions);
 syncAmbientMotion();if(opening&&(gardenState.cinematic===false||reducedMotion.matches))finishOpening();else if(opened)syncArrivalFilm();
}
function stopIntro(){sceneRun++;document.body.classList.remove('carved-opening');clearTimeout(introTimer);introAnimations.forEach(a=>a.cancel());introAnimations=[];opening=false;}
function finishOpening(){stopIntro();opened=true;syncArrivalFilm();cover.classList.remove('opening');cover.classList.add('is-open');cover.inert=true;cover.setAttribute('aria-hidden','true');main.inert=false;document.body.classList.remove('locked');nav.hidden=false;skipButton.hidden=true;openButton.disabled=false;revealVisible();gardenMotion.refresh();if(parent!==window)parent.postMessage({type:'ivite:section',section:'hero'},location.origin);}
// Play the opening once, then repeat only the settled motion.
// Motion preferences still select the static poster; music stays separate.
let sceneRun=0,arrivalFailed=false,arrivalLoopRequest=null;
const arrivalFilm=document.querySelector('#arrival-film');
// Local static hosts may not support byte-range requests. A Blob URL makes
// the complete scene seekable, including the tail keyframe used for looping.
const arrivalMediaReady=arrivalFilm?(async()=>{
 const src=arrivalFilm.getAttribute('src');
 if(/^(data:|blob:)/.test(src))return;
 const response=await fetch(src);if(!response.ok)throw Error('Scene unavailable');
 const blob=await response.blob();arrivalFilm.src=URL.createObjectURL(blob);
 await new Promise((resolve,reject)=>{if(arrivalFilm.readyState>=1)return resolve();arrivalFilm.addEventListener('loadedmetadata',resolve,{once:true});arrivalFilm.addEventListener('error',reject,{once:true});});
})():Promise.resolve();
arrivalMediaReady.catch(()=>{arrivalFailed=true;});

let ambientAnimations=[];
function syncAmbientMotion(){
 ambientAnimations.forEach(a=>a.cancel());ambientAnimations=[];
 if(!document.body.classList.contains('clara-design')||gardenState.cinematic===false||reducedMotion.matches)return;
 const flowerSlots=['floralLeft','floralRight','gardenLeft','gardenRight','gardenMiddle','accentBranch','crown','banana'];
 document.querySelectorAll(flowerSlots.map(k=>'[data-slot="'+k+'"]').join(',')+', [data-slot="ornament"]').forEach(n=>{
  if(!gardenState.assets[n.dataset.slot])return;
  const petal=n.dataset.slot==='ornament',angles=petal?[0,30,-15]:[0,4,-2];
  ambientAnimations.push(n.animate(angles.map((v,i)=>({offset:i/2,transform:'rotate('+v+'deg)',composite:'add'})),{duration:5000,iterations:Infinity,easing:'ease',composite:'add'}));
 });
}
function arrivalTailStart(){return Number(arrivalFilm?.dataset.loopStart)||0;}
function arrivalCanMove(){return arrivalFilm&&(opening||opened)&&gardenState.cinematic!==false&&!reducedMotion.matches&&!arrivalFailed;}
function keepArrivalInTail(){
 if(!arrivalCanMove()||!Number.isFinite(arrivalFilm.duration))return;
 // The tail returns to its first pose. Seek to its keyframe before the
 // media ends, preserving the scene while excluding the entrance entirely.
 if(arrivalFilm.currentTime>=arrivalFilm.duration-.06)arrivalFilm.currentTime=arrivalTailStart();
}
function stopArrivalLoop(){
 if(arrivalLoopRequest!==null&&arrivalFilm?.cancelVideoFrameCallback)arrivalFilm.cancelVideoFrameCallback(arrivalLoopRequest);
 arrivalLoopRequest=null;
}
function watchArrivalLoop(){
 if(!arrivalCanMove()||!arrivalFilm.requestVideoFrameCallback||arrivalLoopRequest!==null)return;
 arrivalLoopRequest=arrivalFilm.requestVideoFrameCallback(()=>{arrivalLoopRequest=null;keepArrivalInTail();watchArrivalLoop();});
}
if(arrivalFilm){
 arrivalFilm.addEventListener('timeupdate',keepArrivalInTail);
 arrivalFilm.addEventListener('ended',()=>{if(arrivalCanMove()){arrivalFilm.currentTime=arrivalTailStart();arrivalFilm.play().then(watchArrivalLoop).catch(()=>{arrivalFailed=true;syncArrivalFilm();});}});
}
function syncArrivalFilm(){
 if(!arrivalFilm)return;
 const active=opened&&gardenState.cinematic!==false&&!reducedMotion.matches&&!arrivalFailed;
 arrivalFilm.loop=false;
 if(!active){stopArrivalLoop();arrivalFilm.pause();arrivalFilm.parentElement.classList.remove('video-ready');return;}
 arrivalMediaReady.then(()=>{
  if(!arrivalCanMove()||!opened)return;
  arrivalFilm.muted=true;if(arrivalFilm.currentTime<arrivalTailStart())arrivalFilm.currentTime=arrivalTailStart();arrivalFilm.parentElement.classList.add('video-ready');watchArrivalLoop();
  if(arrivalFilm.paused)arrivalFilm.play().catch(()=>{if(opened){arrivalFailed=true;arrivalFilm.parentElement.classList.remove('video-ready');}});
 }).catch(()=>{arrivalFailed=true;arrivalFilm.parentElement.classList.remove('video-ready');});
}
function resetArrivalFilm(){stopArrivalLoop();sceneRun++;arrivalFailed=false;if(arrivalFilm){arrivalFilm.loop=false;arrivalFilm.pause();arrivalFilm.currentTime=0;arrivalFilm.parentElement.classList.remove('video-ready');}}
function startCarvedOpening(duration){
 const nativeDuration=Number(arrivalFilm.dataset.nativeDuration)||arrivalFilm.duration;
 const rate=Number.isFinite(nativeDuration)?nativeDuration/(duration/1000):1;
 const introDuration=arrivalTailStart()/rate*1000||duration;
 document.body.classList.add('carved-opening');
 const hero=document.querySelector('#hero'),run=++sceneRun;
 function animate(node,frames,start,end){if(!node)return;introAnimations.push(node.animate(frames,{duration:introDuration*(end-start),delay:introDuration*start,fill:'both',easing:'cubic-bezier(.22,1,.36,1)'}));}
 function begin(){
  if(run!==sceneRun||!opening)return;
  arrivalFilm.parentElement.classList.add('video-ready');
  animate(cover.querySelector('.cover-copy'),[{opacity:1},{opacity:0}],0,.06);
  animate(cover.querySelector('.cover-scene'),[{opacity:1,scale:'1'},{opacity:0,scale:'1.12'}],0,.09);
  animate(cover.querySelector('.butterfly'),[{opacity:1},{opacity:0}],0,.06);
  animate(cover.querySelector('.scene-light'),[{opacity:.12},{opacity:0}],0,.09);
  animate(hero.querySelector('.hero-copy'),[{opacity:0,translate:'0 16px'},{opacity:1,translate:'0 0'}],.76,1);
  animate(hero.querySelector('.scroll-cue'),[{opacity:0},{opacity:1}],.9,1);
  introTimer=setTimeout(finishOpening,introDuration+80);
 }
 // Keep the cover visible while the first frame loads. Failure still opens
 // the invitation using the matching final-frame poster.
 introTimer=setTimeout(()=>{if(run===sceneRun&&opening){arrivalFailed=true;arrivalFilm.pause();finishOpening();}},12000);
 arrivalFilm.pause();arrivalFilm.currentTime=0;arrivalFilm.muted=true;arrivalFilm.loop=false;
 const play=()=>{if(run!==sceneRun||!opening)return;arrivalFilm.playbackRate=rate;arrivalFilm.play().then(()=>{clearTimeout(introTimer);watchArrivalLoop();begin();}).catch(()=>{if(run===sceneRun&&opening){arrivalFailed=true;finishOpening();}});};
 arrivalMediaReady.then(play).catch(()=>{if(run===sceneRun&&opening){arrivalFailed=true;finishOpening();}});
}
function startOpening(){
 if(opening||opened)return;gardenMusic.open();if(gardenState.cinematic===false||reducedMotion.matches){finishOpening();return;}
 opening=true;openButton.disabled=true;cover.classList.add('opening');skipButton.hidden=false;
 const seconds=Math.max(3,Math.min(arrivalFilm?45:14,Number(gardenState.entrance?.duration)||(arrivalFilm?15:7))),duration=seconds*1000;
 if(document.querySelector('.arrival-scene')){startCarvedOpening(duration);return;}
 function animate(n,keyframes,start,end){introAnimations.push(n.animate(keyframes,{duration:duration*(end-start),delay:duration*start,fill:'forwards',easing:'cubic-bezier(.22,1,.36,1)'}));}
 animate(cover.querySelector('.cover-copy'),[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-32px)'}],0,.22);
 animate(cover.querySelector('.scene-background'),[{transform:'scale(1)'},{transform:'scale(1.09)'}],0,.87);
 cover.querySelectorAll('.top-flower,.top-spray,.tree').forEach(n=>animate(n,[{translate:'0 0',opacity:1},{translate:(n.matches('.top-right,.spray-right,.tree-right')?'28% -25%':'-28% -25%'),opacity:.2}],.08,.78));
 cover.querySelectorAll('.bottom-flower,.bottom-bouquet').forEach(n=>animate(n,[{translate:'0 0',opacity:1},{translate:'0 35%',opacity:.1}],.15,.85));
 animate(cover.querySelector('.scene-bridge'),[{transform:'scale(1)'},{transform:'scale(1.12) translateY(7%)'}],0,.85);
 animate(cover.querySelector('.butterfly'),[{opacity:1},{opacity:0}],.05,.4);
 cover.querySelectorAll('.gate-wing').forEach(n=>animate(n,[{transform:'translateX(0)',opacity:1},{transform:'translateX('+(n.classList.contains('gate-left')?'-35%':'35%')+')',opacity:0}],.1,.85));
 cover.querySelectorAll('.portal-frame').forEach(n=>animate(n,[{transform:'scale(1)',opacity:1},{transform:'scale(1.12)',opacity:0}],.12,.9));
 cover.querySelectorAll('.stage-figure').forEach(n=>animate(n,[{translate:'0 0',opacity:1},{translate:(n.classList.contains('figure-left')?'-25% 10%':'25% 10%'),opacity:0}],.15,.88));
 animate(cover,[{opacity:1},{opacity:0}],.65,1);
 introTimer=setTimeout(finishOpening,duration+40);
}
function gardenNavigate(section){
 if(dialog.open)dialog.close();if(section==='cover'){stopIntro();resetArrivalFilm();opened=false;gardenMusic.stop();cover.classList.remove('opening','is-open');cover.inert=false;cover.removeAttribute('aria-hidden');main.inert=true;document.body.classList.add('locked');nav.hidden=true;skipButton.hidden=true;openButton.disabled=false;window.scrollTo({top:0,behavior:'instant'});}
 else{finishOpening();const target=document.querySelector('[data-section="'+section+'"]');target?.scrollIntoView({behavior:'instant'});target?.querySelectorAll('.reveal-ready').forEach(n=>n.classList.add('in-view'));}
 if(parent!==window)parent.postMessage({type:'ivite:section',section},location.origin);
}
openButton.onclick=startOpening;skipButton.onclick=finishOpening;
nav.querySelectorAll('a').forEach(n=>n.onclick=e=>{const target=document.querySelector(n.hash);if(!target)return;e.preventDefault();target.scrollIntoView({behavior:gardenState.cinematic===false||reducedMotion.matches?'instant':'smooth'});});
function tickCountdown(){const total=Math.max(0,new Date(gardenState.content.date).getTime()-Date.now())||0,s=Math.floor(total/1000);[['days',Math.floor(s/86400)],['hours',Math.floor(s/3600)%24],['minutes',Math.floor(s/60)%60],['seconds',s%60]].forEach(([id,v])=>document.getElementById(id).textContent=String(v).padStart(2,'0'));}
setInterval(tickCountdown,1000);
function renderGift(){const c=gardenState.content,suffix=giftIndex?'Two':'One';document.querySelector('#bank-name').textContent=c['giftBank'+suffix]||'';document.querySelector('#bank-number').textContent=c['giftNumber'+suffix]||(gardenState.locale?.startsWith('en')?'Not added yet':'Belum ditambahkan');document.querySelector('#bank-owner').textContent=c['giftOwner'+suffix]||'';document.querySelector('#copy-bank').disabled=!c['giftNumber'+suffix];document.querySelectorAll('.gift-tabs button').forEach((n,i)=>{n.setAttribute('aria-selected',String(i===giftIndex));n.tabIndex=i===giftIndex?0:-1;});document.querySelector('#gift-panel').setAttribute('aria-labelledby',giftIndex?'gift-tab-two':'gift-tab-one');}
document.querySelectorAll('.gift-tabs button').forEach((n,i)=>{n.onclick=()=>{giftIndex=i;document.querySelector('#copy-status').textContent='';renderGift();};n.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();giftIndex=e.key==='Home'?0:e.key==='End'?1:1-giftIndex;renderGift();document.querySelectorAll('.gift-tabs button')[giftIndex].focus();}};});
document.querySelector('#copy-bank').onclick=async()=>{const number=gardenState.content[giftIndex?'giftNumberTwo':'giftNumberOne'];try{await navigator.clipboard.writeText(number);document.querySelector('#copy-status').textContent='Nomor rekening disalin.';}catch{document.querySelector('#copy-status').textContent='Salin nomor ini: '+number;}};
function responseKey(){const c=gardenState.content;return 'ivite-garden-rsvp:'+c.groom+':'+c.bride+':'+c.date;}
function responses(){try{const data=JSON.parse(localStorage.getItem(responseKey())||'[]');return Array.isArray(data)?data.filter(n=>n&&typeof n.name==='string'&&typeof n.wish==='string').slice(-50):[];}catch{return [];}}
function renderWishes(){const list=document.querySelector('#wishes');list.replaceChildren();responses().filter(r=>r.wish).slice(-5).reverse().forEach(r=>{const article=document.createElement('article'),name=document.createElement('strong'),p=document.createElement('p'),small=document.createElement('small');name.textContent=r.name;p.textContent=r.wish;small.textContent='Tersimpan di browser ini';article.append(name,p,small);list.append(article);});}
document.querySelector('[name=attendance]').onchange=e=>{const input=document.querySelector('[name=party]'),absent=e.target.value==='no';document.querySelector('#party-field').hidden=absent;input.disabled=absent;};
document.querySelector('#rsvp-form').onsubmit=e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form),items=responses();items.push({name:String(data.get('name')).trim().slice(0,80),attendance:data.get('attendance'),party:data.get('attendance')==='yes'?Number(data.get('party')):0,wish:String(data.get('wish')||'').trim().slice(0,1000),created:Date.now()});try{localStorage.setItem(responseKey(),JSON.stringify(items.slice(-50)));document.querySelector('#rsvp-status').textContent=gardenState.content.rsvpThanks;renderWishes();}catch{document.querySelector('#rsvp-status').textContent='Browser tidak dapat menyimpan konfirmasi. Coba izinkan penyimpanan lokal.';}};
function showPhoto(i){const photos=gardenState.assets.photos||[];if(!photos.length)return;galleryIndex=(i+photos.length)%photos.length;document.querySelector('#large-photo').src=galleryAsset(photos[galleryIndex]);document.querySelector('#large-photo').alt='Kenangan '+(galleryIndex+1);document.querySelector('#photo-counter').textContent=(galleryIndex+1)+' / '+photos.length;if(!dialog.open)dialog.showModal();}
document.querySelector('#close-photo').onclick=()=>dialog.close();document.querySelector('#previous-photo').onclick=()=>showPhoto(galleryIndex-1);document.querySelector('#next-photo').onclick=()=>showPhoto(galleryIndex+1);dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')showPhoto(galleryIndex-1);if(e.key==='ArrowRight')showPhoto(galleryIndex+1);});
const reveals=[...document.querySelectorAll('.section>h2,.section>.overline,.person,.timeline article,.event-card,.countdown')];reveals.forEach(n=>n.classList.add('reveal-ready'));
function revealVisible(){if(!opened)return;reveals.forEach(n=>{const r=n.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)n.classList.add('in-view');});}
const revealObserver=new IntersectionObserver(entries=>{if(!opened)return;entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view');});},{threshold:.08});reveals.forEach(n=>revealObserver.observe(n));
const sectionObserver=new IntersectionObserver(entries=>{if(!opened)return;const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!active)return;const section=active.target.dataset.section;nav.querySelectorAll('a').forEach(n=>n.classList.toggle('active',n.hash==='#'+section));if(parent!==window)parent.postMessage({type:'ivite:section',section},location.origin);},{rootMargin:'-10% 0px -45% 0px',threshold:[0,.15,.5]});main.querySelectorAll('[data-section]').forEach(n=>sectionObserver.observe(n));
window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin)return;const d=event.data;if(d?.type==='ivite:apply'){gardenState=d.config;window.IVITE_CONFIG=gardenState;gardenApply();}else if(d?.type==='ivite:navigate')gardenNavigate(d.section);else if(d?.type==='ivite:play'){gardenNavigate('cover');startOpening();}});
reducedMotion.addEventListener('change',()=>{if(opening)finishOpening();else if(opened)syncArrivalFilm();syncAmbientMotion();});
gardenApply();if(parent!==window)parent.postMessage({type:'ivite:ready'},location.origin);
