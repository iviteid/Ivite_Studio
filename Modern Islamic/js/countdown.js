/**
 * countdown.js
 * Modul countdown timer menuju hari pernikahan.
 */

(function initCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.event.countdownTarget).getTime();

  function updateTimer() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val).padStart(2, '0');
    };

    set('cd-days',  days);
    set('cd-hours', hours);
    set('cd-mins',  minutes);
    set('cd-secs',  seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
})();
