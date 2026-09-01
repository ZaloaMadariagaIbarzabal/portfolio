# 🍳 Sukalde — Errezeta-aplikazioa datu-basearekin (XAMPP)

**[Euskara](#euskara) · [Castellano](#castellano) · [English](#english)**

---

## Euskara

PHP + MySQL + JavaScript bidez egindako errezeta-aplikazioa. XAMPP-en
funtzionatzen du.

### Zer egiten du

- **Daukadanarekin**: osagai-katalogoa; benetan daukazunarekin (+
  oinarrizkoak) presta ditzakezun errezetak bakarrik proposatzen ditu.
  Datu-basean bat ere ez badago, **sortzaile logiko** batek zure osagaiak
  konbinatuz bat sortzen du.
- **Nire gogoaren arabera**: jangura, denbora, sukaldaritza mota, dieta eta
  helburuaren arabera iragazten du (testu-eremuekin pertsonalizatzeko).
- Hiru irteera: errezeta bat / hainbat errezeta / menu osoa (lehen plater +
  bigarren plater + postrea).
- Gogokoak eta erosketa-zerrenda.
- **Nire errezetak** (➕ botoia): zure errezeta propioak sortzeko, ikusteko
  eta ezabatzeko panela, MySQLn gordetzen direnak eta bilaketetan agertzen
  direnak.

### Instalazioa (XAMPP)

1. Kopiatu `sukalde` karpeta `htdocs`-en (adib. `E:\htdocs\sukalde`).
2. Abiarazi **Apache** eta **MySQL** XAMPP paneletik (biak berdez).
3. Sortu datu-basea: ireki `http://localhost/phpmyadmin`, joan **Inportatu**
   fitxara, eta igo lehenengo `database.sql` eta gero `datos_iniciales.sql`.
4. Ireki aplikazioa `http://localhost/sukalde/` helbidean.

> Zure MySQLren datuak XAMPPren lehenetsiak (`root` erabiltzailea, pasahitzik
> gabe) ez badira, editatu `api/db.php` fitxategian.

### Datu-baserik gabe ere funtzionatzen du

MySQL eskuragarri ez badago, aplikazioak barneko 38 errezetako errezetategi
batekin eta sortzaile logikoarekin funtzionatzen jarraitzen du. Datu-baseak
soilik gehitzen ditu: errezeta ugariagoak eta zeureak sortzeko aukera.

### AI bidezko errezetak (aukerakoa)

`api/config.php`-n Anthropic gako bat jartzen baduzu, errezetak AI-ak sortzen
ditu gaztelaniaz. Hutsik uzten baduzu, datu-basea / sortzailea erabiltzen da.

### Egitura

```
sukalde/
├── index.html, admin.html        # app eta "Nire errezetak" panela
├── css/style.css, js/app.js
├── api/
│   ├── db.php                 # MySQL konexioa + kontsultak
│   ├── receta.php             # motorra (BD → errezetategia → sortzailea)
│   ├── mis_recetas.php        # zeure errezeten CRUDa
│   ├── generador.php          # errezeten sortzaile logikoa
│   ├── recetario.php          # 38 errezeta babeserako (BDrik gabe)
│   └── config.php             # AI gako aukerakoa
├── database.sql               # taulen eskema
└── datos_iniciales.sql        # 245 errezeta gaztelaniaz BDa betetzeko
```

### Hizkuntzak (euskera / gaztelania / ingelesa)

App-a eleaniztuna da. Hizkuntza lehenetsia nabigatzailearen arabera
hautatzen da (eu/es/en), eta goiko barrako **EU · ES · EN** hautatzailearekin
alda daiteke. Aukera nabigatzailean gogoratzen da.

- **Interfazea** (menuak, botoiak, iragazkiak, gogokoak, erosketa-zerrenda,
  "Nire errezetak" panela) `js/i18n.js`-n dago finko itzulita.
- **Errezetak** euskerara edo ingelesera zuzenean itzultzen dira
  `api/traducir.php`-ren bidez, `api/config.php`-ko AI gakoa berrerabiliz.
  Itzulpena nabigatzailean cacheatzen da deiak ez errepikatzeko. AI gakorik
  edo zerbitzaririk ez badago, errezetak gaztelaniaz erakusten dira (app-ak
  funtzionatzen jarraitzen du).

### Irudien kredituak

Greziar sukaldaritzako argazkia (`img/platos/1599321955726-e048e3f02b86.jpg`)
Pexels-etik dator (lizentzia dohainekoa):
https://www.pexels.com/es-es/foto/comida-griega-34026509/

### 🌐 Demo zuzenean

https://sukalde-zaloamadariaga.netlify.app/

### 📄 Lizentzia

© 2026 Zaloa Madariaga · **Eskubide guztiak erreserbatuta**. Ez da
baimenik gabe kopiatzea, berrerabiltzea edo banatzea onartzen. Ikus
`LICENSE` fitxategia.

---

## Castellano

App de recetas en PHP + MySQL + JavaScript. Funciona en XAMPP.

### Qué hace

- **Con lo que tengo**: catálogo de ingredientes; solo propone recetas que
  puedas cocinar de verdad con lo que tienes (+básicos). Si no hay ninguna
  en la base de datos, un **generador lógico** crea una combinando tus
  ingredientes.
- **Según mi antojo**: filtra por comensales, tiempo, cocina, dieta y
  objetivo (con campos de texto para personalizar).
- Tres salidas: una receta / muchas recetas / menú completo (entrante +
  principal + postre).
- Favoritos y lista de la compra.
- **Mis recetas** (botón ➕): panel para crear, ver y borrar tus propias
  recetas, que se guardan en MySQL y aparecen en las búsquedas.

### Instalación (XAMPP)

1. Copia la carpeta `sukalde` en `htdocs` (ej. `E:\htdocs\sukalde`).
2. Arranca **Apache** y **MySQL** en el panel de XAMPP (los dos en verde).
3. Crea la base de datos: abre `http://localhost/phpmyadmin`, pestaña
   **Importar**, y sube primero `database.sql` y luego
   `datos_iniciales.sql`.
4. Abre la app en `http://localhost/sukalde/`.

> Si los datos de tu MySQL no son los de XAMPP por defecto (usuario `root`,
> sin contraseña), edítalos en `api/db.php`.

### Funciona sin base de datos

Si MySQL no está disponible, la app sigue funcionando con un recetario
interno de 38 recetas + el generador lógico. La base de datos solo añade:
cientos de recetas ampliables y la opción de crear las tuyas.

### Recetas con IA (opcional)

Si pones una clave de Anthropic en `api/config.php`, las recetas las genera
la IA en español. Si la dejas vacía, usa la base de datos / generador.

### Estructura

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
└── datos_iniciales.sql        # 245 recetas en español para poblar la BD
```

### Idiomas (euskera / español / inglés)

La app es trilingüe. El idioma por defecto se elige según el navegador
(eu/es/en) y se puede cambiar con el selector **EU · ES · EN** de la barra
superior. La elección se recuerda en el navegador.

- **La interfaz** (menús, botones, filtros, favoritos, lista de la compra,
  panel "Mis recetas") está traducida de forma fija en `js/i18n.js`.
- **Las recetas** se traducen al vuelo a euskera o inglés mediante
  `api/traducir.php`, que reutiliza la clave de IA de `api/config.php`. La
  traducción se cachea en el navegador para no repetir llamadas. Si no hay
  clave de IA o no hay servidor, las recetas se muestran en español (la app
  sigue funcionando).

### Créditos de imágenes

La foto de cocina griega (`img/platos/1599321955726-e048e3f02b86.jpg`)
procede de Pexels (licencia gratuita):
https://www.pexels.com/es-es/foto/comida-griega-34026509/

### 🌐 Demo en vivo

https://sukalde-zaloamadariaga.netlify.app/

### 📄 Licencia

© 2026 Zaloa Madariaga · **Todos los derechos reservados**. No se permite
copiar, reutilizar ni distribuir este código sin permiso previo y por
escrito de la autora. Ver archivo `LICENSE`.

---

## English

Recipe app built with PHP + MySQL + JavaScript. Runs on XAMPP.

### What it does

- **With what I have**: an ingredient catalog; it only suggests recipes you
  can actually cook with what you have (+ pantry staples). If none exist in
  the database, a **logic-based generator** creates one by combining your
  ingredients.
- **To my taste**: filters by number of diners, time, cuisine, diet and
  goal (with free-text fields for customisation).
- Three output modes: a single recipe / several recipes / a full menu
  (starter + main + dessert).
- Favorites and a shopping list.
- **My recipes** (➕ button): a panel to create, view and delete your own
  recipes, which are saved in MySQL and show up in searches.

### Installation (XAMPP)

1. Copy the `sukalde` folder into `htdocs` (e.g. `E:\htdocs\sukalde`).
2. Start **Apache** and **MySQL** in the XAMPP control panel (both green).
3. Create the database: open `http://localhost/phpmyadmin`, go to the
   **Import** tab, and upload `database.sql` first, then
   `datos_iniciales.sql`.
4. Open the app at `http://localhost/sukalde/`.

> If your MySQL credentials aren't the XAMPP defaults (`root` user, no
> password), edit them in `api/db.php`.

