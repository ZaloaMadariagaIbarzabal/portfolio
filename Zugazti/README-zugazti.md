# Zugazti — Casa Rural en Gamiz-Fika, Bizkaia

Landing page de una casa rural de cuatro habitaciones en Gamiz-Fika (Bizkaia),
a 20 minutos de la playa. Diseño editorial cuidado (tipografía con carácter,
paleta orgánica inspirada en el entorno, micro-animaciones al hacer scroll)
pensado para transmitir calma y convertir visitas en reservas. Interfaz
trilingüe (ES / EU / EN).

## 🌐 Demo en vivo

*(añadir aquí el enlace de despliegue cuando esté publicada, igual que en Eskuetan)*

## 🛠️ Tecnologías

HTML5, CSS3, JavaScript (vanilla), internacionalización propia ES/EU/EN.
Sin frameworks ni dependencias externas: se abre directamente en cualquier
navegador con doble clic en `index.html`.

## Funcionalidades

| Sección | Descripción |
|---|---|
| La casa | Presentación general: jardín, salón con chimenea, mesa para ocho bajo la parra. |
| Habitaciones | Ficha de las 4 habitaciones (Gorbeia, Anboto, Sollube, Jata), cada una con nombre de monte vasco: tipo de cama, capacidad, baño y vistas. |
| Servicios | Grid de 12 comodidades (WiFi fibra, calefacción, parking, bicicletas, barbacoa, accesibilidad...) con iconos SVG propios. |
| Tarifas | Dos modalidades de precio: casa completa (320€/noche) o por habitación (95€/noche), con condiciones de temporada alta y fianza. |
| Entorno | 6 puntos de interés cercanos (Gernika, playas de Laga y Laida, bosque de Oma, cueva de Santimamiñe, Urdaibai, Gaztelugatxe) con distancia y tiempo en coche. |
| Contacto / reserva | Formulario de consulta (fechas, tipo de reserva, personas) + datos de contacto directo (email, teléfono, WhatsApp). |
| Selector de idioma | Cambio dinámico ES/EU/EN sin recargar la página, aplicado a todos los textos mediante atributos `data-i18n`. |

## Estructura

```
zugazti-zaloamadariaga/
└── index.html      # Página única: HTML, CSS e i18n en un solo archivo
```

## Cómo ejecutar

Al no depender de ningún backend ni build tool, basta con abrir el archivo:

```
Doble clic en index.html
```

o, si prefieres servirlo desde un servidor local (recomendado para evitar
restricciones del navegador con algunos recursos):

```bash
cd zugazti-zaloamadariaga
python3 -m http.server 8000
```

y abre `http://localhost:8000` en el navegador.

## 📄 Licencia

© 2026 Zaloa Madariaga · **Todos los derechos reservados**. No se permite
copiar, reutilizar ni distribuir este código sin permiso previo y por
escrito de la autora.
