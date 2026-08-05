<?php
// ───────────────────────────────────────────────────────────
//  generador.php · crea recetas "al vuelo" combinando los
//  ingredientes que tiene el usuario. Sin IA, sin recetario.
//  Garantiza que SIEMPRE haya recetas con cualquier combinacion.
// ───────────────────────────────────────────────────────────

// Clasificacion de ingredientes (en minusculas sin tilde via baja2)
function baja2($s){
    $s = strtolower($s);
    return strtr($s, ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ñ'=>'n','ü'=>'u']);
}

// Devuelve la "familia" de un ingrediente
function familia($ing){
    $i = baja2($ing);
    $map = [
        'proteina_carne' => ['pollo','ternera','cerdo','carne picada','pavo','bacon','jamon','chorizo','salchichas','cordero'],
        'proteina_pescado' => ['salmon','atun','bonito','merluza','bacalao','gambas','mejillones','calamares','anchoas','pulpo'],
        'huevo' => ['huevos','huevo'],
        'lacteo' => ['leche','mantequilla','nata','queso','mozzarella','parmesano','feta','yogur','mascarpone'],
        'verdura' => ['tomate','cebolla','ajo','pimiento','calabacin','berenjena','zanahoria','brocoli','espinacas','patata','champinones','lechuga','pepino','calabaza','puerro','setas'],
        'fruta' => ['limon','lima','naranja','manzana','platano','aguacate','mango','fresas','pina','pera'],
        'carbo' => ['arroz','pasta','espaguetis','fideos','pan','harina','quinoa','cuscus','avena','tortillas'],
        'legumbre' => ['garbanzos','lentejas','judias','alubias','soja','tofu'],
        'fruto_seco' => ['nueces','almendras','cacahuetes','tahini'],
        'dulce' => ['azucar','miel','chocolate','cacao'],
    ];
    foreach ($map as $fam => $lista) {
        foreach ($lista as $x) if (strpos($i, $x) !== false) return $fam;
    }
    return 'otro';
}

// agrupa los ingredientes del usuario por familia
function agrupar($ings){
    $g = [];
    foreach ($ings as $ing) {
        $ing = trim($ing); if ($ing==='') continue;
        $g[familia($ing)][] = $ing;
    }
    return $g;
}

function tiene($g, ...$fams){ foreach($fams as $f) if(!empty($g[$f])) return true; return false; }
function primero($g, $f){ return $g[$f][0] ?? null; }

// genera UNA receta combinando lo que hay
function generarReceta($ings, $raciones, $semilla=0){
    $g = agrupar($ings);
    mt_srand($semilla + count($ings));

    // candidatas: cada plantilla devuelve null si no aplica, o una receta
    $plantillas = [];

    // Salteado / wok: proteina + verdura
    if (tiene($g,'proteina_carne','proteina_pescado','tofu') && tiene($g,'verdura')) {
        $prot = primero($g,'proteina_carne') ?? primero($g,'proteina_pescado') ?? primero($g,'legumbre');
        $verd = $g['verdura'];
        $plantillas[] = [
            'titulo' => "Salteado de ".strtolower($prot)." con verduras",
            'descripcion' => "Un salteado rápido y sabroso aprovechando lo que tienes.",
            'tiempo' => "20 min", 'dificultad' => "Fácil",
            'etiquetas' => ["Rápida","Salteado"],
            'ingredientes' => array_merge(["1 ".$prot], array_map(fn($v)=>"1 ".$v, array_slice($verd,0,3)), ["Aceite de oliva","Sal y pimienta","1 diente de ajo"]),
            'pasos' => ["Corta la proteína y las verduras en trozos no muy grandes.","Calienta aceite con el ajo en una sartén o wok a fuego fuerte.","Saltea primero la proteína 4-5 minutos y retírala.","Saltea las verduras 4-5 minutos, devuelve la proteína, salpimienta y sirve."],
            'consejo' => "Fuego fuerte y sin amontonar para que dore en vez de cocer."
        ];
    }

    // Ensalada: verdura (o fruta) sin necesidad de cocinar
    if (tiene($g,'verdura') || (tiene($g,'fruta') && tiene($g,'lacteo'))) {
        $items = array_merge($g['verdura'] ?? [], array_slice($g['fruta'] ?? [],0,1));
        if ($items) {
            $extra = [];
            if (!empty($g['lacteo'])) $extra[] = $g['lacteo'][0];
            if (!empty($g['proteina_pescado'])) $extra[] = $g['proteina_pescado'][0];
            if (!empty($g['fruto_seco'])) $extra[] = $g['fruto_seco'][0];
            $plantillas[] = [
                'titulo' => "Ensalada de ".strtolower($items[0]).(count($items)>1?" y ".strtolower($items[1]):""),
                'descripcion' => "Fresca, rápida y sin encender el fuego.",
                'tiempo' => "10 min", 'dificultad' => "Fácil",
                'etiquetas' => ["Fresca","Sin cocción"],
                'ingredientes' => array_merge(array_map(fn($v)=>"1 ".$v, array_slice($items,0,4)), array_map(fn($e)=>$e, $extra), ["Aceite de oliva","Sal","Un chorrito de vinagre o limón"]),
                'pasos' => ["Lava y corta los ingredientes en trozos del tamaño de un bocado.","Colócalos en un bol grande.","Aliña con aceite, sal y vinagre o limón.","Mezcla con suavidad y sirve enseguida."],
                'consejo' => "Aliña justo antes de servir para que no se ablande."
            ];
        }
    }

    // Revuelto / tortilla: huevo + lo que sea
    if (tiene($g,'huevo')) {
        $acomp = [];
        foreach (['verdura','proteina_carne','lacteo'] as $f) if (!empty($g[$f])) $acomp[] = $g[$f][0];
        $plantillas[] = [
            'titulo' => "Revuelto de huevo".($acomp?" con ".strtolower($acomp[0]):""),
            'descripcion' => "Cena rápida y reconfortante en una sartén.",
            'tiempo' => "12 min", 'dificultad' => "Fácil",
            'etiquetas' => ["Rápida","Huevo"],
            'ingredientes' => array_merge(["3 huevos"], array_map(fn($a)=>"1 ".$a, array_slice($acomp,0,2)), ["Aceite de oliva","Sal y pimienta"]),
            'pasos' => ["Si usas verduras o carne, saltéalas primero en la sartén.","Bate los huevos con sal y pimienta.","Añádelos a la sartén a fuego medio-bajo.","Remueve con suavidad hasta que cuajen al gusto y sirve."],
            'consejo' => "Apártalo del fuego un poco antes: el huevo sigue cuajando con el calor."
        ];
    }

    // Plato de pasta/arroz: carbo + algo
    if (tiene($g,'carbo')) {
        $carbo = $g['carbo'][0];
        $sal = [];
        foreach (['proteina_carne','proteina_pescado','verdura','lacteo'] as $f) if (!empty($g[$f])) $sal[] = $g[$f][0];
        if ($sal) {
            $plantillas[] = [
                'titulo' => ucfirst(strtolower($carbo))." con ".strtolower($sal[0]),
                'descripcion' => "Un plato completo y saciante con lo que tienes.",
                'tiempo' => "25 min", 'dificultad' => "Fácil",
                'etiquetas' => ["Completo","Reconfortante"],
                'ingredientes' => array_merge(["200 g de ".$carbo], array_map(fn($s)=>"1 ".$s, array_slice($sal,0,3)), ["Aceite de oliva","Sal","1 diente de ajo"]),
                'pasos' => ["Cuece el ".strtolower($carbo)." según el paquete y escúrrelo.","Mientras, saltea en aceite el ajo y el resto de ingredientes.","Mezcla todo en la sartén un par de minutos.","Rectifica de sal y sirve caliente."],
                'consejo' => "Guarda un poco del agua de cocción para ligar la salsa."
            ];
        }
    }

    // Crema / puré: varias verduras
    if (!empty($g['verdura']) && count($g['verdura']) >= 2) {
        $v = $g['verdura'];
        $plantillas[] = [
            'titulo' => "Crema de ".strtolower($v[0])." y ".strtolower($v[1]),
            'descripcion' => "Suave y reconfortante, ideal para la cena.",
            'tiempo' => "30 min", 'dificultad' => "Fácil",
            'etiquetas' => ["Caliente","Reconfortante"],
            'ingredientes' => array_merge(array_map(fn($x)=>"2 ".$x, array_slice($v,0,3)), ["1 cebolla","Aceite de oliva","Sal","Agua o caldo"]),
            'pasos' => ["Pela y trocea las verduras.","Sofríelas en una olla con aceite 5 minutos.","Cubre con agua o caldo y cuece 20 minutos.","Tritura hasta que quede fina, sazona y sirve."],
            'consejo' => "Un chorrito de aceite crudo al servir le da brillo y sabor."
        ];
    }

    // Postre con fruta + lácteo o dulce
    if (tiene($g,'fruta') && (tiene($g,'lacteo') || tiene($g,'dulce','fruto_seco'))) {
        $fr = $g['fruta'][0];
        $base = $g['lacteo'][0] ?? ($g['dulce'][0] ?? 'yogur');
        $plantillas[] = [
            'titulo' => ucfirst(strtolower($fr))." con ".strtolower($base),
            'descripcion' => "Un postre sencillo y dulce para terminar.",
            'tiempo' => "5 min", 'dificultad' => "Fácil",
            'etiquetas' => ["Dulce","Rápida"],
            'ingredientes' => array_merge(["2 ".$fr, $base], (!empty($g['dulce'])?[$g['dulce'][0]]:["Un poco de miel o azúcar"]), (!empty($g['fruto_seco'])?[$g['fruto_seco'][0]]:[])),
            'pasos' => ["Lava y corta la fruta.","Disponla en un bol o copa.","Acompaña con el ".strtolower($base)." y un toque dulce.","Sirve frío."],
            'consejo' => "Frío de nevera está mucho más rico."
        ];
    }

    // Tostada / montadito: pan + algo
    if (tiene($g,'carbo')) {
        $tienePan = false; foreach ($g['carbo'] as $c) if (strpos(baja2($c),'pan')!==false||strpos(baja2($c),'tortilla')!==false) $tienePan=true;
        if ($tienePan) {
            $top = [];
            foreach (['lacteo','verdura','proteina_carne','fruta'] as $f) if (!empty($g[$f])) $top[] = $g[$f][0];
            if ($top) {
                $plantillas[] = [
                    'titulo' => "Tostada de ".strtolower($top[0]),
                    'descripcion' => "Lista en cinco minutos para picar o cenar.",
                    'tiempo' => "8 min", 'dificultad' => "Fácil",
                    'etiquetas' => ["Rápida","Para picar"],
                    'ingredientes' => array_merge(["2 rebanadas de pan"], array_map(fn($t)=>"1 ".$t, array_slice($top,0,3)), ["Aceite de oliva","Sal"]),
                    'pasos' => ["Tuesta el pan.","Coloca encima los ingredientes cortados finos.","Riega con un hilo de aceite y sal.","Sirve enseguida."],
                    'consejo' => "Frota un ajo o un tomate sobre el pan caliente para más sabor."
                ];
            }
        }
    }

    if (empty($plantillas)) {
        // ultimo recurso: plato sencillo con lo que haya
        $todos = [];
        foreach ($g as $lista) foreach ($lista as $x) $todos[] = $x;
        if (empty($todos)) return null;
        $plantillas[] = [
            'titulo' => "Salteado sencillo con ".strtolower($todos[0]),
            'descripcion' => "Una idea rápida para aprovechar lo que tienes.",
            'tiempo' => "15 min", 'dificultad' => "Fácil",
            'etiquetas' => ["Rápida","Aprovechamiento"],
            'ingredientes' => array_merge(array_map(fn($x)=>"1 ".$x, array_slice($todos,0,4)), ["Aceite de oliva","Sal y pimienta"]),
            'pasos' => ["Corta todos los ingredientes en trozos parecidos.","Calienta aceite en una sartén.","Saltea a fuego medio-alto hasta que estén hechos.","Salpimienta y sirve."],
            'consejo' => "Añade una pizca de tus especias favoritas para darle un toque."
        ];
    }

    return $plantillas;
}

// API publica: una receta, varias, o menu, usando el generador
function generarPlatos($ings, $accion, $raciones){
    $base = generarReceta($ings, $raciones, 1);
    if (!$base) return ['tipo'=>'vacio','mensaje'=>'Añade al menos un ingrediente para proponerte algo.'];

    // formatea (anadir raciones)
    $fmt = function($r) use ($raciones){
        $r['raciones'] = $raciones.($raciones===1?' persona':' personas');
        return $r;
    };
    $base = array_map($fmt, $base);

    if ($accion === 'varias') {
        return ['tipo'=>'varias','recetas'=>array_values($base)];
    }
    if ($accion === 'menu') {
        // intenta repartir: ensalada/tostada=entrante, salteado/pasta=principal, fruta=postre
        $ent=null;$pri=null;$pos=null;
        foreach ($base as $r){
            $t = baja2($r['titulo']);
            if (!$pos && (strpos($t,'con yogur')!==false||strpos($t,'con nata')!==false||strpos($t,'con leche')!==false||strpos($t,'con chocolate')!==false||strpos($t,'con miel')!==false)) {$pos=$r;continue;}
            if (!$ent && (strpos($t,'ensalada')!==false||strpos($t,'tostada')!==false||strpos($t,'crema')!==false)) {$ent=$r;continue;}
            if (!$pri) {$pri=$r;continue;}
        }
        // rellenar huecos con lo que haya
        $resto = array_values(array_filter($base, fn($r)=>$r!==$ent&&$r!==$pri&&$r!==$pos));
        if(!$ent && $resto){$ent=array_shift($resto);}
        if(!$pri && $resto){$pri=array_shift($resto);}
        if(!$pos && $resto){$pos=array_shift($resto);}
        return ['tipo'=>'menu','entrante'=>$ent,'principal'=>$pri,'postre'=>$pos];
    }
    return $base[0]; // una
}
