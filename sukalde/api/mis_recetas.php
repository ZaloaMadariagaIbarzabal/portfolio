<?php
// ───────────────────────────────────────────────────────────
//  api/mis_recetas.php · crear, listar y borrar recetas propias
//  Acciones (POST JSON): {op:"crear"|"listar"|"borrar", ...}
// ───────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/db.php';

$pdo = conectar();
if (!$pdo) { echo json_encode(['ok'=>false,'error'=>'No hay conexión con MySQL. Importa database.sql en phpMyAdmin y comprueba que MySQL está encendido en XAMPP.']); exit; }

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$op = $body['op'] ?? '';

if ($op === 'crear') {
    // separar ingredientes y pasos (vienen como texto con saltos de línea o como array)
    $data = [
        'titulo'        => trim($body['titulo'] ?? ''),
        'descripcion'   => trim($body['descripcion'] ?? ''),
        'tiempo'        => trim($body['tiempo'] ?? '30 min'),
        'tiempoMin'     => (int)($body['tiempoMin'] ?? 30),
        'dificultad'    => $body['dificultad'] ?? 'Fácil',
        'raciones_base' => (int)($body['raciones_base'] ?? 2),
        'cocina'        => trim($body['cocina'] ?? ''),
        'plato'         => $body['plato'] ?? 'principal',
        'consejo'       => trim($body['consejo'] ?? ''),
        'ingredientes'  => $body['ingredientes'] ?? [],
        'pasos'         => $body['pasos'] ?? [],
        'etiquetas'     => $body['etiquetas'] ?? [],
        'dietas'        => $body['dietas'] ?? [],
        'objetivos'     => $body['objetivos'] ?? [],
    ];
    if ($data['titulo']==='') { echo json_encode(['ok'=>false,'error'=>'El título es obligatorio.']); exit; }
    if (empty($data['ingredientes'])) { echo json_encode(['ok'=>false,'error'=>'Añade al menos un ingrediente.']); exit; }
    $id = guardarRecetaUsuario($pdo, $data);
    echo json_encode($id ? ['ok'=>true,'id'=>$id] : ['ok'=>false,'error'=>'No se pudo guardar.']);
    exit;
}

if ($op === 'listar') {
    echo json_encode(['ok'=>true,'recetas'=>listarRecetasUsuario($pdo)]);
    exit;
}

if ($op === 'borrar') {
    $ok = borrarReceta($pdo, (int)($body['id'] ?? 0));
    echo json_encode(['ok'=>$ok]);
    exit;
}

echo json_encode(['ok'=>false,'error'=>'Operación no reconocida.']);
