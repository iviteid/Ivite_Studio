/* ============================================================
   ivite — mesin interaktif front-end (reusable, tanpa backend)
   Digerakkan oleh atribut data-* + hook id/class. Semua fitur
   defensif (cek keberadaan elemen) & menghormati reduced-motion.
   Lapis "sistem" (RSVP & buku tamu tersimpan) menyusul via backend
   yang perlu persetujuan dua pihak — di sini hanya demo localStorage.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- 0. Inject kit botani (sprite SVG) inline ---------- */
  function loadKit() {
    try {
      if (document.getElementById('kit-janur')) return;        // sudah ada
      var s = [].slice.call(document.scripts).filter(function (x) { return /shared\/invite\.js/.test(x.src); })[0];
      if (!s) return;
      var base = s.src.replace(/invite\.js.*$/, '');            // .../shared/
      fetch(base + 'kit/botani.svg').then(function (r) { return r.text(); }).then(function (txt) {
        var holder = document.createElement('div');
        holder.setAttribute('aria-hidden', 'true');
        holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
        holder.innerHTML = txt;
        document.body.insertBefore(holder, document.body.firstChild);
        // nudge <use> agar resolve setelah simbol di-inject
        qsa('use').forEach(function (u) {
          var h = u.getAttribute('href') || u.getAttribute('xlink:href');
          if (h && /^#kit-/.test(h)) { u.setAttribute('href', h); }
        });
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- 1. Nama tamu dari link (?kepada= / ?to=) ---------- */
  function guestName() {
    try {
      var p = new URLSearchParams(location.search);
      var n = p.get('kepada') || p.get('to') || p.get('guest');
      return n ? decodeURIComponent(n).replace(/\+/g, ' ').trim() : '';
    } catch (e) { return ''; }
  }
  function applyGuest() {
    var name = guestName();
    if (!name) return;
    qsa('[data-guest]').forEach(function (el) { el.textContent = name; });
    qsa('[data-guest-input]').forEach(function (el) { el.value = name; });
  }

  /* ---------- 2. Hitung mundur live ---------- */
  function initCountdown() {
    var box = qs('[data-countdown]');
    if (!box) return;
    var target = new Date(box.getAttribute('data-countdown')).getTime();
    if (isNaN(target)) return;
    var elD = qs('[data-cd="days"]', box), elH = qs('[data-cd="hours"]', box),
        elM = qs('[data-cd="mins"]', box), elS = qs('[data-cd="secs"]', box);
    var badge = qs('[data-cd-badge]');
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60); s -= m * 60;
      if (elD) elD.textContent = d;
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(s);
      if (badge) badge.textContent = 'D − ' + d;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 3. Salin nomor rekening ---------- */
  function initCopy() {
    qsa('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy');
        var done = function () {
          var old = btn.textContent;
          btn.textContent = 'Tersalin ✓';
          btn.classList.add('is-copied');
          setTimeout(function () { btn.textContent = old; btn.classList.remove('is-copied'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(val).then(done).catch(done);
        } else {
          try {
            var t = document.createElement('textarea'); t.value = val; document.body.appendChild(t);
            t.select(); document.execCommand('copy'); document.body.removeChild(t); done();
          } catch (e) {}
        }
      });
    });
  }

  /* ---------- 4. Simpan ke kalender (.ics) ---------- */
  function initCalendar() {
    qsa('[data-ics]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var g = function (k) { return btn.getAttribute('data-ics-' + k) || ''; };
        function fmt(s) {
          var dt = new Date(s); if (isNaN(dt)) return '';
          return dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        }
        var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ivite//ID', 'BEGIN:VEVENT',
          'UID:' + Date.now() + '@ivite.id',
          'DTSTAMP:' + fmt(new Date().toISOString()),
          'DTSTART:' + fmt(g('start')),
          'DTEND:' + fmt(g('end') || g('start')),
          'SUMMARY:' + g('title'),
          'LOCATION:' + g('location'),
          'DESCRIPTION:' + (g('desc') || ''),
          'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
        var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (g('title') || 'acara').replace(/\s+/g, '-').toLowerCase() + '.ics';
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); document.body.removeChild(a); }, 500);
      });
    });
  }

  /* ---------- 5. Buka peta ---------- */
  function initMap() {
    qsa('[data-map]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = encodeURIComponent(btn.getAttribute('data-map'));
        window.open('https://www.google.com/maps/search/?api=1&query=' + q, '_blank', 'noopener');
      });
    });
  }

  /* ---------- 6. Galeri lightbox ---------- */
  function initLightbox() {
    var imgs = qsa('[data-lightbox]');
    if (!imgs.length) return;
    var ov = document.createElement('div');
    ov.className = 'lightbox'; ov.setAttribute('aria-hidden', 'true');
    ov.innerHTML = '<button class="lightbox__x" aria-label="Tutup">&times;</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Sebelumnya">&#8249;</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__nav lightbox__next" aria-label="Berikutnya">&#8250;</button>';
    document.body.appendChild(ov);
    var big = qs('.lightbox__img', ov), i = 0;
    function show(n) { i = (n + imgs.length) % imgs.length; big.src = imgs[i].getAttribute('src'); big.alt = imgs[i].getAttribute('alt') || ''; }
    function open(n) { show(n); ov.classList.add('is-open'); ov.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
    function close() { ov.classList.remove('is-open'); ov.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
    imgs.forEach(function (im, n) { im.style.cursor = 'zoom-in'; im.addEventListener('click', function () { open(n); }); });
    qs('.lightbox__x', ov).addEventListener('click', close);
    qs('.lightbox__prev', ov).addEventListener('click', function () { show(i - 1); });
    qs('.lightbox__next', ov).addEventListener('click', function () { show(i + 1); });
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.addEventListener('keydown', function (e) {
      if (!ov.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }

  /* ---------- 7. Musik on/off ---------- */
  function initMusic() {
    var btn = qs('[data-music]'); if (!btn) return;
    var audio = qs('[data-audio]');
    var playing = false;
    btn.addEventListener('click', function () {
      if (audio && audio.currentSrc) {
        if (playing) { audio.pause(); } else { audio.play().catch(function () {}); }
      }
      playing = !playing;
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-label', playing ? 'Jeda gendhing' : 'Putar gendhing');
    });
  }

  /* ---------- 8. Elemen botani melayang (parallax drift) ---------- */
  function initFloat() {
    if (reduce) return;
    var els = qsa('[data-float]');
    if (!els.length) return;
    var ticking = false;
    function move() {
      var y = window.scrollY;
      els.forEach(function (el) {
        var sp = parseFloat(el.getAttribute('data-float')) || 0.08;
        var rot = parseFloat(el.getAttribute('data-float-rot')) || 0;
        el.style.transform = 'translateY(' + (y * sp) + 'px) rotate(' + (y * rot * 0.02) + 'deg)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(move); }
    }, { passive: true });
  }

  /* ---------- 9. RSVP (DEMO localStorage — backend menyusul) ---------- */
  function initRsvp() {
    var form = qs('[data-rsvp]'); if (!form) return;
    var out = qs('[data-rsvp-out]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        nama: (qs('[name=nama]', form) || {}).value || '',
        hadir: (qs('[name=hadir]', form) || {}).value || '',
        jumlah: (qs('[name=jumlah]', form) || {}).value || ''
      };
      try { localStorage.setItem('ivite_rsvp', JSON.stringify(data)); } catch (e2) {}
      if (out) {
        out.hidden = false;
        out.textContent = data.hadir && /mboten|tidak/i.test(data.hadir)
          ? 'Matur nuwun, konfirmasi Anda tercatat. (demo)'
          : 'Matur nuwun ' + (data.nama || '') + ', sampun kami tampi konfirmasinipun. (demo)';
      }
      form.setAttribute('data-sent', '1');
    });
  }

  /* ---------- 10. Buku tamu / ucapan (DEMO localStorage) ---------- */
  function initWishes() {
    var form = qs('[data-wish]'); var list = qs('[data-wishes]');
    if (!form || !list) return;
    function render(items) {
      items.forEach(function (w) {
        var el = document.createElement('div');
        el.className = 'wish';
        el.innerHTML = '<p class="wish__name"></p><p class="wish__msg"></p>';
        qs('.wish__name', el).textContent = w.n;
        qs('.wish__msg', el).textContent = w.m;
        list.insertBefore(el, list.firstChild);
      });
    }
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem('ivite_wishes') || '[]'); } catch (e) {}
    render(saved);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = (qs('[name=wnama]', form) || {}).value || 'Tamu';
      var m = (qs('[name=wpesan]', form) || {}).value || '';
      if (!m.trim()) return;
      var w = { n: n, m: m };
      saved.push(w);
      try { localStorage.setItem('ivite_wishes', JSON.stringify(saved)); } catch (e2) {}
      render([w]);
      form.reset();
      applyGuest(); // isi ulang nama tamu bila ada
    });
  }

  /* ---------- init ---------- */
  function boot() {
    loadKit();
    applyGuest(); initCountdown(); initCopy(); initCalendar(); initMap();
    initLightbox(); initMusic(); initFloat(); initRsvp(); initWishes();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
