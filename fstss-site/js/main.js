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
