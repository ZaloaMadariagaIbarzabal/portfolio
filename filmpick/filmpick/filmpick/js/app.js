/* ============================================
   app.js — FilmPick — lógica principal
   ============================================ */

(function() {

  // -----------------------------------------------------
  // ESTADO GLOBAL
  // -----------------------------------------------------
  let MOVIES = [];
  let lastResults = [];
  let expandedResults = false;
  const RESULTS_LIMIT = 15;
  const state = {
    audience: [],
    mood: [],
    genres: [],
    platforms: [],
    source: ['local'],
    maxDuration: 200,
    minYear: 1930,
    keyword: ''
  };

  // Claves internas → etiqueta traducida al vuelo
  const GENRE_KEYS = ['comedia','drama','accion','thriller','terror','romance','cienciaficcion','fantasia','animacion','documental','biografico','aventura','familia'];
  const GENRE_I18N = { comedia:'gComedia', drama:'gDrama', accion:'gAccion', thriller:'gThriller', terror:'gTerror', romance:'gRomance', cienciaficcion:'gCienciaficcion', fantasia:'gFantasia', animacion:'gAnimacion', documental:'gDocumental', biografico:'gBiografico', aventura:'gAventura', familia:'gFamilia' };
  const PLATFORM_LABELS = { netflix:'Netflix', prime:'Prime Video', disney:'Disney+', hbo:'HBO Max', apple:'Apple TV+', filmin:'Filmin', movistar:'Movistar+', skyshowtime:'SkyShowtime' };

  function genreLabel(g) { return I18N.t(GENRE_I18N[g] || g) || g; }
  function platformLabel(p) { return PLATFORM_LABELS[p] || p; }

  // -----------------------------------------------------
  // INICIALIZACIÓN
  // -----------------------------------------------------
  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    applyI18n();
    buildLangSwitcher();
    await loadCatalog();
    setupOnboarding();
    setupTabs();
    setupFilters();
    setupSliders();
    setupKeyword();
    setupActions();
    setupRoulette();
    setupModal();
    setupShareUrl();
    checkExistingUser();
  }

  // -----------------------------------------------------
  // I18N — aplicar traducciones al DOM y cambio de idioma
  // -----------------------------------------------------
  function applyI18n() {
    const lang = I18N.getLang();
    document.documentElement.lang = lang;
    document.title = I18N.t('pageTitle');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = I18N.t('pageDesc');

    // Texto de nodos
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      // heroTitle puede tener \n → convertir a <br>
      el.innerHTML = I18N.t(key).replace(/\n/g, '<br>');
    });
    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = I18N.t(el.dataset.i18nPlaceholder);
    });
    // Titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = I18N.t(el.dataset.i18nTitle);
    });

    // Slider outputs (init)
    const durSlider = document.getElementById('duration-slider');
    const yrSlider  = document.getElementById('year-slider');
    if (durSlider) {
      const v = parseInt(durSlider.value);
      document.getElementById('duration-out').textContent = v >= 200 ? I18N.t('noLimit') : v + ' min';
    }
    if (yrSlider) {
      const v = parseInt(yrSlider.value);
      document.getElementById('year-out').textContent = v <= 1930 ? I18N.t('anyYear') : v + '+';
    }

    // Results placeholder
    const resultsEl = document.getElementById('results');
    if (resultsEl) {
      const p = resultsEl.querySelector('[data-i18n="resultsEmpty"]');
      if (p) p.textContent = I18N.t('resultsEmpty');
    }

    updateFilterCounter();
    updateLangSwitcher();
  }

  function buildLangSwitcher() {
    const containers = document.querySelectorAll('.lang-switcher');
    if (!containers.length) return;
    const langs = { es: 'ES', en: 'EN', eu: 'EU' };
    containers.forEach(container => {
      container.innerHTML = '';
      Object.entries(langs).forEach(([code, label]) => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn' + (code === I18N.getLang() ? ' active' : '');
        btn.textContent = label;
        btn.dataset.lang = code;
        btn.addEventListener('click', () => {
          I18N.setLang(code);
          applyI18n();
          // Re-render vistas activas
          const activeTab = document.querySelector('.tab.active');
          if (activeTab) {
            const view = activeTab.dataset.view;
            if (view === 'favorites') renderList(getMoviesByIds(Storage.getFavorites()), 'favorites-list', I18N.t('favEmpty'));
            if (view === 'watched')   renderList(getMoviesByIds(Storage.getWatched()),   'watched-list',   I18N.t('watchedEmpty'));
          }
          if (lastResults.length) renderResults(lastResults);
        });
        container.appendChild(btn);
      });
    });
  }

  function updateLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === I18N.getLang());
    });
  }

  // -----------------------------------------------------
  // CATÁLOGO
  // -----------------------------------------------------
  async function loadCatalog() {
    if (window.FILMPICK_MOVIES && Array.isArray(window.FILMPICK_MOVIES)) {
      MOVIES = window.FILMPICK_MOVIES;
      const elTotal = document.getElementById('stat-total');
      if (elTotal) elTotal.textContent = MOVIES.length;
      return;
    }
    try {
      const res = await fetch('data/movies.json');
      MOVIES = await res.json();
      const elTotal = document.getElementById('stat-total');
      if (elTotal) elTotal.textContent = MOVIES.length;
    } catch (err) {
      console.error('No se pudo cargar el catálogo:', err);
      toast(I18N.t('toastCatalogErr'));
    }
  }

  // -----------------------------------------------------
  // ONBOARDING
  // -----------------------------------------------------
  function setupOnboarding() {
    const form = document.getElementById('onboarding-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('username-input').value.trim();
      if (!name) return;
      Storage.setUser(name);
      enterApp(name);
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
      if (confirm(I18N.t('logoutConfirm'))) {
        Storage.clearUser();
        location.reload();
      }
    });
  }

  function checkExistingUser() {
    const user = Storage.getUser();
    if (user) enterApp(user);
    const sharedId = getSharedMovieId();
    if (sharedId && user) {
      const m = findMovie(sharedId);
      if (m) setTimeout(() => openModal(m), 400);
    }
  }

  function enterApp(name) {
    document.getElementById('onboarding').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-avatar').textContent = name[0];
    document.getElementById('hero-name').textContent = name;
  }

  // -----------------------------------------------------
  // PESTAÑAS
  // -----------------------------------------------------
  function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-' + view).classList.add('active');
        if (view === 'favorites') renderList(getMoviesByIds(Storage.getFavorites()), 'favorites-list', I18N.t('favEmpty'));
        if (view === 'watched')   renderList(getMoviesByIds(Storage.getWatched()),   'watched-list',   I18N.t('watchedEmpty'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // -----------------------------------------------------
  // FILTROS DE CHIPS
  // -----------------------------------------------------
  function setupFilters() {
    document.querySelectorAll('.chips').forEach(group => {
      const name = group.dataset.group;
      const mode = group.dataset.mode;
      group.addEventListener('click', e => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        const val = chip.dataset.v;
        if (mode === 'single') {
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state[name] = [val];
        } else {
          chip.classList.toggle('active');
          if (chip.classList.contains('active')) state[name].push(val);
          else state[name] = state[name].filter(v => v !== val);
        }
        updateFilterCounter();
        if (name === 'source') {
          document.getElementById('tmdb-hint').style.display = val === 'tmdb' ? 'block' : 'none';
        }
      });
    });
  }

  function setupSliders() {
    const dur = document.getElementById('duration-slider');
    const durOut = document.getElementById('duration-out');
    dur.addEventListener('input', () => {
      const v = parseInt(dur.value);
      state.maxDuration = v;
      durOut.textContent = v >= 200 ? I18N.t('noLimit') : v + ' min';
    });

    const yr = document.getElementById('year-slider');
    const yrOut = document.getElementById('year-out');
    yr.addEventListener('input', () => {
      const v = parseInt(yr.value);
      state.minYear = v;
      yrOut.textContent = v <= 1930 ? I18N.t('anyYear') : v + '+';
    });
  }

  function setupKeyword() {
    const input = document.getElementById('keyword-input');
    const clearBtn = document.getElementById('keyword-clear');
    input.addEventListener('input', () => {
      state.keyword = input.value.trim();
      updateFilterCounter();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); search(); }
    });
    clearBtn.addEventListener('click', () => {
      input.value = '';
      state.keyword = '';
      updateFilterCounter();
      input.focus();
    });
  }

  function updateFilterCounter() {
    const total = state.audience.length + state.mood.length + state.genres.length + state.platforms.length + (state.keyword ? 1 : 0);
    const el = document.getElementById('filter-counter');
    if (!el) return;
    el.textContent = total > 0
      ? `${total} ${I18N.t(total === 1 ? 'filterActive1' : 'filterActiveN')}`
      : '';
  }

  // -----------------------------------------------------
  // ACCIONES PRINCIPALES
  // -----------------------------------------------------
  function setupActions() {
    document.getElementById('search-btn').addEventListener('click', search);
    document.getElementById('reset-btn').addEventListener('click', resetFilters);
  }

  function resetFilters() {
    document.querySelectorAll('.chip.active').forEach(c => c.classList.remove('active'));
    document.querySelector('.chips[data-group=source] .chip[data-v=local]').classList.add('active');
    state.audience = []; state.mood = []; state.genres = []; state.platforms = []; state.source = ['local'];
    state.maxDuration = 200; state.minYear = 1930; state.keyword = '';
    document.getElementById('duration-slider').value = 200;
    document.getElementById('duration-out').textContent = I18N.t('noLimit');
    document.getElementById('year-slider').value = 1930;
    document.getElementById('year-out').textContent = I18N.t('anyYear');
    document.getElementById('keyword-input').value = '';
    document.getElementById('tmdb-hint').style.display = 'none';
    expandedResults = false;
    updateFilterCounter();
    document.getElementById('results').innerHTML = `<div class="results-empty"><p>${I18N.t('resultsReset')}</p></div>`;
  }

  async function search() {
    expandedResults = false;
    const results = document.getElementById('results');
    const isTmdb = state.source[0] === 'tmdb';
    results.innerHTML = `<div class="results-empty"><p>${I18N.t(isTmdb ? 'loadingTmdb' : 'loadingLocal')}</p></div>`;

    let pool = [];
    if (isTmdb) {
      const onProgress = (info) => {
        let txt;
        if (info.phase === 'resolving') {
          txt = I18N.t('tmdbPhaseResolving', { term: info.term });
        } else if (info.phase === 'fetching') {
          const modeKey = info.mode === 'keyword' ? 'tmdbModeKeyword' : info.mode === 'search' ? 'tmdbModeSearch' : 'tmdbModeFilters';
          txt = I18N.t('tmdbPhaseFetching', { mode: I18N.t(modeKey), loaded: info.loaded, total: info.total });
        } else if (info.phase === 'providers') {
          txt = I18N.t('tmdbPhaseProviders', { total: info.total });
        }
        if (txt) {
          results.innerHTML = `<div class="results-empty"><p>${txt}<br><span style="font-size:11px;letter-spacing:0.1em;color:var(--text-dim);">${I18N.t('tmdbSlowNote')}</span></p></div>`;
        }
      };

      pool = await TMDB.discover({
        genres: state.genres,
        minYear: state.minYear,
        maxDuration: state.maxDuration,
        platforms: state.platforms,
        keyword: state.keyword
      }, onProgress);

      if (!pool.length) {
        let msg;
        if (state.keyword && state.platforms.length) {
          msg = I18N.t('tmdbNoKwPlat', { kw: state.keyword });
        } else if (state.keyword) {
          msg = I18N.t('tmdbNoKw', { kw: state.keyword });
        } else if (state.platforms.length) {
          msg = I18N.t('tmdbNoPlat');
        } else {
          msg = I18N.t('tmdbNoResult');
        }
        results.innerHTML = `<div class="results-empty"><p>${msg}</p></div>`;
        return;
      }
    } else {
      pool = MOVIES.slice();
    }

    // Filtrado local
    const watched = Storage.getWatched();
    const filtered = pool.filter(m => {
      if (watched.includes(m.id)) return false;
      if (state.minYear > 1930 && m.year && m.year < state.minYear) return false;
      if (state.maxDuration < 200 && m.duration && m.duration > state.maxDuration) return false;
      if (state.genres.length) {
        const ok = state.genres.some(g => (m.genres || []).includes(g));
        if (!ok) return false;
      }
      if (state.mood.length && state.source[0] === 'local') {
        const ok = state.mood.some(mo => (m.mood || []).includes(mo));
        if (!ok) return false;
      }
      if (state.audience.length && state.audience[0] !== 'cualquiera' && state.source[0] === 'local') {
        const ok = (m.audience || []).some(a => state.audience.includes(a) || a === 'cualquiera');
        if (!ok) return false;
      }
      if (state.platforms.length) {
        const ok = state.platforms.some(p => (m.platforms || []).includes(p));
        if (!ok) return false;
      }
      if (state.keyword && state.source[0] === 'local') {
        const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const kwRaw = norm(state.keyword);
        const variants = [kwRaw];
        if (kwRaw.endsWith('es') && kwRaw.length > 3) variants.push(kwRaw.slice(0, -2));
        else if (kwRaw.endsWith('s') && kwRaw.length > 2) variants.push(kwRaw.slice(0, -1));
        else variants.push(kwRaw + 's');
        const hay = norm([m.title || '', m.original || '', m.synopsis || '', (m.genres || []).join(' '), (m.tags || []).join(' '), m.director || ''].join(' '));
        if (!variants.some(v => hay.includes(v))) return false;
      }
      return true;
    });

    const scored = filtered.map(m => {
      let score = 0;
      if (state.mood.length) score += state.mood.filter(mo => (m.mood || []).includes(mo)).length;
      if (state.genres.length) score += state.genres.filter(g => (m.genres || []).includes(g)).length;
      if (state.platforms.length) score += state.platforms.filter(p => (m.platforms || []).includes(p)).length;
      score += (m.rating || 0) / 4;
      return { m, score };
    }).sort((a, b) => b.score - a.score);

    lastResults = scored.map(s => s.m);

    if (!lastResults.length) {
      results.innerHTML = `<div class="results-empty"><p>${I18N.t('resultsNone')}</p></div>`;
      return;
    }

    renderResults(lastResults);
  }

  function renderResults(movies) {
    const results = document.getElementById('results');
    const total = movies.length;
    const visible = expandedResults ? movies : movies.slice(0, RESULTS_LIMIT);
    const hidden = total - visible.length;

    let summary;
    if (total <= RESULTS_LIMIT) {
      summary = `<div class="results-summary">${total} ${I18N.t(total === 1 ? 'resultsFound1' : 'resultsFoundN')}</div>`;
    } else if (expandedResults) {
      summary = `<div class="results-summary">${I18N.t('resultsAll', { total })}</div>`;
    } else {
      summary = `<div class="results-summary">${I18N.t('resultsTop', { limit: RESULTS_LIMIT, total })}</div>`;
    }

    let moreBtn = '';
    if (total > RESULTS_LIMIT) {
      moreBtn = expandedResults
        ? `<div class="results-more"><button class="btn-more" id="toggle-more">${I18N.t('btnShowLess')}</button></div>`
        : `<div class="results-more"><button class="btn-more" id="toggle-more">${I18N.t('btnShowMore', { n: hidden })}</button></div>`;
    }

    results.innerHTML = summary + visible.map(movieCardHTML).join('') + moreBtn;
    bindCardClicks(results);

    const toggleBtn = document.getElementById('toggle-more');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        expandedResults = !expandedResults;
        renderResults(lastResults);
        if (!expandedResults) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function renderList(movies, containerId, emptyMsg) {
    const c = document.getElementById(containerId);
    if (!movies.length) {
      c.innerHTML = `<div class="results-empty"><p>${emptyMsg}</p></div>`;
      return;
    }
    c.innerHTML = movies.map(movieCardHTML).join('');
    bindCardClicks(c);
  }

  function bindCardClicks(container) {
    container.querySelectorAll('.movie-card').forEach(card => {
      card.addEventListener('click', () => {
        const movie = findMovie(card.dataset.id);
        if (movie) openModal(movie);
      });
    });
  }

  function movieCardHTML(m) {
    const posterStyle = m.poster ? `style="background-image:url('${m.poster}')"` : '';
    const posterClass = m.poster ? '' : 'fallback';
    const fallbackText = m.poster ? '' : m.title;
    const rating = m.rating ? `<div class="movie-rating">★ ${m.rating}</div>` : '';
    const tags = (m.genres || []).slice(0, 3).map(g => `<span class="movie-tag">${genreLabel(g)}</span>`).join('');
    const meta = [m.year, m.duration ? m.duration + 'min' : null].filter(Boolean).join(' · ');

    let platformsBlock;
    if (m.platforms && m.platforms.length) {
      const badges = m.platforms.map(p => `<span class="platform-badge" data-p="${p}">${platformLabel(p)}</span>`).join('');
      platformsBlock = `<div class="movie-platforms"><span class="platforms-label">${I18N.t('modalCardAvailOn')}</span><div class="platforms-badges">${badges}</div></div>`;
    } else {
      platformsBlock = `<div class="movie-platforms"><span class="platforms-label platforms-unknown">${I18N.t('modalCardNoPlatform')}</span></div>`;
    }

    return `
      <div class="movie-card" data-id="${m.id}">
        <div class="movie-poster ${posterClass}" ${posterStyle}>${fallbackText}${rating}</div>
        <div class="movie-info">
          <div class="movie-title">${m.title}</div>
          <div class="movie-meta">${meta}</div>
          <div class="movie-tags">${tags}</div>
          ${platformsBlock}
        </div>
      </div>
    `;
  }

  function getMoviesByIds(ids) { return ids.map(id => findMovie(id)).filter(Boolean); }

  function findMovie(id) {
    const sId = String(id);
    return MOVIES.find(m => String(m.id) === sId) || lastResults.find(m => String(m.id) === sId);
  }

  // -----------------------------------------------------
  // RULETA
  // -----------------------------------------------------
  function setupRoulette() {
    document.getElementById('spin-btn').addEventListener('click', spin);
  }

  function spin() {
    const btn = document.getElementById('spin-btn');
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 700);

    const watched = Storage.getWatched();

    let pool = MOVIES.filter(m => !watched.includes(m.id));

    if (!pool.length) {
      document.getElementById('roulette-result').innerHTML = `<div class="results-empty"><p>${I18N.t('rouletteEmpty')}</p></div>`;
      return;
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
      const platforms = (chosen.platforms || []).map(p => `<span class="platform-badge" data-p="${p}">${platformLabel(p)}</span>`).join('');
      const platformsBlock = chosen.platforms && chosen.platforms.length
        ? `<div class="movie-platforms" style="border:none;padding-top:0;margin-bottom:16px;"><span class="platforms-label">${I18N.t('modalCardAvailOn')}</span><div class="platforms-badges">${platforms}</div></div>`
        : `<div class="movie-platforms" style="border:none;padding-top:0;margin-bottom:16px;"><span class="platforms-label platforms-unknown">${I18N.t('modalCardNoPlatform')}</span></div>`;
      const tags = (chosen.genres || []).slice(0, 4).map(g => `<span class="movie-tag">${genreLabel(g)}</span>`).join('');
      const posterStyle = chosen.poster ? `style="background-image:url('${chosen.poster}')"` : '';

      document.getElementById('roulette-result').innerHTML = `
        <div class="roulette-card">
          <div class="movie-poster" ${posterStyle}></div>
          <div>
            <h3>${chosen.title}</h3>
            <div class="movie-meta">${chosen.year} · ${chosen.duration ? chosen.duration + ' min' : '—'} · ${chosen.director || ''}</div>
            <div class="movie-tags" style="margin:12px 0;">${tags}</div>
            <p style="color:var(--text);line-height:1.6;margin:14px 0;">${chosen.synopsis}</p>
            ${platformsBlock}
            <button class="btn-primary" data-action="open-detail" data-id="${chosen.id}">${I18N.t('rouletteDetail')}</button>
            <button class="btn-ghost" data-action="spin-again">${I18N.t('rouletteAgain')}</button>
          </div>
        </div>
      `;
      document.querySelector('[data-action=open-detail]').addEventListener('click', () => openModal(chosen));
      document.querySelector('[data-action=spin-again]').addEventListener('click', spin);
    }, 500);
  }

  // -----------------------------------------------------
  // MODAL DE DETALLE
  // -----------------------------------------------------
  const PLATFORM_URLS = {
    netflix: 'https://www.netflix.com/search?q=',
    prime: 'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=',
    disney: 'https://www.disneyplus.com/search?q=',
    hbo: 'https://play.max.com/search?q=',
    apple: 'https://tv.apple.com/search?term=',
    filmin: 'https://www.filmin.es/buscar?q=',
    movistar: 'https://ver.movistarplus.es/busqueda/?q=',
    skyshowtime: 'https://www.skyshowtime.com/es/search?q='
  };

  function setupModal() {
    document.querySelectorAll('.modal-backdrop').forEach(b => {
      b.addEventListener('click', () => b.parentElement.classList.remove('active'));
    });
  }

  function openModal(m) {
    const isFav = Storage.isFavorite(m.id);
    const isW   = Storage.isWatched(m.id);
    const posterStyle = m.poster ? `style="background-image:url('${m.poster}')"` : '';

    let platformsBlock;
    if (m.platforms && m.platforms.length) {
      const badges = m.platforms.map(p => {
        const url = PLATFORM_URLS[p] ? PLATFORM_URLS[p] + encodeURIComponent(m.title) : '#';
        return `<a class="platform-badge platform-badge-link" data-p="${p}" href="${url}" target="_blank" rel="noopener" title="${platformLabel(p)}">${platformLabel(p)}</a>`;
      }).join('');
      platformsBlock = `<div class="modal-platforms"><span class="platforms-label">${I18N.t('modalWhere')}</span><div class="platforms-badges">${badges}</div><p class="platforms-note">${I18N.t('modalPlatformNote')}</p></div>`;
    } else {
      platformsBlock = `<div class="modal-platforms"><span class="platforms-label platforms-unknown">${I18N.t('modalNoPlatform')}</span><p class="platforms-note">${I18N.t('modalNoPlatformNote')}</p></div>`;
    }

    const rows = [];
    if (m.year)     rows.push(`<strong>${I18N.t('modalYear')}</strong> ${m.year}`);
    if (m.duration) rows.push(`<strong>${I18N.t('modalDuration')}</strong> ${m.duration} min`);
    if (m.director) rows.push(`<strong>${I18N.t('modalDirector')}</strong> ${m.director}`);
    if (m.country)  rows.push(`<strong>${I18N.t('modalCountry')}</strong> ${m.country}`);
    if (m.rating)   rows.push(`<strong>★</strong> ${m.rating}`);

    const tags = (m.genres || []).map(g => `<span class="movie-tag">${genreLabel(g)}</span>`).join('');

    document.getElementById('modal-content').innerHTML = `
      <button class="modal-close" data-action="close-modal">✕</button>
      <div class="modal-poster" ${posterStyle}></div>
      <h2 class="modal-title">${m.title}</h2>
      ${m.original ? `<p class="modal-original">${m.original}</p>` : ''}
      <div class="modal-row">${rows.map(r => `<span>${r}</span>`).join('')}</div>
      <div class="movie-tags" style="margin-bottom:10px;">${tags}</div>
      <p class="modal-synopsis">${m.synopsis || I18N.t('modalNoSynopsis')}</p>
      ${platformsBlock}
      <div class="modal-actions">
        <button data-action="toggle-fav"     class="${isFav ? 'active-state' : ''}">${isFav ? I18N.t('modalRemFav')    : I18N.t('modalAddFav')}</button>
        <button data-action="toggle-watched" class="${isW   ? 'active-state' : ''}">${isW   ? I18N.t('modalUnwatch') : I18N.t('modalMarkWatched')}</button>
        <button data-action="share">${I18N.t('modalShare')}</button>
      </div>
    `;

    const modal = document.getElementById('modal');
    modal.classList.add('active');

    modal.querySelector('[data-action=close-modal]').addEventListener('click', () => modal.classList.remove('active'));
    modal.querySelector('[data-action=toggle-fav]').addEventListener('click', () => {
      const added = Storage.toggleFavorite(m.id);
      toast(I18N.t(added ? 'toastFavAdded' : 'toastFavRemoved'));
      openModal(m);
    });
    modal.querySelector('[data-action=toggle-watched]').addEventListener('click', () => {
      const added = Storage.toggleWatched(m.id);
      toast(I18N.t(added ? 'toastWatchAdded' : 'toastWatchRemoved'));
      openModal(m);
    });
    modal.querySelector('[data-action=share]').addEventListener('click', () => shareMovie(m));
  }

  // -----------------------------------------------------
  // COMPARTIR POR ENLACE
  // -----------------------------------------------------
  function setupShareUrl() {
    document.getElementById('copy-link-btn').addEventListener('click', () => {
      const inp = document.getElementById('share-link');
      inp.select();
      navigator.clipboard.writeText(inp.value).then(() => toast(I18N.t('toastCopied')));
    });
    document.getElementById('close-share').addEventListener('click', () => {
      document.getElementById('share-modal').classList.remove('active');
    });
  }

  function shareMovie(m) {
    const url = location.origin + location.pathname + '?film=' + encodeURIComponent(m.id);
    document.getElementById('share-link').value = url;
    document.getElementById('share-modal').classList.add('active');
  }

  function getSharedMovieId() {
    return new URLSearchParams(location.search).get('film');
  }

  // -----------------------------------------------------
  // TOAST
  // -----------------------------------------------------
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('show'), 2200);
  }

})();
