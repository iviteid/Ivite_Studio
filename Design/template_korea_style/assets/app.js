// Animate each block once, when it enters the viewport. Content stays readable
// without JavaScript, animation support, or when reduced motion is preferred.
const invitationMotion = (() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  let observer;
  let started = false;

  function reveal(element, immediate = false) {
    observer?.unobserve(element);
    if (element.dataset.revealed) return;
    element.dataset.revealed = 'true';
    if (immediate || preference.matches || !element.animate) return;

    const origins = { up: '0 24px', left: '-24px 0', right: '24px 0', zoom: '0 12px' };
    const animation = element.animate([
      { opacity: 0, translate: origins[element.dataset.reveal] || origins.up, scale: element.dataset.reveal === 'zoom' ? '.96' : '1' },
      { opacity: 1, translate: '0 0', scale: '1' }
    ], {
      duration: 850,
      delay: Math.min(180, Number(element.dataset.revealDelay) || 0),
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'backwards'
    });
    running.add(animation);
    animation.finished.then(() => running.delete(animation), () => running.delete(animation));
  }

  // A focused input or anchor must never wait for its entrance animation.
  document.addEventListener('focusin', event => {
    const element = event.target.closest('[data-reveal]');
    if (!element) return;
    reveal(element, true);
    element.getAnimations().forEach(animation => animation.finish());
  });
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    observer?.disconnect();
    running.forEach(animation => animation.cancel());
    running.clear();
  });

  return {
    start() {
      if (started) return;
      started = true;
      if (preference.matches || !('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    }
  };
})();

function getGuestName() {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('to') || params.get('guest') || params.get('name');
      if (!guest) return 'Tamu Undangan Terhormat';
      return guest.trim().slice(0, 120) || 'Tamu Undangan Terhormat';
    }

    function applyGuestName() {
      const guestName = getGuestName();
      const guestNameEl = document.getElementById('guest-name');
      const guestTitleEl = document.getElementById('guest-title');
      const guestBadgeEl = document.getElementById('guest-badge');

      if (guestNameEl) guestNameEl.textContent = guestName;
      if (guestTitleEl) guestTitleEl.textContent = guestName;
      const nameInput = document.getElementById('rsvp-name');
      if (nameInput && !nameInput.value && guestName !== 'Tamu Undangan Terhormat') nameInput.value = guestName;
      if (guestBadgeEl) guestBadgeEl.textContent = 'For You';

      if (guestName !== 'Tamu Undangan Terhormat') {
        const guestLabel = document.getElementById('guest-label');
        if (guestLabel) guestLabel.textContent = 'Kepada Yth.:';
      }
    }

    document.addEventListener('DOMContentLoaded', applyGuestName);

    (function initFloatingNavigation() {
      const nav = document.getElementById('invitation-navigation');
      const navLinks = document.getElementById('invitation-nav-links');
      const indicator = document.getElementById('nav-indicator');
      if (!nav || !navLinks || !indicator) return;

      const links = [...navLinks.querySelectorAll('a[href^="#"]')];

      function moveIndicator(link, shine = false) {
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.height = `${link.offsetHeight}px`;
        indicator.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;

        if (shine) {
          indicator.classList.remove('shine');
          void indicator.offsetWidth;
          indicator.classList.add('shine');
        }
      }

      function selectLink(link, shine = false) {
        links.forEach(item => {
          const selected = item === link;
          if (selected) item.setAttribute('aria-current', 'location');
          else item.removeAttribute('aria-current');
          item.classList.toggle('text-primary', selected);
          item.classList.toggle('text-on-surface-variant', !selected);
        });
        moveIndicator(link, shine);
      }

      const initialLink = links.find(link => link.getAttribute('href') === window.location.hash) || links[0];
      if (initialLink) requestAnimationFrame(() => selectLink(initialLink));
      links.forEach(link => link.addEventListener('click', () => selectLink(link, true)));
      links.forEach(link => link.addEventListener('pointerenter', () => moveIndicator(link, true)));
      navLinks.addEventListener('pointerleave', () => {
        const selectedLink = links.find(link => link.hasAttribute('aria-current'));
        if (selectedLink) moveIndicator(selectedLink);
      });
      window.addEventListener('resize', () => {
        const currentLink = links.find(link => link.hasAttribute('aria-current'));
        if (currentLink) selectLink(currentLink);
      });

      const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
      const visibleSections = new Map();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
          else visibleSections.delete(entry.target.id);
        });
        const active = [...visibleSections].sort((a, b) => b[1] - a[1])[0];
        const link = active && links.find(item => item.hash === '#' + active[0]);
        if (link) selectLink(link);
      }, { rootMargin: '-10% 0px -45% 0px', threshold: [0, .1, .25, .5, .75, 1] });
      sections.forEach(section => observer.observe(section));
      document.fonts.ready.then(() => {
        const current = links.find(link => link.hasAttribute('aria-current'));
        if (current) moveIndicator(current);
      });
    })();

    // Welcome Curtain & Open Invitation Animation
    const btnOpenInvitation = document.getElementById('btn-open-invitation');
    const welcomeCurtain = document.getElementById('welcome-curtain');
    const invitationCard = document.getElementById('invitation-card');

    const mainContent = document.getElementById('main-content');
    const invitationNavigation = document.getElementById('invitation-navigation');
    mainContent.inert = true;
    invitationNavigation.inert = true;
    btnOpenInvitation.focus({ preventScroll: true });

    if (btnOpenInvitation && welcomeCurtain) {
      btnOpenInvitation.addEventListener('click', () => {
        btnOpenInvitation.disabled = true;
        mainContent.inert = false;
        invitationNavigation.inert = false;
        mainContent.focus({ preventScroll: true });
        welcomeCurtain.inert = true;
        if (invitationCard) invitationCard.classList.add('scale-95', 'opacity-0');
        welcomeCurtain.classList.add('-translate-y-full', 'opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
        setTimeout(() => { welcomeCurtain.style.display = 'none'; }, 1050);
        setTimeout(() => invitationMotion.start(), 180);
        observeGuestbook();
        const weddingAudio = document.getElementById('wedding-audio');
        if (weddingAudio) {
          weddingAudio.play().then(() => {
            updateAudioButton(true);
            showToast('Musik undangan diputar');
          }).catch(() => {
            showToast('Ketuk tombol musik untuk memutar');
          });
        }
      });
    }


    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const field = document.createElement('textarea');
      field.value = text;
      field.style.cssText = 'position:fixed;opacity:0;left:0;top:0';
      document.body.appendChild(field);
      const previous = document.activeElement;
      field.select();
      try {
        if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
      } finally {
        field.remove();
        previous?.focus({ preventScroll: true });
      }
    }

    // Copy account logic
    function copyAccount(text, btnId) {
      copyText(text).then(() => {
        showToast('Nomor rekening ' + text + ' berhasil disalin!');
        const btn = document.getElementById(btnId);
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '<span class="material-symbols-outlined text-[16px]">done</span><span>Tersalin!</span>';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2000);
        }
      }).catch(() => {
        showToast('Gagal menyalin nomor rekening');
      });
    }

    // Copy Address Handler
    const copyAddressBtn = document.getElementById('btn-copy-address');
    if (copyAddressBtn) {
      copyAddressBtn.addEventListener('click', () => {
        const address = 'The Glasshouse Pavilion & Ballroom, Jl. Taman Bunga Asri No. 24, Kawasan Hijau Sentosa Blok C2 No. 88';
        copyText(address).then(() => {
          showToast('Alamat lengkap venue berhasil disalin!');
          const label = document.getElementById('copy-address-label');
          if (label) label.innerText = 'Alamat Tersalin!';
          setTimeout(() => {
            if (label) label.innerText = 'Salin Alamat Lengkap';
          }, 2000);
        }).catch(() => showToast('Alamat belum tersalin. Silakan salin alamat yang tertera.'));
      });
    }

    let toastTimer;
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      if (toast && toastText) {
        toastText.innerText = message;
        toast.classList.remove('translate-y-24', 'opacity-0');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.add('translate-y-24', 'opacity-0');
        }, 3000);
      }
    }

    const attendanceBtns = document.querySelectorAll('.attendance-btn');
    attendanceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        attendanceBtns.forEach(b => {
          b.setAttribute('aria-pressed', 'false');
          b.classList.remove('active', 'bg-secondary-container', 'text-on-secondary-fixed', 'border', 'border-secondary-fixed-dim/60', 'shadow-xs');
          b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
        });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('active', 'bg-secondary-container', 'text-on-secondary-fixed', 'border', 'border-secondary-fixed-dim/60', 'shadow-xs');
        btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      });
    });

