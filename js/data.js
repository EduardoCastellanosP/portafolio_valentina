/* =========================================================
   DATOS DEL PORTAFOLIO
   Todo el contenido del sitio se edita desde este archivo.
   Información tomada de la hoja de vida de Shadi Valentina.
   ========================================================= */

const PERFIL = {
  nombre: "Shadi Valentina Rey Cárdenas",
  nombreCorto: "Shadi",
  cargo: "Comunicadora social y periodista",

  // Titular grande del inicio
  frase: "Contenido con criterio editorial para conectar causas con sus audiencias.",
  // Texto corto debajo del titular
  bajada: "Más de 4 años en comunicación organizacional, producción audiovisual, redes sociales y locución radial.",

  foto: "assets/img/foto.jpg",            // Reemplazar por la foto original en alta resolución
  pieFoto: "Shadi Valentina Rey Cárdenas, comunicadora social y periodista.",

  telefono: "+57 310 497 5562",
  whatsapp: "573104975562",
  email: "shadivalentinarey15@gmail.com",
  ciudad: "Bucaramanga, Santander",
  redes: [
    { nombre: "Instagram", texto: "@shadi_valentina_rey", url: "https://www.instagram.com/shadi_valentina_rey" },
    { nombre: "LinkedIn",  texto: "Shadi Valentina",      url: "https://www.linkedin.com/in/shadi-valentina-621463192/" }   // Pega aquí el enlace de su perfil
  ],

  cv: "assets/video/cv.pdf",
  showreel: "assets/video/showreel.mp4",  // Si no existe, la sección no aparece

  bio: [
    "Soy comunicadora social y periodista. Llevo más de 4 años impulsando la presencia digital de organizaciones sociales y medios con contenido estratégico, producción audiovisual y comunicación organizacional.",
    "He liderado campañas en Instagram, Facebook, TikTok, LinkedIn, X y YouTube, combinando storytelling, cobertura periodística y locución radial.",
    "Mi enfoque une creatividad, criterio editorial y visión estratégica para convertir ideas en contenido que fortalece la reputación institucional y genera comunidad."
  ],

  datos: [
    { etiqueta: "Formación",      valor: "Comunicación Social y Periodismo, Universidad de Investigación y Desarrollo (UDI), 2022" },
    { etiqueta: "Certificación",  valor: "Marketing Digital, Cajasán, 2023" },
    { etiqueta: "Idiomas",        valor: "Español nativo, inglés básico" },
    { etiqueta: "Disponibilidad", valor: "Cobertura de eventos y producción audiovisual, presencial o remoto" }
  ]
};

/* ---------------------------------------------------------
   IMÁGENES DE LA INTRO (estilo Marvel)
   Guarda las fotos en assets/img/ con estos nombres exactos.
   - portada1 a portada6: fotos de ella trabajando
     (sirven capturas de pantalla de sus reels)
   - portada7 a portada10: imágenes de apoyo (micrófonos,
     cámaras, periódicos, prensa, radio)
   Todas se ven en blanco y negro. Horizontales, mínimo 1600 px de ancho.
   Si falta alguna, ese corte muestra una trama de puntos.
   --------------------------------------------------------- */
const PORTADAS = [
  { periodico: "Banco de Alimentos",           titular: "Contenido que conecta causas con sus audiencias",  foto: "assets/img/portada1.jpg" },
  { periodico: "Acuerdos MASS",                titular: "Historias de interés social contadas en video",    foto: "assets/img/portada2.jpg" },
  { periodico: "Radio Católica Metropolitana", titular: "Al aire: locución y conducción de programas",       foto: "assets/img/portada3.jpg" },
  { periodico: "Banco de Alimentos",           titular: "Jornadas sociales: cobertura desde el terreno",     foto: "assets/img/portada4.jpg" },
  { periodico: "Deportes",                     titular: "Periodismo deportivo y entretenimiento",            foto: "assets/img/portada5.jpg" },
  { periodico: "En Vivo",                      titular: "Conciertos y eventos en vivo: promoción digital",   foto: "assets/img/portada6.jpg" },
  { periodico: "Crónica",                      titular: "Frente a la cámara",                                foto: "assets/img/portada7.jpg" },
  { periodico: "Edición Digital",              titular: "Seis plataformas, una misma voz",                   foto: "assets/img/portada8.jpg" },
  { periodico: "La Voz",                       titular: "Historias que merecen contarse",                    foto: "assets/img/portada9.jpg" },
  { periodico: "Última Hora",                  titular: "Cobertura en tiempo real",                          foto: "assets/img/portada10.jpg" }
];

/* Logros de la primera plana del inicio */
const LOGROS = [
  "Más de 4 años de experiencia en comunicación y periodismo",
  "Estrategia de contenido en seis plataformas institucionales",
  "Locución radial y presentación frente a cámara"
];

/* ---------------------------------------------------------
   TRABAJOS
   Cambia cada "Título del reel" por el nombre real y llena
   resumen (de qué trata) y rol (qué hizo ella).
   imagen: portada de la tarjeta. Para los reels, toma una
   captura de pantalla del video y guárdala con ese nombre.
   El video de Drive toma su miniatura automáticamente.
   --------------------------------------------------------- */
