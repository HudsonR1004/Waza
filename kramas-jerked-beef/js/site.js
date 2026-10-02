/* ============================================================================
   KRAMA'S JERKED BEEF — shared behaviour. Nothing here needs editing;
   everything configurable lives in js/config.js.
   ============================================================================ */
(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- mobile nav -------------------------------------------------------- */
  const toggle = $('.nav__toggle');
  const links  = $('#navLinks');
  if (toggle && links) {
    const setOpen = open => {
      links.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', e => {
      if (!e.target.closest('nav.site-nav')) setOpen(false);
    });
  }

  /* ---- scroll reveal ----------------------------------------------------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- photo slots: show the kraft card until the file exists ------------ */
  $$('.photo > img, .photo > picture > img').forEach(img => {
    const mark = () => img.closest('.photo')?.classList.add('is-missing');
    img.addEventListener('error', mark);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) mark();
  });
  $$('.cow-img img').forEach(img => {
    const mark = () => img.parentElement.classList.add('fallback');
    img.addEventListener('error', mark);
    if (img.complete && img.naturalWidth === 0) mark();
  });

  /* ---- copyright year ---------------------------------------------------- */
  $$('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  /* ---- contact details from config -------------------------------------- */
  if (typeof CONTACT !== 'undefined') {
    $$('[data-email]').forEach(a => { a.href = `mailto:${CONTACT.email}${a.dataset.subject ? '?subject=' + encodeURIComponent(a.dataset.subject) : ''}`; if (!a.dataset.keepText) a.textContent = CONTACT.email; });
    $$('[data-phone]').forEach(a => { a.href = `tel:${CONTACT.phoneIntl}`; if (!a.dataset.keepText) a.textContent = CONTACT.phone; });
    $$('[data-instagram]').forEach(a => { a.href = CONTACT.instagram; });
    $$('[data-facebook]').forEach(a => { a.href = CONTACT.facebook; });
  }

  /* ---- next ship date, Adelaide time -------------------------------------
     Orders by Tuesday 12:00 ship that Wednesday; later ones the following
     Wednesday. Date maths is done in UTC so DST can never shift the day.   */
  function nextShipDate(now = new Date()) {
    const p = {};
    for (const part of new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Adelaide', hourCycle: 'h23',
      weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }).formatToParts(now)) p[part.type] = part.value;

    const dow  = ['sun','mon','tue','wed','thu','fri','sat'].indexOf(p.weekday.slice(0, 3).toLowerCase());
    const mins = (+p.hour) * 60 + (+p.minute);
    let days = (3 - dow + 7) % 7;
    if (days === 0) days = 7;
    if (dow === 2 && mins >= 12 * 60) days = 8;

    const ship = new Date(Date.UTC(+p.year, +p.month - 1, +p.day + days));
    const d = {};
    for (const part of new Intl.DateTimeFormat('en-AU', { timeZone: 'UTC', day: 'numeric', month: 'long' })
           .formatToParts(ship)) d[part.type] = part.value;
    return `Wednesday ${d.day} ${d.month}`;
  }
  $$('[data-ship-date]').forEach(el => { el.textContent = nextShipDate(); });

  /* ---- Stripe buttons ---------------------------------------------------- */
  if (typeof STRIPE_LINKS !== 'undefined') {
    $$('[data-stripe]').forEach(btn => {
      const url = (STRIPE_LINKS[btn.dataset.stripe] || '').trim();
      if (/^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com)\//.test(url)) {
        btn.href = url;
        btn.removeAttribute('aria-disabled');
        btn.removeAttribute('tabindex');
        btn.textContent = btn.dataset.label || btn.textContent;
        btn.setAttribute('rel', 'noopener');
      } else {
        btn.removeAttribute('href');
        btn.setAttribute('aria-disabled', 'true');
        btn.setAttribute('tabindex', '-1');
        btn.textContent = 'Coming soon';
        btn.title = 'Online ordering opens shortly';
      }
    });
  }

  /* ---- flavour panels (ingredients + nutrition) -------------------------- */
  const fmt = (n, unit) => (unit === 'g' ? Math.round(n * 10) / 10 : Math.round(n)).toLocaleString('en-AU');
  const nipTable = (f) => {
    const per = f.servingSize / 100;
    const n = f.nip;
    const row = (label, v100, unit, sub) =>
      `<tr><td${sub ? ' class="sub"' : ''}>${label}</td><td>${fmt(v100 * per, unit)}${unit}</td><td>${fmt(v100, unit)}${unit}</td></tr>`;
    return `
      <table class="nip">
        <caption>Nutrition information</caption>
        <thead>
          <tr class="nip__serve"><td colspan="3">Servings per package: ${f.servesPerPack} &middot; Serving size: ${f.servingSize}g</td></tr>
          <tr><th scope="col"><span class="sr-only">Nutrient</span></th><th scope="col">Per serve</th><th scope="col">Per 100g</th></tr>
        </thead>
        <tbody>
          ${row('Energy', n.energyKj, 'kJ')}
          ${row('Protein', n.protein, 'g')}
          ${row('Fat, total', n.fat, 'g')}
          ${row('&ndash; saturated', n.satFat, 'g', true)}
          ${row('Carbohydrate', n.carbs, 'g')}
          ${row('&ndash; sugars', n.sugars, 'g', true)}
          ${row('Sodium', n.sodium, 'mg')}
        </tbody>
        <tfoot><tr><td colspan="3">Values are averages from recipe analysis. Per-serve figures are per ${f.servingSize}g serve.</td></tr></tfoot>
      </table>`;
  };

  if (typeof FLAVOURS !== 'undefined') {
    $$('[data-flavour]').forEach(card => {
      const f = FLAVOURS[card.dataset.flavour];
      const panel = $('.panel', card);
      const inner = $('.panel__inner', card);
      const btn = $('.flavour__toggle', card);
      if (!f || !panel || !inner || !btn) return;

      const parts = [];
      if (f.ingredients) {
        parts.push(`<h4>Ingredients</h4><p>${f.ingredients}</p>`);
      }
      if (f.allergens) parts.push(`<p><span class="allergen">${f.allergens}</span></p>`);
      if (f.storage) parts.push(`<p class="panel__storage">${f.storage}</p>`);
      if (f.nip) {
        parts.push(`<h4>Nutrition</h4>${nipTable(f)}`);
      }
      if (!f.ingredients && !f.nip) {
        parts.push(`<p class="nip-empty">The ${f.name} back label is being finalised. Want the ingredients and nutrition panel now?
          <a href="mailto:${typeof CONTACT !== 'undefined' ? CONTACT.email : ''}?subject=${encodeURIComponent(f.name + ' ingredients')}">Email us</a> and we'll send them straight over.</p>`);
      } else if (!f.nip) {
        parts.push(`<p class="nip-empty">Full nutrition panel for ${f.name} is on its way.</p>`);
      }
      inner.innerHTML = parts.join('');

      const setOpen = open => {
        panel.dataset.open = String(open);
        btn.setAttribute('aria-expanded', String(open));
        inner.closest('[hidden]')?.removeAttribute('hidden');
      };
      btn.addEventListener('click', () => setOpen(panel.dataset.open !== 'true'));
      // deep link: /#honey-sriracha opens that flavour
      if (location.hash && card.id && location.hash.slice(1) === card.id) setOpen(true);
    });
  }

  /* ---- newsletter signup -> MailerLite (+ Netlify Forms backup) ---------- */
  const form = $('#signupForm');
  if (form) {
    const msg = $('#signupMsg');
    const btn = form.querySelector('button[type=submit]');
    const btnLabel = btn ? btn.textContent : 'Notify me';
    const emailInput = form.elements.email;
    const nameInput  = form.elements.name;

    const say = (text, ok) => {
      if (!msg) return;
      msg.textContent = text;
      msg.classList.add('signup__msg--show');
      msg.classList.toggle('signup__msg--error', !ok);
    };

    const toMailerLite = (name, email) => {
      if (typeof MAILERLITE === 'undefined') return Promise.resolve(null);
      const { accountId, formId } = MAILERLITE;
      if (!accountId || !formId) return Promise.resolve(null);
      const fd = new FormData();
      fd.append('fields[name]', name);
      fd.append('fields[email]', email);
      fd.append('ml-submit', '1');
      fd.append('anticsrf', 'true');
      return fetch(`https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe`, { method: 'POST', body: fd })
        .then(r => r.json())
        .then(j => (j && typeof j.success === 'boolean') ? j.success : null)
        .catch(() => null);
    };

    const toNetlify = () =>
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(r => r.ok).catch(() => false);

    const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    emailInput?.addEventListener('input', () => emailInput.removeAttribute('aria-invalid'));
    nameInput?.addEventListener('input', () => nameInput.removeAttribute('aria-invalid'));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name  = (nameInput?.value || '').trim();
      const email = (emailInput?.value || '').trim();
      // honeypot: silently succeed for bots
      if (form.elements['bot-field'] && form.elements['bot-field'].value) { form.reset(); say("You're on the list.", true); return; }
      if (!name) { nameInput.setAttribute('aria-invalid', 'true'); say('Pop your first name in so we know who to say g\'day to.', false); nameInput.focus(); return; }
      if (!validEmail(email)) { emailInput.setAttribute('aria-invalid', 'true'); say("That email doesn't look right. Have another go.", false); emailInput.focus(); return; }

      if (btn) { btn.disabled = true; btn.textContent = 'Adding...'; }
      const [ml, nl] = await Promise.all([toMailerLite(name, email), toNetlify()]);
      if (btn) { btn.disabled = false; btn.textContent = btnLabel; }

      if (ml === true || (ml === null && nl)) {
        form.reset();
        say(`You're on the list${name ? ', ' + name : ''}. We'll holler the moment the next batch drops.`, true);
      } else if (ml === false) {
        say("That address was knocked back. Check it and try again.", false);
      } else {
        const em = typeof CONTACT !== 'undefined' ? CONTACT.email : 'us';
        say(`That didn't go through. Email ${em} and we'll add you by hand.`, false);
      }
    });
  }

  /* ---- cookie-free analytics (optional) ---------------------------------- */
  if (typeof ANALYTICS !== 'undefined' && ANALYTICS.domain && ANALYTICS.provider === 'plausible') {
    const s = document.createElement('script');
    s.defer = true;
    s.dataset.domain = ANALYTICS.domain;
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }
})();
