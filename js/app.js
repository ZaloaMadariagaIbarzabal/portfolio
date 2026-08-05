// ─────────────────────────────────────────────────────────────
//  Sukalde · diseño "Pizarra de bistró" (app-C) + backend real
// ─────────────────────────────────────────────────────────────
const COCINAS = ["Japonesa","Griega","China","Italiana","Mexicana","India","Vasca","Tailandesa","Marroquí","Francesa","Mediterránea","Fácil y casera"];
const DIETAS = ["Vegana","Vegetariana","Comida sana","Para carnívoros","Sin gluten","Baja en carbohidratos","Amante del queso","Amante del picante"];
const OBJETIVOS = [
  {k:"Quitar el hambre rápido",e:"⚡",img:"1551782450-a2132b4ba21d"},
  {k:"Sorprender a alguien",e:"✨",img:"1577219491135-ce391730fb2c"},
  {k:"Antes de entrenar",e:"🏃",img:"1546069901-ba9599a7e63c"},
  {k:"Después de entrenar",e:"💪",img:"1432139555190-58524dae6a55"},
  {k:"Reconfortante / comfort food",e:"🫕",img:"1547592180-85f173990554"},
  {k:"Ligero para la noche",e:"🌙",img:"1512621776951-a57141f2eefd"}
];
const GRUPOS = ["Para mí solo/a","En pareja","En familia","Para un grupo grande"];
const TIEMPOS = ["Menos de 15 min","15–30 min","30–60 min","Sin prisa (+1h)"];

// ── i18n de etiquetas de filtros (valor interno en español, etiqueta traducida) ──
function lblCocina(v){const i=COCINAS.indexOf(v);return i<0?v:t('cocinas')[i];}
function lblDieta(v){const i=DIETAS.indexOf(v);return i<0?v:t('dietas')[i];}
function lblGrupo(v){const i=GRUPOS.indexOf(v);return i<0?v:t('grupos')[i];}
function lblTiempo(v){const i=TIEMPOS.indexOf(v);return i<0?v:t('tiempos')[i];}
function lblObjetivo(v){const i=OBJETIVOS.findIndex(o=>o.k===v);return i<0?v:t('objetivos')[i];}

// Catálogo de ingredientes por categoría (con foto TheMealDB)
const IMG_ING = {
 "Pollo":"Chicken","Ternera":"Beef","Cerdo":"Pork","Carne picada":"Beef Mince","Pavo":"Turkey","Bacon":"Bacon","Jamón":"Ham","Chorizo":"Chorizo","Salchichas":"Sausages","Cordero":"Lamb",
 "Salmón":"Salmon","Atún":"Tuna","Bonito":"Tuna","Merluza":"Hake","Bacalao":"Cod","Gambas":"Prawns","Mejillones":"Mussels","Calamares":"Squid","Anchoas":"Anchovies","Pulpo":"Octopus",
 "Huevos":"Egg","Leche":"Milk","Mantequilla":"Butter","Nata":"Cream","Queso":"Cheese","Mozzarella":"Mozzarella","Parmesano":"Parmesan","Feta":"Feta","Yogur":"Yogurt","Mascarpone":"Mascarpone",
 "Tomate":"Tomato","Cebolla":"Onion","Ajo":"Garlic","Pimiento":"Red Pepper","Calabacín":"Courgette","Berenjena":"Aubergine","Zanahoria":"Carrots","Brócoli":"Broccoli","Espinacas":"Spinach","Patata":"Potatoes","Champiñones":"Mushrooms","Lechuga":"Lettuce","Pepino":"Cucumber","Calabaza":"Pumpkin","Puerro":"Leek","Setas":"Mushrooms",
 "Limón":"Lemon","Lima":"Lime","Naranja":"Orange","Manzana":"Apple","Plátano":"Banana","Aguacate":"Avocado","Mango":"Mango","Fresas":"Strawberries","Piña":"Pineapple","Pera":"Pear",
 "Arroz":"Rice","Pasta":"Penne Rigate","Espaguetis":"Spaghetti","Fideos":"Noodles","Pan":"Bread","Harina":"Flour","Quinoa":"Quinoa","Cuscús":"Couscous","Avena":"Oats","Tortillas":"Tortillas",
 "Garbanzos":"Chickpeas","Lentejas":"Lentils","Judías":"Green Beans","Alubias":"Kidney Beans","Soja":"Soy Sauce","Tofu":"Tofu","Nueces":"Walnuts","Almendras":"Almonds","Cacahuetes":"Peanuts","Tahini":"Tahini",
 "Aceite de oliva":"Olive Oil","Sal":"Salt","Pimienta":"Pepper","Azúcar":"Sugar","Vinagre":"Vinegar","Salsa de soja":"Soy Sauce","Miel":"Honey","Tomate triturado":"Tomato Puree","Leche de coco":"Coconut Milk","Curry":"Curry Powder","Comino":"Cumin","Pimentón":"Paprika","Caldo":"Stock","Chocolate":"Dark Chocolate","Cacao":"Cocoa"
};
const CAT_ICON = {
 "🥩 Carnes y aves":"ti-meat","🐟 Pescados y mar":"ti-fish","🥚 Huevos y lácteos":"ti-egg",
 "🥦 Verduras":"ti-plant-2","🍎 Frutas":"ti-apple","🌾 Cereales y pasta":"ti-baguette",
 "🫘 Legumbres y frutos secos":"ti-bowl","🧂 Despensa y condimentos":"ti-jar"
};
const CATALOGO = {
  "🥩 Carnes y aves":["Pollo","Ternera","Cerdo","Carne picada","Pavo","Bacon","Jamón","Chorizo","Salchichas","Cordero"],
  "🐟 Pescados y mar":["Salmón","Atún","Bonito","Merluza","Bacalao","Gambas","Mejillones","Calamares","Anchoas","Pulpo"],
  "🥚 Huevos y lácteos":["Huevos","Leche","Mantequilla","Nata","Queso","Mozzarella","Parmesano","Feta","Yogur","Mascarpone"],
  "🥦 Verduras":["Tomate","Cebolla","Ajo","Pimiento","Calabacín","Berenjena","Zanahoria","Brócoli","Espinacas","Patata","Champiñones","Lechuga","Pepino","Calabaza","Puerro","Setas"],
  "🍎 Frutas":["Limón","Lima","Naranja","Manzana","Plátano","Aguacate","Mango","Fresas","Piña","Pera"],
  "🌾 Cereales y pasta":["Arroz","Pasta","Espaguetis","Fideos","Pan","Harina","Quinoa","Cuscús","Avena","Tortillas"],
  "🫘 Legumbres y frutos secos":["Garbanzos","Lentejas","Judías","Alubias","Soja","Tofu","Nueces","Almendras","Cacahuetes","Tahini"],
  "🧂 Despensa y condimentos":["Aceite de oliva","Sal","Pimienta","Azúcar","Vinagre","Salsa de soja","Miel","Tomate triturado","Leche de coco","Curry","Comino","Pimentón","Caldo","Chocolate","Cacao"]
};

