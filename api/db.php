<?php
// ───────────────────────────────────────────────────────────
//  api/db.php · conexión a MySQL y consultas de recetas
// ───────────────────────────────────────────────────────────

function conectar() {
    // Datos por defecto de XAMPP (ajusta si tu MySQL usa otra cosa)
    $host = '127.0.0.1';
    $user = 'root';
    $pass = '';
    $db   = 'sukalde';
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
        ]);
        $pdo->exec("SET NAMES utf8mb4");
        return $pdo;
    } catch (Throwable $e) {
        return null; // si no hay BD, el motor usará recetario PHP + generador
    }
}

// Carga una receta completa (con ingredientes, pasos y etiquetas) por id
function cargarReceta($pdo, $id) {
    $r = $pdo->prepare("SELECT * FROM recetas WHERE id=?");
    $r->execute([$id]);
    $rec = $r->fetch();
    if (!$rec) return null;

    $ing = $pdo->prepare("SELECT texto FROM receta_ingredientes WHERE receta_id=? ORDER BY orden");
    $ing->execute([$id]);
    $pasos = $pdo->prepare("SELECT texto FROM receta_pasos WHERE receta_id=? ORDER BY orden");
    $pasos->execute([$id]);
    $et = $pdo->prepare("SELECT etiqueta,tipo FROM receta_etiquetas WHERE receta_id=?");
    $et->execute([$id]);

    $etiquetas=[]; $dietas=[]; $objetivos=[];
    foreach ($et->fetchAll() as $e) {
        if ($e['tipo']==='dieta') $dietas[]=$e['etiqueta'];
        elseif ($e['tipo']==='objetivo') $objetivos[]=$e['etiqueta'];
        else $etiquetas[]=$e['etiqueta'];
    }
    return [
        'titulo'=>$rec['titulo'],'descripcion'=>$rec['descripcion'],'tiempo'=>$rec['tiempo'],
        'tiempoMin'=>(int)$rec['tiempo_min'],'dificultad'=>$rec['dificultad'],
        'raciones_base'=>(int)$rec['raciones_base'],'cocina'=>$rec['cocina'],'plato'=>$rec['plato'],
        'consejo'=>$rec['consejo'],'photoUrl'=>$rec['photo_url'] ?? '',
        'ingredientes'=>array_column($ing->fetchAll(),'texto'),
        'pasos'=>array_column($pasos->fetchAll(),'texto'),
        'etiquetas'=>$etiquetas,'dietas'=>$dietas,'objetivos'=>$objetivos,
    ];
}

// Devuelve TODAS las recetas como array (mismo formato que el recetario PHP)
function todasLasRecetas($pdo) {
    $ids = $pdo->query("SELECT id FROM recetas ORDER BY id")->fetchAll();
    $out = [];
    foreach ($ids as $row) {
        $r = cargarReceta($pdo, $row['id']);
        if ($r) $out[] = $r;
    }
    return $out;
}

// Guarda una receta nueva del usuario. $data = array con los campos.
function guardarRecetaUsuario($pdo, $data) {
    $pdo->beginTransaction();
    try {
        $st = $pdo->prepare("INSERT INTO recetas (titulo,descripcion,tiempo,tiempo_min,dificultad,raciones_base,cocina,plato,consejo,photo_url,origen) VALUES (?,?,?,?,?,?,?,?,?,?,'usuario')");
        $st->execute([
            $data['titulo'], $data['descripcion'] ?? '', $data['tiempo'] ?? '30 min',
            (int)($data['tiempoMin'] ?? 30), $data['dificultad'] ?? 'Fácil',
            (int)($data['raciones_base'] ?? 2), $data['cocina'] ?? '', $data['plato'] ?? 'principal',
            $data['consejo'] ?? '', $data['photoUrl'] ?? '',
        ]);
        $id = $pdo->lastInsertId();
        $i=0; foreach (($data['ingredientes'] ?? []) as $ing) { if(trim($ing)==='')continue;
            $pdo->prepare("INSERT INTO receta_ingredientes (receta_id,texto,orden) VALUES (?,?,?)")->execute([$id,$ing,$i++]); }
        $i=0; foreach (($data['pasos'] ?? []) as $p) { if(trim($p)==='')continue;
            $pdo->prepare("INSERT INTO receta_pasos (receta_id,texto,orden) VALUES (?,?,?)")->execute([$id,$p,$i++]); }
        foreach (($data['etiquetas'] ?? []) as $e) { if(trim($e)==='')continue;
            $pdo->prepare("INSERT INTO receta_etiquetas (receta_id,etiqueta,tipo) VALUES (?,?,'libre')")->execute([$id,$e]); }
        foreach (($data['dietas'] ?? []) as $e) { if(trim($e)==='')continue;
            $pdo->prepare("INSERT INTO receta_etiquetas (receta_id,etiqueta,tipo) VALUES (?,?,'dieta')")->execute([$id,$e]); }
        foreach (($data['objetivos'] ?? []) as $e) { if(trim($e)==='')continue;
            $pdo->prepare("INSERT INTO receta_etiquetas (receta_id,etiqueta,tipo) VALUES (?,?,'objetivo')")->execute([$id,$e]); }
        $pdo->commit();
        return $id;
    } catch (Throwable $e) {
        $pdo->rollBack();
        return null;
    }
}

function borrarReceta($pdo, $id) {
    $st = $pdo->prepare("DELETE FROM recetas WHERE id=? AND origen='usuario'");
    $st->execute([$id]);
    return $st->rowCount() > 0;
}

function listarRecetasUsuario($pdo) {
    return $pdo->query("SELECT id,titulo,cocina,tiempo FROM recetas WHERE origen='usuario' ORDER BY creada_en DESC")->fetchAll();
}
