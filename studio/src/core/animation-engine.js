/* Shared by the editor, both renderers, and standalone invitation exports. */
const STUDIO_ANIMATION_PRESETS=[
 ['none','Original design motion','Original'],
 ['fade','Fade in','Entrances'],['rise','Slide up','Entrances'],['drop','Slide down','Entrances'],['left','Slide from left','Entrances'],['right','Slide from right','Entrances'],
 ['zoom','Zoom in','Entrances'],['pullback','Zoom out','Entrances'],['blur','Soft focus reveal','Reveals'],['wipe','Curtain reveal','Reveals'],['iris','Circle reveal','Reveals'],
 ['bounce','Gentle bounce','Emphasis'],['pulse','Pulse','Emphasis'],['swing','Swing','Emphasis'],['shake','Small shake','Emphasis'],['spin','Rotate','Emphasis'],
 ['float','Float vertically','Ambient'],['drift','Drift sideways','Ambient'],['breathe','Slow breathing','Ambient'],['lift','Lift and grow','Interaction']
];
function createStudioAnimations(options={}){
 const records=new Map(),active=new Map(),played=new Set(),visible=new Set(),hovered=new Set(),inlineDisplays=new Map(),positionNodes=new Map(),placements=new Map();
 const decorSelector='.stage-pendant,.stage-garden,.cinematic-scene,.butterfly,.live-butterfly,.hero__moving-clouds,.opening__sky,.opening__arch,.cover-frame,.intro-jewel,.tree-curtain';
 const targetSelector='[data-slot],[data-field],[data-section],#days,#hours,#minutes,#seconds,img,svg,h1,h2,h3,p,a,button,input,textarea,select,label,blockquote,article,figure,section,nav,'+decorSelector;
 let config={},positions={},enabled=true,picking=false,pickMode='animation',draggingEnabled=false,dragTarget='',drag=null,lastList='',highlight=null;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const style=document.createElement('style');style.textContent='[data-studio-motion-pick]{outline:2px solid #aa8548!important;outline-offset:4px!important;cursor:crosshair!important}body[data-studio-motion-picking] :is([data-slot],img,svg){pointer-events:auto!important}body[data-studio-dragging],body[data-studio-dragging] *{touch-action:none;user-select:none}body[data-studio-dragging] [data-studio-motion-pick]{cursor:grabbing!important}';document.head.append(style);
 const clamp=(v,min,max,fallback)=>Number.isFinite(Number(v))?Math.max(min,Math.min(max,Number(v))):fallback;
 const originalEasings={smooth:'cubic-bezier(.22,1,.36,1)',gentle:'ease-in-out',linear:'linear',spring:'cubic-bezier(.34,1.56,.64,1)'};
 function frames(preset,d,opacity){
  const move=(x,y)=>({transform:'translate('+x+'px,'+y+'px)',composite:'add'}),scale=v=>({transform:'scale('+v+')',composite:'add'}),turn=v=>({transform:'rotate('+v+'deg)',composite:'add'});
  switch(preset){
   case 'fade':return [{opacity:0},{opacity}];
   case 'rise':return [move(0,d),move(0,0)];case 'drop':return [move(0,-d),move(0,0)];case 'left':return [move(-d,0),move(0,0)];case 'right':return [move(d,0),move(0,0)];
   case 'zoom':return [scale(Math.max(.3,1-d/200)),scale(1)];case 'pullback':return [scale(1+d/200),scale(1)];
   case 'blur':return [{filter:'blur('+Math.min(12,d/5)+'px)',opacity:0},{filter:'blur(0px)',opacity}];
   case 'wipe':return [{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}];case 'iris':return [{clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)'}];
   case 'bounce':return [move(0,d),move(0,-d*.2),move(0,d*.08),move(0,0)];
   case 'pulse':return [scale(1),scale(1+d/500),scale(1)];case 'breathe':return [scale(1),scale(1+d/1200),scale(1)];
   case 'swing':return [turn(0),turn(-d/8),turn(d/8),turn(0)];case 'shake':return [move(0,0),move(-d/6,0),move(d/6,0),move(-d/10,0),move(0,0)];
   case 'spin':return [turn(0),turn(360)];case 'float':return [move(0,0),move(0,-d/2),move(0,0)];case 'drift':return [move(0,0),move(d/2,0),move(0,0)];
   case 'lift':return [move(0,0),{transform:'translateY('+(-d/3)+'px) scale(1.035)',composite:'add'},move(0,0)];default:return [];
  }
 }
 function eligible(n){if(!n.getClientRects().length||n.closest('[hidden],[data-hidden]')||n.style.display==='none'||n.style.opacity==='0')return false;const cover=n.closest('#cover,#opening');return cover?!cover.inert&&!cover.classList.contains('is-open')&&!(cover.id==='cover'&&cover.classList.contains('opening'))&&!cover.classList.contains('opening-sequence'):!document.body.classList.contains('locked');}
 function allowed(){return enabled&&!reduced.matches&&!document.hidden;}
 function cancel(n){active.get(n)?.cancel();active.delete(n);}
 function restoreDisplay(n){if(placements.has(n))return;if(inlineDisplays.has(n)){n.style.display=inlineDisplays.get(n);inlineDisplays.delete(n);}}
 function syncPositions(){
  const totals=new Map();
  for(const [id,value] of Object.entries(positions)){
   if(!value||typeof value!=='object')continue;
   for(const n of positionNodes.get(id)||[]){const total=totals.get(n)||{x:0,y:0,rotation:0,scale:1};total.x+=clamp(value.x,-2000,2000,0);total.y+=clamp(value.y,-4000,4000,0);total.rotation+=clamp(value.rotation,-360,360,0);total.scale*=clamp(value.scale,10,400,100)/100;totals.set(n,total);}
  }
  for(const [n,placement] of placements)if(!totals.has(n)){placement.animation.cancel();placements.delete(n);if(!config[keyFor(n)]||config[keyFor(n)].preset==='none')restoreDisplay(n);}
  for(const [n,total] of totals){
   if(total.x===0&&total.y===0&&total.rotation===0&&total.scale===1){const old=placements.get(n);if(old){old.animation.cancel();placements.delete(n);}if(!config[keyFor(n)]||config[keyFor(n)].preset==='none')restoreDisplay(n);continue;}
   const signature=JSON.stringify(total);if(placements.get(n)?.signature===signature)continue;
   placements.get(n)?.animation.cancel();
   if(getComputedStyle(n).display==='inline'&&!inlineDisplays.has(n)){inlineDisplays.set(n,n.style.display);n.style.display='inline-block';}
   const keyframe={translate:total.x+'px '+total.y+'px',transform:'rotate('+total.rotation+'deg) scale('+total.scale+')',composite:'add'};
   const animation=n.animate([keyframe,keyframe],{duration:1,fill:'both'});animation.id='ivite-position:'+keyFor(n);animation.pause();animation.currentTime=1;placements.set(n,{animation,signature});
  }
 }
 function play(n,id,force=false){
  const setting=config[id];if(!allowed()||!setting||setting.preset==='none'||!STUDIO_ANIMATION_PRESETS.some(p=>p[0]===setting.preset))return;
  if(!force&&(!eligible(n)||played.has(n)||active.has(n)))return;
  cancel(n);if(getComputedStyle(n).display==='inline'&&!inlineDisplays.has(n)){inlineDisplays.set(n,n.style.display);n.style.display='inline-block';}const opacity=Number(getComputedStyle(n).opacity)||1;
  const siblings=records.get(id)?.nodes||[],index=siblings.indexOf(n),duration=clamp(setting.duration,.2,20,1.2)*1000;
  const animation=n.animate(frames(setting.preset,clamp(setting.distance,1,160,32),opacity),{duration,delay:(clamp(setting.delay,0,15,0)+Math.max(0,index)*clamp(setting.stagger,0,2,0))*1000,easing:originalEasings[setting.easing]||originalEasings.smooth,iterations:setting.repeat==='loop'?Infinity:1,fill:'none'});
  animation.id='ivite-element:'+id;active.set(n,animation);played.add(n);
  animation.onfinish=()=>{if(active.get(n)===animation)active.delete(n);};
 }
 function reconcile(){
  for(const [id,record] of records){const setting=config[id];if(!setting||setting.preset==='none')continue;
   for(const n of record.nodes){
    if(!allowed()||!eligible(n)){cancel(n);played.delete(n);continue;}
    if(setting.repeat==='loop'&&active.has(n)){if(visible.has(n))active.get(n).play();else active.get(n).pause();}
    if(setting.trigger==='hover'){if(hovered.has(n))play(n,id);}
    else if(setting.trigger==='open'||visible.has(n))play(n,id);
   }
  }
 }
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);}reconcile();},{threshold:.08});
 function keyFor(n){
  if(n.dataset.slot)return 'slot:'+n.dataset.slot;
  if(n.dataset.field)return 'field:'+n.dataset.field;
  if(n.dataset.section)return 'section:'+n.dataset.section;
  if(n.id)return 'node:#'+n.id;
  const path=[];let current=n;
  while(current&&current!==document.body){if(current.dataset.section){path.unshift('[section:'+current.dataset.section+']');break;}if(current.id){path.unshift('#'+current.id);break;}const tag=current.tagName.toLowerCase();const peers=[...current.parentElement.children].filter(x=>x.tagName===current.tagName);path.unshift(tag+':nth-of-type('+(peers.indexOf(current)+1)+')');current=current.parentElement;}
  return 'node:'+path.join('>');
 }
 function instanceKey(n){
  if(n.id)return 'instance:#'+n.id;
  const parts=[];let current=n;
  while(current&&current!==document.body){if(current.id){parts.unshift('#'+current.id);break;}if(current.dataset.section){parts.unshift('[section:'+current.dataset.section+']');break;}const peers=[...current.parentElement.children].filter(x=>x.tagName===current.tagName);parts.unshift(current.tagName.toLowerCase()+':nth-of-type('+(peers.indexOf(current)+1)+')');current=current.parentElement;}
  return 'instance:'+parts.join('>');
 }
 function instanceSection(n){return n.closest('#cover,#opening')?'cover':n.closest('[data-section]')?.dataset.section||'desktop';}
 function category(n){return n.matches('img,svg,[data-slot],'+decorSelector)?'Artwork & photos':n.matches('a,button,input,textarea,select,label')?'Buttons & controls':n.matches('[data-section],section,article,figure,nav')?'Cards & sections':'Text';}
 function label(n){if(['days','hours','minutes','seconds'].includes(n.id))return 'Countdown · '+n.id;const text=(n.getAttribute('aria-label')||n.alt||n.textContent||(n.matches('svg')?n.parentElement.getAttribute('aria-label')||n.parentElement.textContent:'')||'').replace(/\s+/g,' ').trim();return n.dataset.slot?n.dataset.slot.replace(/([A-Z])/g,' $1'):text.slice(0,65)||n.id||n.classList.value.split(' ')[0]||n.tagName.toLowerCase();}
 function refresh(){
  const candidates=[...document.querySelectorAll(targetSelector)].filter(n=>!n.closest('.cinema-overlay')&&!n.matches('#cinema-skip,#musicToggle,option')&&(!n.closest('svg')||n.matches('svg')));
  const previous=new Set([...records.values()].flatMap(r=>r.nodes));records.clear();
  for(const n of candidates){const id=keyFor(n);let record=records.get(id);if(!record){record={id,label:label(n),category:category(n),nodes:[]};records.set(id,record);}record.nodes.push(n);if(!previous.delete(n)){observer.observe(n);n.addEventListener('pointerenter',()=>{hovered.add(n);reconcile();});n.addEventListener('pointerleave',()=>{hovered.delete(n);if(config[keyFor(n)]?.trigger==='hover'){cancel(n);played.delete(n);}});n.addEventListener('focusin',()=>{hovered.add(n);reconcile();});n.addEventListener('focusout',()=>{hovered.delete(n);if(config[keyFor(n)]?.trigger==='hover'){cancel(n);played.delete(n);}});}}
  for(const n of previous){observer.unobserve(n);cancel(n);placements.get(n)?.animation.cancel();placements.delete(n);restoreDisplay(n);visible.delete(n);played.delete(n);}
  positionNodes.clear();
  const list=[...records.values()].map(({id,label,category,nodes})=>{positionNodes.set(id,nodes);const counts={};const instances=nodes.map((n,i)=>{const key=instanceKey(n),section=instanceSection(n);positionNodes.set(key,[n]);return {id:key,section,label:section.charAt(0).toUpperCase()+section.slice(1)+' · '+(counts[section]=(counts[section]||0)+1)};});return {id,label,category,instances};});const signature=JSON.stringify(list);
  syncPositions();
  if(signature!==lastList){lastList=signature;if(parent!==window)parent.postMessage({type:'ivite:animation-targets',targets:list},location.origin);}
 }
 function apply(next,isEnabled=true,nextPositions={}){
  const previous=config;config=next&&typeof next==='object'?next:{};enabled=isEnabled;positions=nextPositions&&typeof nextPositions==='object'?nextPositions:{};
  for(const [id,record] of records){if(!config[id]||config[id].preset==='none'||!enabled)record.nodes.forEach(restoreDisplay);if(JSON.stringify(previous[id])!==JSON.stringify(config[id]))for(const n of record.nodes){cancel(n);played.delete(n);}}
  refresh();reconcile();
 }
 function reset(){for(const n of active.keys())cancel(n);played.clear();requestAnimationFrame(reconcile);}
 function pick(value,mode='animation'){picking=!!value;pickMode=mode;document.body.toggleAttribute('data-studio-motion-picking',picking||draggingEnabled);if(!picking&&highlight){highlight.removeAttribute('data-studio-motion-pick');highlight=null;}}
 document.addEventListener('pointerover',event=>{if(!picking)return;const n=event.target.closest(targetSelector);if(highlight)highlight.removeAttribute('data-studio-motion-pick');highlight=n;if(n)n.setAttribute('data-studio-motion-pick','');},true);
 document.addEventListener('click',event=>{if(draggingEnabled){event.preventDefault();event.stopImmediatePropagation();return;}if(!picking)return;const n=event.target.closest(targetSelector);if(!n)return;event.preventDefault();event.stopImmediatePropagation();const id=keyFor(n),mode=pickMode;pick(false);if(parent!==window)parent.postMessage({type:mode==='position'?'ivite:position-selected':'ivite:animation-selected',target:id,instance:instanceKey(n)},location.origin);},true);
 document.addEventListener('pointerdown',event=>{
  if(!draggingEnabled||event.button!==0)return;const hit=event.target.closest(targetSelector);if(!hit)return;event.preventDefault();event.stopImmediatePropagation();
  const selected=(positionNodes.get(dragTarget)||[]).find(n=>n===hit||n.contains(hit)),n=selected||hit;
  const target=keyFor(n),instance=instanceKey(n),key=selected?dragTarget:instance;
  drag={n,key,target,instance,startX:event.clientX,startY:event.clientY,value:{...(positions[key]||{})},pointerId:event.pointerId};n.setAttribute('data-studio-motion-pick','');
  try{n.setPointerCapture(event.pointerId);}catch{}
  if(parent!==window)parent.postMessage({type:'ivite:position-selected',target,instance:key},location.origin);
 },true);
 document.addEventListener('pointermove',event=>{if(!drag)return;event.preventDefault();const value={...drag.value,x:Math.round(clamp((Number(drag.value.x)||0)+event.clientX-drag.startX,-1500,1500,0)),y:Math.round(clamp((Number(drag.value.y)||0)+event.clientY-drag.startY,-3000,3000,0))};positions={...positions,[drag.key]:value};syncPositions();if(parent!==window)parent.postMessage({type:'ivite:position-change',target:drag.target,key:drag.key,value,done:false},location.origin);},true);
 function endDrag(){if(!drag)return;const current=drag;drag=null;current.n.removeAttribute('data-studio-motion-pick');if(parent!==window)parent.postMessage({type:'ivite:position-change',target:current.target,key:current.key,value:positions[current.key]||current.value,done:true},location.origin);}
 document.addEventListener('pointerup',endDrag,true);document.addEventListener('pointercancel',endDrag,true);
 window.addEventListener('message',event=>{if(event.source!==parent||event.origin!==location.origin)return;const d=event.data;if(d?.type==='ivite:animation-pick')pick(d.enabled);if(d?.type==='ivite:animation-preview'){
  const record=records.get(d.target);if(!record)return;const n=record.nodes.find(n=>eligible(n)&&visible.has(n))||record.nodes.find(eligible)||record.nodes[0];
  if(!eligible(n))options.navigate?.(n.closest('[data-section]')?.dataset.section||'cover');
  if(!visible.has(n)&&eligible(n))n.scrollIntoView({behavior:'instant',block:'center'});
  requestAnimationFrame(()=>record.nodes.filter(eligible).forEach(node=>play(node,d.target,true)));
 }if(d?.type==='ivite:position-pick')pick(d.enabled,'position');
 if(d?.type==='ivite:position-drag'){endDrag();draggingEnabled=!!d.enabled;dragTarget=d.target||'';document.body.toggleAttribute('data-studio-motion-picking',picking||draggingEnabled);document.body.toggleAttribute('data-studio-dragging',draggingEnabled);}
 if(d?.type==='ivite:position-focus'){const nodes=positionNodes.get(d.target)||[],n=nodes.find(n=>eligible(n)&&visible.has(n))||nodes.find(eligible)||nodes[0];if(n){if(!eligible(n))options.navigate?.(instanceSection(n)==='desktop'?'hero':instanceSection(n));if(!visible.has(n))n.scrollIntoView({behavior:'instant',block:'center'});}}
 if(d?.type==='ivite:play'||d?.type==='ivite:navigate')reset();});
 new MutationObserver(()=>requestAnimationFrame(reconcile)).observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',reconcile);reduced.addEventListener('change',()=>{reset();reconcile();});
 return {apply,reset,refresh};
}
