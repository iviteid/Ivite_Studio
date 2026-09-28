/**
 * gallery.js
 * Modul filter galeri & lightbox.
 */

let currentLightboxIdx = 0;
const galleryData = WEDDING_CONFIG.gallery;

function initGallery() {
  const filterBtns  = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('text-on-surface-variant');

      galleryCards.forEach(card => {
        const cats = card.dataset.category || '';
        const visible = filter === 'all' || cats.includes(filter);

        if (visible) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => card.classList.add('hidden'), 250);
        }
      });
    });
  });

  // Keyboard navigation untuk lightbox
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight')  nextLightboxSlide();
    if (e.key === 'ArrowLeft')   prevLightboxSlide();
  });
}

function openLightbox(index) {
  currentLightboxIdx = index;
  const modal   = document.getElementById('gallery-lightbox');
  const img     = document.getElementById('lightbox-img');
  const title   = document.getElementById('lightbox-title');
  const counter = document.getElementById('lightbox-counter');

  const item = galleryData[currentLightboxIdx];
  img.src              = item.src;
  title.textContent    = item.caption;
  counter.textContent  = `${currentLightboxIdx + 1} dari ${galleryData.length}`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox');
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }, 300);
}

function nextLightboxSlide() {
  currentLightboxIdx = (currentLightboxIdx + 1) % galleryData.length;
  updateLightboxContent();
}

function prevLightboxSlide() {
  currentLightboxIdx = (currentLightboxIdx - 1 + galleryData.length) % galleryData.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img     = document.getElementById('lightbox-img');
  const title   = document.getElementById('lightbox-title');
  const counter = document.getElementById('lightbox-counter');

  img.style.opacity = '0.4';
  setTimeout(() => {
    const item = galleryData[currentLightboxIdx];
    img.src             = item.src;
    title.textContent   = item.caption;
    counter.textContent = `${currentLightboxIdx + 1} dari ${galleryData.length}`;
    img.style.opacity   = '1';
  }, 150);
}

// Expose ke inline onclick handlers di HTML
window.openLightbox     = openLightbox;
window.closeLightbox    = closeLightbox;
window.nextLightboxSlide = nextLightboxSlide;
window.prevLightboxSlide = prevLightboxSlide;
window.initGallery       = initGallery;
