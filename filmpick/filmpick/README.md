# FilmPick

Aplicación web para elegir película en función de criterios reales (género, duración, con quién la ves, plataforma, estado de ánimo, año…). El objetivo: terminar con el scroll infinito de Netflix y compañía.

## Stack

- **Frontend**: HTML5 + CSS3 + JavaScript vanilla (ES6+, sin frameworks).
- **Datos**: catálogo curado propio (`data/movies.json`, 80 películas con metadatos completos) + integración online con **The Movie Database (TMDb) API**.
- **Persistencia**: `localStorage` del navegador (multi-usuario por nombre, sin backend).
- **Sin dependencias** ni `npm install`. Se abre en cualquier navegador.

## Cómo ejecutar

Tienes dos opciones:

### Opción 1 — Servidor local (recomendado, soluciona CORS al cargar el JSON)

```bash
cd cinepicker
python3 -m http.server 8000
```

Y abre `http://localhost:8000` en el navegador.

Si tienes Node:

```bash
npx serve cinepicker
```

### Opción 2 — Doble clic en `index.html`

Funciona en la mayoría de navegadores, aunque algunos pueden bloquear el `fetch()` del JSON local. Si pasa, usa la opción 1.

## Funcionalidades

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

## Estructura

```
cinepicker/
├── index.html              # Página principal
├── README.md
├── css/
│   └── styles.css          # Estilos
├── js/
│   ├── app.js              # Lógica principal: filtros, búsqueda, render
│   ├── storage.js          # Gestión de localStorage
│   └── tmdb.js             # Cliente API TMDb
└── data/
    └── movies.json         # Catálogo curado de 80 películas
```

## Sobre la API key de TMDb

El archivo `js/tmdb.js` lleva una API key pública de demo de TMDb que se ve en cientos de tutoriales. Funciona, pero para uso real:

1. Regístrate gratis en https://www.themoviedb.org/signup
2. Pide tu API key en https://www.themoviedb.org/settings/api
3. Sustituye la constante `API_KEY` en `js/tmdb.js`.

## Datos del catálogo curado

Cada película incluye: título, título original, año, duración, director, país, géneros, mood, audiencia objetivo, valoración, sinopsis, póster (URL TMDb) y plataformas donde se puede ver en España (aproximado a 2025-2026; las plataformas cambian de catálogo cada mes, así que esto es orientativo).

## Privacidad

Todos los datos se guardan en `localStorage` del navegador. Nada se sube a ningún servidor (excepto las llamadas a TMDb cuando se elige esa fuente).

## Licencia

Proyecto educativo. Los pósters y metadatos de películas pertenecen a sus respectivos titulares; TMDb los expone gratuitamente para uso no comercial.

## 🌐 Demo en vivo

https://filmpick-zaloamadariaga.netlify.app/

## 📄 Licencia

© 2026 Zaloa Madariaga · **Todos los derechos reservados**. No se permite
copiar, reutilizar ni distribuir este código sin permiso previo y por
escrito de la autora. Ver archivo `LICENSE`.
