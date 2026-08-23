// ---- mobile nav toggle ----
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }
});

// ---- render events list on Home ----
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('event-list');
  const empty = document.getElementById('event-empty');
  if (!list) return;

  const events = (typeof FSTSS_EVENTS !== 'undefined' ? FSTSS_EVENTS : [])
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (events.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }

  const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

  list.innerHTML = events.map(e => {
    const d = new Date(e.date + 'T00:00:00');
    const day = String(d.getDate()).padStart(2, '0');
    const month = monthNames[d.getMonth()];
    return `
      <div class="event-item">
        <div class="event-date"><span class="d">${day}</span><span class="m">${month}</span></div>
        <div>
          <h3>${e.title}</h3>
          <div class="meta">${e.time} &middot; ${e.location}</div>
          <p>${e.desc}</p>
        </div>
      </div>`;
  }).join('');
});

// ---- map zoom controls (map.html) ----
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('mapImg');
  const frame = document.getElementById('mapFrame');
  const label = document.getElementById('zoomLabel');
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  const zoomReset = document.getElementById('zoomReset');
  if (!img || !frame) return;

  let scale = 100;
  const MIN = 100, MAX = 400, STEP = 50;

  function applyZoom() {
    img.style.width = scale + '%';
    label.textContent = scale + '%';
  }

  zoomIn.addEventListener('click', () => {
    scale = Math.min(MAX, scale + STEP);
    applyZoom();
  });
  zoomOut.addEventListener('click', () => {
    scale = Math.max(MIN, scale - STEP);
    applyZoom();
  });
  zoomReset.addEventListener('click', () => {
    scale = 100;
    applyZoom();
    frame.scrollTo(0, 0);
  });

  // click-and-drag panning on desktop
  let isDown = false, startX, startY, scrollLeft, scrollTop;
  frame.addEventListener('mousedown', (e) => {
    isDown = true;
    frame.style.cursor = 'grabbing';
    startX = e.pageX - frame.offsetLeft;
    startY = e.pageY - frame.offsetTop;
    scrollLeft = frame.scrollLeft;
    scrollTop = frame.scrollTop;
  });
  frame.addEventListener('mouseleave', () => { isDown = false; frame.style.cursor = 'grab'; });
  frame.addEventListener('mouseup', () => { isDown = false; frame.style.cursor = 'grab'; });
  frame.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - frame.offsetLeft;
    const y = e.pageY - frame.offsetTop;
    frame.scrollLeft = scrollLeft - (x - startX);
    frame.scrollTop = scrollTop - (y - startY);
  });
  frame.style.cursor = 'grab';
});
