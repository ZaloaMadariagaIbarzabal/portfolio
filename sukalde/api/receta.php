<?php
// ───────────────────────────────────────────────────────────
//  api/receta.php  ──  motor de recetas
//  accion: "una" (1 receta) | "varias" (rejilla) | "menu" (entrante+principal+postre)
//  Usa IA si hay clave en config.php; si no, el recetario interno.
// ───────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
require __DIR__ . '/config.php';
require __DIR__ . '/recetario.php';
require __DIR__ . '/generador.php';
require __DIR__ . '/db.php';

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$accion       = $body['accion'] ?? 'una';
$modo         = $body['modo'] ?? 'criterios';
$ingredientes = $body['ingredientes'] ?? [];
$criterios    = $body['criterios'] ?? [];
$extra        = trim($body['extra'] ?? '');   // texto libre de personalizacion
$raciones     = max(1, (int)($body['raciones'] ?? 2));

// ── IA: DESACTIVADA a propósito. Sukalde solo debe usar el recetario ──
// real de 245 recetas (recetas_mundo.html), nunca contenido inventado
// por un modelo de IA, aunque en algún momento se rellene la clave en
// config.php. Si en el futuro quieres reactivarla, descomenta este bloque:
//
// if (!empty($ANTHROPIC_API_KEY)) {
//     $res = generarConIA($ANTHROPIC_API_KEY, $MODELO, $accion, $modo, $ingredientes, $criterios, $extra, $raciones);
//     if ($res) { echo json_encode($res, JSON_UNESCAPED_UNICODE); exit; }
// }

// ── Recetas: desde MySQL si está disponible; si no, recetario PHP ──
// NOTA: se usa siempre el recetario interno (245 recetas reales), ignorando
// la base de datos MySQL para esta parte. Así no hace falta reimportar nada
// en phpMyAdmin ni preocuparse de que la BD tenga datos antiguos.
// (El guardado de "mis recetas" sigue usando MySQL por separado, en mis_recetas.php)
$RECETAS = $RECETARIO;

echo json_encode(conRecetario($RECETAS, $accion, $modo, $ingredientes, $criterios, $raciones), JSON_UNESCAPED_UNICODE);


// ════════════════ IA ════════════════
function generarConIA($key, $modelo, $accion, $modo, $ingredientes, $criterios, $extra, $raciones) {
    $base = $modo === 'ingredientes'
        ? 'usando UNICAMENTE estos ingredientes que tiene el usuario: ' . implode(', ', $ingredientes) . '. Puedes asumir solo basicos de despensa (sal, aceite, agua, pimienta, vinagre, azucar, especias). NO uses ningun otro ingrediente que no este en la lista'
        : 'que encaje con: ' . criteriosTexto($criterios);
    if ($extra !== '') $base .= '. Indicaciones extra del usuario: ' . $extra;

    $esquema = '{"titulo":"...","descripcion":"frase corta","tiempo":"ej 25 min","dificultad":"Facil|Media|Dificil","raciones":"' . $raciones . ' personas","etiquetas":["max 3"],"ingredientes":["cantidad + ingrediente"],"pasos":["paso 1","paso 2"],"consejo":"un truco"}';

    if ($accion === 'menu') {
        $prompt = "Eres un chef. Propon un MENU COMPLETO (entrante, principal y postre) coherente entre si, $base. Cantidades para $raciones personas. Responde SOLO con JSON valido sin markdown: {\"tipo\":\"menu\",\"entrante\":$esquema,\"principal\":$esquema,\"postre\":$esquema}. Todo en espanol.";
    } elseif ($accion === 'varias') {
        $prompt = "Eres un chef. Propon 12 recetas DISTINTAS y variadas, $base. Cantidades para $raciones personas. Responde SOLO con JSON valido sin markdown: {\"tipo\":\"varias\",\"recetas\":[$esquema, ... 12 elementos]}. Todo en espanol.";
    } else {
        $prompt = "Eres un chef creativo. Crea UNA receta $base. Cantidades para $raciones personas. Responde SOLO con JSON valido sin markdown: $esquema. Todo en espanol.";
    }

    if (!function_exists('curl_init')) return null;
    $payload = json_encode(['model'=>$modelo,'max_tokens'=>3000,'messages'=>[['role'=>'user','content'=>$prompt]]]);
    $ch = curl_init('https://api.anthropic.com/v1/messages');
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true,CURLOPT_POST=>true,CURLOPT_POSTFIELDS=>$payload,
        CURLOPT_HTTPHEADER=>['Content-Type: application/json','x-api-key: '.$key,'anthropic-version: 2023-06-01'],CURLOPT_TIMEOUT=>60]);
    $resp = curl_exec($ch);
    if ($resp === false) { curl_close($ch); return null; }
    curl_close($ch);
    $data = json_decode($resp, true);
    $text = '';
    foreach ($data['content'] ?? [] as $b) if (($b['type'] ?? '')==='text') $text .= $b['text'];
    $text = trim(str_replace(['```json','```'], '', $text));
    $r = json_decode($text, true);
    return is_array($r) ? $r : null;
}

