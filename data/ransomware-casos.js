// Curado a mano. Reclamos de ransomware que tocan datos de ciudadanos (Estado, salud, educación, seguros).
// Fuente de cada fila: listado de la banda recogido por ransomware.live (https://www.ransomware.live/map/PE).
// Son reclamos de los atacantes; la entidad no necesariamente lo confirmó.
window.RW_CASOS = [
  { fecha: '2026-10-13', victima: 'Interseguro', grupo: 'Dire Wolf', sector: 'Seguros', nota: 'Aseguradora de vida y SOAT: datos de asegurados y pólizas.' },
  { fecha: '2026-10-01', victima: 'Hospital Hermilio Valdizán', grupo: 'RansomHouse', sector: 'Salud', nota: 'Hospital psiquiátrico público de Lima. Historias clínicas de salud mental.' },
  { fecha: '2026-09-15', victima: 'gob.pe', grupo: 'SafePay', sector: 'Estado', nota: 'Portal único del Estado. Reclamo sin detalle público.' },
  { fecha: '2026-07-31', victima: 'Municipalidad de San Luis', grupo: 'The Gentlemen', sector: 'Estado', nota: 'Municipio distrital de Lima: vecinos, predios, licencias.' },
  { fecha: '2026-06-25', victima: 'San Silvestre School', grupo: 'Krybit', sector: 'Educación', nota: 'Colegio privado de Lima, listado dos veces (Qilin en ene-2026). Datos de menores.' },
  { fecha: '2026-06-16', victima: 'Sunass', grupo: 'Nova', sector: 'Estado', nota: 'Regulador de agua y saneamiento.' },
  { fecha: '2026-04-14', victima: 'Comunidad Andina', grupo: 'LockBit 5', sector: 'Estado', nota: 'Organismo regional con sede en Lima.' },
  { fecha: '2026-01-08', victima: 'Autoridad Nacional del Agua', grupo: 'BlackShrantac', sector: 'Estado', nota: 'ANA, adscrita al Midagri.' },
  { fecha: '2025-11-21', victima: 'SUNAFIL', grupo: 'BlackShrantac', sector: 'Estado', nota: 'Fiscalización laboral: expedientes de trabajadores y empresas.' },
  { fecha: '2025-11-09', victima: 'Instituto Nacional de Oftalmología', grupo: 'NightSpire', sector: 'Salud', nota: 'La banda afirma 30 GB. Pacientes del INO.' },
  { fecha: '2025-09-06', victima: 'Suiza Lab', grupo: 'KillSec', sector: 'Salud', nota: 'Laboratorio clínico: resultados de análisis.' },
  { fecha: '2025-06-10', victima: 'Medifarma', grupo: 'Dire Wolf', sector: 'Salud', nota: 'Laboratorio farmacéutico. Alph4_Sec reporta ~300 GB exfiltrados.' },
  { fecha: '2025-06-02', victima: 'Hospital José Agurto Tello (Chosica)', grupo: 'NightSpire', sector: 'Salud', nota: 'La banda afirma 30 GB. Historias clínicas.' },
  { fecha: '2025-05-01', victima: 'Gobierno del Perú (plataforma digital)', grupo: 'Rhysida', sector: 'Estado', nota: 'Reclamo contra la plataforma digital del Estado.' },
  { fecha: '2025-03-11', victima: 'Jockey Salud', grupo: 'SafePay', sector: 'Salud', nota: 'Centro médico de Lima.' },
  { fecha: '2024-12-20', victima: 'Fondo MIVIVIENDA', grupo: 'Cloak', sector: 'Estado', nota: 'Créditos de vivienda: datos financieros de familias.' },
  { fecha: '2024-08-11', victima: 'Clínica Tezza', grupo: 'LockBit 3', sector: 'Salud', nota: 'Clínica de Lima.' },
  { fecha: '2024-04-22', victima: 'Ministerio de Defensa', grupo: 'RansomEXX', sector: 'Estado', nota: 'La banda afirma 763,8 GB.' },
  { fecha: '2024-03-25', victima: 'Ejército del Perú', grupo: 'INC Ransom', sector: 'Estado', nota: 'La banda afirma material clasificado.' },
  { fecha: '2024-01-31', victima: 'Derrama Magisterial', grupo: 'LockBit 3', sector: 'Estado', nota: 'Seguridad social de los maestros: afiliados y créditos.' },
  { fecha: '2023-12-10', victima: 'Policía Nacional del Perú', grupo: 'LockBit 3', sector: 'Estado', nota: 'Reclamo contra la PNP.' },
  { fecha: '2022-10-21', victima: 'Universidad Nacional de Educación (UNE)', grupo: 'BlackByte', sector: 'Educación', nota: 'Universidad pública: alumnos y docentes.' },
];

// Alertas publicadas por la cuenta de inteligencia de amenazas @Alph4_Sec (X). Cada una enlaza al post original.
window.ALPH4 = [
  { fecha: '2026-05', titulo: 'Desysweb S.A.C. · ransomware Nova', texto: 'La banda afirma haber cifrado más de 60 000 archivos del integrador de TI y telecomunicaciones y da 7 días para negociar.', url: 'https://x.com/Alph4_Sec/status/2052428799199842350' },
  { fecha: '2025-10', titulo: 'Universidad de Lima · diplomas y certificados', texto: 'El actor “NulledPE” publica un paquete con diplomas y certificados atribuidos a la ULima. Riesgo de suplantación con títulos reales.', url: 'https://x.com/Alph4_Sec/status/1977900781148962984' },
  { fecha: '2025-08', titulo: 'BDO Perú · ransomware INC Ransom', texto: 'La firma de auditoría aparece en el sitio de extorsión con datos corporativos y de clientes publicados.', url: 'https://x.com/Alph4_Sec/status/1961460660237172871' },
  { fecha: '2025-08', titulo: 'Servicio Educacional Hogar y Salud · 200 mil registros', texto: 'El usuario “r3zz” publica una base con DNI, nombres, fechas de nacimiento, direcciones, teléfonos y correos.', url: 'https://x.com/Alph4_Sec/status/1953623388808733148' },
  { fecha: '2025-06', titulo: 'Medifarma · ransomware Dire Wolf', texto: 'La banda reclama al laboratorio farmacéutico y afirma unos 300 GB exfiltrados.', url: 'https://x.com/Alph4_Sec/status/1932541575084847414' },
  { fecha: '2025-06', titulo: 'Securitas Perú · credenciales internas', texto: 'El actor “Gatito_FBI_Nz” publica accesos activos a la plataforma interna SGH, documentos de servicio y fotos de empleados.', url: 'https://x.com/Alph4_Sec/status/1932548047495717153' },
];
