// ─────────────────────────────────────────────────────────────
//  Sukalde · i18n (euskera / español / inglés)
//  Traduce SOLO la interfaz. Las recetas son datos en español.
//  Idioma por defecto: español. Se recuerda en localStorage.
// ─────────────────────────────────────────────────────────────
const I18N = {
  es: {
    // <head>
    doc_title: "Sukalde · ¿Qué cocinamos hoy?",
    // navegación
    nav_home: "Inicio",
    foot_copy: "© 2026 Zaloa Madariaga · Todos los derechos reservados",
    nav_tengo: "Con lo que tengo",
    nav_antojo: "A mi gusto",
    // home / hero
    hero_h: 'De tu cocina <span>a la mesa</span>',
    hero_p: "Marca con la tiza lo que tienes o elige a tu gusto lo de hoy. Nosotros ponemos la receta.",
    cta_tengo: "Con lo que tengo",
    cta_antojo: "A mi gusto",
    feat_tengo_h: "Con lo que tengo",
    feat_tengo_p: "Apunta en la pizarra lo que haya en tu cocina.",
    feat_antojo_h: "La cocina a tu gusto",
    feat_antojo_p: "Elige de la carta lo que te apetece hoy.",
    feat_tuyos_h: "Para los tuyos",
    feat_tuyos_p: "Ajusta las raciones a tus comensales.",
    // vista "con lo que tengo"
    tengo_h: "¿Qué tienes en casa?",
    tengo_p: "Marca con la tiza lo que haya en tu cocina ✎",
    ing_count: "ingredientes apuntados",
    acc_hint_tengo: "Elige qué quieres cocinar y te lo preparo al instante 👇",
    btn_tengo: "Cocinemos →",
    add_ing_ph: "Escribe un ingrediente y pulsa Añadir…",
    add_btn: "Añadir",
    piz_vacia: "Nada apuntado todavía… toca los ingredientes de la pizarra ↓",
    alert_sin_ing: "Marca al menos un ingrediente de la pizarra.",
    // vista "antojo"
    antojo_h: "La cocina a tu gusto",
    antojo_p: "Elige lo que te pide el cuerpo hoy",
    acc_hint_antojo: "Elige qué quieres y te lo sirvo al instante 👇",
    btn_antojo: "Pedir a la cocina →",
    // comensales
    com_label: "Comensales",
    com_sub: "Ajustamos las cantidades",
    persona: "persona",
    personas: "personas",
    // acciones (una / varias / menú)
    acc_una: "Una receta",
    acc_varias: "Muchas recetas",
    acc_menu: "Menú completo",
    // formulario antojo
    f_quien: "¿Para quién?",
    f_quien_ph: "Detalla más… (ej: 3 adultos y 2 niños)",
    f_tiempo: "¿Cuánto tiempo tienes?",
    f_tiempo_ph: "Otro tiempo… (ej: tengo 40 min justos)",
    f_cocina: "Tipo de cocina (opcional)",
    f_cocina_ph: "Otra cocina… (ej: peruana, coreana)",
    f_dieta: "Dieta o estilo (opcional)",
    f_dieta_ph: "Otra dieta o alergia… (ej: sin lactosa)",
    f_apetece: "Hoy me apetece (opcional)",
    f_apetece_ph: "Otro objetivo… (ej: para llevar al trabajo)",
    f_libre: "Cualquier otra cosa que quieras (opcional)",
    f_libre_ph: "ej: que sea barato, con lo que sobró ayer, sin horno, picante de verdad…",
    // grupos / tiempos / cocinas / dietas / objetivos (valores de filtro)
    grupos: ["Para mí solo/a", "En pareja", "En familia", "Para un grupo grande"],
    tiempos: ["Menos de 15 min", "15–30 min", "30–60 min", "Sin prisa (+1h)"],
    tiempos_desc: ["rápido", "medio", "largo", "con calma"],
    cocinas: ["Japonesa", "Griega", "China", "Italiana", "Mexicana", "India", "Vasca", "Tailandesa", "Marroquí", "Francesa", "Mediterránea", "Fácil y casera"],
    dietas: ["Vegana", "Vegetariana", "Comida sana", "Para carnívoros", "Sin gluten", "Baja en carbohidratos", "Amante del queso", "Amante del picante"],
    objetivos: ["Quitar el hambre rápido", "Sorprender a alguien", "Antes de entrenar", "Después de entrenar", "Reconfortante", "Ligero para la noche"],
    // resultados / modal
    cargando: "Removiendo la olla…",
    res_vacio: "No hay recetas para eso.",
    res_varias: "🍱 Recetas para ti",
    res_menu: "📋 Tu menú completo",
    res_una: "🍽️ Tu receta",
    res_basicos: "🧂 También podrías hacer estas, si tienes estos básicos",
    falta_basicos: "Necesitas también",
    menu_entrante: "Primero",
    menu_principal: "Segundo",
    menu_postre: "Postre",
    cargar_mas: "Pedir más recetas",
    todas_vistas: "Ya has visto todas las recetas",
    rm_ingredientes: "Ingredientes",
    rm_preparacion: "Preparación",
    rm_pers: "pers.",
    rm_fav_off: "🤍 Guardar",
    rm_fav_on: "❤️ En favoritos",
    rm_compra: "🛒 A la compra",
    rm_compra_ok: "✓ Añadido",
    // favoritos
    fav_title: "Tus favoritos",
    fav_vacio: 'Aún no has guardado recetas. Pulsa "Guardar" en una receta.',
    // compra
    compra_title: "Lista de la compra",
    compra_add_ph: "Añadir a la lista…",
    compra_vacio: "Tu lista está vacía. Añade ingredientes desde cualquier receta.",
    nav_fav_title: "Favoritos",
    nav_compra_title: "Lista de la compra",
    nav_mis_title: "Mis recetas",
    // errores
    err_conexion: "No se pudo conectar con api/receta.php. Abre la app desde http://localhost/sukalde/ con Apache encendido (no como archivo file://).",
    err_servidor: "El servidor respondió con error ",
    err_respuesta: "La respuesta del servidor no es válida (revisa api/receta.php).",
    err_local: "No se pudo generar la receta (falta js/recetario.js).",
    // admin.html
    adm_title: "Sukalde · Mis recetas",
    adm_lema: "Mis recetas",
    adm_volver: "← Volver a la app",
    adm_crear_h: "Crear una receta nueva",
    adm_crear_sub: "Se guardará en tu base de datos y aparecerá en las búsquedas de la app.",
    adm_l_titulo: "Título *",
    adm_ph_titulo: "ej: Lentejas de mi abuela",
    adm_l_desc: "Descripción",
    adm_ph_desc: "Una frase corta y apetecible",
    adm_l_tiempo: "Tiempo",
    adm_ph_tiempo: "ej: 45 min",
    adm_l_min: "Minutos (nº)",
    adm_l_dif: "Dificultad",
    adm_dif_facil: "Fácil",
    adm_dif_media: "Media",
    adm_dif_dificil: "Difícil",
    adm_l_raciones: "Raciones base",
    adm_l_cocina: "Cocina",
    adm_ph_cocina: "ej: Vasca, Italiana…",
    adm_l_plato: "Tipo de plato",
    adm_plato_entrante: "Entrante",
    adm_plato_principal: "Principal",
    adm_plato_postre: "Postre",
    adm_l_ings: "Ingredientes (uno por línea)",
    adm_hint_ings: "Escribe cada ingrediente en una línea, con su cantidad delante.",
    adm_l_pasos: "Pasos (uno por línea)",
    adm_hint_pasos: "Un paso por línea, en orden.",
    adm_l_dietas: "Etiquetas / dietas (separadas por comas)",
    adm_ph_dietas: "ej: Para carnívoros, Reconfortante, Sin gluten",
    adm_l_consejo: "Consejo del chef",
    adm_ph_consejo: "Un truco para que salga perfecta",
    adm_guardar: "Guardar receta 💾",
    adm_ok: "¡Receta guardada! ✓",
    adm_err_guardar: "No se pudo guardar.",
    adm_err_conexion: "Error de conexión. ¿Está MySQL encendido?",
    adm_mias_h: "Tus recetas guardadas",
    adm_mias_vacio: "Aún no has creado ninguna receta.",
    adm_ph_ings_text: "300 g de lentejas\n1 cebolla\n2 zanahorias\n1 chorizo",
    adm_ph_pasos_text: "Pon las lentejas a remojo la noche anterior.\nSofríe la cebolla y la zanahoria.\nAñade las lentejas y cubre con agua.\nCuece 40 minutos a fuego lento."
  },

  eu: {
    doc_title: "Sukalde · Zer prestatuko dugu gaur?",
    nav_home: "Hasiera",
    foot_copy: "© 2026 Zaloa Madariaga · Eskubide guztiak erreserbatuta",
    nav_tengo: "Daukadanarekin",
    nav_antojo: "Nire gogoaren arabera",
    hero_h: 'Zure sukaldetik <span>mahaira</span>',
    hero_p: "Markatu klarionaz daukazuna edo aukeratu eguneko gogoa. Guk jartzen dugu errezeta.",
    cta_tengo: "Daukadanarekin",
    cta_antojo: "Nire gogoaren arabera",
    feat_tengo_h: "Daukadanarekin",
    feat_tengo_p: "Idatzi arbelean sukaldean daukazuna.",
    feat_antojo_h: "Sukaldea zure gustura",
    feat_antojo_p: "Aukeratu kartan gaur gozatu nahi duzuna.",
    feat_tuyos_h: "Zureentzat",
    feat_tuyos_p: "Egokitu errazioak mahaikideen arabera.",
    tengo_h: "Zer daukazu etxean?",
    tengo_p: "Markatu klarionaz sukaldean daukazuna ✎",
    ing_count: "osagai apuntatuta",
    acc_hint_tengo: "Aukeratu zer prestatu nahi duzun eta berehala egingo dizut 👇",
    btn_tengo: "Sukal dezagun →",
    add_ing_ph: "Idatzi osagai bat eta sakatu Gehitu…",
    add_btn: "Gehitu",
    piz_vacia: "Oraindik ezer apuntatu gabe… ukitu arbeleko osagaiak ↓",
    alert_sin_ing: "Markatu arbeleko osagai bat gutxienez.",
    antojo_h: "Sukaldea zure gustura",
    antojo_p: "Aukeratu gorputzak gaur eskatzen dizuna",
    acc_hint_antojo: "Aukeratu zer nahi duzun eta berehala zerbitzatuko dizut 👇",
    btn_antojo: "Eskatu sukaldeari →",
    com_label: "Mahaikideak",
    com_sub: "Kantitateak egokitzen ditugu",
    persona: "pertsona",
    personas: "pertsona",
    acc_una: "Errezeta bat",
    acc_varias: "Errezeta asko",
    acc_menu: "Menu osoa",
    f_quien: "Norentzat?",
    f_quien_ph: "Zehaztu gehiago… (adib: 3 heldu eta 2 ume)",
    f_tiempo: "Zenbat denbora duzu?",
    f_tiempo_ph: "Beste denbora bat… (adib: 40 min justu ditut)",
    f_cocina: "Sukaldaritza mota (aukerakoa)",
    f_cocina_ph: "Beste sukaldaritza bat… (adib: perutarra, korearra)",
    f_dieta: "Dieta edo estiloa (aukerakoa)",
    f_dieta_ph: "Beste dieta edo alergia bat… (adib: laktosarik gabe)",
    f_apetece: "Gaur hau dut gogoko (aukerakoa)",
    f_apetece_ph: "Beste helburu bat… (adib: lanera eramateko)",
    f_libre: "Nahi duzun beste edozer (aukerakoa)",
    f_libre_ph: "adib: merkea izan dadila, atzoko soberakinekin, labe gabe, benetan mingotsa…",
    grupos: ["Niretzat bakarrik", "Bikotean", "Familian", "Talde handi batentzat"],
    tiempos: ["15 min baino gutxiago", "15–30 min", "30–60 min", "Presarik gabe (+1 ord)"],
    tiempos_desc: ["azkarra", "ertaina", "luzea", "lasai"],
    cocinas: ["Japoniarra", "Greziarra", "Txinatarra", "Italiarra", "Mexikarra", "Indiarra", "Euskalduna", "Thailandiarra", "Marokoarra", "Frantsesa", "Mediterraneoa", "Erraza eta etxekoa"],
    dietas: ["Veganoa", "Begetarianoa", "Janari osasuntsua", "Haragijaleentzat", "Glutenik gabe", "Karbohidrato gutxikoa", "Gaztazalea", "Mingotszalea"],
    objetivos: ["Gosea azkar kendu", "Norbait harritu", "Entrenatu aurretik", "Entrenatu ostean", "Gozagarria", "Arina gauerako"],
    cargando: "Eltzea irabiatzen…",
    res_vacio: "Ez dago errezetarik horretarako.",
    cargar_mas: "Errezeta gehiago eskatu",
    todas_vistas: "Errezeta guztiak ikusi dituzu",
    res_varias: "🍱 Zuretzako errezetak",
    res_menu: "📋 Zure menu osoa",
    res_basicos: "🧂 Hauek ere egin ditzakezu, oinarrizko hauek badituzu",
    falta_basicos: "Hau ere behar duzu",
    res_una: "🍽️ Zure errezeta",
    menu_entrante: "Lehena",
    menu_principal: "Bigarrena",
    menu_postre: "Postrea",
    rm_ingredientes: "Osagaiak",
    rm_preparacion: "Prestaketa",
    rm_pers: "lag.",
    rm_fav_off: "🤍 Gorde",
    rm_fav_on: "❤️ Gogokoetan",
    rm_compra: "🛒 Erosketara",
    rm_compra_ok: "✓ Gehituta",
    fav_title: "Zure gogokoak",
    fav_vacio: 'Oraindik ez duzu errezetarik gorde. Sakatu "Gorde" errezeta batean.',
    compra_title: "Erosketa zerrenda",
    compra_add_ph: "Zerrendara gehitu…",
    compra_vacio: "Zure zerrenda hutsik dago. Gehitu osagaiak edozein errezetatik.",
    nav_fav_title: "Gogokoak",
    nav_compra_title: "Erosketa zerrenda",
    nav_mis_title: "Nire errezetak",
    err_conexion: "Ezin izan da api/receta.php-rekin konektatu. Ireki app-a http://localhost/sukalde/ helbidetik Apache piztuta (ez file:// fitxategi gisa).",
    err_servidor: "Zerbitzariak errorea eman du: ",
    err_respuesta: "Zerbitzariaren erantzuna ez da baliozkoa (begiratu api/receta.php).",
    err_local: "Ezin izan da errezeta sortu (js/recetario.js falta da).",
    adm_title: "Sukalde · Nire errezetak",
    adm_lema: "Nire errezetak",
    adm_volver: "← Itzuli app-era",
    adm_crear_h: "Errezeta berri bat sortu",
    adm_crear_sub: "Zure datu-basean gordeko da eta app-aren bilaketetan agertuko da.",
    adm_l_titulo: "Izenburua *",
    adm_ph_titulo: "adib: Amonaren dilistak",
    adm_l_desc: "Deskribapena",
    adm_ph_desc: "Esaldi labur eta gozagarria",
    adm_l_tiempo: "Denbora",
    adm_ph_tiempo: "adib: 45 min",
    adm_l_min: "Minutuak (zenb.)",
    adm_l_dif: "Zailtasuna",
    adm_dif_facil: "Erraza",
    adm_dif_media: "Ertaina",
    adm_dif_dificil: "Zaila",
    adm_l_raciones: "Oinarrizko errazioak",
    adm_l_cocina: "Sukaldaritza",
    adm_ph_cocina: "adib: Euskalduna, Italiarra…",
    adm_l_plato: "Plater mota",
    adm_plato_entrante: "Sarrera",
    adm_plato_principal: "Nagusia",
    adm_plato_postre: "Postrea",
    adm_l_ings: "Osagaiak (bana lerroko)",
    adm_hint_ings: "Idatzi osagai bakoitza lerro batean, kantitatea aurretik duela.",
    adm_l_pasos: "Urratsak (bana lerroko)",
    adm_hint_pasos: "Urrats bat lerroko, ordenan.",
    adm_l_dietas: "Etiketak / dietak (komaz bereizita)",
    adm_ph_dietas: "adib: Haragijaleentzat, Gozagarria, Glutenik gabe",
    adm_l_consejo: "Sukaldariaren aholkua",
    adm_ph_consejo: "Trikimailu bat ezin hobeto ateratzeko",
    adm_guardar: "Gorde errezeta 💾",
    adm_ok: "Errezeta gordeta! ✓",
    adm_err_guardar: "Ezin izan da gorde.",
    adm_err_conexion: "Konexio errorea. MySQL piztuta dago?",
    adm_mias_h: "Gordetako zure errezetak",
    adm_mias_vacio: "Oraindik ez duzu errezetarik sortu.",
    adm_ph_ings_text: "300 g dilista\n1 tipula\n2 azenario\n1 txorizo",
    adm_ph_pasos_text: "Jarri dilistak bezperan beratzen.\nGorritu tipula eta azenarioa.\nGehitu dilistak eta estali urez.\nEgosi 40 minutuz su motelean."
  },

  en: {
    doc_title: "Sukalde · What shall we cook today?",
    nav_home: "Home",
    foot_copy: "© 2026 Zaloa Madariaga · All rights reserved",
    nav_tengo: "With what I have",
    nav_antojo: "What I fancy",
    hero_h: 'From your kitchen <span>to the table</span>',
    hero_p: "Chalk up what you have or pick today's craving. We bring the recipe.",
    cta_tengo: "With what I have",
    cta_antojo: "What I fancy",
    feat_tengo_h: "With what I have",
    feat_tengo_p: "Jot down on the board whatever is in your kitchen.",
    feat_antojo_h: "The kitchen, your way",
    feat_antojo_p: "Pick from the menu what you feel like today.",
    feat_tuyos_h: "For your people",
    feat_tuyos_p: "Adjust the portions to your guests.",
    tengo_h: "What do you have at home?",
    tengo_p: "Chalk up whatever is in your kitchen ✎",
    ing_count: "ingredients noted",
    acc_hint_tengo: "Choose what you want to cook and I'll make it right away 👇",
    btn_tengo: "Let's cook →",
    add_ing_ph: "Type an ingredient and press Add…",
    add_btn: "Add",
    piz_vacia: "Nothing noted yet… tap the ingredients on the board ↓",
    alert_sin_ing: "Mark at least one ingredient on the board.",
    antojo_h: "The kitchen, your way",
    antojo_p: "Pick what your body is asking for today",
    acc_hint_antojo: "Choose what you want and I'll serve it right away 👇",
    btn_antojo: "Order from the kitchen →",
    com_label: "Guests",
    com_sub: "We adjust the quantities",
    persona: "person",
    personas: "people",
    acc_una: "One recipe",
    acc_varias: "Many recipes",
    acc_menu: "Full menu",
    f_quien: "Who is it for?",
    f_quien_ph: "Add detail… (e.g. 3 adults and 2 kids)",
    f_tiempo: "How much time do you have?",
    f_tiempo_ph: "Another time… (e.g. I have exactly 40 min)",
    f_cocina: "Type of cuisine (optional)",
    f_cocina_ph: "Another cuisine… (e.g. Peruvian, Korean)",
    f_dieta: "Diet or style (optional)",
    f_dieta_ph: "Another diet or allergy… (e.g. lactose-free)",
    f_apetece: "Today I fancy (optional)",
    f_apetece_ph: "Another goal… (e.g. to take to work)",
    f_libre: "Anything else you'd like (optional)",
    f_libre_ph: "e.g. make it cheap, with yesterday's leftovers, no oven, properly spicy…",
    grupos: ["Just for me", "As a couple", "For the family", "For a big group"],
    tiempos: ["Under 15 min", "15–30 min", "30–60 min", "No rush (+1h)"],
    tiempos_desc: ["quick", "medium", "long", "easy"],
    cocinas: ["Japanese", "Greek", "Chinese", "Italian", "Mexican", "Indian", "Basque", "Thai", "Moroccan", "French", "Mediterranean", "Easy home cooking"],
    dietas: ["Vegan", "Vegetarian", "Healthy food", "For meat lovers", "Gluten-free", "Low-carb", "Cheese lover", "Spice lover"],
    objetivos: ["Beat hunger fast", "Impress someone", "Before training", "After training", "Comfort food", "Light for the evening"],
    cargando: "Stirring the pot…",
    res_vacio: "No recipes for that.",
    cargar_mas: "Ask for more recipes",
    todas_vistas: "You've seen all the recipes",
    res_varias: "🍱 Recipes for you",
    res_menu: "📋 Your full menu",
    res_basicos: "🧂 You could also make these, if you have these staples",
    falta_basicos: "You also need",
    res_una: "🍽️ Your recipe",
    menu_entrante: "Starter",
    menu_principal: "Main course",
    menu_postre: "Dessert",
    rm_ingredientes: "Ingredients",
    rm_preparacion: "Preparation",
    rm_pers: "ppl",
    rm_fav_off: "🤍 Save",
    rm_fav_on: "❤️ In favourites",
    rm_compra: "🛒 To shopping list",
    rm_compra_ok: "✓ Added",
    fav_title: "Your favourites",
    fav_vacio: 'You haven\'t saved any recipes yet. Tap "Save" on a recipe.',
    compra_title: "Shopping list",
    compra_add_ph: "Add to the list…",
    compra_vacio: "Your list is empty. Add ingredients from any recipe.",
    nav_fav_title: "Favourites",
    nav_compra_title: "Shopping list",
    nav_mis_title: "My recipes",
    err_conexion: "Couldn't connect to api/receta.php. Open the app from http://localhost/sukalde/ with Apache running (not as a file://).",
    err_servidor: "The server responded with error ",
    err_respuesta: "The server response is not valid (check api/receta.php).",
    err_local: "Couldn't generate the recipe (js/recetario.js is missing).",
    adm_title: "Sukalde · My recipes",
    adm_lema: "My recipes",
    adm_volver: "← Back to the app",
    adm_crear_h: "Create a new recipe",
    adm_crear_sub: "It will be saved in your database and appear in the app's searches.",
    adm_l_titulo: "Title *",
    adm_ph_titulo: "e.g. My grandma's lentils",
    adm_l_desc: "Description",
    adm_ph_desc: "A short, appetizing sentence",
    adm_l_tiempo: "Time",
    adm_ph_tiempo: "e.g. 45 min",
    adm_l_min: "Minutes (no.)",
    adm_l_dif: "Difficulty",
    adm_dif_facil: "Easy",
    adm_dif_media: "Medium",
    adm_dif_dificil: "Hard",
    adm_l_raciones: "Base portions",
    adm_l_cocina: "Cuisine",
    adm_ph_cocina: "e.g. Basque, Italian…",
    adm_l_plato: "Dish type",
    adm_plato_entrante: "Starter",
    adm_plato_principal: "Main",
    adm_plato_postre: "Dessert",
    adm_l_ings: "Ingredients (one per line)",
    adm_hint_ings: "Write each ingredient on a line, with its quantity in front.",
    adm_l_pasos: "Steps (one per line)",
    adm_hint_pasos: "One step per line, in order.",
    adm_l_dietas: "Tags / diets (comma-separated)",
    adm_ph_dietas: "e.g. For meat lovers, Comfort food, Gluten-free",
    adm_l_consejo: "Chef's tip",
    adm_ph_consejo: "A trick to make it come out perfect",
    adm_guardar: "Save recipe 💾",
    adm_ok: "Recipe saved! ✓",
    adm_err_guardar: "Couldn't save.",
    adm_err_conexion: "Connection error. Is MySQL running?",
    adm_mias_h: "Your saved recipes",
    adm_mias_vacio: "You haven't created any recipes yet.",
    adm_ph_ings_text: "300 g lentils\n1 onion\n2 carrots\n1 chorizo",
    adm_ph_pasos_text: "Soak the lentils the night before.\nSauté the onion and carrot.\nAdd the lentils and cover with water.\nSimmer for 40 minutes on low heat."
  }
};

