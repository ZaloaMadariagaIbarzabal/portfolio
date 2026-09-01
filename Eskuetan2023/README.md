# Eskuetan · versión React

Migración de la tienda **Eskuetan** (originalmente vanilla JS, un único
`index.html` con vistas mostradas/ocultadas por JS) a una **SPA en React 19 +
Vite + React Router**, manteniendo el mismo diseño visual (paleta "chapa de
Bilbo", tipografías Alfa Slab One / DM Serif Display / Caveat) y las mismas
funcionalidades: catálogo con filtros, ficha de producto, carrito, favoritos,
login/registro simulado, formulario de venta y sección "Sobre nosotros",
todo en ES/EU/EN.

## Por qué esta versión demuestra más para un dossier de DAW

| Concepto | Versión vanilla JS | Versión React |
|---|---|---|
| Navegación | `showView()` oculta/muestra `<div>` con `display:none` | **React Router** (`/catalogo`, `/producto/:id`, `/carrito`...) con URLs reales, historial del navegador y `useSearchParams` |
| Estado | Variables globales (`let cart = []`) y `innerHTML` manual | **Hooks** (`useState`, `useMemo`, `useCallback`) + **Context API** (`ShopContext`) |
| Persistencia | `localStorage` leído/escrito a mano en cada función | Persistencia centralizada en el contexto vía `useEffect` |
| Renderizado | Reconstrucción manual de HTML con template strings | Renderizado declarativo por componentes (`ProductCard`, `Navbar`...) |
| Reutilización | Funciones sueltas (`productCardHTML`, `renderProducts`...) | Componentes reutilizables e importables |
| Datos | Embebidos dentro del `<script>` del HTML | Separados en módulos (`data/products.js`, `data/translations.js`) |

## Estructura del proyecto

```
eskuetan-react/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/           # mural_banner.jpg, chapa_fondo.jpg
└── src/
    ├── main.jsx          # punto de entrada, monta <BrowserRouter>
    ├── App.jsx           # define todas las rutas
    ├── index.css         # estilos (extraídos del original, mismas variables CSS)
    ├── context/
    │   └── ShopContext.jsx   # idioma, carrito, favoritos, toasts (con localStorage)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Marquee.jsx
    │   ├── Footer.jsx
    │   ├── Toast.jsx
    │   └── ProductCard.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Catalog.jsx       # filtros por categoría, talla, precio, orden y búsqueda
    │   ├── ProductDetail.jsx
    │   ├── Cart.jsx
    │   ├── Wishlist.jsx
    │   ├── Login.jsx
    │   ├── Sell.jsx
    │   └── About.jsx
    └── data/
        ├── products.js       # catálogo (43 productos, trilingüe)
        ├── translations.js   # diccionario i18n ES/EU/EN
        ├── imageMap.js       # mapa producto → URL de imagen
        └── pImg.js           # helper con fallback de imagen
```

## Cómo ejecutarlo

```bash
npm install
npm run dev       # http://localhost:5173
```

Para generar la build de producción:

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente para comprobarla
```

El proyecto ya se ha compilado y verificado (`npm run build` sin errores)
antes de entregarlo.

## Posibles ampliaciones (para seguir subiendo nivel de cara al dossier)

- Sustituir el `login`/`registro` simulado por autenticación real (JWT +
  backend en Node/Express o PHP).
- Mover `products.js` a una API REST propia (fetch + `useEffect`, o
  React Query) en vez de un array estático importado.
- Tests con **Vitest** + **React Testing Library** para `ShopContext` y
  componentes clave (carrito, filtros).
- Desplegar en Netlify/Vercel y enlazar la demo, igual que ya tienes con
  la versión vanilla.

## Licencia

© 2026 Zaloa Madariaga. Igual que el proyecto original, todos los derechos
reservados; uso educativo para el dossier de DAW.
