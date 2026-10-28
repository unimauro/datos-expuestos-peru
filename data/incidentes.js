// Fuente de datos del dashboard. Un objeto por incidente. Fechas ISO (YYYY-MM).
// estado: confirmado | alerta | sinverificar | negado
// registros: número estimado (personas o filas); null si no cuantificado.
// registros_tipo: "confirmado" | "afirmado" (lo dijo el atacante / foro) | "potencial"
window.INCIDENTES = [
  {
    id: "pide-2022", fecha: "2022-05", anio: 2022, entidad: "RENIEC vía PIDE (Estado)", sector: "Estado",
    titulo: "Venta de datos de RENIEC por WhatsApp y Telegram",
    resumen: "Páginas como “Zorrito Run Run” vendían foto, firma, huella y árbol familiar de cualquier peruano desde S/ 15. Asbanc alertó al Gobierno; RENIEC primero lo negó y luego reconoció que los datos salían por accesos de entidades a la Plataforma de Interoperabilidad del Estado (PIDE).",
    estado: "confirmado", estado_txt: "Reconocido por RENIEC",
    registros: null, registros_tipo: "potencial", escala_txt: "Toda la base consultable",
    datos: ["dni","nombre","direccion","biometria","familia"],
    vector: "Acceso legítimo abusado (usuarios de entidades públicas)",
    fuentes: [
      ["La República, 20-may-2022", "https://larepublica.pe/sociedad/2022/05/20/asbanc-alerta-sobre-filtracion-y-venta-de-datos-personales-robos-estafas-redes-sociales"],
      ["Panamericana 24 Horas", "https://panamericana.pe/24horas/nacionales/349718-asbanc-alerta-venta-datos-personales-reniec-descarta-filtracion-organismo"],
      ["Computer Weekly ES", "https://www.computerweekly.com/es/cronica/Secuestro-de-datos-a-la-peruana"]
    ]
  },
  {
    id: "interbank-2024", fecha: "2024-10", anio: 2024, entidad: "Interbank", sector: "Banca",
    titulo: "Interbank: el atacante publicó datos de clientes",
    resumen: "El banco reconoció que “algunos datos de un grupo de clientes” fueron expuestos tras un intento de extorsión. El atacante afirmó tener unos 3 millones de registros (nombres, DNI, tarjetas, historial). Intervinieron SBS, Indecopi, la ANPD y la Fiscalía de Ciberdelincuencia.",
    estado: "confirmado", estado_txt: "Exposición reconocida",
    registros: 3000000, registros_tipo: "afirmado", escala_txt: "~3 M (cifra del atacante)",
    datos: ["dni","nombre","telefono","correo","financiero"],
    vector: "Intrusión externa + extorsión",
    fuentes: [
      ["Forbes Perú, 31-oct-2024", "https://forbes.pe/actualidad/2024-10-31/interbank-justicia-inicio-investigacion-sobre-filtracion-de-datos-de-clientes/"],
      ["Computer Weekly ES", "https://www.computerweekly.com/es/cronica/Thriller-a-la-peruana-El-hackeo-de-Interbank"]
    ]
  },
  {
    id: "claro-2024", fecha: "2024-10", anio: 2024, entidad: "Claro Perú", sector: "Telecom",
    titulo: "Claro: supuesta base de clientes en foros",
    resumen: "Circuló una supuesta base de clientes de Claro. La empresa respondió que los registros “no corresponden, ni en formato ni en contenido” a sus bases de datos.",
    estado: "negado", estado_txt: "Negado por la empresa",
    registros: null, registros_tipo: "afirmado", escala_txt: "No cuantificado",
    datos: ["dni","nombre","telefono"],
    vector: "Origen no establecido",
    fuentes: [["Infobae, 31-oct-2024", "https://www.infobae.com/peru/2024/10/31/claro-sobre-supuesta-filtracion-de-los-datos-de-sus-clientes-no-hemos-detectado-ninguna-vulneracion/"]]
  },
  {
    id: "inkafarma-2025", fecha: "2025-02", anio: 2025, entidad: "Inkafarma", sector: "Retail / salud",
    titulo: "Inkafarma: alerta oficial por 4 millones de clientes",
    resumen: "El Centro Nacional de Seguridad Digital (CNSD) emitió una alerta por la filtración detectada el 7-feb-2025: DNI, teléfonos, correos, nombres, fechas de nacimiento, transacciones y credenciales de ~4 millones de clientes.",
    estado: "alerta", estado_txt: "Alerta oficial del CNSD",
    registros: 4000000, registros_tipo: "afirmado", escala_txt: "~4 M clientes",
    datos: ["dni","nombre","telefono","correo","nacimiento","financiero","credenciales"],
    vector: "Intrusión externa",
    fuentes: [["Infomercado, 27-feb-2025", "https://infomercado.pe/gobierno-alerta-filtracion-de-datos-de-4-millones-de-clientes-en-inkafarma-tras-hackeo/"]]
  },
  {
    id: "reniec-mininter-2025", fecha: "2025-04", anio: 2025, entidad: "RENIEC vía Mininter", sector: "Estado",
    titulo: "RENIEC: 15 millones de ciudadanos consultados en masa",
    resumen: "Un ciberdelincuente difundió en foros datos de unos 15 millones de peruanos con marcas de agua de RENIEC y Mininter. La jefa de RENIEC, Carmen Velarde, pidió perdón al país: el acceso indebido salió de un usuario con convenio del Mininter y falló la supervisión. Dio plazo al 23-abr para que las entidades reduzcan usuarios.",
    estado: "confirmado", estado_txt: "Reconocido por RENIEC",
    registros: 15000000, registros_tipo: "confirmado", escala_txt: "~15 M ciudadanos",
    datos: ["dni","nombre","direccion","nacimiento","biometria","familia"],
    vector: "Acceso legítimo abusado (convenio interinstitucional)",
    fuentes: [
      ["Correo, 16-abr-2025", "https://diariocorreo.pe/peru/jefa-del-reniec-pide-perdon-por-filtracion-de-datos-de-15-millones-de-peruanos-y-senala-al-mininter-noticia/"],
      ["Panamericana", "https://panamericana.pe/locales/440452-reniec-disculpa-filtracion-datos-personales-debimos-monitoreado"]
    ]
  },
  {
    id: "movistar-2025", fecha: "2025-06", anio: 2025, entidad: "Movistar Perú (Telefónica)", sector: "Telecom",
    titulo: "Movistar: 21 millones de registros en venta",
    resumen: "En un foro se ofrecieron ~21 millones de registros de clientes (DNI, nombre, dirección, plan, número). Telefónica confirmó que investigaba un posible ciberataque.",
    estado: "alerta", estado_txt: "Empresa investiga; no desmentido",
    registros: 21000000, registros_tipo: "afirmado", escala_txt: "~21 M registros",
    datos: ["dni","nombre","direccion","telefono","correo"],
    vector: "Intrusión externa (en investigación)",
    fuentes: [
      ["Genbeta, jun-2025", "https://www.genbeta.com/actualidad/dicen-haber-filtrado-22-millones-datos-clientes-movistar-esto-que-se-sabe-momento"],
      ["DPL News", "https://dplnews.com/?p=276763"]
    ]
  },
  {
    id: "bn-2025", fecha: "2025-06", anio: 2025, entidad: "Banco de la Nación", sector: "Banca",
    titulo: "Banco de la Nación: 60 mil registros en foros",
    resumen: "Se publicaron en foros clandestinos “más de 60 mil registros” (nombres, correos, DNI). El banco dijo que tras un análisis riguroso “no se han detectado vulnerabilidades”.",
    estado: "negado", estado_txt: "Negado por la entidad",
    registros: 60000, registros_tipo: "afirmado", escala_txt: "~60 mil (afirmado)",
    datos: ["dni","nombre","correo"],
    vector: "Origen no establecido",
    fuentes: [["Infobae, 28-jun-2025", "https://www.infobae.com/peru/2025/06/28/banco-de-la-nacion-sobre-hackeo-de-60-mil-datos-de-clientes-no-se-detectaron-vulnerabilidades/"]]
  },
  {
    id: "dirin-2025", fecha: "2025-09", anio: 2025, entidad: "PNP · Dirección de Inteligencia", sector: "Estado",
    titulo: "DIRIN Leaks: inteligencia policial 2023–2025 expuesta",
    resumen: "Se filtraron informes de la Dirección de Inteligencia (seguimientos a fiscales, prófugos y políticos, 2023–2025). El comandante general de la PNP descartó un hackeo externo y habló de una filtración interna: un usuario con acceso extrajo la información.",
    estado: "confirmado", estado_txt: "Reconocido como filtración interna",
    registros: null, registros_tipo: "potencial", escala_txt: "No cuantificado · sensibilidad máxima",
    datos: ["dni","nombre","direccion","inteligencia"],
    vector: "Insider con acceso legítimo",
    fuentes: [
      ["Correo", "https://diariocorreo.pe/politica/hackeo-a-direccion-de-inteligencia-de-la-pnp-revela-seguimiento-a-fiscales-y-profugos-vladimir-cerron-noticia/"],
      ["El Tiempo (Piura)", "https://eltiempo.pe/nacional/hackers-filtran-informacion-secreta-de-la-direccion-de-inteligencia-de-la-pnp/"]
    ]
  },
  {
    id: "padron-2025", fecha: "2025-10", anio: 2025, entidad: "RENIEC · padrón electoral", sector: "Estado",
    titulo: "Padrón electoral: datos a la vista con solo un DNI",
    resumen: "La consulta pública del padrón inicial 2026 mostraba datos de cualquier elector con solo digitar su DNI. Contraloría y JNJ abrieron investigación; RENIEC sostiene que no hubo filtración ni hackeo.",
    estado: "alerta", estado_txt: "Exposición por diseño; RENIEC niega filtración",
    registros: 27000000, registros_tipo: "potencial", escala_txt: "Potencialmente todo el padrón (~27 M)",
    datos: ["dni","nombre","direccion"],
    vector: "Diseño del servicio (sin autenticación)",
    fuentes: [
      ["El Comercio", "https://elcomercio.pe/lima/reniec-denuncian-exposicion-de-datos-en-web-de-consulta-sobre-padron-electoral-inicial-ultimas-noticia/"],
      ["Infobae, 5-nov-2025", "https://www.infobae.com/peru/2025/11/05/jefa-de-reniec-asegura-que-no-hubo-filtracion-de-datos-tras-polemica-por-publicacion-del-padron-2026/"]
    ]
  },
  {
    id: "telegram-2025", fecha: "2025-11", anio: 2025, entidad: "Bots de Telegram (mercado de datos)", sector: "Mercado ilegal",
    titulo: "Bots de Telegram venden tu DNI, huella y hogar; se paga por Yape o Plin",
    resumen: "Derechos Digitales analizó 27 grupos y canales de Telegram (oct-2024 a nov-2025). En el Perú, el comando /dni entrega sexo, nacimiento, estado civil y fechas del documento; los bots también dan huellas, foto, firma e imágenes del DNI, y /hogar revela dirección, clasificación socioeconómica e integrantes del hogar. La consulta parcial es gratis; la completa se paga por Yape o Plin.",
    estado: "confirmado", estado_txt: "Documentado por investigación independiente",
    registros: null, registros_tipo: "potencial", escala_txt: "Cualquier peruano, a pedido",
    datos: ["dni","nombre","direccion","nacimiento","biometria","familia"],
    vector: "Reventa de bases filtradas + accesos abusados",
    fuentes: [
      ["Derechos Digitales, Identidades en venta (mar-2026)", "https://www.derechosdigitales.org/wp-content/uploads/2026/03/Identidades-en-venta_ES.pdf"],
      ["Mobile Time, 27-mar-2026", "https://mobiletime.la/noticias/27/03/2026/venta-de-datos-personales-telegram/?swcfpc=1"],
      ["RPP: bot Himiko Data", "https://rpp.pe/tecnologia/mas-tecnologia/telegram-bot-himiko-data-expone-datos-personales-de-peruanos-noticia-1474670"]
    ]
  },
  {
    id: "reniec-2026", fecha: "2026-10", anio: 2026, entidad: "RENIEC", sector: "Estado",
    titulo: "Octubre 2026: afirman tener datos de RENIEC",
    resumen: "El 18-oct-2026 un actor en foros afirmó tener registros de RENIEC. No hay confirmación independiente ni pronunciamiento verificable al cierre de esta página.",
    estado: "sinverificar", estado_txt: "Afirmado en foros · sin verificar",
    registros: null, registros_tipo: "afirmado", escala_txt: "No cuantificado",
    datos: ["dni","nombre","direccion"],
    vector: "Afirmación del atacante",
    fuentes: [["Infobae, 23-oct-2026", "https://www.infobae.com/peru/2026/10/23/hacker-deadm4n-afirma-haber-vulnerado-los-sistemas-de-essalud-y-expone-datos-de-asegurados/"]]
  },
  {
    id: "hosting-2026", fecha: "2026-10", anio: 2026, entidad: "Hosting Perú", sector: "Tecnología",
    titulo: "Octubre 2026: Hosting Perú, ~650 mil registros",
    resumen: "El 19-oct-2026 se afirmó en foros la exposición de ~650 mil registros de clientes de un proveedor de hosting. Sin verificación independiente.",
    estado: "sinverificar", estado_txt: "Afirmado en foros · sin verificar",
    registros: 650000, registros_tipo: "afirmado", escala_txt: "~650 mil (afirmado)",
    datos: ["nombre","correo","credenciales"],
    vector: "Afirmación del atacante",
    fuentes: [["Infobae, 23-oct-2026", "https://www.infobae.com/peru/2026/10/23/hacker-deadm4n-afirma-haber-vulnerado-los-sistemas-de-essalud-y-expone-datos-de-asegurados/"]]
  },
  {
    id: "telco-2026", fecha: "2026-10", anio: 2026, entidad: "Operadora móvil (API)", sector: "Telecom",
    titulo: "Octubre 2026: acceso a una API de telco; Claro lo niega",
    resumen: "El 21-oct-2026 se afirmó el acceso a datos de clientes de una operadora a través de una API. Claro negó el 26-oct que sus sistemas hayan sido vulnerados.",
    estado: "negado", estado_txt: "Negado por Claro · sin verificar",
    registros: null, registros_tipo: "afirmado", escala_txt: "No cuantificado",
    datos: ["dni","nombre","telefono"],
    vector: "Afirmación del atacante",
    fuentes: [["DPL News, 26-oct-2026", "https://dplnews.com/peru-supuesta-vulneracion-sistemas-claro/"]]
  },
  {
    id: "essalud-2026", fecha: "2026-10", anio: 2026, entidad: "EsSalud", sector: "Salud",
    titulo: "Octubre 2026: EsSalud, datos de asegurados expuestos",
    resumen: "El 22-oct-2026 el actor “DeadM4n” afirmó haber vulnerado sistemas de EsSalud y publicó muestras de datos de asegurados. Sin confirmación oficial al cierre de esta página.",
    estado: "sinverificar", estado_txt: "Afirmado en foros · sin verificar",
    registros: null, registros_tipo: "afirmado", escala_txt: "No cuantificado",
    datos: ["dni","nombre","salud"],
    vector: "Afirmación del atacante",
    fuentes: [["Infobae, 23-oct-2026", "https://www.infobae.com/peru/2026/10/23/hacker-deadm4n-afirma-haber-vulnerado-los-sistemas-de-essalud-y-expone-datos-de-asegurados/"]]
  }
];