// idioma actual: 1) elección guardada, 2) idioma del navegador, 3) español
let SUKALDE_LANG = (function () {
  try {
    const guardado = localStorage.getItem("sukalde_lang");
    if (guardado && ["eu", "es", "en"].includes(guardado)) return guardado;
  } catch (e) {}
  // idioma del navegador (eu / es / en); cualquier otro → español
  try {
    const nav = (navigator.language || navigator.userLanguage || "es").toLowerCase();
    if (nav.startsWith("eu")) return "eu";
    if (nav.startsWith("en")) return "en";
    if (nav.startsWith("es")) return "es";
  } catch (e) {}
  return "es";
})();

// traduce una clave al idioma actual (con respaldo a español)
function t(key) {
  const dict = I18N[SUKALDE_LANG] || I18N.es;
  const v = dict[key];
  return v != null ? v : (I18N.es[key] != null ? I18N.es[key] : key);
}

// cambia de idioma, persiste y reconstruye la interfaz
function setLang(lang) {
  if (!I18N[lang]) return;
  SUKALDE_LANG = lang;
  try { localStorage.setItem("sukalde_lang", lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.querySelectorAll("#lang-switch button").forEach(b =>
    b.classList.toggle("on", b.dataset.lang === lang)
  );
  if (typeof aplicarIdioma === "function") aplicarIdioma();
}

// marca el botón activo al cargar
document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.lang = SUKALDE_LANG;
  document.querySelectorAll("#lang-switch button").forEach(b =>
    b.classList.toggle("on", b.dataset.lang === SUKALDE_LANG)
  );
});

