/* ══════════════════════════════════════════════════════════════
   BrewBound — script.js
   Age Verification Gate (21+) + general UI interactions
══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Age Gate ─────────────────────────────────────────────── */
  const overlay  = document.getElementById('age-gate-overlay');
  const denied   = document.getElementById('age-denied');
  const btnEnter = document.getElementById('btn-enter');
  const btnExit  = document.getElementById('btn-exit');

  // If user already verified this session, skip the gate
  if (sessionStorage.getItem('ageVerified') === 'true') {
    if (overlay) overlay.style.display = 'none';
  } else {
    // Lock body scroll while gate is visible
    document.body.style.overflow = 'hidden';
    if (overlay) overlay.style.display = 'flex';
  }

  // ✅ User confirms they are 21+
  if (btnEnter) {
    btnEnter.addEventListener('click', function () {
      sessionStorage.setItem('ageVerified', 'true');
      document.body.style.overflow = '';

      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s ease';
        setTimeout(function () { overlay.style.display = 'none'; }, 420);
      }
    });
  }

  // ✗ User is under 21 — show denial screen then redirect
  if (btnExit) {
    btnExit.addEventListener('click', function () {
      if (overlay) overlay.style.display = 'none';
      if (denied) {
        denied.classList.remove('hidden');
        denied.style.display = 'flex';
      }
      // Redirect to a safe/neutral page after 3 seconds
      setTimeout(function () {
        window.location.href = 'https://www.google.com';
      }, 3000);
    });
  }

  /* ── Beer Filter Buttons (brewery.html) ───────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const beerCards  = document.querySelectorAll('.beer-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      beerCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ── Book / CTA Buttons ────────────────────────────────────── */
  document.querySelectorAll('.book-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.getAttribute('data-item') || 'this experience';
      alert('🍺 Thanks for your interest in "' + item + '"!\nBooking confirmation will be sent to your email.');
    });
  });

})();
