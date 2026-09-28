/**
 * main.js
 * Inisialisasi utama aplikasi — jalankan semua modul & binding event.
 */

// ─── Copy to Clipboard ───────────────────────────────────────────────────────

function showCopySuccess(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '<span class="material-symbols-outlined text-base text-primary">check</span><span>Tersalin!</span>';
  setTimeout(() => { btn.innerHTML = original; }, 2500);
}

function copyToClipboard(text, buttonEl) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showCopySuccess(buttonEl))
      .catch(() => fallbackCopy(text, buttonEl));
  } else {
    fallbackCopy(text, buttonEl);
  }
}

function fallbackCopy(text, buttonEl) {
  const tmp = document.createElement('input');
  tmp.value = text;
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
  showCopySuccess(buttonEl);
}

window.copyToClipboard = copyToClipboard;

// ─── Google Calendar ──────────────────────────────────────────────────────────

function addToCalendar(title, location, start, end) {
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${start}/${end}` +
    `&location=${encodeURIComponent(location)}` +
    `&details=${encodeURIComponent(`Pernikahan Suci ${WEDDING_CONFIG.couple.coupleNames}`)}`;
  window.open(url, '_blank');
}

window.addToCalendar = addToCalendar;

// ─── Guest Name (URL param ?to=...) ──────────────────────────────────────────

function applyGuestName(name) {
  const defaultName = 'Bapak / Ibu / Saudara(i)';
  const val = name?.trim() || defaultName;

  const coverEl  = document.getElementById('cover-guest-name');
  const heroEl   = document.getElementById('hero-guest-name');
  const ticketEl = document.getElementById('ticket-guest-name');
  const rsvpEl   = document.getElementById('rsvp-name');

  if (coverEl)  coverEl.textContent  = val;
  if (heroEl)   heroEl.textContent   = val;
  if (ticketEl) ticketEl.textContent = val;
  if (rsvpEl && name?.trim()) rsvpEl.value = name.trim();
}

window.applyGuestName = applyGuestName;

function initGuestParam() {
  const params   = new URLSearchParams(window.location.search);
  const guest    = params.get('to') || params.get('guest') || params.get('n');
  if (guest) applyGuestName(guest);
}

// ─── Music Player ─────────────────────────────────────────────────────────────

function initMusicPlayer() {
  const musicBtn = document.querySelector('button[aria-label="Toggle Wedding Music"]');
  const audioEl  = document.getElementById('wedding-audio');
  if (!musicBtn || !audioEl) return;

  let isPlaying = false;
  const icon = musicBtn.querySelector('.material-symbols-outlined');

  musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audioEl.play().then(() => {
        isPlaying = true;
        if (icon) {
          icon.textContent = 'pause';
          icon.classList.add('animate-spin');
        }
      }).catch(() => {});
    } else {
      audioEl.pause();
      isPlaying = false;
      if (icon) {
        icon.textContent = 'music_note';
        icon.classList.remove('animate-spin');
      }
    }
  });
}

// ─── Cover Page (Buka Undangan) ───────────────────────────────────────────────

const COVER_PETAL_SVGS = [
  `<svg viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs><linearGradient id="cp1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8e8" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#e8c779" stop-opacity="0.6"/>
    </linearGradient></defs>
    <path d="M15 2 C22 2,28 9,28 19 C28 27,21 34,15 35 C9 34,2 27,2 19 C2 9,8 2,15 2Z" fill="url(#cp1)"/>
  </svg>`,
  `<svg viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs><linearGradient id="cp2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffef0" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0.55"/>
    </linearGradient></defs>
    <path d="M14 2 C20 7,24 15,22 23 C20 29,15 33,14 33 C13 33,8 29,6 23 C4 15,8 7,14 2Z" fill="url(#cp2)"/>
  </svg>`,
  `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs><linearGradient id="cp3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbe8" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ffe08b" stop-opacity="0.65"/>
    </linearGradient></defs>
    <g transform="translate(15,15)">
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="url(#cp3)" transform="rotate(0)"/>
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="url(#cp3)" transform="rotate(72)"/>
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="url(#cp3)" transform="rotate(144)"/>
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="url(#cp3)" transform="rotate(216)"/>
      <ellipse cx="0" cy="-8" rx="4" ry="8" fill="url(#cp3)" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="3" fill="#c5a028" opacity="0.7"/>
    </g>
  </svg>`,
];

function initCoverPetals() {
  const container = document.getElementById('cover-petals');
  if (!container) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const count = window.innerWidth < 640 ? 16 : 28;
  for (let i = 0; i < count; i++) {
    const el  = document.createElement('div');
    el.className = 'cover-petal';
    const size     = Math.floor(Math.random() * 14) + 8;
    const duration = (Math.random() * 8 + 9).toFixed(2);
    const delay    = (Math.random() * 14).toFixed(2);
    const drift    = (Math.random() * 120 - 60).toFixed(0);
    const opacity  = (Math.random() * 0.35 + 0.35).toFixed(2);
    el.style.cssText = `width:${size}px;height:${Math.round(size*1.3)}px;left:${Math.random()*99}%;`
      + `animation-duration:${duration}s;animation-delay:${delay}s;opacity:${opacity};`
      + `--drift:${drift}px`;
    el.innerHTML = COVER_PETAL_SVGS[i % COVER_PETAL_SVGS.length];
    container.appendChild(el);
  }
}

function openInvitation() {
  const cover  = document.getElementById('cover-page');
  const header = document.getElementById('main-header');
  if (!cover) return;

  cover.classList.add('is-closing');

  // Hentikan countdown cover
  if (_coverCountdownTimer) { clearInterval(_coverCountdownTimer); _coverCountdownTimer = null; }

  // Tampilkan header bersamaan
  if (header) {
    header.style.opacity = '1';
    header.style.pointerEvents = '';
  }

  // Setelah animasi selesai sembunyikan cover
  cover.addEventListener('animationend', () => {
    cover.style.display = 'none';
    cover.removeAttribute('aria-modal');
    document.getElementById('main-header')?.focus();
  }, { once: true });
}

window.openInvitation = openInvitation;

// ─── Cover: isi data dinamis dari WEDDING_CONFIG ─────────────────────────────

function initCoverPage() {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // Nama mempelai — satu elemen gabungan "Aditya & Fatimah"
  const namesEl = document.getElementById('cover-couple-names');
  if (namesEl && cfg.couple) {
    const g = cfg.couple.groom?.shortName ?? '';
    const b = cfg.couple.bride?.shortName ?? '';
    if (g && b) namesEl.innerHTML = `${g} <span class="not-italic font-normal">&amp;</span> ${b}`;
  }

  // Tanggal (uppercase)
  const dateEl  = document.getElementById('cover-event-date');
  const venueEl = document.getElementById('cover-event-venue');
  if (dateEl  && cfg.event?.reception?.date)
    dateEl.textContent  = cfg.event.reception.date.toUpperCase();
  if (venueEl && cfg.event?.location)
    venueEl.textContent = cfg.event.location.toUpperCase();

  // Countdown cover
  startCoverCountdown(cfg.event?.countdownTarget);

  initCoverPetals();
}

let _coverCountdownTimer = null;
function startCoverCountdown(target) {
  if (!target) return;
  const end = new Date(target).getTime();

  function tick() {
    const diff = end - Date.now();
    const pad  = n => String(Math.max(0, n)).padStart(2, '0');
    if (diff <= 0) {
      ['cover-cd-days','cover-cd-hours','cover-cd-mins','cover-cd-secs']
        .forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '00'; });
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = pad(v); };
    set('cover-cd-days',  days);
    set('cover-cd-hours', hours);
    set('cover-cd-mins',  mins);
    set('cover-cd-secs',  secs);
  }
  tick();
  _coverCountdownTimer = setInterval(tick, 1000);
}

function coverToggleMusic() {
  const audio = document.getElementById('wedding-audio');
  const icon  = document.getElementById('cover-music-icon');
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(() => {});
    if (icon) icon.textContent = 'pause';
  } else {
    audio.pause();
    if (icon) icon.textContent = 'music_note';
  }
}
window.coverToggleMusic = coverToggleMusic;

// ─── DOMContentLoaded ────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initCoverPage();
  initMusicPlayer();
  initGuestParam();
  initGallery();
  initPetalsEffect();
  renderInitialWishes();
});