// ─────────────────────────────────────────────────────────────
//  Traducción de RECETAS al vuelo (título, descripción, ingredientes,
//  pasos, consejo y etiquetas) usando api/traducir.php. Con caché en
//  localStorage por receta+idioma para no repetir llamadas. Si el
//  idioma es español, o no hay servidor/IA, se devuelve la receta tal cual.
// ─────────────────────────────────────────────────────────────
const _TRAD_CACHE_KEY = "sukalde_trad_cache";
function _getTradCache() {
  try { return JSON.parse(localStorage.getItem(_TRAD_CACHE_KEY)) || {}; } catch (e) { return {}; }
}
function _setTradCache(c) {
  try { localStorage.setItem(_TRAD_CACHE_KEY, JSON.stringify(c)); } catch (e) {}
}

// Llama al endpoint de traducción para un lote de textos.
async function _traducirTextos(textos, idioma) {
  try {
    const res = await fetch("api/traducir.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idioma, textos })
    });
    if (!res.ok) return textos;
    const j = await res.json();
    return (j && Array.isArray(j.traducciones) && j.traducciones.length === textos.length)
      ? j.traducciones : textos;
  } catch (e) {
    return textos; // sin servidor (file://) o error → español
  }
}

// Traduce una receta al idioma actual. Devuelve una copia traducida
// (no modifica el original) o la misma receta si el idioma es español.
async function traducirReceta(r) {
  if (!r || SUKALDE_LANG === "es") return r;
  const cache = _getTradCache();
  const clave = SUKALDE_LANG + "::" + (r.titulo || "");
  if (cache[clave]) return Object.assign({}, r, cache[clave], { _es: r });

  // Aplanamos los campos a traducir en un solo lote (orden conocido).
  const ings = r.ingredientes || [];
  const pasos = r.pasos || [];
  const tags = r.etiquetas || [];
  const lote = [r.titulo || "", r.descripcion || "", r.consejo || ""]
    .concat(ings, pasos, tags);

  const out = await _traducirTextos(lote, SUKALDE_LANG);

  let k = 0;
  const trad = {
    titulo: out[k++], descripcion: out[k++], consejo: out[k++],
    ingredientes: out.slice(k, k += ings.length),
    pasos: out.slice(k, k += pasos.length),
    etiquetas: out.slice(k, k += tags.length)
  };
  cache[clave] = trad;
  _setTradCache(cache);
  return Object.assign({}, r, trad, { _es: r });
}

// Traduce una lista de recetas en paralelo.
async function traducirRecetas(lista) {
  if (!Array.isArray(lista) || SUKALDE_LANG === "es") return lista;
  return Promise.all(lista.map(traducirReceta));
}
