(function () {
  const track = document.querySelector('.gallery-track');
  if (!track) return;

  const cards = Array.from(track.children);
  // Duplikuj viackrát pre krátke galérie (aspoň 3x)
  [1, 2, 3].forEach(() =>
    cards.forEach((c) => track.appendChild(c.cloneNode(true)))
  );

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  let position = 0;
  let paused = false;
  let half = 0;

  track.style.overflowX = 'scroll';
  track.style.webkitOverflowScrolling = 'touch';
  track.style.scrollbarWidth = 'none';
  track.style.msOverflowStyle = 'none';

  track.addEventListener('mouseenter', () => (paused = true));
  track.addEventListener('mouseleave', () => (paused = false));
  track.addEventListener('touchstart', () => (paused = true), { passive: true });
  track.addEventListener('touchend', () => setTimeout(() => (paused = false), 1200));

  function step() {
    if (!paused) {
      position += 0.6;
      if (position >= half) position -= half;

      // behavior: instant je kritický — bez toho Safari bojuje s animáciou
      track.scrollTo({ left: position, behavior: 'instant' });
    }
    requestAnimationFrame(step);
  }

  setTimeout(() => {
    // half vypočítame až po renderingu
    half = track.scrollWidth / 4; // /4 lebo máme 4x originál (1 + 3 kópie)
    position = 0;
    requestAnimationFrame(step);
  }, 150);
})();