const RSVP_ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbyI3xSr_50X1Dk3yzarEKc75-AyWP4XFzxRlGBTerAH7epFkIKv9EUm_ufIDV5cofkE/exec';

const rsvpForm = document.getElementById('rsvp-form');
const rsvpModal = document.getElementById('rsvp-result-modal');
const rsvpModalClose = document.getElementById('rsvp-modal-close');

let modalReturnFocus;
function closeRsvpModal() {
  if (!rsvpModal || rsvpModal.classList.contains('hidden')) return;
  rsvpModal.classList.add('hidden');
  rsvpModal.classList.remove('flex');
  invitationNavigation.inert = false;
  [...mainContent.children].forEach(child => { child.inert = false; });
  modalReturnFocus?.focus({ preventScroll: true });
  document.body.classList.remove('overflow-hidden');
}

function showRsvpResult(result) {
  const modalTitle = document.getElementById('rsvp-modal-title');
  const modalMessage = document.getElementById('rsvp-modal-message');
  const modalGuest = document.getElementById('rsvp-modal-guest');
  const modalQr = document.getElementById('rsvp-modal-qr');
  const modalVerify = document.getElementById('rsvp-modal-verify');
  const modalHint = document.getElementById('rsvp-modal-hint');
  const modalIcon = document.getElementById('rsvp-modal-icon');

  modalQr.classList.add('hidden');
  modalVerify.classList.add('hidden');
  modalGuest.textContent = '';
  modalHint.textContent = '';

  if (!result.ok) {
    modalTitle.textContent = 'RSVP belum berhasil';
    modalMessage.textContent = result.error || 'Konfirmasi belum tersimpan. Silakan coba lagi.';
    modalIcon.textContent = 'error';
    showToast('RSVP belum berhasil dikirim.');
  } else {
    modalTitle.textContent = result.attendance === 'Hadir' ? 'Konfirmasi terkirim' : 'Terima kasih';
    modalMessage.textContent = result.attendance === 'Hadir'
      ? 'Data tersimpan. Tunjukkan QR ini kepada petugas saat tiba.'
      : 'Konfirmasi Anda sudah tersimpan. Terima kasih sudah memberi kabar.';
    modalIcon.textContent = 'check_circle';
    modalGuest.textContent = `${result.name} · ${result.pax} tamu`;

    if (result.attendance === 'Hadir' && result.token) {
      const ticketUrl = `${RSVP_ENDPOINT_URL}?verify=${encodeURIComponent(result.token)}`;
      const qrUrl = `https://quickchart.io/qr?size=480&margin=1&text=${encodeURIComponent(ticketUrl)}`;
      modalQr.src = qrUrl;
      modalQr.alt = `QR tiket kehadiran untuk ${result.name}`;
      modalQr.classList.remove('hidden');
      modalVerify.classList.remove('hidden');
      modalVerify.classList.add('inline-flex');
      modalVerify.onclick = async () => {
        try {
          const blob = await fetch(qrUrl).then(r => r.blob());
          const objUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = objUrl;
          a.download = `tiket-${result.name.replace(/\s+/g, '-').toLowerCase()}.png`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(objUrl), 1000);
        } catch {
          window.open(qrUrl, '_blank');
        }
      };
      const isVerifiable = result.token && result.token.length === 32;
      modalHint.textContent = isVerifiable
        ? 'Unduh atau screenshot QR ini untuk check-in di venue.'
        : 'Screenshot QR ini untuk check-in. Data Anda sudah tercatat.';
    }

    rsvpForm.reset();
    attendanceBtns[0].click();
    showToast('RSVP berhasil dikirim.');
  }

  modalReturnFocus = document.activeElement;
  invitationNavigation.inert = true;
  [...mainContent.children].forEach(child => { child.inert = child !== rsvpModal; });
  rsvpModal.classList.remove('hidden');
  rsvpModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  rsvpModalClose.focus();
}