let estado = {
  ingredientes:[], extraIng:"", raciones:2,
  accionTengo:"una", accionAntojo:"una",
  grupo:GRUPOS[1], tiempo:TIEMPOS[1], cocina:null, dieta:null, objetivo:null,
  extraGrupo:"", extraTiempo:"", extraCocina:"", extraDieta:"", extraObjetivo:"", extraLibre:""
};

// ---- localStorage favoritos / compra ----
const FAV="sukalde_favoritos", COMPRA="sukalde_compra";
const getFav=()=>{try{return JSON.parse(localStorage.getItem(FAV))||[]}catch{return[]}};
const getCompra=()=>{try{return JSON.parse(localStorage.getItem(COMPRA))||[]}catch{return[]}};
const setFavLS=v=>localStorage.setItem(FAV,JSON.stringify(v));
const setCompraLS=v=>localStorage.setItem(COMPRA,JSON.stringify(v));
function guardarFavorito(r){const f=getFav();if(f.some(x=>x.titulo===r.titulo))return f;const n=[{...r,id:r.titulo+"-"+Date.now()},...f];setFavLS(n);return n;}
const eliminarFavorito=id=>{const n=getFav().filter(f=>f.id!==id);setFavLS(n);return n};
const esFavorito=tit=>getFav().some(f=>f.titulo===tit);
function anadirACompra(ings){const a=getCompra();const ex=new Set(a.map(i=>i.texto.toLowerCase().trim()));const nv=(ings||[]).filter(i=>!ex.has(i.toLowerCase().trim())).map(i=>({texto:i,hecho:false,id:i+"-"+Math.random().toString(36).slice(2,7)}));const lista=[...a,...nv];setCompraLS(lista);return lista;}