### Works without a database

If MySQL isn't available, the app keeps working with a built-in recipe book
of 38 recipes plus the logic-based generator. The database only adds:
hundreds of expandable recipes and the option to create your own.

### AI-generated recipes (optional)

If you add an Anthropic API key in `api/config.php`, recipes are generated
by AI in Spanish. If left empty, it uses the database / generator instead.

### Structure

```
sukalde/
├── index.html, admin.html        # app and the "My recipes" panel
├── css/style.css, js/app.js
├── api/
│   ├── db.php                 # MySQL connection + queries
│   ├── receta.php             # engine (DB → recipe book → generator)
│   ├── mis_recetas.php        # CRUD for your own recipes
│   ├── generador.php          # logic-based recipe generator
│   ├── recetario.php          # 38 fallback recipes (no DB needed)
│   └── config.php             # optional AI key
├── database.sql               # table schema
└── datos_iniciales.sql        # 245 recipes in Spanish to seed the DB
```

### Languages (Basque / Spanish / English)

The app is trilingual. The default language is chosen based on the
browser (eu/es/en) and can be changed with the **EU · ES · EN** selector in
the top bar. The choice is remembered in the browser.

- **The interface** (menus, buttons, filters, favorites, shopping list, "My
  recipes" panel) is statically translated in `js/i18n.js`.
- **Recipes** are translated on the fly into Basque or English via
  `api/traducir.php`, which reuses the AI key from `api/config.php`. The
  translation is cached in the browser to avoid repeating calls. If there's
  no AI key or no server, recipes are shown in Spanish (the app keeps
  working).

### Image credits

The Greek food photo (`img/platos/1599321955726-e048e3f02b86.jpg`) comes
from Pexels (free license):
https://www.pexels.com/es-es/foto/comida-griega-34026509/

### 🌐 Live demo

https://sukalde-zaloamadariaga.netlify.app/

### 📄 License

© 2026 Zaloa Madariaga · **All rights reserved**. Copying, reusing or
distributing this code without prior written permission from the author is
not allowed. See the `LICENSE` file.