if (rsvpModalClose) rsvpModalClose.addEventListener('click', closeRsvpModal);
if (rsvpModal) {
  rsvpModal.addEventListener('click', event => {
    if (event.target === rsvpModal) closeRsvpModal();
  });
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeRsvpModal();
  if (event.key === 'Tab' && !rsvpModal.classList.contains('hidden')) {
    const focusable = [...rsvpModal.querySelectorAll('button, a[href]')].filter(el => el.getClientRects().length && !el.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (rsvpForm.querySelector('button[type="submit"]').disabled) return;
    const nameInput = document.getElementById('rsvp-name');
    const messageInput = document.getElementById('rsvp-message');
    const submitButton = rsvpForm.querySelector('button[type="submit"]');
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const attendance = document.querySelector('.attendance-btn.active')?.dataset.status || 'hadir';

    if (!name) { showToast('Nama wajib diisi.'); nameInput.focus(); return; }
    if (!message) { showToast('Doa & harapan wajib diisi.'); messageInput.focus(); return; }

    submitButton.disabled = true;
    submitButton.querySelector('span:last-child').textContent = 'Mengirim...';
    showToast('Mengirim konfirmasi ke server...');

    try {
      const url = new URL(RSVP_ENDPOINT_URL);
      url.searchParams.set('action', 'rsvp');
      url.searchParams.set('name', name);
      url.searchParams.set('pax', document.getElementById('rsvp-pax')?.value || '1');
      url.searchParams.set('attendance', attendance);
      url.searchParams.set('message', message);

      const response = await fetch(url.toString(), {
        credentials: 'omit',
        signal: AbortSignal.timeout(20000)
      });
      if (!response.ok) throw new Error('Server belum dapat dihubungi. Silakan coba lagi nanti.');
      const result = await response.json();
      if (typeof result.ok !== 'boolean') throw new Error('Respons server tidak valid. Konfirmasi belum dapat dipastikan.');
      showRsvpResult(result);
      if (result.ok) {
        const wish = { name, message, time: new Date().toISOString() };
        submittedWishes.unshift(wish);
        addWishNote(name, message, wish.time);
        document.getElementById('wishes-status').textContent = '';
      }
    } catch (err) {
      showRsvpResult({ ok: false, error: 'Konfirmasi server belum diterima. Data isian tetap tersimpan di formulir. Periksa koneksi atau hubungi penyelenggara sebelum mencoba kembali.' });
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector('span:last-child').textContent = 'Kirim RSVP & Ucapan';
    }
  });
}
    function formatWishTime(isoTime) {
      if (!isoTime) return 'Baru saja';
      const parsed = Date.parse(isoTime);
      if (!Number.isFinite(parsed)) return 'Baru saja';
      const diff = Math.max(0, Date.now() - parsed);
      const mins = Math.floor(diff / 60000);
      if (mins < 2) return 'Baru saja';
      if (mins < 60) return mins + ' menit lalu';
      const hours = Math.floor(mins / 60);
      if (hours < 24) return hours + ' jam lalu';
      const days = Math.floor(hours / 24);
      if (days === 1) return 'Kemarin';
      return days + ' hari lalu';
    }

    const submittedWishes = [];
    function addWishNote(guestName, guestMessage, isoTime, prepend = true, target = null) {
      const wall = target || document.getElementById('wishes-wall');
      if (!wall) return;
      const rotations = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-2'];
      const bgColors = ['bg-secondary-container', 'bg-primary-fixed-dim/50', 'bg-secondary-fixed'];
      const rot = rotations[Math.floor(Math.random() * rotations.length)];
      const bg = bgColors[Math.floor(Math.random() * bgColors.length)];
      const initial = guestName.trim().charAt(0).toUpperCase();

      const note = document.createElement('div');
      note.className = `${prepend ? 'wish-animate ' : ''}p-5 rounded-3xl bg-surface-container-lowest border border-secondary-fixed-dim/30 shadow-[0_8px_20px_rgba(69,99,105,0.06)] transform hover:scale-[1.01] ${rot} transition-all`;

      const header = document.createElement('div');
      header.className = 'flex items-center justify-between mb-2';
      const left = document.createElement('div');
      left.className = 'flex items-center gap-2';
      const avatar = document.createElement('span');
      avatar.className = `w-7 h-7 rounded-full ${bg} flex items-center justify-center text-primary text-xs font-semibold`;
      avatar.textContent = initial;
      const nameEl = document.createElement('span');
      nameEl.className = 'text-xs font-semibold text-on-surface';
      nameEl.textContent = guestName;
      const timeEl = document.createElement('span');
      timeEl.className = 'text-[10px] text-tertiary';
      timeEl.textContent = formatWishTime(isoTime);
      const msg = document.createElement('p');
      msg.className = 'text-xs text-on-surface-variant font-light leading-relaxed';
      msg.textContent = guestMessage;

      left.appendChild(avatar);
      left.appendChild(nameEl);
      header.appendChild(left);
      header.appendChild(timeEl);
      note.appendChild(header);
      note.appendChild(msg);

      if (prepend) wall.prepend(note);
      else wall.appendChild(note);

      const counter = document.getElementById('wishes-counter');
      if (counter && !target) {
        const count = wall.querySelectorAll(':scope > div').length;
        counter.textContent = count + ' Pesan Terbaru';
      }
    }

    let wishesLoading = false;
    function observeGuestbook() {
      const section = document.getElementById('rsvp-ucapan');
      if (!('IntersectionObserver' in window)) { loadWishes(); return; }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          loadWishes();
        }
      }, { rootMargin: '400px' });
      observer.observe(section);
    }

    async function loadWishes() {
      if (wishesLoading) return;
      wishesLoading = true;
      const status = document.getElementById('wishes-status');
      const retry = document.getElementById('wishes-retry');
      const wall = document.getElementById('wishes-wall');
      status.textContent = 'Memuat ucapan...';
      retry.classList.add('hidden');
      wall.setAttribute('aria-busy', 'true');
      try {
        const url = new URL(RSVP_ENDPOINT_URL);
        url.searchParams.set('action', 'wishes');
        const response = await fetch(url.toString(), { credentials: 'omit', signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('Guestbook unavailable');
        const data = await response.json();
        if (!data.ok || !Array.isArray(data.wishes)) throw new Error('Invalid guestbook');
        const remote = data.wishes.filter(w => w && typeof w.name === 'string' && typeof w.message === 'string');
        // Preserve newly submitted notes if an older read response arrives later.
        const wishes = [...submittedWishes, ...remote.filter(w =>
          !submittedWishes.some(local => local.name === w.name && local.message === w.message)
        )].slice(0, 30);
        const fragment = document.createDocumentFragment();
        wishes.forEach(w => addWishNote(w.name, w.message, w.time, false, fragment));
        wall.replaceChildren(fragment);
        document.getElementById('wishes-counter').textContent = wishes.length + ' Pesan Terbaru';
        status.textContent = wishes.length ? '' : 'Belum ada ucapan. Jadilah yang pertama mengirim doa hangat.';
      } catch (_) {
        status.textContent = 'Ucapan belum dapat dimuat. Silakan coba lagi.';
        retry.classList.remove('hidden');
      } finally {
        wall.setAttribute('aria-busy', 'false');
        wishesLoading = false;
      }
    }
    document.getElementById('wishes-retry').addEventListener('click', loadWishes);

    const audioBtn = document.getElementById('audio-toggle-btn');
    const weddingAudio = document.getElementById('wedding-audio');

    function updateAudioButton(isPlaying) {
      if (!audioBtn) return;
      const icon = audioBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.classList.toggle('animate-spin', isPlaying);
      audioBtn.setAttribute('aria-pressed', String(isPlaying));
      audioBtn.setAttribute('aria-label', isPlaying ? 'Jeda musik' : 'Putar musik');
    }

    if (audioBtn && weddingAudio) {
      weddingAudio.addEventListener('play', () => updateAudioButton(true));
      weddingAudio.addEventListener('pause', () => updateAudioButton(false));
      audioBtn.addEventListener('click', () => {
        if (weddingAudio.paused) {
          weddingAudio.play().catch(() => {});
        } else {
          weddingAudio.pause();
        }
      });
    }

    (function initCountdown() {
      // Resepsi: 24 Oktober 2026, 11:30 WIB. Offset eksplisit untuk semua zona waktu tamu.
      const weddingTime = Date.parse('2026-10-24T11:30:00+07:00');
      const units = ['days', 'hours', 'minutes', 'seconds'];
      const elements = units.map(unit => document.getElementById('countdown-' + unit));
      let timer;
      function update() {
        const total = Math.max(0, Math.floor((weddingTime - Date.now()) / 1000));
        const values = [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
        elements.forEach((element, index) => {
          if (element) element.textContent = String(values[index]).padStart(2, '0');
        });
        if (!total) clearInterval(timer);
        return total;
      }
      function resume() {
        clearInterval(timer);
        if (!document.hidden && update()) timer = setInterval(update, 1000);
      }
      document.addEventListener('visibilitychange', resume);
      resume();
    })();
