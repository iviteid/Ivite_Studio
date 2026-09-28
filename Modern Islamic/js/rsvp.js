/**
 * rsvp.js
 * Modul form RSVP dan feed ucapan doa.
 */

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[m]);
}

function renderInitialWishes() {
  const container = document.getElementById('wishes-container');
  if (!container) return;

  container.innerHTML = '';
  WEDDING_CONFIG.initialWishes.forEach(wish => {
    container.appendChild(createWishCard(wish.name, wish.status, wish.message, wish.time));
  });
}

function createWishCard(name, status, message, timeLabel = 'Baru saja') {
  const card = document.createElement('div');
  card.className = 'bg-surface-container-lowest/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex flex-col';
  card.innerHTML = `
    <div class="flex items-center justify-between mb-1">
      <span class="font-title-md text-title-md text-primary font-semibold">${escapeHtml(name)}</span>
      <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">${escapeHtml(status)}</span>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant italic">&ldquo;${escapeHtml(message)}&rdquo;</p>
    <span class="font-label-md text-label-md text-on-surface-variant/60 mt-2">${escapeHtml(timeLabel)}</span>
  `;
  return card;
}

function handleRsvpSubmit(e) {
  e.preventDefault();

  const name       = document.getElementById('rsvp-name').value.trim();
  const attendance = document.getElementById('rsvp-attendance').value;
  const message    = document.getElementById('rsvp-message').value.trim();
  const alertBox   = document.getElementById('rsvp-alert');
  const submitBtn  = document.getElementById('rsvp-btn');
  const container  = document.getElementById('wishes-container');

  if (!name || !message) return;

  submitBtn.disabled = true;
  submitBtn.classList.add('opacity-75');

  setTimeout(() => {
    alertBox.classList.remove('hidden');
    alertBox.classList.add('flex');

    if (container) {
      const card = createWishCard(name, attendance, message);
      container.insertBefore(card, container.firstChild);
    }

    document.getElementById('rsvp-form').reset();
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-75');

    setTimeout(() => {
      alertBox.classList.add('hidden');
      alertBox.classList.remove('flex');
    }, 5000);
  }, 400);
}

window.handleRsvpSubmit = handleRsvpSubmit;
window.renderInitialWishes = renderInitialWishes;
