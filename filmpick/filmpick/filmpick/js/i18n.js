/* ============================================
   i18n.js — FilmPick — Internacionalización
   Idiomas: es (español), en (English), eu (Euskera)
   Detección automática según navigator.language
   ============================================ */

const I18N = (() => {

  // ── Detectar idioma del navegador ──────────────────
  function detectLang() {
    const saved = localStorage.getItem('filmpick_lang');
    if (saved && ['es','en','eu'].includes(saved)) return saved;
    const nav = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
    if (nav.startsWith('eu')) return 'eu';
    if (nav.startsWith('en')) return 'en';
    return 'es';
  }

  let current = detectLang();

  // ── Traducciones ───────────────────────────────────
  const T = {

    // ════════════════════════════════════════
    es: {
      pageTitle:           'FilmPick — Encuentra la película perfecta',
      pageDesc:            'Aplicación para elegir película según género, duración, compañía, plataforma y estado de ánimo.',

      // Onboarding
      onboardingTag:       'El final del scrolleo eterno',
      onboardingTitle:     '¿Cómo te llamamos?',
      onboardingSub:       'Guardaremos tus favoritos, lo que ya has visto y tu historial. Todo en tu dispositivo, nada se sube a ningún servidor.',
      onboardingPlaceholder: 'Tu nombre',
      onboardingBtn:       'Empezar a ver pelis',
      onboardingFoot:      'Sin contraseña · Datos locales',

      // Header / nav
      tabDiscover:         'Descubrir',
      tabRoulette:         'Ruleta',
      tabFavorites:        'Favoritos',
      tabWatched:          'Ya vistas',
      logoutTitle:         'Cerrar sesión',

      // Hero – Descubrir
      heroEyebrow:         '— Hola,',
      heroTitle:           'Vamos a encontrar\ntu peli',
      heroText:            'Cuéntanos cómo estás, con quién ves la peli y qué tienes contratado.',
      statCurated:         'catálogo propio',
      statTmdb:            '+ Catálogo TMDb',

      // Filtros
      f1Title:             '¿Con quién?',
      f1Solo:              'Solo',
      f1Pareja:            'Pareja',
      f1Familia:           'Familia con niños',
      f1Amigos:            'Amigos',
      f1Cualquiera:        'Da igual',

      f2Title:             'Estado de ánimo',
      f2Ligero:            'Algo ligero',
      f2Reir:              'Reír',
      f2Emocionar:         'Emocionarme',
      f2Pensar:            'Pensar',
      f2Adrenalina:        'Adrenalina',
      f2Tension:           'Tensión / miedo',
      f2Escapar:           'Escapar',

      f3Title:             'Géneros',
      gComedia:            'Comedia',
      gDrama:              'Drama',
      gAccion:             'Acción',
      gThriller:           'Thriller',
      gTerror:             'Terror',
      gRomance:            'Romance',
      gCienciaficcion:     'Ciencia ficción',
      gFantasia:           'Fantasía',
      gAnimacion:          'Animación',
      gDocumental:         'Documental',
      gBiografico:         'Biográfico',
      gAventura:           'Aventura',
      gFamilia:            'Familiar',

      f4Title:             'Duración máxima',
      f5Title:             'Año mínimo',
      noLimit:             'Sin límite',
      anyYear:             'Cualquier año',

      f6Title:             'Palabra clave',
      f6Optional:          'opcional',
      f6Placeholder:       'ej: juicios, vampiros, navidad, mafia, espacio, samuráis…',
      f6Hint:              'Busca por temática real de la película (TMDb online) o en título, sinopsis y tags (catálogo propio).',

      f7Title:             'Plataformas que tienes',

      f8Title:             'Fuente',
      srcLocal:            'Catálogo propio',
      srcTmdb:             'Catálogo TMDb (online)',
      tmdbHint:            'Conexión a TMDb activa. Búsqueda en tiempo real con miles de películas.',

      btnSearch:           'Buscar películas',
      btnReset:            'Reiniciar filtros',
      filterActive1:       'filtro activo',
      filterActiveN:       'filtros activos',

      // Resultados
      resultsEmpty:        'Configura tus filtros arriba y dale a "Buscar películas".',
      resultsReset:        'Filtros reiniciados. Configura los nuevos y busca.',
      resultsNone:         'Ninguna película encaja con esos filtros. Prueba a relajar alguno.',
      resultsFound1:       'película encontrada · ordenada por compatibilidad',
      resultsFoundN:       'películas encontradas · ordenadas por compatibilidad',
      resultsTop:          'Top {limit} de {total} películas encontradas · ordenadas por compatibilidad',
      resultsAll:          'Mostrando las {total} películas · ordenadas por compatibilidad',
      btnShowMore:         'Ver las {n} restantes',
      btnShowLess:         'Ver solo las 15 mejores',

      // Búsqueda TMDb
      loadingLocal:        'Buscando…',
      loadingTmdb:         'Conectando con TMDb…',
      tmdbPhaseResolving:  'Buscando películas con la temática "{term}"…',
      tmdbPhaseFetching:   'Descargando catálogo TMDb (por {mode})… página {loaded} de {total}',
      tmdbModeKeyword:     'temática',
      tmdbModeSearch:      'título',
      tmdbModeFilters:     'filtros',
      tmdbPhaseProviders:  'Consultando disponibilidad de plataformas para {total} películas…',
      tmdbSlowNote:        'Estamos buscando en todo TMDb, esto puede tardar.',
      tmdbNoKwPlat:        'No se han encontrado películas en TMDb que coincidan con "{kw}" y estén disponibles en las plataformas seleccionadas. Prueba a quitar el filtro de plataforma.',
      tmdbNoKw:            'TMDb no ha devuelto resultados para "{kw}". Prueba con otra palabra o el catálogo propio.',
      tmdbNoPlat:          'No se encontraron películas en TMDb disponibles en las plataformas seleccionadas. Prueba a quitar el filtro de plataforma.',
      tmdbNoResult:        'No hubo respuesta de TMDb. Prueba el catálogo propio.',

      // Ruleta
      rouletteEyebrow:     '— Modo',
      rouletteTitle:       'Ruleta',
      rouletteText:        '¿No tienes ni idea? Deja que el azar elija. Puedes filtrar por con quién la ves o lanzarla totalmente al aire.',
      rouletteFilterBy:    'Filtrar por:',
      rouletteAnyAud:      'Cualquiera',
      rouletteAudSolo:     'Para ver solo',
      rouletteAudPareja:   'Para pareja',
      rouletteAudFamilia:  'Para familia',
      rouletteAudAmigos:   'Para amigos',
      rouletteAnyDur:      'Sin límite duración',
      rouletteDur100:      '≤ 100 min',
      rouletteDur120:      '≤ 120 min',
      rouletteDur150:      '≤ 150 min',
      rouletteBtn:         'GIRAR LA RULETA',
      rouletteEmpty:       'No queda nada en el saco con esos filtros.',
      rouletteDetail:      'Ver detalle',
      rouletteAgain:       'Otra peli',

      // Favoritos / Vistas
      favEyebrow:          '— Mi lista',
      favTitle:            'Favoritos',
      favText:             'Tus películas guardadas para verlas más adelante.',
      favEmpty:            'No tienes favoritos guardados aún.',
      watchedEyebrow:      '— Historial',
      watchedTitle:        'Ya vistas',
      watchedText:         'Las pelis que has marcado como vistas. No volverán a aparecer en las recomendaciones.',
      watchedEmpty:        'Aún no has marcado ninguna como vista.',

      // Modal
      modalYear:           'Año',
      modalDuration:       'Duración',
      modalDirector:       'Director',
      modalCountry:        'País',
      modalWhere:          'Dónde verla',
      modalPlatformNote:   'Pulsa una plataforma para buscarla directamente.',
      modalNoPlatform:     'Plataforma no disponible',
      modalNoPlatformNote: 'No tenemos información de plataformas para esta película.',
      modalNoSynopsis:     'Sin sinopsis disponible.',
      modalCardNoPlatform: 'Plataforma no disponible',
      modalCardAvailOn:    'Disponible en',
      modalAddFav:         '☆ Añadir favorito',
      modalRemFav:         '★ En favoritos',
      modalMarkWatched:    'Marcar como vista',
      modalUnwatch:        '✓ Ya vista',
      modalShare:          '↗ Compartir',
      toastFavAdded:       'Añadida a favoritos',
      toastFavRemoved:     'Quitada de favoritos',
      toastWatchAdded:     'Marcada como vista',
      toastWatchRemoved:   'Quitada de vistas',
      toastCopied:         'Enlace copiado',
      toastCatalogErr:     'Error al cargar el catálogo',

      // Compartir
      shareTitle:          'Compartir recomendación',
      shareText:           'Copia este enlace y pásaselo a quien quieras:',
      shareCopy:           'Copiar',
      shareClose:          'Cerrar',

      // Footer
      footerLeft:          '© 2026 Zaloa Madariaga · Todos los derechos reservados',
      footerRight:         'Datos: catálogo propio + TMDb API',

      // Logout confirm
      logoutConfirm:       '¿Cerrar sesión? Tus datos seguirán guardados.',

      // Lang picker
      langLabel:           'Idioma',
    },

    // ════════════════════════════════════════
    en: {
      pageTitle:           'FilmPick — Find your perfect film',
      pageDesc:            'Pick a film by genre, duration, company, platform and mood. Own catalogue + TMDb integration.',

      onboardingTag:       'The end of endless scrolling',
      onboardingTitle:     'What should we call you?',
      onboardingSub:       'We\'ll save your favourites, watched films and history. Everything stays on your device — nothing is uploaded to any server.',
      onboardingPlaceholder: 'Your name',
      onboardingBtn:       'Start picking films',
      onboardingFoot:      'No password · Local data',

      tabDiscover:         'Discover',
      tabRoulette:         'Roulette',
      tabFavorites:        'Favourites',
      tabWatched:          'Watched',
      logoutTitle:         'Log out',

      heroEyebrow:         '— Hi,',
      heroTitle:           'Let\'s find\nyour film',
      heroText:            'Tell us how you feel, who you\'re watching with and what you have subscribed.',
      statCurated:         'own catalogue',
      statTmdb:            '+ TMDb catalogue',

      f1Title:             'Who\'s watching?',
      f1Solo:              'Just me',
      f1Pareja:            'Couple',
      f1Familia:           'Family with kids',
      f1Amigos:            'Friends',
      f1Cualquiera:        "Doesn't matter",

      f2Title:             'Mood',
      f2Ligero:            'Something light',
      f2Reir:              'Laugh',
      f2Emocionar:         'Feel moved',
      f2Pensar:            'Think',
      f2Adrenalina:        'Adrenaline',
      f2Tension:           'Tension / fear',
      f2Escapar:           'Escape',

      f3Title:             'Genres',
      gComedia:            'Comedy',
      gDrama:              'Drama',
      gAccion:             'Action',
      gThriller:           'Thriller',
      gTerror:             'Horror',
      gRomance:            'Romance',
      gCienciaficcion:     'Science fiction',
      gFantasia:           'Fantasy',
      gAnimacion:          'Animation',
      gDocumental:         'Documentary',
      gBiografico:         'Biographical',
      gAventura:           'Adventure',
      gFamilia:            'Family',

      f4Title:             'Max duration',
      f5Title:             'Min year',
      noLimit:             'No limit',
      anyYear:             'Any year',

      f6Title:             'Keyword',
      f6Optional:          'optional',
      f6Placeholder:       'e.g.: trials, vampires, christmas, mafia, space, samurai…',
      f6Hint:              'Search by theme (TMDb online) or in title, synopsis and tags (own catalogue).',

      f7Title:             'Your platforms',

      f8Title:             'Source',
      srcLocal:            'Own catalogue',
      srcTmdb:             'TMDb catalogue (online)',
      tmdbHint:            'TMDb connection active. Real-time search across thousands of films.',

      btnSearch:           'Search films',
      btnReset:            'Reset filters',
      filterActive1:       'active filter',
      filterActiveN:       'active filters',

      resultsEmpty:        'Set your filters above and hit "Search films".',
      resultsReset:        'Filters reset. Set new ones and search.',
      resultsNone:         'No film matches those filters. Try loosening some.',
      resultsFound1:       'film found · sorted by match',
      resultsFoundN:       'films found · sorted by match',
      resultsTop:          'Top {limit} of {total} films found · sorted by match',
      resultsAll:          'Showing all {total} films · sorted by match',
      btnShowMore:         'Show {n} more',
      btnShowLess:         'Show only top 15',

      loadingLocal:        'Searching…',
      loadingTmdb:         'Connecting to TMDb…',
      tmdbPhaseResolving:  'Searching films about "{term}"…',
      tmdbPhaseFetching:   'Downloading TMDb catalogue (by {mode})… page {loaded} of {total}',
      tmdbModeKeyword:     'theme',
      tmdbModeSearch:      'title',
      tmdbModeFilters:     'filters',
      tmdbPhaseProviders:  'Checking platform availability for {total} films…',
      tmdbSlowNote:        'We\'re searching all of TMDb — this may take a moment.',
      tmdbNoKwPlat:        'No films on TMDb match "{kw}" and are available on the selected platforms. Try removing the platform filter.',
      tmdbNoKw:            'TMDb returned no results for "{kw}". Try another keyword or use the own catalogue.',
      tmdbNoPlat:          'No films on TMDb are available on the selected platforms. Try removing the platform filter.',
      tmdbNoResult:        'No response from TMDb. Try the own catalogue.',

      rouletteEyebrow:     '— Mode',
      rouletteTitle:       'Roulette',
      rouletteText:        'No idea? Let chance decide. You can filter by who\'s watching or go completely random.',
      rouletteFilterBy:    'Filter by:',
      rouletteAnyAud:      'Anyone',
      rouletteAudSolo:     'Solo viewing',
      rouletteAudPareja:   'For a couple',
      rouletteAudFamilia:  'For family',
      rouletteAudAmigos:   'For friends',
      rouletteAnyDur:      'No duration limit',
      rouletteDur100:      '≤ 100 min',
      rouletteDur120:      '≤ 120 min',
      rouletteDur150:      '≤ 150 min',
      rouletteBtn:         'SPIN THE ROULETTE',
      rouletteEmpty:       'Nothing left in the bag with those filters.',
      rouletteDetail:      'View details',
      rouletteAgain:       'Another film',

      favEyebrow:          '— My list',
      favTitle:            'Favourites',
      favText:             'Your saved films to watch later.',
      favEmpty:            'No favourites saved yet.',
      watchedEyebrow:      '— History',
      watchedTitle:        'Watched',
      watchedText:         'Films you\'ve marked as watched. They won\'t appear in recommendations again.',
      watchedEmpty:        'You haven\'t marked any film as watched yet.',

      modalYear:           'Year',
      modalDuration:       'Duration',
      modalDirector:       'Director',
      modalCountry:        'Country',
      modalWhere:          'Where to watch',
      modalPlatformNote:   'Tap a platform to search directly.',
      modalNoPlatform:     'Platform unavailable',
      modalNoPlatformNote: 'We don\'t have platform info for this film.',
      modalNoSynopsis:     'No synopsis available.',
      modalCardNoPlatform: 'Platform unavailable',
      modalCardAvailOn:    'Available on',
      modalAddFav:         '☆ Add to favourites',
      modalRemFav:         '★ In favourites',
      modalMarkWatched:    'Mark as watched',
      modalUnwatch:        '✓ Watched',
      modalShare:          '↗ Share',
      toastFavAdded:       'Added to favourites',
      toastFavRemoved:     'Removed from favourites',
      toastWatchAdded:     'Marked as watched',
      toastWatchRemoved:   'Removed from watched',
      toastCopied:         'Link copied',
      toastCatalogErr:     'Error loading catalogue',

      shareTitle:          'Share recommendation',
      shareText:           'Copy this link and share it with whoever you like:',
      shareCopy:           'Copy',
      shareClose:          'Close',

      footerLeft:          '© 2026 Zaloa Madariaga · Todos los derechos reservados',
      footerRight:         'Data: own catalogue + TMDb API',

      logoutConfirm:       'Log out? Your data will remain saved.',

      langLabel:           'Language',
    },

    // ════════════════════════════════════════
    eu: {
      pageTitle:           'FilmPick — Aurkitu zure film perfektua',
      pageDesc:            'Filma aukeratu generoa, iraupena, lagunartea, plataforma eta umorea arabera. Katalogo propioa + TMDb integrazioa.',

      onboardingTag:       'Betirako scrollaren amaiera',
      onboardingTitle:     'Nola deitu behar dizugu?',
      onboardingSub:       'Zure gogokoenak, ikusitakoak eta historia gordeko ditugu. Dena zure gailuan — ez da ezer zerbitzarira igotzen.',
      onboardingPlaceholder: 'Zure izena',
      onboardingBtn:       'Filmak aukeratzen hasi',
      onboardingFoot:      'Pasahitzik ez · Datu lokalak',

      tabDiscover:         'Aurkitu',
      tabRoulette:         'Erruleta',
      tabFavorites:        'Gogokoak',
      tabWatched:          'Ikusita',
      logoutTitle:         'Saioa itxi',

      heroEyebrow:         '— Kaixo,',
      heroTitle:           'Aurkitu dezagun\nzure filma',
      heroText:            'Esan iezaguzu nola zauden, norekin ikusiko duzun eta zer plataforma dituzu.',
      statCurated:         'katalogo propioa',
      statTmdb:            '+ TMDb katalogoa',

      f1Title:             'Norekin?',
      f1Solo:              'Bakarrik',
      f1Pareja:            'Bikotea',
      f1Familia:           'Familia umeekin',
      f1Amigos:            'Lagunak',
      f1Cualquiera:        'Berdin zait',

      f2Title:             'Aldartea',
      f2Ligero:            'Zerbait arina',
      f2Reir:              'Barre egin',
      f2Emocionar:         'Hunkitu',
      f2Pensar:            'Pentsatu',
      f2Adrenalina:        'Adrenalina',
      f2Tension:           'Tentsioa / beldurra',
      f2Escapar:           'Ihes egin',

      f3Title:             'Generoak',
      gComedia:            'Komedia',
      gDrama:              'Drama',
      gAccion:             'Ekintza',
      gThriller:           'Thriller',
      gTerror:             'Beldurra',
      gRomance:            'Maitasuna',
      gCienciaficcion:     'Zientzia fikzioa',
      gFantasia:           'Fantasia',
      gAnimacion:          'Animazioa',
      gDocumental:         'Dokumentala',
      gBiografico:         'Biografikoa',
      gAventura:           'Abentura',
      gFamilia:            'Familia',

      f4Title:             'Gehienezko iraupena',
      f5Title:             'Gutxieneko urtea',
      noLimit:             'Mugarik ez',
      anyYear:             'Edozein urte',

      f6Title:             'Hitz gakoa',
      f6Optional:          'aukerakoa',
      f6Placeholder:       'adib.: epaiketak, banpiroak, gabonak, mafia, espazioa, samuraiak…',
      f6Hint:              'Bilatu filmaren gaiaren arabera (TMDb online) edo tituluan, sinopsian eta tagetan (katalogo propio).',

      f7Title:             'Zure plataformak',

      f8Title:             'Iturria',
      srcLocal:            'Katalogo propioa',
      srcTmdb:             'TMDb katalogoa (online)',
      tmdbHint:            'TMDb konexioa aktibo. Denbora errealeko bilaketa milaka filmetan.',

      btnSearch:           'Filmak bilatu',
      btnReset:            'Iragazkiak berrezarri',
      filterActive1:       'iragazki aktibo',
      filterActiveN:       'iragazki aktibo',

      resultsEmpty:        'Ezarri zure iragazkiak eta sakatu "Filmak bilatu".',
      resultsReset:        'Iragazkiak berrezarri dira. Ezarri berriak eta bilatu.',
      resultsNone:         'Ez dago filmerik iragazki horiekin. Erlaxatu batzuk.',
      resultsFound1:       'film aurkitu · bateragarritasunaren arabera ordenatuta',
      resultsFoundN:       'film aurkitu · bateragarritasunaren arabera ordenatuta',
      resultsTop:          'Top {limit} aurkitutako {total} filmetatik · bateragarritasunaren arabera',
      resultsAll:          '{total} film erakusten · bateragarritasunaren arabera',
      btnShowMore:         'Gainerako {n} ikusi',
      btnShowLess:         'Top 15 soilik ikusi',

      loadingLocal:        'Bilatzen…',
      loadingTmdb:         'TMDb-rekin konektatzen…',
      tmdbPhaseResolving:  '"{term}" gaiari buruzko filmak bilatzen…',
      tmdbPhaseFetching:   'TMDb katalogoa deskargatzen ({mode})… {loaded}. orria {total}etik',
      tmdbModeKeyword:     'gaia',
      tmdbModeSearch:      'titulua',
      tmdbModeFilters:     'iragazkiak',
      tmdbPhaseProviders:  '{total} filmen plataforma erabilgarritasuna kontsultatzen…',
      tmdbSlowNote:        'TMDb osoan bilatzen ari gara — une bat behar izan dezake.',
      tmdbNoKwPlat:        'TMDb-n ez da "{kw}" gaiarekin bat datorren eta hautatutako plataformetan erabilgarri dagoen filmerik aurkitu. Saiatu plataforma iragazkia kentzen.',
      tmdbNoKw:            'TMDb-k ez du emaitzarik itzuli "{kw}" hitzarentzat. Saiatu beste hitz batekin edo katalogo propioa erabili.',
      tmdbNoPlat:          'Ez da TMDb-n hautatutako plataformetan erabilgarri dagoen filmerik aurkitu. Saiatu plataforma iragazkia kentzen.',
      tmdbNoResult:        'TMDb-tik ez da erantzunik jaso. Saiatu katalogo propio.',

      rouletteEyebrow:     '— Modua',
      rouletteTitle:       'Erruleta',
      rouletteText:        'Ideiarik ez? Utz ezazu zorotasunari aukeratzen. Norekin ikusiko duzun iragazki dezakezu edo erabat ausaz bota.',
      rouletteFilterBy:    'Iragazki:',
      rouletteAnyAud:      'Edozein',
      rouletteAudSolo:     'Bakarrik ikusteko',
      rouletteAudPareja:   'Bikoterako',
      rouletteAudFamilia:  'Familiarako',
      rouletteAudAmigos:   'Lagunakrerako',
      rouletteAnyDur:      'Iraupen mugarik ez',
      rouletteDur100:      '≤ 100 min',
      rouletteDur120:      '≤ 120 min',
      rouletteDur150:      '≤ 150 min',
      rouletteBtn:         'ERRULETA BIRATU',
      rouletteEmpty:       'Ez dago ezer zakuan iragazki horietan.',
      rouletteDetail:      'Xehetasunak ikusi',
      rouletteAgain:       'Beste film bat',

      favEyebrow:          '— Nire zerrenda',
      favTitle:            'Gogokoak',
      favText:             'Geroago ikusteko gordeta dituzun filmak.',
      favEmpty:            'Oraindik ez duzu gogokoekin gordeta.',
      watchedEyebrow:      '— Historia',
      watchedTitle:        'Ikusita',
      watchedText:         'Ikusita markatu dituzun filmak. Ez dira berriz gomendioen artean agertuko.',
      watchedEmpty:        'Oraindik ez duzu filmerik ikusita markatu.',

      modalYear:           'Urtea',
      modalDuration:       'Iraupena',
      modalDirector:       'Zuzendaria',
      modalCountry:        'Herrialdea',
      modalWhere:          'Non ikusi',
      modalPlatformNote:   'Sakatu plataforma bat zuzenean bilatzeko.',
      modalNoPlatform:     'Plataforma ez dago eskuragarri',
      modalNoPlatformNote: 'Ez dugu film honen plataforma informaziorik.',
      modalNoSynopsis:     'Ez dago sinopsirik.',
      modalCardNoPlatform: 'Plataforma ez dago eskuragarri',
      modalCardAvailOn:    'Eskuragarri',
      modalAddFav:         '☆ Gogokoa gehitu',
      modalRemFav:         '★ Gogokoen artean',
      modalMarkWatched:    'Ikusita markatu',
      modalUnwatch:        '✓ Ikusita',
      modalShare:          '↗ Partekatu',
      toastFavAdded:       'Gogokoen artean gehitu da',
      toastFavRemoved:     'Gogokoetatik kendu da',
      toastWatchAdded:     'Ikusita markatu da',
      toastWatchRemoved:   'Ikusitakoetatik kendu da',
      toastCopied:         'Esteka kopiatu da',
      toastCatalogErr:     'Errorea katalogoa kargatzean',

      shareTitle:          'Gomendioa partekatu',
      shareText:           'Kopiatu esteka hau eta pasa nahi duzunari:',
      shareCopy:           'Kopiatu',
      shareClose:          'Itxi',

      footerLeft:          '© 2026 Zaloa Madariaga · Todos los derechos reservados',
      footerRight:         'Datuak: katalogo propioa + TMDb API',

      logoutConfirm:       'Saioa itxi? Zure datuak gordeta jarraituko dute.',

      langLabel:           'Hizkuntza',
    }
  };

  // ── API pública ────────────────────────────────────
  function t(key, vars) {
    const str = (T[current] && T[current][key]) || (T['es'] && T['es'][key]) || key;
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : '{' + k + '}'));
  }

  function setLang(lang) {
    if (!T[lang]) return;
    current = lang;
    localStorage.setItem('filmpick_lang', lang);
  }

  function getLang() { return current; }
  function getLangs() { return Object.keys(T); }

  return { t, setLang, getLang, getLangs };
})();
