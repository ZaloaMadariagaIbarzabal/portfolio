/* ============================================
   tmdb.js — Integración con The Movie Database
   API gratuita: https://www.themoviedb.org/
   ============================================ */

const TMDB = (() => {
  // ⚠️ API key pública de demo (común en tutoriales).
  // Para producción regístrate gratis en https://www.themoviedb.org/settings/api
  const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
  const BASE = 'https://api.themoviedb.org/3';
  const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

  const providerCache = new Map();
  const detailsCache = new Map();

  const TMDB_GENRES = {
    28: 'accion', 12: 'aventura', 16: 'animacion', 35: 'comedia',
    80: 'thriller', 99: 'documental', 18: 'drama', 10751: 'familia',
    14: 'fantasia', 36: 'biografico', 27: 'terror', 10402: 'musical',
    9648: 'thriller', 10749: 'romance', 878: 'cienciaficcion',
    53: 'thriller', 10752: 'drama', 37: 'aventura'
  };

  const GENRES_TO_TMDB = {
    accion: 28, aventura: 12, animacion: 16, comedia: 35,
    drama: 18, familia: 10751, fantasia: 14, biografico: 36,
    terror: 27, romance: 10749, cienciaficcion: 878,
    thriller: 53, documental: 99
  };

  const PROVIDER_MAP = [
    { match: /netflix/i, id: 'netflix' },
    { match: /amazon prime|prime video/i, id: 'prime' },
    { match: /disney/i, id: 'disney' },
    { match: /^max$|hbo/i, id: 'hbo' },
    { match: /apple tv/i, id: 'apple' },
    { match: /filmin/i, id: 'filmin' },
    { match: /movistar/i, id: 'movistar' },
    { match: /skyshowtime/i, id: 'skyshowtime' }
  ];

  // Diccionario español → inglés de temáticas frecuentes.
  // Se usa para traducir la palabra del usuario al término que TMDb entiende
  // (TMDb almacena las keywords en inglés). Si la palabra está en este map,
  // buscamos por TEMÁTICA en vez de por título. Si no, buscamos por título.
  const TOPIC_MAP = {
    // legal / justicia
    'juicio': 'trial', 'juicios': 'trial', 'tribunal': 'courtroom',
    'abogado': 'lawyer', 'abogados': 'lawyer', 'corte': 'courtroom',
    'justicia': 'justice', 'jurado': 'jury',
    // sobrenatural
    'vampiro': 'vampire', 'vampiros': 'vampire',
    'zombi': 'zombie', 'zombis': 'zombie', 'zombies': 'zombie',
    'fantasma': 'ghost', 'fantasmas': 'ghost',
    'bruja': 'witch', 'brujas': 'witch', 'brujo': 'witch',
    'demonio': 'demon', 'demonios': 'demon',
    'hombre lobo': 'werewolf', 'licantropo': 'werewolf', 'licántropo': 'werewolf',
    'momia': 'mummy', 'momias': 'mummy',
    // crimen
    'mafia': 'mafia', 'mafioso': 'mafia', 'gangster': 'gangster', 'gánster': 'gangster',
    'cartel': 'drug cartel', 'cártel': 'drug cartel',
    'narco': 'drug trafficking', 'narcotrafico': 'drug trafficking',
    'asesino en serie': 'serial killer', 'serial killer': 'serial killer',
    'atraco': 'heist', 'atracos': 'heist', 'robo': 'heist',
    'detective': 'detective', 'detectives': 'detective',
    'policia': 'police', 'policía': 'police', 'policias': 'police',
    'espia': 'spy', 'espía': 'spy', 'espias': 'spy', 'espionaje': 'espionage',
    'secuestro': 'kidnapping', 'venganza': 'revenge',
    'asesinato': 'murder', 'asesinatos': 'murder',
    'carcel': 'prison', 'cárcel': 'prison', 'prision': 'prison',
    // ciencia ficción / fantasía
    'espacio': 'space', 'astronauta': 'astronaut',
    'extraterrestre': 'alien', 'extraterrestres': 'alien',
    'alien': 'alien', 'aliens': 'alien',
    'robot': 'robot', 'robots': 'robot',
    'inteligencia artificial': 'artificial intelligence',
    'viaje en el tiempo': 'time travel', 'tiempo': 'time travel',
    'apocalipsis': 'apocalypse', 'postapocaliptico': 'post-apocalyptic',
    'distopia': 'dystopia', 'distopía': 'dystopia',
    'multiverso': 'multiverse', 'paralelo': 'parallel universe',
    'superheroe': 'superhero', 'superhéroe': 'superhero',
    'magia': 'magic', 'mago': 'wizard', 'magos': 'wizard',
    'dragones': 'dragon', 'dragon': 'dragon', 'dragón': 'dragon',
    // guerra / historia
    'guerra': 'war', 'segunda guerra mundial': 'world war ii',
    'nazi': 'nazi', 'nazis': 'nazi', 'holocausto': 'holocaust',
    'vietnam': 'vietnam war', 'samurai': 'samurai', 'samuráis': 'samurai',
    'medieval': 'middle ages', 'medievo': 'middle ages',
    'gladiador': 'gladiator', 'roma': 'ancient rome', 'romano': 'ancient rome',
    'piratas': 'pirate', 'pirata': 'pirate',
    'vikingos': 'viking', 'vikingo': 'viking',
    // social / vida real
    'navidad': 'christmas', 'navidades': 'christmas',
    'boda': 'wedding', 'bodas': 'wedding',
    'amistad': 'friendship', 'familia': 'family',
    'enfermedad': 'illness', 'cancer': 'cancer', 'cáncer': 'cancer',
    'discapacidad': 'disability',
    'racismo': 'racism', 'lgbt': 'lgbt', 'gay': 'gay', 'lesbiana': 'lesbian',
    'feminismo': 'feminism', 'religion': 'religion', 'religión': 'religion',
    // deporte / aficiones
    'boxeo': 'boxing', 'boxeador': 'boxing', 'futbol': 'football', 'fútbol': 'soccer',
    'baloncesto': 'basketball', 'beisbol': 'baseball', 'béisbol': 'baseball',
    'musica': 'music', 'música': 'music',
    'baile': 'dance', 'danza': 'dance',
    'cocina': 'cooking', 'gastronomia': 'food',
    'periodismo': 'journalism', 'periodista': 'journalist',
    // otros temáticos
    'tiburones': 'shark', 'tiburon': 'shark', 'tiburón': 'shark',
    'dinosaurios': 'dinosaur', 'dinosaurio': 'dinosaur',
    'colegio': 'high school', 'instituto': 'high school', 'universidad': 'college',
    'road movie': 'road trip', 'viaje': 'road trip',
    'biografico': 'biography', 'biografía': 'biography',
    'documental': 'documentary'
  };

  // Cache de búsquedas keyword→IDs TMDb
  const keywordIdCache = new Map();

  // Traducción ES→EN si aplica; devuelve la cadena que iremos a buscar en TMDb
  function translateTopic(userKw) {
    if (!userKw) return null;
    const norm = userKw.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Comprobamos también la versión normalizada del map
    for (const [k, v] of Object.entries(TOPIC_MAP)) {
      const kNorm = k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (kNorm === norm) return v;
    }
    return null;
  }

  // Pide a TMDb el ID interno de una keyword temática (ej: "trial" → 9748)
  async function resolveKeywordId(englishTerm) {
    if (keywordIdCache.has(englishTerm)) return keywordIdCache.get(englishTerm);
    try {
      const url = `${BASE}/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(englishTerm)}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const json = await res.json();
      // Cogemos el primer resultado (TMDb los ordena por relevancia)
      if (json.results && json.results.length > 0) {
        // Buscamos coincidencia exacta primero
        const exact = json.results.find(r => r.name.toLowerCase() === englishTerm.toLowerCase());
        const id = exact ? exact.id : json.results[0].id;
        keywordIdCache.set(englishTerm, id);
        return id;
      }
      keywordIdCache.set(englishTerm, null);
      return null;
    } catch (err) {
      console.error('resolveKeywordId error:', err);
      return null;
    }
  }

  function mapProviders(providersResponse) {
    if (!providersResponse || !providersResponse.results) return [];
    const es = providersResponse.results.ES;
    if (!es) return [];
    const flatrate = es.flatrate || [];
    const ids = new Set();
    flatrate.forEach(provider => {
      const name = provider.provider_name || '';
      const found = PROVIDER_MAP.find(p => p.match.test(name));
      if (found) ids.add(found.id);
    });
    return Array.from(ids);
  }

  function normalizeMovie(tmdbMovie) {
    const year = tmdbMovie.release_date
      ? parseInt(tmdbMovie.release_date.substring(0, 4))
      : null;
    const genres = (tmdbMovie.genre_ids || [])
      .map(id => TMDB_GENRES[id])
      .filter(Boolean);

    return {
      id: 'tmdb_' + tmdbMovie.id,
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.title,
      original: tmdbMovie.original_title !== tmdbMovie.title ? tmdbMovie.original_title : null,
      year,
      duration: null,
      genres: [...new Set(genres)],
      rating: tmdbMovie.vote_average ? Math.round(tmdbMovie.vote_average * 10) / 10 : null,
      synopsis: tmdbMovie.overview || 'Sin sinopsis disponible.',
      poster: tmdbMovie.poster_path ? IMG_BASE + tmdbMovie.poster_path : null,
      country: null,
      director: null,
      platforms: [],
      mood: [],
      audience: ['cualquiera'],
      tags: [],
      isTmdb: true
    };
  }

  function buildDiscoverUrl(filters, page) {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: 'es-ES',
      region: 'ES',
      sort_by: 'popularity.desc',
      'vote_count.gte': '100',
      include_adult: 'false',
      page: String(page)
    });

    if (filters.genres && filters.genres.length) {
      const ids = filters.genres.map(g => GENRES_TO_TMDB[g]).filter(Boolean);
      if (ids.length) params.set('with_genres', ids.join(','));
    }
    if (filters.minYear && filters.minYear > 1930) {
      params.set('primary_release_date.gte', filters.minYear + '-01-01');
    }
    if (filters.maxDuration && filters.maxDuration < 200) {
      params.set('with_runtime.lte', String(filters.maxDuration));
    }
    return `${BASE}/discover/movie?${params}`;
  }

  function buildSearchUrl(keyword, page) {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: 'es-ES',
      region: 'ES',
      include_adult: 'false',
      query: keyword,
      page: String(page)
    });
    return `${BASE}/search/movie?${params}`;
  }

  // URL para discover filtrando por keyword temática (más filtros TMDb-nativos)
  function buildKeywordDiscoverUrl(filters, keywordId, page) {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: 'es-ES',
      region: 'ES',
      sort_by: 'popularity.desc',
      include_adult: 'false',
      with_keywords: String(keywordId),
      page: String(page)
    });
    if (filters.genres && filters.genres.length) {
      const ids = filters.genres.map(g => GENRES_TO_TMDB[g]).filter(Boolean);
      if (ids.length) params.set('with_genres', ids.join(','));
    }
    if (filters.minYear && filters.minYear > 1930) {
      params.set('primary_release_date.gte', filters.minYear + '-01-01');
    }
    if (filters.maxDuration && filters.maxDuration < 200) {
      params.set('with_runtime.lte', String(filters.maxDuration));
    }
    return `${BASE}/discover/movie?${params}`;
  }

  // Si hay keyword:
  //   - Si está en el diccionario de temáticas → buscamos por TEMÁTICA (with_keywords)
  //   - Si no → fallback a búsqueda por TÍTULO (search/movie)
  // Si no hay keyword → discover/movie con filtros TMDb-nativos.
  async function discover(filters, onProgress) {
    const HARD_MAX_PAGES = 25;
    const PAGE_BATCH = 5;
    const MAX_PROVIDER_CALLS = 200;

    const hasKeyword = filters.keyword && filters.keyword.trim().length > 0;
    let mode = 'discover'; // 'discover' | 'keyword' | 'search'
    let keywordId = null;

    if (hasKeyword) {
      // Intentar traducir a temática TMDb
      const englishTopic = translateTopic(filters.keyword);
      if (englishTopic) {
        if (onProgress) onProgress({ phase: 'resolving', term: filters.keyword });
        keywordId = await resolveKeywordId(englishTopic);
      }
      mode = keywordId ? 'keyword' : 'search';
    }

    // Construir URL de la primera página según el modo
    const buildUrl = (page) => {
      if (mode === 'keyword') return buildKeywordDiscoverUrl(filters, keywordId, page);
      if (mode === 'search') return buildSearchUrl(filters.keyword, page);
      return buildDiscoverUrl(filters, page);
    };

    let totalPages = 1;
    let allMovies = [];

    try {
      const first = await fetch(buildUrl(1)).then(r => r.ok ? r.json() : null);
      if (!first || !first.results) return [];
      totalPages = Math.min(first.total_pages || 1, HARD_MAX_PAGES);
      allMovies.push(...first.results);

      if (onProgress) onProgress({ phase: 'fetching', loaded: 1, total: totalPages, mode });

      let nextPage = 2;
      while (nextPage <= totalPages) {
        const batch = [];
        for (let i = 0; i < PAGE_BATCH && nextPage <= totalPages; i++, nextPage++) {
          batch.push(fetch(buildUrl(nextPage)).then(r => r.ok ? r.json() : null).catch(() => null));
        }
        const responses = await Promise.all(batch);
        responses.forEach(json => {
          if (json && json.results) allMovies.push(...json.results);
        });
        if (onProgress) onProgress({ phase: 'fetching', loaded: Math.min(nextPage - 1, totalPages), total: totalPages, mode });
      }
    } catch (err) {
      console.error('TMDb fetch error:', err);
      if (!allMovies.length) return [];
    }

    // Deduplicar
    const seen = new Set();
    allMovies = allMovies.filter(m => {
      if (seen.has(m.id)) return false;
      seen.add(m.id);
      return true;
    });

    // Quitar adultos
    allMovies = allMovies.filter(m => !m.adult);

    // Solo en modo 'search' (por título) hay que filtrar género/año en local
    // En modo 'keyword' ya se filtra en la propia query a TMDb
    if (mode === 'search') {
      if (filters.genres && filters.genres.length) {
        const targetIds = filters.genres.map(g => GENRES_TO_TMDB[g]).filter(Boolean);
        if (targetIds.length) {
          allMovies = allMovies.filter(m =>
            (m.genre_ids || []).some(gid => targetIds.includes(gid))
          );
        }
      }
      if (filters.minYear && filters.minYear > 1930) {
        allMovies = allMovies.filter(m => {
          if (!m.release_date) return false;
          return parseInt(m.release_date.substring(0, 4)) >= filters.minYear;
        });
      }
    }

    allMovies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    // Providers
    let movies;
    if (filters.platforms && filters.platforms.length) {
      const subset = allMovies.slice(0, MAX_PROVIDER_CALLS);
      movies = subset.map(normalizeMovie);

      if (onProgress) onProgress({ phase: 'providers', loaded: 0, total: subset.length });

      const providerPromises = movies.map((m) => {
        if (providerCache.has(m.tmdbId)) {
          return Promise.resolve(providerCache.get(m.tmdbId));
        }
        return fetch(`${BASE}/movie/${m.tmdbId}/watch/providers?api_key=${API_KEY}`)
          .then(r => r.ok ? r.json() : null)
          .then(data => {
            const mapped = mapProviders(data);
            providerCache.set(m.tmdbId, mapped);
            return mapped;
          })
          .catch(() => []);
      });
      const providerResults = await Promise.all(providerPromises);
      movies.forEach((m, i) => { m.platforms = providerResults[i] || []; });

      movies = movies.filter(m => m.platforms.some(p => filters.platforms.includes(p)));
    } else {
      const subset = allMovies.slice(0, 60);
      movies = subset.map(normalizeMovie);

      const providerPromises = movies.map(m => {
        if (providerCache.has(m.tmdbId)) {
          return Promise.resolve(providerCache.get(m.tmdbId));
        }
        return fetch(`${BASE}/movie/${m.tmdbId}/watch/providers?api_key=${API_KEY}`)
          .then(r => r.ok ? r.json() : null)
          .then(data => {
            const mapped = mapProviders(data);
            providerCache.set(m.tmdbId, mapped);
            return mapped;
          })
          .catch(() => []);
      });
      const providerResults = await Promise.all(providerPromises);
      movies.forEach((m, i) => { m.platforms = providerResults[i] || []; });
    }

    // Adjuntar info de qué modo se usó (útil para el log)
    movies._searchMode = mode;
    return movies;
  }

  async function getDetails(tmdbId) {
    if (detailsCache.has(tmdbId)) return detailsCache.get(tmdbId);
    try {
      const res = await fetch(`${BASE}/movie/${tmdbId}?api_key=${API_KEY}&language=es-ES&append_to_response=watch/providers,credits`);
      if (!res.ok) throw new Error('Detail fetch failed');
      const data = await res.json();
      detailsCache.set(tmdbId, data);
      return data;
    } catch (err) {
      console.error('TMDb details error:', err);
      return null;
    }
  }

  return { discover, getDetails };
})();
