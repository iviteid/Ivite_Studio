/* Included in both invitation renderers and in standalone exports. */
function createStudioMusic(){
 const audio=document.createElement('audio');audio.id='studio-audio';audio.loop=true;audio.preload='none';
 const toggle=document.createElement('button');toggle.type='button';toggle.id='studio-song-toggle';toggle.textContent='♫';toggle.hidden=true;
 toggle.style.cssText='position:fixed;right:18px;top:18px;z-index:1100;width:36px;height:36px;border:1px solid #b99a6166;border-radius:50%;background:#f5eddeed;color:#304839;cursor:pointer';
 document.body.append(audio,toggle);let settings={},source='';
 function ui(){toggle.setAttribute('aria-label',audio.paused?'Play invitation music':'Pause invitation music');toggle.setAttribute('aria-pressed',String(!audio.paused));toggle.textContent=audio.paused?'♫':'Ⅱ';}
 async function play(){if(!settings.enabled||!source)return;try{await audio.play();toggle.title='Invitation music';}catch{toggle.title='Tap to play music';}ui();}
 toggle.onclick=()=>{if(audio.paused)play();else{audio.pause();ui();}};
 audio.addEventListener('play',ui);audio.addEventListener('pause',ui);audio.addEventListener('error',()=>{toggle.title='Song could not be loaded. Please choose another audio file.';});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)audio.pause();});
 return {apply(next){settings=next||{};const nextSource=settings.src||'';if(nextSource!==source){source=nextSource;audio.pause();if(source)audio.src=source;else audio.removeAttribute('src');audio.load();}audio.volume=Math.max(0,Math.min(1,(Number(settings.volume)||0)/100));toggle.hidden=!settings.enabled||!source;if(toggle.hidden)audio.pause();ui();},open(){if(settings.autoplay)play();},stop(){audio.pause();ui();}};
}