const TRABAJOS = [
  {
    titulo: "Título del video de Drive",
    categoria: "Video", medio: "", anio: "",
    resumen: "",
    rol: "Presentadora",
    imagen: "", video: "https://drive.google.com/file/d/1B_wHWwU5N1w-L2qFvoKKhYe2Cmv5TopD/view", enlace: "",
    destacado: true
  },
 
  {
    titulo: "¿Sabías que en Bucaramanga existe un Banco de Alimentos?",
    categoria: "Reels", medio: "Instagram", anio: "",
    resumen: "", rol: "Comunicadora social y periodista",
    imagen: "assets/img/trabajo3.jpg", video: "https://www.instagram.com/reel/DN3NrfY2s1U/", enlace: "https://www.instagram.com/reel/DN3NrfY2s1U/"
  },
  {
    titulo: "Primer Encuentro de Organizaciones Sociales en Bucaramanga",
    categoria: "Reels", medio: "Instagram", anio: "",
    resumen: "", rol: "",
    imagen: "assets/img/trabajo1.jpg", video: "https://www.instagram.com/reel/DMbCaGBRCYj/", enlace: ""
  },
  {
    titulo: "¿Tu fundación apoya a población vulnerable?",
    categoria: "Reels", medio: "Instagram", anio: "",
    resumen: "", rol: "",
    imagen: "assets/img/trabajo4.jpg", video: "https://www.instagram.com/reel/DIOuGF9xzOS/", enlace: ""
  },
  {
    titulo: "Gracias al programa #desayunossaludables 296 niños en Santander pudieron desayunar",
    categoria: "Reels", medio: "Instagram", anio: "",
    resumen: "", rol: "",
    imagen: "assets/img/trabajo5.jpg", video: "https://www.instagram.com/reel/C9A2Q6HpVSC/", enlace: ""
  },
  {
    titulo: "Únete y ayuda a que más niños puedan lograr tener un desayuno diario.",
    categoria: "Reels", medio: "Instagram", anio: "",
    resumen: "", rol: "",
    imagen: "assets/img/trabajo6.jpg", video: "https://www.instagram.com/reel/C6g4etUN4to/", enlace: ""
  },
  // {
  //   titulo: "Historias de interés social para medios digitales",
  //   categoria: "Periodismo", medio: "Corporación Acuerdos MASS", anio: "2022",
  //   resumen: "Redacción y producción de contenidos periodísticos para medios digitales y audiovisuales, con cubrimiento de eventos y entrevistas.",
  //   rol: "Periodista y presentadora",
  //   imagen: "assets/img/trabajo7.jpg", video: "", enlace: ""
  // },
  {
    titulo: "Locución y redes sociales de la emisora",
    categoria: "Radio", medio: "Radio Católica Metropolitana", anio: "2021",
    resumen: "Locución y apoyo en la conducción de programas al aire, administración de redes institucionales y contenido para promocionar la programación.",
    rol: "Locutora y community manager (prácticas profesionales)",
    imagen: "assets/img/trabajo9.jpg", video: "../assets/video/trabajo8.mp4", enlace: "https://www.facebook.com/share/v/1CKAZwLgRi/"
  }
];

const TRAYECTORIA = [
  { fechas: "Marzo 2023 a hoy", cargo: "Comunicadora Social", lugar: "Fundación Banco de Alimentos Bucaramanga",
    descripcion: "Lidera la estrategia de contenido en seis plataformas, produce y edita piezas audiovisuales, cubre jornadas sociales, redacta notas de prensa y gestiona la comunicación organizacional. También presta su voz y presencia en piezas audiovisuales y programas radiales." },
  { fechas: "Abril a noviembre 2022", cargo: "Periodista y Presentadora", lugar: "Corporación Acuerdos MASS S.A.S.",
    descripcion: "Redacción y producción de contenidos periodísticos para medios digitales y audiovisuales, cubrimiento de eventos y entrevistas, y apoyo en la conducción de espacios comunicativos." },
  { fechas: "Julio a diciembre 2021", cargo: "Redes Sociales y Locución Radial", lugar: "Radio Católica Metropolitana (prácticas profesionales)",
    descripcion: "Administración de redes institucionales, locución y apoyo en conducción de programas al aire, y estrategias de posicionamiento de marca de la emisora." },
  { fechas: "2018", cargo: "Asistente de Edición y Producción Multimedia", lugar: "La Niña Baila S.A.S.",
    descripcion: "Apoyo en edición de video y manejo de cámaras en procesos creativos de contenido digital." }
];

const HABILIDADES = [
  { grupo: "Comunicación y periodismo", items: ["Redacción periodística", "Storytelling y copywriting", "Comunicación organizacional", "Cobertura de eventos", "Estrategia digital", "Community management"] },
  { grupo: "Producción y voz",          items: ["Producción audiovisual", "Edición de video para Reels y TikTok", "Locución radial", "Presentación frente a cámara"] },
  { grupo: "Herramientas",              items: ["Canva, CapCut y Filmora", "Adobe Audition", "Meta Business Suite", "Wix y WordPress", "Microsoft Office", "IA para creación de contenido"] }
];
