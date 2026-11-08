(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 960px)').matches;
  const PINKS = ['#F4D3D8','#EDBCC5','#F8E1E3','#E6A9B6','#F1C7CD','#FBEBEC'];

  /* ---------------- TREE ---------------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.getElementById('tree');
  let seed = 11;
  const R = () => (seed = (seed * 16807) % 2147483647, (seed - 1) / 2147483646);
  const el = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

  svg.innerHTML = `
    <defs>
      <g id="fl">${[0,72,144,216,288].map(a => `<ellipse cx="0" cy="-4.4" rx="3.3" ry="4.9" transform="rotate(${a})"/>`).join('')}
        <circle r="1.5" fill="#C9A15F"/></g>
      <linearGradient id="bark" x1="0" x2="1"><stop offset="0" stop-color="#6A4C3D"/><stop offset=".55" stop-color="#3F2D24"/><stop offset="1" stop-color="#2C1F19"/></linearGradient>
    </defs>`;

  // ground + roots
  svg.appendChild(el('ellipse', {cx:300, cy:742, rx:190, ry:13, fill:'rgba(59,42,34,.07)'}));
  const roots = el('g', {stroke:'#4A3529', fill:'none', 'stroke-linecap':'round', opacity:.85});
  [[-1,90,14,5],[1,110,10,4],[-1,50,22,3],[1,60,20,3],[-1,140,6,2],[1,150,8,1.6]].forEach(([s,dx,dy,w]) => {
    roots.appendChild(el('path', {d:`M300 736 q${s*dx*.4} ${-2} ${s*dx} ${dy*.5}`, 'stroke-width':w}));
  });
  svg.appendChild(roots);
  // fallen petals on the ground
  for (let i = 0; i < 14; i++) {
    svg.appendChild(el('ellipse', {cx:150 + R()*300, cy:736 + R()*12, rx:2.4, ry:1.3, fill:PINKS[i % PINKS.length], transform:`rotate(${R()*60-30} ${150+R()*300} 740)`, class:'fl'}));
  }

  const branches = [];
  const MAXD = mobile ? 5 : 6;

  function blossoms(g, x, y, n, spread) {
    for (let i = 0; i < n; i++) {
      const u = el('use', {href:'#fl', class:'fl', fill:PINKS[(R()*PINKS.length)|0],
        transform:`translate(${(x + (R()-.5)*spread).toFixed(1)},${(y + (R()-.5)*spread*.85).toFixed(1)}) rotate(${(R()*72)|0}) scale(${(.55 + R()*.8).toFixed(2)})`});
      u.style.transitionDelay = (1.6 + R()*1.8).toFixed(2) + 's';
      g.appendChild(u);
    }
    // a few buds
    for (let i = 0; i < 2; i++) {
      const c = el('circle', {cx:(x + (R()-.5)*spread*1.1).toFixed(1), cy:(y + (R()-.5)*spread).toFixed(1), r:(1.3+R()*1.2).toFixed(1), fill:'#E2A0AE', class:'fl'});
      c.style.transitionDelay = (2 + R()*1.5).toFixed(2) + 's';
      g.appendChild(c);
    }
  }

  function grow(parent, len, w, depth, level) {
    const g = el('g');
    parent.appendChild(g);
    const bend = (R() - .5) * len * .28;
    const w2 = Math.max(w * .64, 1.1);
    g.appendChild(el('path', {
      d:`M${-w/2},2 Q${bend - (w+w2)/4},${-len/2} ${-w2/2},${-len} L${w2/2},${-len} Q${bend + (w+w2)/4},${-len/2} ${w/2},2 Z`,
      fill:'url(#bark)'
    }));
    if (w > 4) g.appendChild(el('path', {d:`M${-w*.18},-3 Q${bend - w*.12},${-len/2} ${-w2*.18},${-len+3}`, stroke:'#9A7A64', 'stroke-width':(w*.1).toFixed(2), fill:'none', opacity:.45, 'stroke-linecap':'round'}));
    const b = {g, level, x:0, y:0, ang:0, phase:R()*6.283, delay:level*.32 + R()*.18};
    branches.push(b);

    if (depth === 0) { blossoms(g, 0, -len, 7 + (R()*4|0), 30); return b; }
    if (level >= MAXD - 2) blossoms(g, bend*.3, -len*.55, 2 + (R()*3|0), 22);

    const n = level < 1 ? 2 : (R() < .32 ? 3 : 2);
    for (let i = 0; i < n; i++) {
      const t = i === n - 1 ? 1 : .5 + R() * .35;
      const spread = 17 + R() * 20 + level * 2.5;
      const side = n === 2 ? (i === 0 ? -1 : 1) : [-1, .2, 1][i];
      const c = grow(g, len * (.7 + R() * .14), w2 * .94, depth - 1, level + 1);
      c.x = 2 * (1 - t) * t * bend * .5;
      c.y = -len * t;
      c.ang = side * spread + (R() - .5) * 8 - (level === 0 ? 0 : 0);
    }
    return b;
  }

  const trunk = grow(svg, mobile ? 175 : 168, 30, MAXD, 0);
  trunk.x = 300; trunk.y = 738; trunk.ang = -3;

  /* ---------------- WIND (shared) ---------------- */
  let mouseWind = 0, gust = 0, mx = -999, my = -999, lastX = null;
  addEventListener('pointermove', e => {
    if (lastX !== null) mouseWind = Math.max(-2.6, Math.min(2.6, mouseWind + (e.clientX - lastX) * .012));
    lastX = e.clientX; mx = e.clientX; my = e.clientY;
  }, {passive:true});

  let heroVisible = true;
  new IntersectionObserver(([e]) => heroVisible = e.isIntersecting).observe(svg);

  const t0 = performance.now();
  setTimeout(() => svg.classList.add('bloom'), reduce ? 0 : 400);

  function treeFrame(t) {
    for (const b of branches) {
      const p = reduce ? 1 : Math.min(1, Math.max(0, (t - b.delay) / 1.1));
      const e = 1 - Math.pow(1 - p, 3);
      const amp = reduce ? 0 : .22 + b.level * .55;
      const sway = amp * (Math.sin(t * 1.35 + b.phase) * .42 + gust);
      b.g.setAttribute('transform', `translate(${b.x.toFixed(2)},${b.y.toFixed(2)}) rotate(${(b.ang + sway).toFixed(2)}) scale(${e.toFixed(3)})`);
    }
  }

  /* ---------------- PETALS ---------------- */
  const cv = document.getElementById('petals'), ctx = cv.getContext('2d');
  let W, H, DPR;
  const resize = () => { DPR = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W*DPR; cv.height = H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); };
  resize(); addEventListener('resize', resize);
  const P = [];
  let target = 16, current = 'hero';
  const targets = {hero:18, about:7, mind:6, build:5, beyond:9, future:34, connect:44};

  function spawn(initial) {
    let x, y;
    const r = svg.getBoundingClientRect();
    if (heroVisible && r.bottom > 0 && Math.random() < .75 && !initial) {
      x = r.left + r.width * (.18 + Math.random() * .64);
      y = r.top + r.height * (.1 + Math.random() * .4);
    } else {
      x = Math.random() * W * 1.2 - W * .1;
      y = initial ? Math.random() * H : -20;
    }
    P.push({x, y, vx:0, vy:.3 + Math.random() * .55, r:Math.random()*6.28, vr:(Math.random()-.5)*.03,
      s:4 + Math.random()*5, f:Math.random()*6.28, vf:.02 + Math.random()*.035, c:PINKS[(Math.random()*PINKS.length)|0], o:0, w:Math.random()*6.28});
  }

  function petalFrame(t) {
    ctx.clearRect(0, 0, W, H);
    const tgt = mobile ? target * .55 : target;
    if (P.length < tgt && Math.random() < .09) spawn(false);
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      p.vx += (gust * .55 - p.vx) * .02;
      const dx = p.x - mx, dy = p.y - my, d2 = dx*dx + dy*dy;
      if (d2 < 9000) { const d = Math.sqrt(d2) || 1; p.x += dx / d * 1.6; p.y += dy / d * 1.1; p.vr += .004; }
      p.x += p.vx + Math.sin(t * 1.2 + p.w) * .35;
      p.y += p.vy;
      p.f += p.vf; p.r += p.vr; p.vr *= .995;
      p.o = Math.min(.92, p.o + .02);
      if (p.y > H + 30 || p.x < -60 || p.x > W + 60) { P.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(Math.cos(p.f) * .8 + .2 * Math.sign(Math.cos(p.f) || 1), 1);
      ctx.globalAlpha = p.o;
      ctx.fillStyle = p.c;
      const s = p.s;
      ctx.beginPath();
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s*.95, s*.4, s*.8, -s*.75, s*.18, -s);
      ctx.lineTo(0, -s*.72);
      ctx.lineTo(-s*.18, -s);
      ctx.bezierCurveTo(-s*.8, -s*.75, -s*.95, s*.4, 0, s);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ---------------- LOOP ---------------- */
  function loop(now) {
    const t = (now - t0) / 1000;
    mouseWind *= .965;
    gust = Math.sin(t * .33) * .55 + Math.sin(t * .87 + 1.3) * .22 + mouseWind;
    if (heroVisible || t < 4) treeFrame(t);
    if (!reduce) petalFrame(t);
    requestAnimationFrame(loop);
  }
  if (!reduce) for (let i = 0; i < 8; i++) spawn(true);
  requestAnimationFrame(loop);
  if (reduce) treeFrame(10);

  /* ---------------- UI ---------------- */
  const nav = document.getElementById('nav');
  const fill = document.getElementById('railFill');
  const railItems = [...document.querySelectorAll('.rail li')];
  const navLinks = [...document.querySelectorAll('.nav ul a')];
  const onScroll = () => {
    nav.classList.toggle('scrolled', scrollY > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    fill.style.height = `calc(${(scrollY / max * 100).toFixed(1)}% - 12px)`;
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  const order = railItems.map(li => li.dataset.for);
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      current = e.target.id;
      target = targets[current] ?? 10;
      const idx = order.indexOf(current);
      railItems.forEach((li, i) => { li.classList.toggle('active', i === idx); li.classList.toggle('past', i < idx); });
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

  const rev = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(n => rev.observe(n));

  document.querySelectorAll('.story-btn').forEach(btn => btn.addEventListener('click', () => {
    const p = btn.closest('.proj'); const open = p.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.firstChild.textContent = open ? 'Close the story ' : 'Read the story ';
  }));

  const toast = document.getElementById('toast');
  document.getElementById('copy').addEventListener('click', async () => {
    const txt = document.getElementById('mail').textContent;
    try { await navigator.clipboard.writeText(txt); toast.textContent = 'Email copied'; }
    catch { toast.textContent = txt; }
    toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200);
  });
})();
