# 🍳 Sukalde — App de cocina con base de datos (XAMPP)

App de recetas en PHP + MySQL + JavaScript. Funciona en XAMPP igual que BidaiApp.

## Qué hace
- **Con lo que tengo**: catálogo de ingredientes; solo propone recetas que puedas cocinar de verdad con lo que tienes (+básicos). Si no hay ninguna en la base de datos, un **generador lógico** crea una combinando tus ingredientes.
- **Según mi antojo**: filtra por comensales, tiempo, cocina, dieta y objetivo (con campos de texto para personalizar).
- Tres salidas: una receta / muchas recetas / menú completo (entrante+principal+postre).
- Favoritos y lista de la compra.
- **Mis recetas** (botón ➕): panel para crear, ver y borrar tus propias recetas, que se guardan en MySQL y aparecen en las búsquedas.

## Instalación (XAMPP)
1. Copia la carpeta `sukalde` en `htdocs` (ej. `E:\htdocs\sukalde`).
2. Arranca **Apache** y **MySQL** en el panel de XAMPP (los dos en verde).
3. Crea la base de datos: abre `http://localhost/phpmyadmin`, pestaña **Importar**, y sube primero `database.sql` y luego `datos_iniciales.sql`.
4. Abre la app en `http://localhost/sukalde/`.

> Si los datos de tu MySQL no son los de XAMPP por defecto (usuario `root`, sin contraseña), edítalos en `api/db.php`.

## Funciona sin base de datos
Si MySQL no está disponible, la app sigue funcionando con un recetario interno de 38 recetas + el generador lógico. La base de datos solo añade: cientos de recetas ampliables y la opción de crear las tuyas.

## Recetas con IA (opcional)
Si pones una clave de Anthropic en `api/config.php`, las recetas las genera la IA en español. Si la dejas vacía, usa la base de datos / generador.

## Estructura
```
sukalde/
├── index.html, admin.html        # app y panel "Mis recetas"
├── css/style.css, js/app.js
├── api/
│   ├── db.php                 # conexión MySQL + consultas
│   ├── receta.php             # motor (BD → recetario → generador)
│   ├── mis_recetas.php        # CRUD de recetas propias
│   ├── generador.php          # generador lógico de recetas
│   ├── recetario.php          # 38 recetas de respaldo (sin BD)
│   └── config.php             # clave IA opcional
├── database.sql               # esquema de tablas
└── datos_iniciales.sql            # 245 recetas en español para poblar la BD
```

## Idiomas (euskera / español / inglés)
La app es trilingüe. El idioma por defecto se elige según el navegador (eu/es/en)
y se puede cambiar con el selector **EU · ES · EN** de la barra superior. La elección
se recuerda en el navegador.

- **La interfaz** (menús, botones, filtros, favoritos, lista de la compra, panel
  "Mis recetas") está traducida de forma fija en `js/i18n.js`.
- **Las recetas** se traducen al vuelo a euskera o inglés mediante `api/traducir.php`,
  que reutiliza la clave de IA de `api/config.php`. La traducción se cachea en el
  navegador para no repetir llamadas. Si no hay clave de IA o no hay servidor, las
  recetas se muestran en español (la app sigue funcionando).

## Créditos de imágenes

La foto de cocina griega (`img/platos/1599321955726-e048e3f02b86.jpg`) procede de
Pexels (licencia gratuita): https://www.pexels.com/es-es/foto/comida-griega-34026509/

## 🌐 Demo en vivo

https://sukalde-zaloamadariaga.netlify.app/

## 📄 Licencia

© 2026 Zaloa Madariaga · **Todos los derechos reservados**. No se permite
copiar, reutilizar ni distribuir este código sin permiso previo y por
escrito de la autora. Ver archivo `LICENSE`.