window.TIPOS_DATO = {
  dni: "DNI", nombre: "Nombre", direccion: "Dirección", telefono: "Teléfono", correo: "Correo",
  nacimiento: "Nacimiento", biometria: "Foto / firma / huella", familia: "Familiares",
  financiero: "Financiero", credenciales: "Contraseñas", salud: "Salud", inteligencia: "Inteligencia policial"
};

window.ESTADOS = {
  confirmado:   { label: "Confirmado o reconocido", icon: "●", desc: "La entidad reconoció la exposición o la filtración." },
  alerta:       { label: "Alerta oficial / en investigación", icon: "▲", desc: "Hubo alerta del Estado o la empresa admitió investigar, sin desmentir." },
  sinverificar: { label: "Afirmado en foros, sin verificar", icon: "◆", desc: "Lo dijo el atacante; nadie lo ha confirmado de forma independiente." },
  negado:       { label: "Negado por la entidad", icon: "○", desc: "La entidad afirma que no hubo brecha en sus sistemas." }
};

// Contexto regulatorio (ANPD = Autoridad Nacional de Protección de Datos Personales)
window.YAPE = [
  { h: "El mercado de datos cobra por Yape y Plin", p: "Los bots de Telegram que venden DNI, huella, foto y dirección de cualquier peruano aceptan pago por Yape o Plin. Que la transferencia sea trazable no significa que alguien la fiscalice.", f: "Derechos Digitales, mar-2026", u: "https://www.derechosdigitales.org/wp-content/uploads/2026/03/Identidades-en-venta_ES.pdf" },
  { h: "La estafa termina en una transferencia", p: "“Bono Yape 2025”, falsas devoluciones, llamadas del “banco”, apps clonadas: la app funciona bien, al que manipulan es al usuario. Con tu nombre, DNI y número reales, el guion es a medida.", f: "El Tiempo; Kaspersky 2024", u: "https://eltiempo.pe/bonos-y-subsidios/falso-bono-yape-2025-alertan-sobre-nueva-modalidad-de-estafa-digital/" },
  { h: "Más de 20 millones de billeteras", p: "Yape y Plin concentran los pagos de persona a persona del país. Robo de celular + datos públicos = cuenta vaciada en minutos. Las respuestas (código de seguridad, bloqueo de emergencia en agentes) llegaron después del daño.", f: "Mercado Negro, jun-2026; Ground News", u: "https://www.mercadonegro.pe/actualidad/billeteras-digitales-en-peru-analisis-del-aumento-de-usuarios-y-volumen-de-transacciones/" }
];

