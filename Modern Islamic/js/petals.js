/**
 * petals.js
 * Modul efek kelopak bunga jatuh (floating petals) — global, mencakup seluruh halaman.
 */

const PETAL_SVGS = [
  // 1. Rose petal — gradient emas/blush
  `<svg viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-rose" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#fff8f0" stop-opacity="0.95"/>
        <stop offset="50%"  stop-color="#fcedd8" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#e8c779" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <path d="M15 2 C22 2,28 9,28 19 C28 27,21 34,15 35 C9 34,2 27,2 19 C2 9,8 2,15 2Z" fill="url(#pg-rose)"/>
    <path d="M15 5 C17 12,16 26,15 32" stroke="#d5b058" stroke-width="0.7" stroke-opacity="0.35" stroke-linecap="round"/>
  </svg>`,

  // 2. Jasmine / Melati — ivory blush
  `<svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-jasmine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#ffffff"  stop-opacity="0.95"/>
        <stop offset="60%"  stop-color="#faf2e3"  stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#eed8a1"  stop-opacity="0.68"/>
      </linearGradient>
    </defs>
    <path d="M12 2 C18 7,22 15,20 23 C18 29,13 31,12 31 C11 31,6 29,4 23 C2 15,6 7,12 2Z" fill="url(#pg-jasmine)"/>
    <path d="M12 5 C13 13,12 24,12 28" stroke="#c8a84b" stroke-width="0.5" stroke-opacity="0.3" stroke-linecap="round"/>
  </svg>`,

  // 3. Blush asymmetric — shimmer
  `<svg viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-blush" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#fffbfa" stop-opacity="0.95"/>
        <stop offset="70%"  stop-color="#f5e1cb" stop-opacity="0.82"/>
        <stop offset="100%" stop-color="#dfb75c" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <path d="M13 1 C20 4,25 12,24 22 C23 28,17 33,11 33 C6 33,2 28,2 20 C2 10,7 3,13 1Z" fill="url(#pg-blush)"/>
  </svg>`,

  // 4. Cherry Blossom — 5 bulat, pink lembut
  `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-cherry" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#fff5f0" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#f9e0c8" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <g transform="translate(16,16)">
      <ellipse cx="0" cy="-8" rx="4.5" ry="8"   fill="url(#pg-cherry)" transform="rotate(0)"/>
      <ellipse cx="0" cy="-8" rx="4.5" ry="8"   fill="url(#pg-cherry)" transform="rotate(72)"/>
      <ellipse cx="0" cy="-8" rx="4.5" ry="8"   fill="url(#pg-cherry)" transform="rotate(144)"/>
      <ellipse cx="0" cy="-8" rx="4.5" ry="8"   fill="url(#pg-cherry)" transform="rotate(216)"/>
      <ellipse cx="0" cy="-8" rx="4.5" ry="8"   fill="url(#pg-cherry)" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="3.5" fill="#f5c97a" opacity="0.85"/>
      <circle cx="0" cy="0" r="1.5" fill="#e8a040" opacity="0.7"/>
    </g>
  </svg>`,

  // 5. Frangipani / Kamboja — 5 kelopak melintir, krem-gading
  `<svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-frangi" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%"   stop-color="#fffef8" stop-opacity="0.95"/>
        <stop offset="60%"  stop-color="#fdf3d5" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#e8c96a" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <g transform="translate(17,17)">
      <path d="M0,-14 C4,-14,7,-9,6,-3 C5,3,2,7,0,8 C-2,7,-5,3,-6,-3 C-7,-9,-4,-14,0,-14Z"
            fill="url(#pg-frangi)" transform="rotate(0)"/>
      <path d="M0,-14 C4,-14,7,-9,6,-3 C5,3,2,7,0,8 C-2,7,-5,3,-6,-3 C-7,-9,-4,-14,0,-14Z"
            fill="url(#pg-frangi)" transform="rotate(72)"/>
      <path d="M0,-14 C4,-14,7,-9,6,-3 C5,3,2,7,0,8 C-2,7,-5,3,-6,-3 C-7,-9,-4,-14,0,-14Z"
            fill="url(#pg-frangi)" transform="rotate(144)"/>
      <path d="M0,-14 C4,-14,7,-9,6,-3 C5,3,2,7,0,8 C-2,7,-5,3,-6,-3 C-7,-9,-4,-14,0,-14Z"
            fill="url(#pg-frangi)" transform="rotate(216)"/>
      <path d="M0,-14 C4,-14,7,-9,6,-3 C5,3,2,7,0,8 C-2,7,-5,3,-6,-3 C-7,-9,-4,-14,0,-14Z"
            fill="url(#pg-frangi)" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="4" fill="#eac249" opacity="0.8"/>
      <circle cx="0" cy="0" r="2" fill="#ffe08b" opacity="0.9"/>
    </g>
  </svg>`,

  // 6. Star Flower — 6 kelopak bintang, emas-putih
  `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-star" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#ffffff"  stop-opacity="0.95"/>
        <stop offset="100%" stop-color="#ffe08b"  stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <g transform="translate(15,15)">
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(0)"/>
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(60)"/>
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(120)"/>
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(180)"/>
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(240)"/>
      <ellipse cx="0" cy="-8" rx="3"   ry="8"   fill="url(#pg-star)" transform="rotate(300)"/>
      <circle cx="0" cy="0" r="3" fill="#eac249" opacity="0.85"/>
    </g>
  </svg>`,

  // 7. Lotus petal — runcing, putih gading
  `<svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-lotus" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#ffffff"  stop-opacity="0.93"/>
        <stop offset="50%"  stop-color="#fdf6e8"  stop-opacity="0.87"/>
        <stop offset="100%" stop-color="#e8c77a"  stop-opacity="0.68"/>
      </linearGradient>
    </defs>
    <path d="M10 1 C15 6,18 14,16 22 C14 28,11 31,10 31 C9 31,6 28,4 22 C2 14,5 6,10 1Z" fill="url(#pg-lotus)"/>
    <path d="M10 4 C11 12,10 24,10 28" stroke="#c5a028" stroke-width="0.5" stroke-opacity="0.3" stroke-linecap="round"/>
    <path d="M10 10 C13 14,15 18,15 22" stroke="#c5a028" stroke-width="0.4" stroke-opacity="0.2" stroke-linecap="round"/>
    <path d="M10 10 C7 14,5 18,5 22"   stroke="#c5a028" stroke-width="0.4" stroke-opacity="0.2" stroke-linecap="round"/>
  </svg>`,

  // 8. Hibiscus single petal — lebar, bergelombang
  `<svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <linearGradient id="pg-hibiscus" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#fff9f0" stop-opacity="0.93"/>
        <stop offset="100%" stop-color="#f0d080" stop-opacity="0.72"/>
      </linearGradient>
    </defs>
    <path d="M14 2 C20 2,26 8,26 17 C26 24,21 32,14 34 C8 33,2 26,2 17 C2 8,8 2,14 2Z" fill="url(#pg-hibiscus)"/>
    <path d="M14 4 C16 4,18 8,18 14 C18 20,16 28,14 32" stroke="#d4aa50" stroke-width="0.6" stroke-opacity="0.35" stroke-linecap="round"/>
    <path d="M5 12 C8 10,11 14,12 18" stroke="#d4aa50" stroke-width="0.4" stroke-opacity="0.25" stroke-linecap="round"/>
    <path d="M23 12 C20 10,17 14,16 18" stroke="#d4aa50" stroke-width="0.4" stroke-opacity="0.25" stroke-linecap="round"/>
  </svg>`,
];

