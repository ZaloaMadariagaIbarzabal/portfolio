<?php
// ───────────────────────────────────────────────────────────
//  api/traducir.php  ──  traduce textos de recetas a EU o EN
//
//  Recibe:  { "idioma": "eu" | "en", "textos": ["...", "...", ...] }
//  Devuelve: { "ok": true, "traducciones": ["...", "...", ...] }
//
//  Usa la MISMA clave de IA de config.php. Si no hay clave (o falla),
//  devuelve los textos originales en español: la app sigue funcionando.
//  El orden de salida coincide con el de entrada, 1 a 1.
// ───────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
require __DIR__ . '/config.php';

$body   = json_decode(file_get_contents('php://input'), true) ?? [];
$idioma = $body['idioma'] ?? 'es';
$textos = $body['textos'] ?? [];

// Sin idioma destino válido o sin textos → devolver tal cual
if (!in_array($idioma, ['eu', 'en'], true) || empty($textos) || !is_array($textos)) {
    echo json_encode(['ok' => true, 'traducciones' => array_values($textos)], JSON_UNESCAPED_UNICODE);
    exit;
}

// Sin clave de IA → degradación elegante: español
if (empty($ANTHROPIC_API_KEY) || !function_exists('curl_init')) {
    echo json_encode(['ok' => true, 'traducciones' => array_values($textos), 'sin_ia' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

$nombreIdioma = $idioma === 'eu' ? 'euskera (vasco)' : 'inglés';

// Enviamos los textos numerados y pedimos un JSON array en el mismo orden.
$lista = '';
foreach (array_values($textos) as $i => $txt) {
    $lista .= ($i + 1) . '. ' . str_replace(["\n", "\r"], ' ', $txt) . "\n";
}

$prompt = "Eres un traductor gastronómico profesional. Traduce al $nombreIdioma los siguientes textos de una receta de cocina. "
    . "Mantén el tono, las cantidades y los nombres propios de platos cuando proceda. No añadas comentarios. "
    . "Responde SOLO con un array JSON de cadenas, en el MISMO orden y con el MISMO número de elementos que la entrada, "
    . "sin markdown ni texto adicional.\n\nTextos:\n" . $lista;

$payload = json_encode([
    'model'      => $MODELO,
    'max_tokens' => 4000,
    'messages'   => [['role' => 'user', 'content' => $prompt]],
]);

$ch = curl_init('https://api.anthropic.com/v1/messages');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . $ANTHROPIC_API_KEY,
        'anthropic-version: 2023-06-01',
    ],
    CURLOPT_TIMEOUT => 60,
]);
$resp = curl_exec($ch);
curl_close($ch);

// Cualquier fallo → español
if ($resp === false) {
    echo json_encode(['ok' => true, 'traducciones' => array_values($textos), 'error' => 'sin_respuesta'], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($resp, true);
$text = '';
foreach ($data['content'] ?? [] as $b) {
    if (($b['type'] ?? '') === 'text') $text .= $b['text'];
}
$text = trim(str_replace(['```json', '```'], '', $text));
$arr  = json_decode($text, true);

// Si la traducción no es válida o no cuadra el número de elementos → español
if (!is_array($arr) || count($arr) !== count($textos)) {
    echo json_encode(['ok' => true, 'traducciones' => array_values($textos), 'error' => 'formato'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true, 'traducciones' => array_values($arr)], JSON_UNESCAPED_UNICODE);