window.CONTEXTO = [
  { n: "S/ 11 M+", t: "en multas de la ANPD en 2025", f: "MINJUS / ANPD, balance 2025", u: "https://www.gob.pe/institucion/minjus/noticias/1331848-anpd-impuso-multas-por-mas-de-s-11-millones-y-reforzo-la-proteccion-de-datos-personales-durante-el-2025" },
  { n: "760", t: "fiscalizaciones en 2025 (+67 % vs 2024)", f: "LexLatin", u: "https://lexlatin.com/reportajes/proteccion-datos-personales-peru-empresas-oficial-cumplimiento-reforma" },
  { n: "647", t: "denuncias por uso indebido en 2025 (eran 30 en 2018)", f: "Cámara de Comercio de Lima", u: "https://lacamara.pe/casos-por-uso-indebido-de-datos-crecen-20-veces-en-peru/" },
  { n: "342", t: "incidentes de seguridad notificados a la ANPD", f: "Memo PRCP sobre el nuevo Reglamento", u: "https://prcp-r2-prd.postedin.com/Client-Memo-Nuevo-Reglamento-de-Ley-de-Proteccion-de-Datos-Personales-1-2.pdf" },
  { n: "48 h", t: "plazo para notificar una brecha (DS 016-2024-JUS)", f: "Garrigues", u: "https://www.garrigues.com/sites/default/files/noticias/files/peru-reglamento-proteccion-datos.pdf" },
  { n: "100 UIT", t: "multa máxima ≈ S/ 535 mil por infracción", f: "Reglamento Ley 29733", u: "https://lexlatin.com/reportajes/proteccion-datos-personales-peru-empresas-oficial-cumplimiento-reforma" },
  { n: "42 980", t: "delitos informáticos registrados en 2025", f: "Ministerio Público", u: "https://www.computerweekly.com/es/cronica/El-ciberfraude-continua-galopante-en-Peru" }
];