let petalsActive = true;

function initPetalsEffect() {
  const container = document.getElementById('petals-global');
  if (!container) return;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    petalsActive = false;
    updatePetalsToggleUI();
    return;
  }

  container.innerHTML = '';
  const count = window.innerWidth < 640 ? 30 : 55;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'floating-petal';

    const size     = Math.floor(Math.random() * 18) + 8;   // 8–26px
    const left     = Math.random() * 99;
    const duration = (Math.random() * 9 + 7).toFixed(2);   // 7–16s
    const delay    = (Math.random() * 18).toFixed(2);       // 0–18s (lebih menyebar)
    const drift    = (Math.random() * 140 - 70).toFixed(0); // -70 to 70px
    const svg      = PETAL_SVGS[Math.floor(Math.random() * PETAL_SVGS.length)];
    const opacity  = (Math.random() * 0.4 + 0.5).toFixed(2); // 0.5–0.9

    petal.style.width             = `${size}px`;
    petal.style.height            = `${Math.round(size * 1.25)}px`;
    petal.style.left              = `${left}%`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay    = `${delay}s`;
    petal.style.opacity           = opacity;
    petal.style.setProperty('--drift', `${drift}px`);
    petal.innerHTML = svg;

    container.appendChild(petal);
  }
}

function togglePetalsEffect() {
  const container = document.getElementById('petals-global');
  if (!container) return;

  petalsActive = !petalsActive;

  if (petalsActive) {
    container.style.display = 'block';
    if (container.children.length === 0) initPetalsEffect();
  } else {
    container.style.display = 'none';
  }

  updatePetalsToggleUI();
}

function updatePetalsToggleUI() {
  const btnText = document.getElementById('petals-toggle-text');
  const btn     = document.getElementById('petals-toggle-btn');
  if (!btnText || !btn) return;

  if (petalsActive) {
    btnText.textContent = 'Efek Kelopak: Aktif';
    btn.classList.add('text-primary');
    btn.classList.remove('text-on-surface-variant/60');
  } else {
    btnText.textContent = 'Efek Kelopak: Nonaktif';
    btn.classList.remove('text-primary');
    btn.classList.add('text-on-surface-variant/60');
  }
}

window.togglePetalsEffect = togglePetalsEffect;
window.initPetalsEffect   = initPetalsEffect;