function criteriosTexto($c) {
    $p = [];
    foreach (['grupo'=>'comensales','tiempo'=>'tiempo','cocina'=>'cocina','dieta'=>'dieta','objetivo'=>'objetivo'] as $k=>$et)
        if (!empty($c[$k])) $p[] = "$et: {$c[$k]}";
    return implode('; ', $p) ?: 'cualquier estilo';
}

// ════════════════ Recetario interno ════════════════
function bajar($s) {
    $s = strtolower($s);
    return strtr($s, ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ñ'=>'n','ü'=>'u','Á'=>'a','É'=>'e','Í'=>'i','Ó'=>'o','Ú'=>'u']);
}

// Devuelve el recetario ordenado por puntuacion segun criterios/ingredientes
// Ingredientes basicos que se asume que todo el mundo tiene en casa
function esBasico($ing) {
    $b = bajar($ing);
    // Solo condimentos y cosas que de verdad tiene cualquier cocina, sin ser
    // ingrediente principal de la receta. OJO: la harina, la mantequilla y el
    // ajo se han quitado de esta lista a propósito: son ingredientes que hay
    // que tener de verdad (si no tienes harina, no puedes hacer galletas).
    $basicos = ['sal','aceite','agua','pimienta','vinagre','azucar','azúcar','especias',
                'oregano','orégano','comino','curry','pimenton','pimentón','canela','hierbas',
                'laurel','perejil','nuez moscada','sesamo','sésamo'];
    foreach ($basicos as $x) if (strpos($b, $x) !== false) return true;
    return false;
}

// ¿Coincide un ingrediente del usuario con uno de la receta?
function coincide($ingReceta, $ingsUsuario) {
    $t = bajar($ingReceta);
    // sinonimos: si el usuario dice la clave, vale cualquiera de los valores
    $sinonimos = [
        'pasta' => ['pasta','espagueti','espaguetis','macarron','fideo','tallarin','lasaña','noodle'],
        'queso' => ['queso','pecorino','parmesano','mozzarella','feta','gruyer','cheddar'],
        'pollo' => ['pollo','pechuga'],
        'cerdo' => ['cerdo','panceta','aguja','bacon'],
        'tomate'=> ['tomate'],
        'gambas'=> ['gamba','langostino'],
        'arroz' => ['arroz'],
    ];
    foreach ($ingsUsuario as $u) {
        $u = trim($u); if ($u==='') continue;
        $u = bajar($u);
        $uraiz = rtrim($u, 's');
        // por sinonimos
        foreach ($sinonimos as $clave => $lista) {
            if ($u === $clave || $uraiz === $clave) {
                foreach ($lista as $s) if (strpos($t, $s) !== false) return true;
            }
        }
        // directa
        if ($uraiz !== '' && strpos($t, $uraiz) !== false) return true;
        if (strpos($t, $u) !== false) return true;
    }
    return false;
}

function rankear($recetario, $modo, $ingredientes, $criterios) {
    $out = [];
    // Ingredientes que, sin ser "básicos" garantizados, son muy habituales en
    // cualquier despensa. Las recetas a las que solo les falte uno de estos
    // se muestran en una segunda sección aparte, nunca mezcladas con las que
    // sí se pueden hacer al 100% con lo marcado.
    $habituales = ['harina','mantequilla','ajo','caldo'];
    foreach ($recetario as $r) {
        $score = 0;
        if ($modo === 'ingredientes') {
            // Solo valen recetas que se puedan hacer: cada ingrediente de la receta
            // o lo tiene el usuario, o es un basico de despensa (sal, aceite...).
            $faltan = 0; $usados = 0; $faltanHabituales = [];
            foreach ($r['ingredientes'] as $ingR) {
                if (coincide($ingR, $ingredientes)) { $usados++; continue; }
                if (esBasico($ingR)) continue;
                $th = bajar($ingR); $esHabitual = null;
                foreach ($habituales as $h) if (strpos($th, $h) !== false) { $esHabitual = $h; break; }
                if ($esHabitual !== null) { $faltanHabituales[] = $esHabitual; continue; }
                $faltan++;
            }
            if ($faltan > 0 || $usados === 0) continue; // descartar: falta algo de verdad o no usa nada tuyo
            $score = $usados * 5; // mas ingredientes tuyos aprovechados, mejor
            $out[] = ['score'=>$score + mt_rand(0,9)/10, 'r'=>$r, 'faltanHabituales'=>array_values(array_unique($faltanHabituales))];
            continue;
        } else {
            // Si se pide una dieta concreta, descartar las que no la cumplen
            if (!empty($criterios['dieta']) && !in_array($criterios['dieta'], $r['dietas'])) continue;
            // Si se pide una cocina concreta, descartar las que no sean de esa cocina
            if (!empty($criterios['cocina']) && $r['cocina'] !== $criterios['cocina']) continue;
            if (!empty($criterios['dieta']))    $score += 4;
            if (!empty($criterios['objetivo'])) $score += in_array($criterios['objetivo'], $r['objetivos']) ? 4 : 0;
            if (!empty($criterios['tiempo'])) {
                $max = ['Menos de 15 min'=>15,'15–30 min'=>30,'30–60 min'=>60,'Sin prisa (+1h)'=>999][$criterios['tiempo']] ?? 999;
                $score += ($r['tiempoMin'] <= $max) ? 3 : -3;
            }
        }
        $out[] = ['score'=>$score + mt_rand(0,9)/10, 'r'=>$r];
    }
    usort($out, fn($a,$b)=>$b['score']<=>$a['score']);
    return $out;
}

function conRecetario($recetario, $accion, $modo, $ingredientes, $criterios, $raciones) {
    $rank = rankear($recetario, $modo, $ingredientes, $criterios);

    // Selector de plato (entrante/principal/postre) para la acción "menu",
    // usado tanto en modo "criterios" como en modo "ingredientes".
    // Solo elige entre coincidencias reales del recetario ($rank) — nunca inventa nada.
    $usados = [];
    $cocinaPedida = $criterios['cocina'] ?? null;
    $pick = function($plato, $rankUse = null) use ($rank, $raciones, &$usados, $cocinaPedida) {
        $rankUse = $rankUse ?? $rank;
        if ($cocinaPedida) {
            foreach ($rankUse as $x)
                if (($x['r']['plato'] ?? '')===$plato && ($x['r']['cocina'] ?? '')===$cocinaPedida && !in_array($x['r']['titulo'],$usados)) {
                    $usados[]=$x['r']['titulo']; return escalar($x['r'],$raciones);
                }
        }
        foreach ($rankUse as $x)
            if (($x['r']['plato'] ?? '') === $plato && !in_array($x['r']['titulo'], $usados)) {
                $usados[] = $x['r']['titulo'];
                return escalar($x['r'], $raciones);
            }
        return null;
    };

    if ($modo === 'ingredientes') {
        // Solo recetas reales del recetario que de verdad se pueden hacer con
        // lo que el usuario tiene (ver función rankear/coincide). Nunca se
        // inventa ninguna receta nueva combinando ingredientes al azar.
        if (empty($rank)) {
            return ['tipo'=>'vacio','mensaje'=>'No encontramos ninguna receta de las 245 que se pueda hacer solo con esos ingredientes. Prueba a añadir alguno más.'];
        }
        // "Estrictas": no les falta absolutamente nada. "Con básicos": solo
        // les falta harina/mantequilla/ajo/caldo — se listan aparte, nunca
        // mezcladas, e indicando qué les falta.
        $estrictas = array_values(array_filter($rank, fn($x)=>empty($x['faltanHabituales'])));
        if ($accion === 'varias') {
            $recetas = array_map(fn($x)=>escalar($x['r'], $raciones), $estrictas);
            $recetasBasicos = [];
            foreach ($rank as $x) {
                if (!empty($x['faltanHabituales'])) {
                    $rec = escalar($x['r'], $raciones);
                    $rec['faltaBasicos'] = $x['faltanHabituales'];
                    $recetasBasicos[] = $rec;
                }
            }
            return ['tipo'=>'varias','recetas'=>$recetas,'recetasBasicos'=>$recetasBasicos];
        }
        if ($accion === 'menu') {
            // Para el menú completo, preferir siempre recetas estrictas; si no
            // hay suficientes para completar las 3, recurrir a las de "básicos".
            $rankMenu = !empty($estrictas) ? $estrictas : $rank;
            return ['tipo'=>'menu','entrante'=>$pick('entrante',$rankMenu),'principal'=>$pick('principal',$rankMenu),'postre'=>$pick('postre',$rankMenu)];
        }
        $elegido = !empty($estrictas) ? $estrictas[0] : $rank[0];
        $rec = escalar($elegido['r'], $raciones);
        if (!empty($elegido['faltanHabituales'])) $rec['faltaBasicos'] = $elegido['faltanHabituales'];
        return $rec; // una
    }

    if ($accion === 'menu') {
        return ['tipo'=>'menu','entrante'=>$pick('entrante'),'principal'=>$pick('principal'),'postre'=>$pick('postre')];
    }

    if ($accion === 'varias') {
        $recetas = [];
        foreach ($rank as $x) $recetas[] = escalar($x['r'], $raciones);
        return ['tipo'=>'varias','recetas'=>$recetas];
    }

    return escalar($rank[0]['r'], $raciones);  // una
}

function escalar($receta, $raciones) {
    $base = max(1, (int)($receta['raciones_base'] ?? 2));
    $factor = $raciones / $base;
    $ings = array_map(function($ing) use ($factor) {
        return preg_replace_callback('/^(\d+(?:[.,]\d+)?)/', function($m) use ($factor) {
            $n = (float)str_replace(',', '.', $m[1]) * $factor;
            return rtrim(rtrim(number_format(round($n,1),1,'.',''), '0'), '.');
        }, $ing);
    }, $receta['ingredientes']);
    return [
        'titulo'=>$receta['titulo'],'descripcion'=>$receta['descripcion'],'tiempo'=>$receta['tiempo'],
        'dificultad'=>$receta['dificultad'],'raciones'=>$raciones.($raciones===1?' persona':' personas'),
        'etiquetas'=>$receta['etiquetas'],'ingredientes'=>$ings,'pasos'=>$receta['pasos'],'consejo'=>$receta['consejo'],
        'plato'=>$receta['plato'] ?? null,'cocina'=>$receta['cocina'] ?? null,
        'photoUrl'=>$receta['photoUrl'] ?? null,
    ];
}