// ---- API real ----
async function pedir(payload){
  let res;
  try{
    res=await fetch("api/receta.php?_="+Date.now(),{method:"POST",cache:"no-store",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  }catch(e){ throw new Error(t('err_conexion')); }
  if(!res.ok) throw new Error(t('err_servidor')+res.status+".");
  const txt=await res.text();
  try{ return JSON.parse(txt); }catch(e){ throw new Error(t('err_respuesta')); }
}

const el=(tag,c,h)=>{const e=document.createElement(tag);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
function unsNet(id,w){return "https://images.unsplash.com/photo-"+id+"?q=80&w="+(w||400)+"&auto=format&fit=crop";}
function uns(id,w){return id?("img/platos/"+id+".jpg"):unsNet(id,w);}
function imgIngNet(nombre){const fn=(IMG_ING[nombre]||nombre).replace(/ /g,"%20");return "https://www.themealdb.com/images/ingredients/"+fn+"-Small.png";}
function imgIng(nombre){const fn=(IMG_ING[nombre]||nombre).replace(/ /g,"_");return "img/ingredientes/"+fn+".png";}

// ============ NAVEGACIÓN (igual que app-C) ============
function go(v){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  const target=document.getElementById('view-'+v);
  if(target)target.classList.add('active');
  document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('navon',b.dataset.nav===v));
  window.scrollTo(0,0);
  if(v==='favoritos')renderFavoritos();
  if(v==='compra')renderCompra();
}

// ============ Construcción inicial ============
function buildComensales(host){
  const c=el("div"); c.style.display="flex";c.style.alignItems="center";c.style.justifyContent="space-between";c.style.width="100%";
  c.innerHTML=`<div><div class="com-label">${t('com_label')}</div><div class="com-sub">${t('com_sub')}</div></div>`;
  const ctrl=el("div","com-ctrl");
  const m=el("button","round","−");m.disabled=estado.raciones<=1;m.onclick=()=>{estado.raciones=Math.max(1,estado.raciones-1);syncComensales()};
  const mid=el("div");mid.style.minWidth="56px";mid.style.textAlign="center";mid.className="com-mid";
  mid.innerHTML=`<span class="com-num">${estado.raciones}</span><div class="com-per">${estado.raciones===1?t('persona'):t('personas')}</div>`;
  const p=el("button","round","+");p.disabled=estado.raciones>=20;p.onclick=()=>{estado.raciones=Math.min(20,estado.raciones+1);syncComensales()};
  ctrl.append(m,mid,p);c.appendChild(ctrl);
  host.innerHTML="";host.appendChild(c);
}
function syncComensales(){buildComensales(document.getElementById('com-tengo'));buildComensales(document.getElementById('com-antojo'));}

// pizarra de ingredientes
function buildPizarra(){
  const cols=document.getElementById('cols');cols.innerHTML="";
  Object.entries(CATALOGO).forEach(([titulo,items])=>{
    const g=el("div","group");
    g.innerHTML=`<h3><i class="ti ${CAT_ICON[titulo]||'ti-tools-kitchen-2'}"></i>${titulo}</h3>`;
    const l=el("div","list");
    items.forEach(it=>{
      const on=estado.ingredientes.includes(it);
      const li=el("div","li"+(on?" on":""));
      const img=el("img");img.src=imgIng(it);img.alt=it;img.loading="lazy";
      img.onerror=function(){const sp=el("span","ph","🥫");this.replaceWith(sp);};
      li.appendChild(el("span","box",'<i class="ti ti-check" style="opacity:'+(on?1:0)+'"></i>'));
      li.appendChild(img);
      li.appendChild(el("span","nm",it));
      li.onclick=()=>{
        if(estado.ingredientes.includes(it))estado.ingredientes=estado.ingredientes.filter(i=>i!==it);
        else estado.ingredientes.push(it);
        buildPizarra();buildCesta();updateN();
      };
      l.appendChild(li);
    });
    g.appendChild(l);cols.appendChild(g);
  });
}
function buildCesta(){
  let cesta=document.getElementById('piz-cesta');
  const board=document.querySelector('#view-tengo .board');
  const tt=document.querySelector('#view-tengo .tt');
  if(!cesta){
    cesta=el("div","piz-cesta");cesta.id="piz-cesta";
    const add=el("div","piz-add");add.id="piz-add";
    const input=el("input","txt");input.id="piz-input";input.placeholder=t('add_ing_ph');
    input.oninput=e=>estado.extraIng=e.target.value;
    input.onkeydown=e=>{if(e.key==="Enter")addIng()};
    const b=el("button","btn-sec",t('add_btn'));b.onclick=addIng;
    add.append(input,b);
    // insertar tras comensales
    const com=document.getElementById('com-tengo');
    com.after(cesta);cesta.after(add);
  }
  // refrescar textos del buscador (para que cambien al cambiar de idioma)
  const inp=document.getElementById('piz-input'); if(inp)inp.placeholder=t('add_ing_ph');
  const addBtn=document.querySelector('#piz-add .btn-sec'); if(addBtn)addBtn.textContent=t('add_btn');
  cesta.innerHTML="";
  if(estado.ingredientes.length){
    estado.ingredientes.forEach(ing=>{
      const chip=el("span","piz-chip",ing);
      const x=el("button",null,"×");x.onclick=()=>{estado.ingredientes=estado.ingredientes.filter(i=>i!==ing);buildPizarra();buildCesta();updateN()};
      chip.appendChild(x);cesta.appendChild(chip);
    });
  }else{
    cesta.innerHTML=`<span class="piz-vacia">${t('piz_vacia')}</span>`;
  }
}
function addIng(){const v=(estado.extraIng||"").trim();if(v&&!estado.ingredientes.includes(v)){estado.ingredientes.push(v);estado.extraIng="";const i=document.getElementById('piz-input');if(i)i.value="";buildPizarra();buildCesta();updateN();}}
function updateN(){document.getElementById('n').textContent=estado.ingredientes.length;}

// formulario antojo (todos los campos en la misma página)
// Fotos reales (Unsplash) para cada opción de los filtros del antojo
const FOTO_GRUPO = {
  "Para mí solo/a":"🧑","En pareja":"💑","En familia":"👨‍👩‍👧","Para un grupo grande":"👥"
};
const FOTO_TIEMPO = {
  "Menos de 15 min":"1607330289024-1535c6b4e1c1",
  "15–30 min":"1565299624946-b28f40a0ae38",
  "30–60 min":"1556909114-f6e7ad7d3136",
  "Sin prisa (+1h)":"1547592180-85f173990554"
};
const FOTO_COCINA = {
  "Japonesa":"1579871494447-9811cf80d66c","Griega":"1599321955726-e048e3f02b86",
  "China":"1525755662778-989d0524087e","Italiana":"1551183053-bf91a1d81141",
  "Mexicana":"1565299624946-b28f40a0ae38","India":"1585937421612-70a008356fbe",
  "Vasca":"1544025162-d76694265947","Tailandesa":"1559314809-0d155014e29e",
  "Marroquí":"1541518763669-27fef04b14ea","Francesa":"1414235077428-338989a2e8c0",
  "Mediterránea":"1512621776951-a57141f2eefd","Fácil y casera":"1490645935967-10de6ba17061"
};
const FOTO_DIETA = {
  "Vegana":"1512621776951-a57141f2eefd","Vegetariana":"1540420773420-3366772f4999",
  "Comida sana":"1490645935967-10de6ba17061","Para carnívoros":"1546964124-0cce460f38ef",
  "Sin gluten":"1505253758473-96b7015fcd40","Baja en carbohidratos":"1467003909585-2f8a72700288",
  "Amante del queso":"1486297678162-eb2a19b0a32d","Amante del picante":"1583454110551-21f2fa2afe61"
};

// Fila de tarjetas CON FOTO real (tiempo, cocina, dieta)
function fotoRow(label,ops,fotos,getVal,onPick,ph,campoExtra,lblFn){
  const c=el("div","campo");c.appendChild(el("label",null,label));
  const grid=el("div","filtro-grid");
  ops.forEach(o=>{
    const txt=Array.isArray(o)?o[0]:o, emo=Array.isArray(o)?(o[1]||""):"";
    const disp=lblFn?lblFn(txt):txt;
    const on=getVal()===txt;
    const card=el("div","filtro-card"+(on?" on":""));
    const img=el("img");img.src=uns(fotos[txt]||"",300);img.alt=disp;img.loading="lazy";
    img.onerror=function(){this.style.background="linear-gradient(135deg,#3a4540,#2a332e)";};
    card.appendChild(img);
    card.appendChild(el("div","filtro-l",`${emo?'<span class="filtro-e">'+emo+'</span>':''}<span>${disp}</span>`));
    card.onclick=()=>{onPick(txt);buildAntojoForm()};
    grid.appendChild(card);
  });
  c.appendChild(grid);
  if(ph!=null){
    const i=el("input","txt");i.placeholder=ph;i.value=estado[campoExtra]||"";
    i.oninput=e=>estado[campoExtra]=e.target.value;
    c.appendChild(i);
  }
  return c;
}

// Fila de TIEMPO con tarjeta-marco (icono + palabra descriptiva), estilo "reloj"
const TIEMPO_SVG = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3l-9 11h7l-1 7 9-11h-7z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5-1-8z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11a2 2 0 0 1 2 2v3h10v-3a2 2 0 0 1 4 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z"/><path d="M6 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"/></svg>'
];
function relojRow(label,ops,getVal,onPick,ph,campoExtra){
  const c=el("div","campo");c.appendChild(el("label",null,label));
  const grid=el("div","reloj-grid");
  const descs=t('tiempos_desc')||[];
  ops.forEach((txt,idx)=>{
    const disp=lblTiempo(txt);
    const desc=descs[idx]||"";
    const on=getVal()===txt;
    const card=el("div","reloj-card"+(on?" on":"")+(idx>=2?" largo":""));
    card.innerHTML=`<span class="reloj-ic">${TIEMPO_SVG[idx]||TIEMPO_SVG[1]}</span>`
      +`<span class="reloj-t">${disp}</span>`
      +(desc?`<span class="reloj-d">${desc}</span>`:"");
    card.onclick=()=>{onPick(txt);buildAntojoForm()};
    grid.appendChild(card);
  });
  c.appendChild(grid);
  if(ph!=null){
    const i=el("input","txt");i.placeholder=ph;i.value=estado[campoExtra]||"";
    i.oninput=e=>estado[campoExtra]=e.target.value;
    c.appendChild(i);
  }
  return c;
}

// Fila de iconos/emoji (¿Para quién?)
function chipRow(label,ops,getVal,onPick,ph,campoExtra,lblFn){
  const c=el("div","campo");c.appendChild(el("label",null,label));
  const grid=el("div","grupo-grid");
  ops.forEach(o=>{
    const txt=Array.isArray(o)?o[0]:o;
    const disp=lblFn?lblFn(txt):txt;
    const on=getVal()===txt;
    const card=el("div","grupo-card"+(on?" on":""));
    card.innerHTML=`<span class="grupo-emo">${FOTO_GRUPO[txt]||"🍽️"}</span><span class="grupo-k">${disp}</span>`;
    card.onclick=()=>{onPick(txt);buildAntojoForm()};
    grid.appendChild(card);
  });
  c.appendChild(grid);
  if(ph!=null){
    const i=el("input","txt");i.placeholder=ph;i.value=estado[campoExtra]||"";
    i.oninput=e=>estado[campoExtra]=e.target.value;
    c.appendChild(i);
  }
  return c;
}
function buildAntojoForm(){
  const f=document.getElementById('ant-form');f.innerHTML="";
  f.appendChild(chipRow(t('f_quien'),GRUPOS,()=>estado.grupo,v=>{estado.grupo=v},t('f_quien_ph'),"extraGrupo",lblGrupo));
  f.appendChild(relojRow(t('f_tiempo'),TIEMPOS,()=>estado.tiempo,v=>{estado.tiempo=v},t('f_tiempo_ph'),"extraTiempo"));
  f.appendChild(fotoRow(t('f_cocina'),COCINAS,FOTO_COCINA,()=>estado.cocina,v=>{estado.cocina=estado.cocina===v?null:v},t('f_cocina_ph'),"extraCocina",lblCocina));
  f.appendChild(fotoRow(t('f_dieta'),DIETAS,FOTO_DIETA,()=>estado.dieta,v=>{estado.dieta=estado.dieta===v?null:v},t('f_dieta_ph'),"extraDieta",lblDieta));
  // Hoy me apetece (la carta de antojos, mismo formato que los filtros)
  const cm=el("div","campo");cm.appendChild(el("label",null,t('f_apetece')));
  const grid=el("div","filtro-grid");
  OBJETIVOS.forEach(o=>{
    const on=estado.objetivo===o.k;
    const card=el("div","filtro-card"+(on?" on":""));
    const img=el("img");img.src=uns(o.img,300);img.alt=lblObjetivo(o.k);img.loading="lazy";
    img.onerror=function(){this.style.background="linear-gradient(135deg,#3a4540,#2a332e)";};
    card.appendChild(img);
    card.appendChild(el("div","filtro-l",`<span class="filtro-e">${o.e}</span><span>${lblObjetivo(o.k)}</span>`));
    card.onclick=()=>{estado.objetivo=on?null:o.k;buildAntojoForm()};
    grid.appendChild(card);
  });
  cm.appendChild(grid);
  const oi=el("input","txt");oi.placeholder=t('f_apetece_ph');oi.value=estado.extraObjetivo||"";
  oi.oninput=e=>estado.extraObjetivo=e.target.value;
  cm.appendChild(oi);f.appendChild(cm);
  // texto libre general
  const cl=el("div","campo");cl.appendChild(el("label",null,t('f_libre')));
  const ta=el("textarea","txt txt-libre");ta.rows=3;ta.style.resize="vertical";ta.placeholder=t('f_libre_ph');ta.value=estado.extraLibre;
  ta.oninput=e=>estado.extraLibre=e.target.value;
  cl.appendChild(ta);f.appendChild(cl);
}
// (la carta ya no se pinta en #menu; queda integrada en el formulario)
function buildCarta(){
  const m=document.getElementById('menu');if(m)m.innerHTML="";
}

// acciones una/varias/menu
function buildAcciones(hostId,which){
  const host=document.getElementById(hostId);host.innerHTML="";
  const defs=[["una","🍽️",t('acc_una')],["varias","🍱",t('acc_varias')],["menu","📋",t('acc_menu')]];
  const cur=which==='tengo'?estado.accionTengo:estado.accionAntojo;
  defs.forEach(([k,em,lab])=>{
    const b=el("button","acc-pick"+(cur===k?" on":""),`<span>${em}</span><span>${lab}</span>`);
    b.onclick=()=>{
      if(which==='tengo'){
        if(!estado.ingredientes.length){alert(t('alert_sin_ing'));return;}
        estado.accionTengo=k;
      }else estado.accionAntojo=k;
      buildAcciones(hostId,which);
      cocinar(which);
    };
    host.appendChild(b);
  });
}

// ---- payloads (idénticos al backend) ----
function payloadTengo(){
  return {accion:estado.accionTengo,modo:"ingredientes",ingredientes:estado.ingredientes,extra:(estado.extraIng||"").trim(),raciones:estado.raciones};
}
function payloadAntojo(){
  const crit={grupo:(estado.extraGrupo||"").trim()||estado.grupo,tiempo:(estado.extraTiempo||"").trim()||estado.tiempo,
    cocina:estado.cocina||(estado.extraCocina||"").trim()||null,
    dieta:estado.dieta||(estado.extraDieta||"").trim()||null,
    objetivo:estado.objetivo||(estado.extraObjetivo||"").trim()||null};
  const extra=[(estado.extraLibre||"").trim()].filter(Boolean).join(". ");
  return {accion:estado.accionAntojo,modo:"criterios",criterios:crit,extra,raciones:estado.raciones};
}

async function cocinar(which){
  const zone=document.getElementById(which==='tengo'?'res-tengo':'res-antojo');
  zone.innerHTML='<div class="cargando">'+t('cargando')+'</div>';
  try{
    const res=await pedir(which==='tengo'?payloadTengo():payloadAntojo());
    await pintarResultado(zone,res);
  }catch(e){
    zone.innerHTML='';zone.appendChild(el("div","error",e.message));
  }
}

// ─── Foto real del plato (Unsplash). Asignación robusta: 1) por título exacto
//     del recetario, 2) por palabra clave (cubre recetas generadas), 3) por
//     ingrediente principal, 4) por tipo de plato/cocina, 5) genérico. ───
const FOTO_TITULO = {
  "hummus casero con crudités":"1577805947697-89e18249d767",
  "ensalada griega tradicional":"1505253758473-96b7015fcd40",
  "gazpacho andaluz":"1592417817098-8fd3d9eb14a5",
  "bruschetta de tomate y albahaca":"1572695157366-5e585ab2b69f",
  "edamame al vapor con sal":"1564834724105-918b73d1b9e0",
  "sopa de miso":"1607330289024-1535c6b4e1c1",
  "croquetas de jamón":"1626082927389-6cd097cee6a6",
  "guacamole con totopos":"1600891964092-4316c288032e",
  "tortilla de patatas jugosa":"1568158879083-c42860933ed7",
  "marmitako de bonito":"1604908176997-125f25cc6f3d",
  "pasta cacio e pepe":"1551892374-ecf8754cf8b0",
  "risotto de champiñones":"1476124369491-e7addf5db371",
  "lasaña boloñesa":"1574894709920-11b28e7367e3",
  "salmón teriyaki con arroz":"1467003909585-2f8a72700288",
  "ramen casero de pollo":"1569718212165-3a8278d5f624",
  "pollo salteado al wok":"1512058564366-18510be2db19",
  "arroz frito tres delicias":"1603133872878-684f208fb84b",
  "curry de garbanzos y espinacas":"1585937421612-70a008356fbe",
  "pollo tikka masala":"1565557623262-b51c2513a641",
  "tacos de carnitas":"1565299624946-b28f40a0ae38",
  "fajitas de pollo":"1599974579688-8dbdd335c77f",
  "pad thai de gambas":"1559314809-0d155014e29e",
  "curry verde tailandés":"1455619452474-d2be8b1e70cd",
  "ratatouille al horno":"1572453800999-e8d2d1589b7c",
  "quiche lorraine":"1591985661581-9a3cefd29f8e",
  "tabulé de quinoa":"1505576399279-565b52d4ac71",
  "cuscús de verduras":"1541518763669-27fef04b14ea",
  "hamburguesa casera completa":"1568901346375-23c9450c58cd",
  "ensalada césar con pollo":"1550304943-4f24f54ddde9",
  "tostada de aguacate y huevo poché":"1588137378633-dea1336ce1e2",
  "tiramisú clásico":"1571877227200-a0d98ea607e9",
  "mousse de chocolate":"1541599468348-e96984315921",
  "arroz con leche":"1626078299034-94daf8d6c1d8",
  "yogur griego con miel y nueces":"1488477304112-4944851de03d",
  "crepes con chocolate":"1519676867240-f03562e64548",
  "mango con sticky rice":"1601001435957-74f0958a93c4",
  "brownie de chocolate":"1606313564200-e75d5e30476c",
  "gulab jamun":"1666190092159-3c9d3b6a3f08",
  "salteado de cordero con verduras":"1546964124-0cce460f38ef",
  "ensalada de ajo y champiñones":"1476124369491-e7addf5db371",
  "crema de ajo y champiñones":"1547592180-85f173990554",
  "manzana con leche":"1490474418585-ba9bad8fd0ea",
  "marmitako de bonito":"1544025162-d76694265947",
  "tortilla de patatas":"1568158879083-c42860933ed7",
  "gazpacho":"1592417817098-8fd3d9eb14a5",
  "croquetas":"1583454110551-21f2fa2afe61",
  "albondigas":"1558030006-450675393462",
  "lentejas estofadas":"1579871494447-9811cf80d66c",
  "judias verdes":"1540420773420-3366772f4999",
  "pisto manchego":"1596797038530-2c107229654b",
  "cocido":"1604908176997-125f25cc6f3d",
  "fabada asturiana":"1432139509613-5c4255815697",
  "paella de marisco":"1559314809-0d155014e29e",
  "paella valenciana":"1603133872878-684f208fb84b"
};
// Palabras clave → foto (cubre recetas generadas y variantes).
const FOTO_KW = [
  ["ensalada","1505253758473-96b7015fcd40"],
  ["champiñon","1476124369491-e7addf5db371"],
  ["seta","1476124369491-e7addf5db371"],
  ["salteado","1512058564366-18510be2db19"],
  ["wok","1512058564366-18510be2db19"],
  ["revuelto","1525351484163-7529414344d8"],
  ["huevo","1525351484163-7529414344d8"],
  ["tostada","1588137378633-dea1336ce1e2"],
  ["aguacate","1588137378633-dea1336ce1e2"],
  ["crema","1547592180-85f173990554"],
  ["velouté","1547592180-85f173990554"],
  ["sopa","1550304943-4f24f54ddde9"],
  ["caldo","1550304943-4f24f54ddde9"],
  ["pasta","1551892374-ecf8754cf8b0"],
  ["espagueti","1551892374-ecf8754cf8b0"],
  ["lasaña","1574894709920-11b28e7367e3"],
  ["arroz","1603133872878-684f208fb84b"],
  ["risotto","1476124369491-e7addf5db371"],
  ["paella","1603133872878-684f208fb84b"],
  ["curry","1455619452474-d2be8b1e70cd"],
  ["pollo","1604908176997-125f25cc6f3d"],
  ["cordero","1546964124-0cce460f38ef"],
  ["ternera","1558030006-450675393462"],
  ["cerdo","1432139509613-5c4255815697"],
  ["chorizo","1599321955726-e048e3f02b86"],
  ["jamon","1583454110551-21f2fa2afe61"],
  ["salmon","1467003909585-2f8a72700288"],
  ["pescado","1546069901-ba9599a7e63c"],
  ["bacalao","1546069901-ba9599a7e63c"],
  ["gambas","1559314809-0d155014e29e"],
  ["marisco","1559314809-0d155014e29e"],
  ["mejillon","1551782450-a2132b4ba21d"],
  ["atun","1544025162-d76694265947"],
  ["bonito","1544025162-d76694265947"],
  ["yogur","1488477304112-4944851de03d"],
  ["fruta","1490474418585-ba9bad8fd0ea"],
  ["pera","1490474418585-ba9bad8fd0ea"],
  ["platano","1490474418585-ba9bad8fd0ea"],
  ["fresas","1490474418585-ba9bad8fd0ea"],
  ["pina","1490474418585-ba9bad8fd0ea"],
  ["mango","1490474418585-ba9bad8fd0ea"],
  ["manzana","1490474418585-ba9bad8fd0ea"],
  ["naranja","1490474418585-ba9bad8fd0ea"],
  ["lima","1622597467836-f3285f2131b8"],
  ["limon","1622597467836-f3285f2131b8"],
  ["coco","1601001435957-74f0958a93c4"],
  ["chocolate","1606313564200-e75d5e30476c"],
  ["cacao","1606313564200-e75d5e30476c"],
  ["postre","1488477181946-6428a0291777"],
  ["tarta","1571877227200-a0d98ea607e9"],
  ["bizcocho","1512621776951-a57141f2eefd"],
  ["galleta","1512621776951-a57141f2eefd"],
  ["garbanzos","1585937421612-70a008356fbe"],
  ["garbanzo","1585937421612-70a008356fbe"],
  ["lenteja","1579871494447-9811cf80d66c"],
  ["verdura","1540420773420-3366772f4999"],
  ["patata","1568158879083-c42860933ed7"],
  ["croqueta","1583454110551-21f2fa2afe61"],
  ["hamburguesa","1568901346375-23c9450c58cd"],
  ["taco","1565299624946-b28f40a0ae38"],
  ["fajita","1599974579688-8dbdd335c77f"],
  ["quiche","1525755662778-989d0524087e"],
  ["empanada","1599321955726-e048e3f02b86"],
  ["tortilla","1568158879083-c42860933ed7"],
  ["ramen","1569718212165-3a8278d5f624"],
  ["noodle","1569718212165-3a8278d5f624"],
  ["gyoza","1569718212165-3a8278d5f624"],
  ["miso","1607330289024-1535c6b4e1c1"],
  ["cuscus","1541518763669-27fef04b14ea"],
  ["tabule","1505576399279-565b52d4ac71"],
  ["quinoa","1505576399279-565b52d4ac71"]
];
const FOTO_INGR = {
  "tomate":"1592417817098-8fd3d9eb14a5","cebolla":"1518977956812-cd3dbadaaf31",
  "pollo":"1604908176997-125f25cc6f3d","ternera":"1558030006-450675393462",
  "cerdo":"1432139509613-5c4255815697","arroz":"1603133872878-684f208fb84b",
  "pasta":"1551892374-ecf8754cf8b0","espagueti":"1551892374-ecf8754cf8b0",
  "huevo":"1525351484163-7529414344d8","patata":"1568158879083-c42860933ed7",
  "calabacín":"1596797038530-2c107229654b","berenjena":"1572453800999-e8d2d1589b7c",
  "champiñon":"1476124369491-e7addf5db371","seta":"1476124369491-e7addf5db371",
  "garbanzos":"1585937421612-70a008356fbe","garbanzo":"1585937421612-70a008356fbe",
  "lentejas":"1579871494447-9811cf80d66c","lenteja":"1579871494447-9811cf80d66c",
  "salmon":"1467003909585-2f8a72700288","atun":"1544025162-d76694265947",
  "bonito":"1544025162-d76694265947","bacalao":"1546069901-ba9599a7e63c",
  "gambas":"1559314809-0d155014e29e","mejillones":"1551782450-a2132b4ba21d",
  "queso":"1486297678162-eb2a19b0a32d","puerro":"1525755662778-989d0524087e",
  "cordero":"1546964124-0cce460f38ef","ternera":"1558030006-450675393462",
  "chorizo":"1599321955726-e048e3f02b86","jamon":"1583454110551-21f2fa2afe61",
  "zanahoria":"1540420773420-3366772f4999","espinaca":"1540420773420-3366772f4999",
  "brocoli":"1540420773420-3366772f4999","verdura":"1540420773420-3366772f4999",
  "aguacate":"1600891964092-4316c288032e","ajo":"1477805354-68f200dc0516",
  "nata":"1488477304112-4944851de03d","yogur":"1488477304112-4944851de03d",
  "limon":"1622597467836-f3285f2131b8","naranja":"1490474418585-ba9bad8fd0ea",
  "manzana":"1490474418585-ba9bad8fd0ea","fruta":"1490474418585-ba9bad8fd0ea",
  "chocolate":"1606313564200-e75d5e30476c","cacao":"1606313564200-e75d5e30476c",
  "harina":"1512621776951-a57141f2eefd","pan":"1512621776951-a57141f2eefd",
  "quinoa":"1505576399279-565b52d4ac71","cuscus":"1505576399279-565b52d4ac71",
  "tofu":"1540420773420-3366772f4999","soja":"1540420773420-3366772f4999"
};
const FOTO_COCINA_PLATO = {
  "Japonesa":"1569718212165-3a8278d5f624","Griega":"1505253758473-96b7015fcd40",
  "China":"1603133872878-684f208fb84b","Italiana":"1551892374-ecf8754cf8b0",
  "Mexicana":"1565299624946-b28f40a0ae38","India":"1565557623262-b51c2513a641",
  "Vasca":"1604908176997-125f25cc6f3d","Tailandesa":"1559314809-0d155014e29e",
  "Marroquí":"1541518763669-27fef04b14ea","Francesa":"1572453800999-e8d2d1589b7c",
  "Española":"1568901346375-23c9450c58cd","Americana":"1568901346375-23c9450c58cd",
  "Mediterránea":"1512621776951-a57141f2eefd","Fácil y casera":"1490645935967-10de6ba17061"
};
const FOTO_TIPO = {"entrante":"1505253758473-96b7015fcd40","principal":"1540420773420-3366772f4999","postre":"1488477181946-6428a0291777"};
const FOTO_GENERICA = "1504674900247-0877df9cc836";
function bajarTxt(s){return (s||"").toLowerCase()
  .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i').replace(/[óòö]/g,'o').replace(/[úùü]/g,'u');}

// ─── Anulaciones manuales: fotos reales de Wikimedia Commons para platos
//     concretos, elegidas a mano. Tienen prioridad sobre el sistema de
//     fotos de Unsplash de arriba. Se detectan por título exacto o, si el
//     título generado varía (p.ej. "Kokotxas de bacalao al pil-pil"), por
//     palabra clave. ───
const FOTO_URL_TITULO = {
  "marmitako de bonito":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Marmitako_de_at%C3%BAn_%28Espa%C3%B1a%29.jpg/960px-Marmitako_de_at%C3%BAn_%28Espa%C3%B1a%29.jpg"
};
const FOTO_URL_KW = [
  ["marmitako","https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Marmitako_de_at%C3%BAn_%28Espa%C3%B1a%29.jpg/960px-Marmitako_de_at%C3%BAn_%28Espa%C3%B1a%29.jpg"],
  ["kokotxa","https://commons.wikimedia.org/wiki/Special:FilePath/CocotxasPilPil.jpg"],
  ["cocotxa","https://commons.wikimedia.org/wiki/Special:FilePath/CocotxasPilPil.jpg"],
  ["txipirones en su tinta","https://commons.wikimedia.org/wiki/Special:FilePath/Zaragoza_-_Antiguo_Bar_La_Jota_-_Calamares_en_su_tinta.jpg"],
  ["calamares en su tinta","https://commons.wikimedia.org/wiki/Special:FilePath/Zaragoza_-_Antiguo_Bar_La_Jota_-_Calamares_en_su_tinta.jpg"],
  ["chipirones en su tinta","https://commons.wikimedia.org/wiki/Special:FilePath/Zaragoza_-_Antiguo_Bar_La_Jota_-_Calamares_en_su_tinta.jpg"],
  ["angulas","https://commons.wikimedia.org/wiki/Special:FilePath/Angulas_al_ajillo,_Bilbao_(32941326932).jpg"],
  ["txangurro","https://commons.wikimedia.org/wiki/Special:FilePath/O_Nobre_(42982055121).jpg"],
  ["changurro","https://commons.wikimedia.org/wiki/Special:FilePath/O_Nobre_(42982055121).jpg"],
  ["chuleton","https://commons.wikimedia.org/wiki/Special:FilePath/Chuleton_a_la_piedra.JPG"],
  ["chuletón","https://commons.wikimedia.org/wiki/Special:FilePath/Chuleton_a_la_piedra.JPG"],
  ["cuajada","https://commons.wikimedia.org/wiki/Special:FilePath/Cuajada_cropped_-_juantigues.jpg"],
  ["mamia","https://commons.wikimedia.org/wiki/Special:FilePath/Cuajada_cropped_-_juantigues.jpg"]
];
function fotoUrlOverride(r){
  const t=(r.titulo||"").toLowerCase();
  if(FOTO_URL_TITULO[t]) return FOTO_URL_TITULO[t];
  for(const [kw,url] of FOTO_URL_KW){ if(bajarTxt(t).indexOf(bajarTxt(kw))>=0) return url; }
  return null;
}

function fotoPlatoId(r){
  const t=(r.titulo||"").toLowerCase();
  if(FOTO_TITULO[t]) return FOTO_TITULO[t];
  for(const [kw,id] of FOTO_KW){ if(bajarTxt(t).indexOf(bajarTxt(kw))>=0) return id; }
  // por ingrediente principal de la receta
  for(const ing of (r.ingredientes||[])){
    const bi=bajarTxt(ing);
    for(const k in FOTO_INGR){ if(bi.indexOf(bajarTxt(k))>=0) return FOTO_INGR[k]; }
  }
  if(r.cocina && FOTO_COCINA_PLATO[r.cocina]) return FOTO_COCINA_PLATO[r.cocina];
  if(r.plato && FOTO_TIPO[r.plato]) return FOTO_TIPO[r.plato];
  return FOTO_GENERICA;
}
function fotoPlato(r,w){
  // Prioridad 1: la foto real y verificada que trae la propia receta
  // (viene de recetas_mundo.html, vía api/recetario.php -> receta.php).
  if (r.photoUrl) return r.photoUrl;
  // Prioridad 2 (raro): anulaciones manuales por título/palabra clave.
  // Prioridad 3 (solo si de verdad no hay foto real, p.ej. "Pla rad prik"
  // o una receta creada por el propio usuario en "Mis recetas"): foto
  // genérica por palabra clave, como respaldo visual.
  return fotoUrlOverride(r) || uns(fotoPlatoId(r), w||500);
}
function imgPlatoHTML(r){
  return `<div class="mini-foto"><img src="${fotoPlato(r,500)}" alt="${r.titulo}" loading="lazy" onerror="this.onerror=null;this.src='${unsNet(fotoPlatoId(r),500)}'"></div>`;
}
// Tarjeta de receta con foto (formato unificado para una/muchas/menú).
// faltaBasicos: lista opcional de básicos que le faltan al usuario (harina,
// mantequilla, ajo, caldo) para las recetas de la sección "con básicos".
function cardReceta(r,badge,faltaBasicos){
  const card=el("div","mini con-foto");
  const bdg=badge?`<span class="mini-curso">${badge}</span>`:"";
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  const nota=(faltaBasicos&&faltaBasicos.length)?`<div class="mini-falta">🧂 ${t('falta_basicos')}: ${faltaBasicos.map(cap).join(', ')}</div>`:"";
  card.innerHTML=`${imgPlatoHTML(r)}<div class="mini-body"><div class="mini-tags">${bdg}${(r.etiquetas||[]).slice(0,2).map(t=>`<span>${t}</span>`).join("")}</div><div class="mini-tit">${r.titulo}</div><div class="mini-desc">${r.descripcion||""}</div><div class="mini-meta">⏱ ${r.tiempo} · ${r.dificultad}</div>${nota}</div>`;
  card.onclick=()=>mostrarReceta(r);
  return card;
}

// Pinta una rejilla de 5x5 con paginación ("pedir más") para una lista de
// recetas ya resueltas por el backend. notaFn(r) opcionalmente devuelve la
// lista de básicos que le faltan a esa receta, para mostrarla en la tarjeta.
async function pintarSeccionRecetas(zone,todas,notaFn){
  const grid=el("div","grid grid-5");
  zone.appendChild(grid);
  const masWrap=el("div","mas-wrap");
  zone.appendChild(masWrap);
  const PAGINA=25; // 5 columnas x 5 filas
  let mostradas=0;
  const pintarBoton=()=>{
    masWrap.innerHTML="";
    if(mostradas<todas.length){
      const b=el("button","btn-mas",`${t('cargar_mas')} (${mostradas}/${todas.length})`);
      b.onclick=cargarLote;
      masWrap.appendChild(b);
    }else{
      masWrap.appendChild(el("div","todas-vistas",t('todas_vistas')));
    }
  };
  const cargarLote=async()=>{
    const b=masWrap.querySelector('.btn-mas'); if(b){b.disabled=true;b.textContent=t('cargando');}
    const lote=todas.slice(mostradas,mostradas+PAGINA);
    const traducidas=await traducirRecetas(lote);
    traducidas.forEach(r=>grid.appendChild(cardReceta(r,null,notaFn?notaFn(r):null)));
    mostradas+=lote.length;
    pintarBoton();
  };
  await cargarLote();
}

async function pintarResultado(zone,res){
  zone.innerHTML="";
  if(res&&res.tipo==="vacio"){zone.appendChild(el("div","error",res.mensaje||t('res_vacio')));return;}
  if(res&&res.tipo==="varias"){
    const todas=res.recetas||[];
    const basicos=res.recetasBasicos||[];
    if(!todas.length&&!basicos.length){zone.appendChild(el("div","error",t('res_vacio')));return;}
    if(todas.length){
      zone.appendChild(el("div","titulo-bloque",t('res_varias')));
      await pintarSeccionRecetas(zone,todas);
    }
    if(basicos.length){
      zone.appendChild(el("div","titulo-bloque titulo-basicos",t('res_basicos')));
      await pintarSeccionRecetas(zone,basicos,r=>r.faltaBasicos);
    }
    return;
  }
  if(res&&res.tipo==="menu"){
    zone.appendChild(el("div","titulo-bloque",t('res_menu')));
    const partes=await Promise.all([traducirReceta(res.entrante),traducirReceta(res.principal),traducirReceta(res.postre)]);
    const grid=el("div","grid");
    [[t('menu_entrante'),partes[0]],[t('menu_principal'),partes[1]],[t('menu_postre'),partes[2]]].forEach(([et,r])=>{
      if(!r)return; grid.appendChild(cardReceta(r,et));
    });
    zone.appendChild(grid);return;
  }
  zone.appendChild(el("div","titulo-bloque",t('res_una')));
  const grid=el("div","grid una");
  const una=await traducirReceta(res);
  grid.appendChild(cardReceta(una,null,una.faltaBasicos));
  zone.appendChild(grid);
}

// ---- modal de receta ----
function mostrarReceta(r){
  const m=document.getElementById('receta-modal');
  const ings=(r.ingredientes||[]).map(i=>`<li>${i}</li>`).join("");
  const pasos=(r.pasos||[]).map(p=>`<li>${p}</li>`).join("");
  const tags=(r.etiquetas||[]).map(t=>`<span>${t}</span>`).join(" ");
  const fav=esFavorito((r._es||r).titulo);
  m.innerHTML=`<div class="rm-back" onclick="cerrarReceta()"></div>
    <div class="rm-card">
      <button class="rm-x" onclick="cerrarReceta()">×</button>
      <div class="rm-hero"><img src="${fotoPlato(r,900)}" alt="${r.titulo}" onerror="this.onerror=null;this.src='${uns(FOTO_GENERICA,900)}'"></div>
      <h2>${r.titulo}</h2>
      <p class="rm-desc">${r.descripcion||""}</p>
      <div class="rm-meta"><span><i class="ti ti-clock"></i> ${r.tiempo||""}</span><span><i class="ti ti-chart-bar"></i> ${r.dificultad||""}</span><span><i class="ti ti-users"></i> ${r.raciones||estado.raciones} ${t('rm_pers')}</span></div>
      ${(r.faltaBasicos&&r.faltaBasicos.length)?`<div class="rm-falta">🧂 ${t('falta_basicos')}: ${r.faltaBasicos.map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(', ')}</div>`:''}
      <div class="rm-acc">
        <button id="rm-fav" class="${fav?'on':''}">${fav?t('rm_fav_on'):t('rm_fav_off')}</button>
        <button id="rm-compra">${t('rm_compra')}</button>
      </div>
      <div class="rm-cols">
        <div><h3>${t('rm_ingredientes')}</h3><ul class="rm-ing">${ings}</ul></div>
        <div><h3>${t('rm_preparacion')}</h3><ol class="rm-pasos">${pasos}</ol></div>
      </div>
      ${r.consejo?`<div class="rm-tip">👨‍🍳 ${r.consejo}</div>`:''}
    </div>`;
  m.classList.add('show');
  document.getElementById('rm-fav').onclick=function(){const base=r._es||r;if(!esFavorito(base.titulo)){guardarFavorito(base);this.classList.add('on');this.textContent=t('rm_fav_on');renderNav();}};
  document.getElementById('rm-compra').onclick=function(){anadirACompra(r.ingredientes||[]);this.textContent=t('rm_compra_ok');renderNav();};
}
function cerrarReceta(){document.getElementById('receta-modal').classList.remove('show');}

// ---- nav accesorios (favoritos/compra/admin) ----
function renderNav(){
  const nav=document.getElementById('nav');if(!nav)return;nav.innerHTML="";
  const nF=getFav().length,nC=getCompra().filter(i=>!i.hecho).length;
  [["favoritos","❤️",nF],["compra","🛒",nC]].forEach(([v,em,n])=>{
    const b=el("button","navbtn",em);
    if(n>0)b.appendChild(el("span","badge",n));
    b.onclick=()=>go(v);nav.appendChild(b);
  });
  const adm=el("button","navbtn","➕");adm.title=t('nav_mis_title');adm.onclick=()=>{window.location.href="admin.html";};
  nav.appendChild(adm);
}

// ---- favoritos ----
let favAbierta=null;
function renderFavoritos(){
  const z=document.getElementById('fav-zone');z.innerHTML="";
  z.appendChild(el("h2","titulo-vista",t('fav_title')));
  const favs=getFav();
  if(!favs.length){z.appendChild(el("div","vacio",`<div class="em">📖</div><p>${t('fav_vacio')}</p>`));return;}
  favs.forEach(async f=>{
    const ft=await traducirReceta(f);
    const it=el("div","fav-item");
    const info=el("div","info",`<div class="tit">${ft.titulo}</div><div class="met">⏱ ${ft.tiempo} · 🍽 ${ft.raciones}</div>`);
    info.onclick=()=>mostrarReceta(ft);
    const del=el("button","fav-del","🗑");del.onclick=()=>{eliminarFavorito(f.id);renderFavoritos();renderNav();};
    it.append(info,del);z.appendChild(it);
  });
}
// ---- compra ----
function renderCompra(){
  const z=document.getElementById('compra-zone');z.innerHTML="";
  z.appendChild(el("h2","titulo-vista",t('compra_title')));
  const add=el("div","compra-add");
  const inp=el("input","txt");inp.placeholder=t('compra_add_ph');
  const fn=()=>{const x=inp.value.trim();if(!x)return;const n=getCompra();n.push({texto:x,hecho:false,id:x+"-"+Math.random().toString(36).slice(2,7)});setCompraLS(n);renderCompra();renderNav();};
  inp.onkeydown=e=>{if(e.key==="Enter")fn()};
  const ab=el("button",null,"+");ab.onclick=fn;add.append(inp,ab);z.appendChild(add);
  let items=getCompra();
  if(!items.length){z.appendChild(el("div","vacio",`<div class="em">🛒</div><p>${t('compra_vacio')}</p>`));return;}
  const tg=id=>{setCompraLS(getCompra().map(i=>i.id===id?{...i,hecho:!i.hecho}:i));renderCompra();renderNav();};
  const br=id=>{setCompraLS(getCompra().filter(i=>i.id!==id));renderCompra();renderNav();};
  items.forEach(it=>{
    const d=el("div","compra-item"+(it.hecho?" done":""));
    const c=el("button","check"+(it.hecho?" on":""),it.hecho?"✓":"");c.onclick=()=>tg(it.id);
    const tx=el("span","tx",it.texto);const x=el("button","compra-x","×");x.onclick=()=>br(it.id);
    d.append(c,tx,x);z.appendChild(d);
  });
}

// ============ i18n: aplicar idioma a toda la interfaz ============
function aplicarIdioma(){
  document.querySelectorAll('[data-i18n]').forEach(elem=>{const v=t(elem.dataset.i18n); if(v!=null) elem.textContent=v;});
  document.querySelectorAll('[data-i18n-html]').forEach(elem=>{const v=t(elem.dataset.i18nHtml); if(v!=null) elem.innerHTML=v;});
  syncComensales();
  buildCesta();
  buildAntojoForm();
  buildAcciones('acc-tengo','tengo');
  buildAcciones('acc-antojo','antojo');
  renderNav();
  const fz=document.getElementById('fav-zone'); if(fz&&fz.children.length) renderFavoritos();
  const cz=document.getElementById('compra-zone'); if(cz&&cz.children.length) renderCompra();
}

// ============ INIT ============
buildComensales(document.getElementById('com-tengo'));
buildComensales(document.getElementById('com-antojo'));
buildPizarra();buildCesta();updateN();
buildAntojoForm();buildCarta();
buildAcciones('acc-tengo','tengo');buildAcciones('acc-antojo','antojo');
renderNav();
document.getElementById('logo').onclick=()=>go('home');
go('home');
aplicarIdioma();
