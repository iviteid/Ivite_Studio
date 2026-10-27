/* Studio bindings for the original Gusti & Zidni invitation. */
let gzState=window.IVITE_CONFIG||ANDIKA_PUTRI_DEFAULTS,gzGallerySignature='';
const gzMusic=createStudioMusic();
const gzAnimations=createStudioAnimations({navigate:section=>gzNavigate(section)});
const gzOriginalOpening=document.querySelector('#opening');
const gzGalleryTemplates=[...document.querySelectorAll('.story-frame')].map(n=>n.cloneNode(true));
document.querySelector('#musicToggle').hidden=true;document.querySelector('#backgroundMusic').removeAttribute('src');
const gzSectionMap={hero:'#home',blessing:'#story',couple:'#story',story:'.story-panel',gallery:'.story-panel',event:'#event',gift:'#gift',rsvp:'#rsvp',closing:'footer'};
const gzOrdered=document.createElement('div');gzOrdered.id='studio-sections';
document.querySelector('.hero').before(gzOrdered);
document.querySelectorAll('[data-section]').forEach(n=>gzOrdered.append(n));
function gzAsset(key){const a=gzState.assets||{};const value=a[key]||'';return /^(data:|https?:|\/|\.\.\/)/.test(value)?value:((key.startsWith('portrait')?a.photosBase:a.base)||'')+value;}
function gzApply(){
 const c=gzState.content||{},root=document.documentElement,a=gzState.assets||{};
 document.querySelectorAll('[data-field]').forEach(n=>{if(c[n.dataset.field]!=null)n.textContent=c[n.dataset.field];});
 document.querySelector('.opening__guest small').textContent=c.guestLabel||'Kepada Yth.';document.querySelector('.opening__guest small').style.whiteSpace='pre-line';const guest=new URLSearchParams(location.search).get('to');if(guest)document.querySelector('.opening__guest strong').textContent=guest.slice(0,80);
 document.title=(c.bride||'')+' & '+(c.groom||'')+' · Invitation';
 document.querySelectorAll('[data-slot]').forEach(n=>{const key=n.dataset.slot,value=gzAsset(key),s=(gzState.elementStyles||{})[key]||{};if(value)n.src=value;n.style.display=value?'':'none';n.style.translate=(Number(s.x)||0)+'px '+(Number(s.y)||0)+'px';n.style.rotate=(Number(s.rotation)||0)+'deg';n.style.scale=s.size==null?'1':String(s.size/100);n.style.opacity=s.opacity==null?'':String(s.opacity/100);});
 Object.keys(a).filter(k=>typeof a[k]==='string').forEach(k=>root.style.setProperty('--asset-'+k,'url('+JSON.stringify(gzAsset(k))+')'));
 const theme=gzState.theme||{};Object.entries({'--wine':theme.dark,'--wine-dark':theme.dark,'--cream':theme.paper,'--paper':theme.bg,'--ink':theme.ink,'--gold':theme.gold,'--rose':theme.accent,'--sage':theme.soft}).forEach(([k,v])=>{if(v)root.style.setProperty(k,v);});
 const fonts=gzState.fonts||{};root.style.setProperty('--display',fonts.display||"'Italiana',serif");root.style.setProperty('--serif',fonts.display==="'Italiana',serif"?"'Cormorant Garamond',serif":fonts.display||"'Cormorant Garamond',serif");root.style.setProperty('--sans',fonts.body||"'Manrope',sans-serif");if(fonts.link)document.querySelector('#font-link').href=fonts.link;
 const ty=gzState.typography||{};root.style.setProperty('--gz-name',(ty.nameSize||58)+'px');root.style.setProperty('--gz-heading',(ty.headingSize||40)+'px');root.style.setProperty('--gz-body',(ty.bodySize||14)+'px');root.style.setProperty('--gz-leading',ty.lineHeight||1.9);root.style.setProperty('--gz-spacing',(ty.letterSpacing||0)+'px');root.style.setProperty('--gz-radius',(gzState.radius||0)+'px');
 document.querySelectorAll('.event-card__row:first-child span').forEach((n,i)=>n.textContent=i===0?c.ceremonyTime:c.receptionTime);
 const date=new Date(c.date);if(Number.isFinite(date.getTime())){target=date.getTime();document.querySelectorAll('.desktop-cover__content small,.event__heading>p').forEach(n=>n.textContent=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'}).format(date));document.querySelector('.hero__date').textContent=new Intl.DateTimeFormat('id-ID',{month:'long',year:'numeric',timeZone:'Asia/Jakarta'}).format(date);document.querySelector('.hero__rule b').textContent=new Intl.DateTimeFormat('id-ID',{day:'numeric',timeZone:'Asia/Jakarta'}).format(date);document.querySelectorAll('.event-card__row:first-child strong').forEach(n=>n.textContent=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'}).format(date));}
 const coordinates=String(c.gpsCoordinates||'').trim(),match=coordinates.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/),valid=match&&Math.abs(Number(match[1]))<=90&&Math.abs(Number(match[2]))<=180;
 const map=document.querySelector('.event-card:nth-child(2) .event-card__cta');map.textContent=c.mapButton||'Lihat lokasi';if(coordinates&&!valid){map.removeAttribute('href');map.setAttribute('aria-disabled','true');}else{map.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(valid?Number(match[1])+','+Number(match[2]):c.mapQuery||c.address||'');map.removeAttribute('aria-disabled');}
 const cal=document.querySelector('.event-card:first-child .event-card__cta');cal.textContent=c.calendarButton||'Simpan di Google Calendar';if(Number.isFinite(date.getTime())){const stamp=d=>d.toISOString().replace(/[-:]|\.\d{3}/g,'');cal.href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent('Pernikahan '+c.groom+' & '+c.bride)+'&dates='+stamp(date)+'/'+stamp(new Date(date.getTime()+7200000))+'&location='+encodeURIComponent(c.venue+', '+c.address);}
 document.querySelectorAll('.gift-card').forEach(card=>{const button=card.querySelector('[data-copy]');button.dataset.copy=card.querySelector('.gift-card__number').textContent.replace(/\s/g,'');});
 const photos=a.photos||[],signature=JSON.stringify(photos);if(signature!==gzGallerySignature){gzGallerySignature=signature;const container=document.querySelector('.story-frames');container.replaceChildren();photos.forEach((value,i)=>{const item=gzGalleryTemplates[i%gzGalleryTemplates.length].cloneNode(true);item.querySelectorAll('[data-field]').forEach(n=>{if(c[n.dataset.field]!=null)n.textContent=c[n.dataset.field];});item.className='story-frame story-frame--'+(i%3+1)+' reveal visible';const img=item.querySelector('img');img.removeAttribute('data-slot');img.src=/^(data:|https?:|\/|\.\.\/)/.test(value)?value:(a.photosBase||'')+value;container.append(item);});}
 const sections=gzState.sections||{};document.querySelectorAll('[data-section]').forEach(n=>n.hidden=sections[n.dataset.section]===false);
 (gzState.order||[]).forEach(key=>{const n=gzOrdered.querySelector('[data-section="'+key+'"]');if(n)gzOrdered.append(n);});
 document.querySelectorAll('#bottomNav a').forEach(n=>{const target=document.querySelector(n.hash);n.hidden=target?.hidden===true;});
 gzAnimations.apply(gzState.animations,gzState.cinematic!==false,gzState.elementPositions);gzMusic.apply(gzState.music);document.body.classList.toggle('gz-no-motion',gzState.cinematic===false);
}
function gzNavigate(section){
 gzTimers.forEach(clearTimeout);gzTimers.length=0;
 if(section==='cover'){gzMusic.stop();gzOriginalOpening.classList.remove('opening-sequence','is-open');gzOriginalOpening.removeAttribute('aria-hidden');gzOriginalOpening.inert=false;gzOriginalOpening.classList.add('intro-ready');openBtn.disabled=false;body.classList.add('locked');body.classList.remove('invitation-revealed','animations-settled');bottomNav.classList.remove('is-visible');window.scrollTo(0,0);}
 else{gzOriginalOpening.classList.add('is-open');gzOriginalOpening.inert=true;body.classList.remove('locked');body.classList.add('invitation-revealed','animations-settled');bottomNav.classList.add('is-visible');document.querySelectorAll('.reveal').forEach(n=>n.classList.add('visible'));document.querySelector(gzSectionMap[section]||'#home')?.scrollIntoView({behavior:'instant'});}
 if(window.parent!==window)parent.postMessage({type:'ivite:section',section},location.origin);
}
window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin)return;const data=event.data;if(data?.type==='ivite:apply'){gzState=data.config;window.IVITE_CONFIG=gzState;gzApply();}else if(data?.type==='ivite:navigate')gzNavigate(data.section);else if(data?.type==='ivite:play'){gzNavigate('cover');openBtn.click();}});
openBtn.addEventListener('click',()=>{gzMusic.open();if(gzState.cinematic===false)gzNavigate('hero');});
gzApply();if(parent!==window)parent.postMessage({type:'ivite:ready'},location.origin);
