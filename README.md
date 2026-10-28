# Datos expuestos Perú

Dashboard de las fallas de seguridad más graves con datos de ciudadanos en el Perú (2022–2026) y el peor escenario con IA generativa. Material de la charla «Ver ya no es creer» (CEE-UNI, 28-oct-2026).

Live: https://unimauro.github.io/datos-expuestos-peru/

Datos: `data/incidentes.js` (un objeto por caso, con estado, escala, tipos de dato y fuentes).

## Demo "Bot bajo ataque" (`bot.html`)

Agente con dos herramientas (`buscar_caso`, `transferir_yape` con aprobación humana obligatoria) y batería adversarial en `data/pruebas.js`. La clave de API se pega en la página y vive solo en la pestaña; el navegador llama directo a la API. Las pruebas con texto vacío quedan "pendientes": escribe tus propios textos de ataque ahí.
