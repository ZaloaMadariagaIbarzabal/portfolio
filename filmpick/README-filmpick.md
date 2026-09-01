# 🎬 FilmPick

**[Euskara](#euskara) · [Castellano](#castellano) · [English](#english)**

---

## Euskara

Irizpide errealen arabera filma aukeratzeko web aplikazioa (generoa,
iraupena, norekin ikusiko duzun, plataforma, umorea, urtea…). Helburua:
Netflix eta antzekoetako scroll amaigabearekin amaitzea.

### Teknologiak

- **Frontend**: HTML5 + CSS3 + JavaScript hutsa (ES6+, framework-ik gabe).
- **Datuak**: geuk hautatutako katalogoa (`data/movies.json`, metadatu
  osoak dituzten 80 film) + **The Movie Database (TMDb) API**-arekin
  integrazio online.
- **Iraunkortasuna**: nabigatzailearen `localStorage`-a (erabiltzaile
  anitzeko izenaren arabera, backend-ik gabe).
- **Mendekotasunik gabe**, `npm install`-ik gabe. Edozein nabigatzailetan
  irekitzen da.

### Nola exekutatu

Bi aukera dituzu:

**1. aukera — Zerbitzari lokala (gomendatua, JSON kargatzean CORS
arazoak konpontzen ditu)**

```bash
cd filmpick
python3 -m http.server 8000
```

Eta ireki `http://localhost:8000` nabigatzailean.

Node badaukazu:

```bash
npx serve filmpick
```

**2. aukera — Klik bikoitza `index.html`-en**

Nabigatzaile gehienetan funtzionatzen du, baina batzuek JSON lokalaren
`fetch()`-a blokea dezakete. Hori gertatzen bada, erabili 1. aukera.

### Funtzionalitateak

| Funtzioa | Deskribapena |
|---|---|
| Login sinplea | Erabiltzaile-izena bakarrik, lokalean gordea. Gailu berean erabiltzaile anitz. |
| Iragazki anitzak | Ikusleak (bakarrik/bikotea/familia/lagunak), umorea, generoak, iraupena, urtea, plataformak. |
| Bikoitza datu-iturria | Hautatutako katalogoa (80 film) edo TMDb-n bilaketa. |
| Bateragarritasun araberako ranking-a | Filmak zenbat iragazki betetzen dituzten arabera ordenatzen dira, ez alfabetikoki. |
| Gogokoak | Marka film bat ★-rekin eta bere fitxan aurkituko duzu. |
| Ikusitakoen zerrenda | Ikusi gisa markatutako filmak gomendioetan agertzeari uzten diote. |
| Erruleta modua | Zer ikusi ez dakizunean, zoriak aukeratzen du iragazki minimoekin. |
| Estekaz partekatu | `?film=ID` URL bat sortzen du, irekitzean zuzenean filma erakusten duena. |
| Diseinu erantzunkorra | Mugikorrera egokitua. |

### Egitura

```
filmpick/
├── index.html              # Orri nagusia
├── README.md
├── css/
│   └── styles.css          # Estiloak
├── js/
│   ├── app.js              # Logika nagusia: iragazkiak, bilaketa, errendatzea
│   ├── storage.js          # localStorage kudeaketa
│   └── tmdb.js             # TMDb APIaren bezeroa
└── data/
    └── movies.json          # 80 filmeko hautatutako katalogoa
```

### TMDb-ren API gakoari buruz

`js/tmdb.js` fitxategiak ehunka tutorialetan agertzen den TMDb-ren demo
API gako publiko bat darama. Funtzionatzen du, baina benetako erabilerarako:

1. Erregistratu doan https://www.themoviedb.org/signup helbidean.
2. Eskatu zure API gakoa https://www.themoviedb.org/settings/api helbidean.
3. Ordezkatu `API_KEY` konstantea `js/tmdb.js`-n.

### Hautatutako katalogoaren datuak

Film bakoitzak hau dauka: izenburua, jatorrizko izenburua, urtea, iraupena,
zuzendaria, herrialdea, generoak, umorea, xede-audientzia, balorazioa,
sinopsia, kartela (TMDb URL) eta Espainian ikusgai dagoen plataforma
(2025-2026 inguruko hurbilketa; plataformek katalogoa hilero aldatzen dute,
beraz hau orientagarria da).

### Pribatutasuna

Datu guztiak nabigatzailearen `localStorage`-n gordetzen dira. Ezer ez da
inongo zerbitzarira igotzen (TMDb-ra egindako deiak izan ezik, iturri hori
aukeratzean).

### Lizentzia

Proiektu hezigarria. Filmen kartelak eta metadatuak beren titularrenak
dira; TMDb-k doan uzten ditu erabilera ez-komertzialerako.

---

## Castellano

Aplicación web para elegir película en función de criterios reales
(género, duración, con quién la ves, plataforma, estado de ánimo, año…).
El objetivo: terminar con el scroll infinito de Netflix y compañía.

### Stack

- **Frontend**: HTML5 + CSS3 + JavaScript vanilla (ES6+, sin frameworks).
- **Datos**: catálogo curado propio (`data/movies.json`, 80 películas con
  metadatos completos) + integración online con **The Movie Database
  (TMDb) API**.
- **Persistencia**: `localStorage` del navegador (multi-usuario por
  nombre, sin backend).
- **Sin dependencias** ni `npm install`. Se abre en cualquier navegador.

### Cómo ejecutar

Tienes dos opciones:

**Opción 1 — Servidor local (recomendado, soluciona CORS al cargar el
JSON)**

```bash
cd filmpick
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en el navegador.

Si tienes Node:

```bash
npx serve filmpick
```

**Opción 2 — Doble clic en `index.html`**

Funciona en la mayoría de navegadores, aunque algunos pueden bloquear el
`fetch()` del JSON local. Si pasa, usa la opción 1.

### Funcionalidades

| Función | Descripción |
|---|---|
| Login simple | Solo nombre de usuario, guardado local. Multi-usuario en el mismo dispositivo. |
| Filtros múltiples | Audiencia (solo/pareja/familia/amigos), estado de ánimo, géneros, duración, año, plataformas. |
| Doble fuente de datos | Catálogo curado (80 pelis) o búsqueda en TMDb. |
| Ranking por compatibilidad | Las películas se ordenan por cuántos filtros cumplen, no alfabéticamente. |
| Favoritos | Marca una peli con ★ y la encuentras en su pestaña. |
| Lista de vistas | Las películas marcadas como vistas dejan de aparecer en recomendaciones. |
| Modo Ruleta | Cuando no sabes qué ver, deja que el azar elija con filtros mínimos. |
| Compartir por enlace | Genera una URL con `?film=ID` que al abrirse muestra la peli directamente. |
| Diseño responsive | Adaptado a móvil. |

### Estructura

```
filmpick/
├── index.html              # Página principal
├── README.md
├── css/
│   └── styles.css          # Estilos
├── js/
│   ├── app.js              # Lógica principal: filtros, búsqueda, render
│   ├── storage.js          # Gestión de localStorage
│   └── tmdb.js             # Cliente API TMDb
└── data/
    └── movies.json          # Catálogo curado de 80 películas
```

### Sobre la API key de TMDb

El archivo `js/tmdb.js` lleva una API key pública de demo de TMDb que se ve
en cientos de tutoriales. Funciona, pero para uso real:

1. Regístrate gratis en https://www.themoviedb.org/signup
2. Pide tu API key en https://www.themoviedb.org/settings/api
3. Sustituye la constante `API_KEY` en `js/tmdb.js`.

### Datos del catálogo curado

Cada película incluye: título, título original, año, duración, director,
país, géneros, mood, audiencia objetivo, valoración, sinopsis, póster (URL
TMDb) y plataformas donde se puede ver en España (aproximado a 2025-2026;
las plataformas cambian de catálogo cada mes, así que esto es orientativo).

### Privacidad

Todos los datos se guardan en `localStorage` del navegador. Nada se sube a
ningún servidor (excepto las llamadas a TMDb cuando se elige esa fuente).

### Licencia

Proyecto educativo. Los pósters y metadatos de películas pertenecen a sus
respectivos titulares; TMDb los expone gratuitamente para uso no
comercial.

---

## English

A web app for picking a movie based on real-world criteria (genre,
runtime, who you're watching with, platform, mood, year…). The goal:
putting an end to the endless scroll on Netflix and the like.

### Stack

- **Frontend**: HTML5 + CSS3 + vanilla JavaScript (ES6+, no frameworks).
- **Data**: an in-house curated catalog (`data/movies.json`, 80 movies
  with full metadata) + an online integration with **The Movie Database
  (TMDb) API**.
- **Persistence**: the browser's `localStorage` (multi-user by name, no
  backend).
- **No dependencies**, no `npm install` needed. Opens in any browser.

### How to run it

You have two options:

**Option 1 — Local server (recommended; fixes CORS issues when loading
the JSON)**

```bash
cd filmpick
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

If you have Node:

```bash
npx serve filmpick
```

**Option 2 — Double-click `index.html`**

Works in most browsers, though some may block the local JSON's `fetch()`.
If that happens, use option 1.

### Features

| Feature | Description |
|---|---|
| Simple login | Just a username, saved locally. Multi-user on the same device. |
| Multiple filters | Audience (alone/couple/family/friends), mood, genres, runtime, year, platforms. |
| Dual data source | Curated catalog (80 movies) or search on TMDb. |
| Compatibility ranking | Movies are sorted by how many filters they match, not alphabetically. |
| Favorites | Mark a movie with ★ and find it in its own tab. |
| Watched list | Movies marked as watched stop appearing in recommendations. |
| Roulette mode | When you don't know what to watch, let chance decide with minimal filters. |
| Share via link | Generates a URL with `?film=ID` that shows the movie directly when opened. |
| Responsive design | Adapted for mobile. |

### Structure

```
filmpick/
├── index.html              # Main page
├── README.md
├── css/
│   └── styles.css          # Styles
├── js/
│   ├── app.js              # Main logic: filters, search, rendering
│   ├── storage.js          # localStorage management
│   └── tmdb.js             # TMDb API client
└── data/
    └── movies.json          # Curated catalog of 80 movies
```

### About the TMDb API key

`js/tmdb.js` ships with a public TMDb demo API key that appears in
hundreds of tutorials. It works, but for real use:

1. Sign up for free at https://www.themoviedb.org/signup
2. Request your API key at https://www.themoviedb.org/settings/api
3. Replace the `API_KEY` constant in `js/tmdb.js`.

### Curated catalog data

Each movie includes: title, original title, year, runtime, director,
country, genres, mood, target audience, rating, synopsis, poster (TMDb
URL) and which platforms it's available on in Spain (approximate for
2025-2026; platform catalogs change monthly, so this is just a guide).

### Privacy

All data is stored in the browser's `localStorage`. Nothing is uploaded to
any server (except calls to TMDb when that data source is selected).

### License

Educational project. Movie posters and metadata belong to their
respective rights holders; TMDb provides them free of charge for
non-commercial use.
