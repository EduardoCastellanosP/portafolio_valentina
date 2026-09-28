(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const azar = (min, max) => min + Math.random() * (max - min);
  const fechaLarga = new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  /* ---------------- Primera plana y perfil ---------------- */
  function perfil() {
    $$('[data-perfil]').forEach(el => {
      const v = PERFIL[el.dataset.perfil];
      if (v) el.textContent = v;
    });
    document.title = `${PERFIL.nombre}, ${PERFIL.cargo.toLowerCase()}`;
    $('#fechaHoy').textContent = fechaLarga;
    $('#anio').textContent = new Date().getFullYear();

    const img = $('#heroFoto');
    img.alt = `Retrato de ${PERFIL.nombre}`;
    img.addEventListener('error', () => img.remove());
    if (PERFIL.foto) img.src = PERFIL.foto; else img.remove();

    $('#logros').innerHTML = LOGROS.map(l => `<li>${esc(l)}</li>`).join('');
    $('#bio').innerHTML = PERFIL.bio.map(p => `<p>${esc(p)}</p>`).join('');
    $('#datos').innerHTML = PERFIL.datos.map(d => `<div><dt>${esc(d.etiqueta)}</dt><dd>${esc(d.valor)}</dd></div>`).join('');
    $$('[data-cv]').forEach(a => { a.href = PERFIL.cv; });
  }

  function showreel() {
    if (!PERFIL.showreel) return;
    const v = $('#showreelVideo');
    v.addEventListener('loadedmetadata', () => { $('#showreel').hidden = false; }, { once: true });
    v.src = PERFIL.showreel;
  }

  /* ---------------- Trabajos ---------------- */
  /* Miniatura de la tarjeta: la imagen propia o, si no hay, la de YouTube */
  function miniatura(t) {
    const yt = (infoVideo(t.video) || {}).miniatura || '';
    const src = t.imagen || yt;
    if (!src) return '';
    const respaldo = t.imagen ? yt : '';
    return `<img src="${esc(src)}" data-respaldo="${esc(respaldo)}" alt="" loading="lazy">`;
  }

  function trabajos() {
    const categorias = [...new Set(TRABAJOS.map(t => t.categoria))];
    const filtros = $('#filtros');
    const rejilla = $('#rejilla');

    filtros.innerHTML = ['Todo', ...categorias].map((c, i) =>
      `<button class="filtro" type="button" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');

    rejilla.innerHTML = TRABAJOS.map((t, i) => `
      <article class="trabajo${t.destacado ? ' destacado' : ''}" data-cat="${esc(t.categoria)}" style="view-transition-name: trabajo-${i}">
        <div class="trabajo-media trama">
          ${miniatura(t)}
          ${t.video ? `<span class="trabajo-play">${(infoVideo(t.video) || {}).instagram ? 'Reel de Instagram' : 'Ver video'}</span>` : ''}
        </div>
        <div class="trabajo-info">
          <p class="trabajo-cat">${esc(t.categoria)}</p>
          <h3 class="trabajo-titulo"><button class="trabajo-btn" type="button" data-i="${i}">${esc(t.titulo)}</button></h3>
          <p class="trabajo-medio">${esc([t.medio, t.anio].filter(Boolean).join(', '))}</p>
          ${t.destacado ? `<p class="trabajo-resumen">${esc(t.resumen)}</p>` : ''}
        </div>
      </article>`).join('');

    $$('img', rejilla).forEach(img => img.addEventListener('error', () => {
      if (img.dataset.respaldo) { img.src = img.dataset.respaldo; img.dataset.respaldo = ''; }
      else img.remove();
    }));

    filtros.addEventListener('click', e => {
      const b = e.target.closest('.filtro');
      if (!b) return;
      const cat = b.dataset.cat;
      const aplicar = () => {
        $$('.filtro', filtros).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
        $$('.trabajo', rejilla).forEach(a => { a.hidden = !(cat === 'Todo' || a.dataset.cat === cat); });
      };
      if (document.startViewTransition && !reducir) document.startViewTransition(aplicar); else aplicar();
    });

    rejilla.addEventListener('click', e => {
      const b = e.target.closest('.trabajo-btn');
      if (b) abrirModal(TRABAJOS[Number(b.dataset.i)]);
    });
  }

  /* Reconoce enlaces de YouTube, Instagram, Vimeo o un video propio */
  function infoVideo(url) {
    if (!url) return null;
    const short = url.match(/youtube\.com\/shorts\/([\w-]{11})/);
    if (short) return {
      src: `https://www.youtube.com/embed/${short[1]}?autoplay=1&rel=0`,
      vertical: true, miniatura: `https://img.youtube.com/vi/${short[1]}/hqdefault.jpg`
    };
    const yt = url.match(/(?:youtu\.be\/|v=|embed\/|live\/)([\w-]{11})/);
    if (yt) return {
      src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`,
      vertical: false, miniatura: `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`
    };
    const ig = url.match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/);
    if (ig) return {
      src: `https://www.instagram.com/${ig[1] === 'reels' ? 'reel' : ig[1]}/${ig[2]}/embed`,
      vertical: true, instagram: true
    };
    const dr = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (dr) return {
      src: `https://drive.google.com/file/d/${dr[1]}/preview`,
      vertical: false, drive: true, miniatura: `https://drive.google.com/thumbnail?id=${dr[1]}&sz=w1200`
    };
    const vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) return { src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1`, vertical: false };
    return { archivo: url, vertical: false };
  }

  function abrirModal(t) {
    const modal = $('#modal');
    const media = $('#modalMedia');
    const v = infoVideo(t.video);
    let html = '';
    if (v && v.src) {
      html = `<iframe src="${esc(v.src)}" title="${esc(t.titulo)}" allow="autoplay; encrypted-media; picture-in-picture; clipboard-write" allowfullscreen></iframe>`;
    } else if (v && v.archivo) {
      html = `<video src="${esc(v.archivo)}" controls autoplay playsinline></video>`;
    } else if (t.imagen) {
      html = `<img src="${esc(t.imagen)}" alt="">`;
    }
    media.innerHTML = html;
    media.hidden = !html;
    modal.classList.toggle('es-vertical', Boolean(v && v.vertical));
    media.classList.toggle('es-instagram', Boolean(v && v.instagram));
    const img = $('img', media);
    if (img) img.addEventListener('error', () => { media.hidden = true; });

    $('#modalMeta').textContent = [t.categoria, t.medio, t.anio].filter(Boolean).join(', ');
    $('#modalTitulo').textContent = t.titulo;
    $('#modalResumen').textContent = t.resumen || '';
    $('#modalRol').textContent = t.rol ? `Mi rol: ${t.rol}` : '';
    const enlace = $('#modalEnlace');
    const destino = t.enlace || t.video;
    enlace.hidden = !destino;
    if (destino) enlace.href = destino;
    enlace.textContent = v && v.instagram ? 'Ver en Instagram' : v && v.src ? 'Ver en YouTube' : 'Ver publicación completa';
    if (v && v.src && !v.instagram && /vimeo/.test(v.src)) enlace.textContent = 'Ver en Vimeo';
    if (v && v.drive) enlace.textContent = 'Ver en Google Drive';
    modal.showModal();
  }

  function modal() {
    const m = $('#modal');
    $('#modalCerrar').addEventListener('click', () => m.close());
    m.addEventListener('click', e => { if (e.target === m) m.close(); });
    m.addEventListener('close', () => { $('#modalMedia').innerHTML = ''; });
  }

  /* ---------------- Trayectoria ---------------- */
  function trayectoria() {
    $('#lineaTiempo').innerHTML = TRAYECTORIA.map(x => `
      <li>
        <p class="lt-fecha">${esc(x.fechas)}</p>
        <div>
          <h3 class="lt-cargo">${esc(x.cargo)}</h3>
          <p class="lt-lugar">${esc(x.lugar)}</p>
          <p class="lt-desc">${esc(x.descripcion)}</p>
        </div>
      </li>`).join('');
    $('#habilidades').innerHTML = HABILIDADES.map(g => `
      <div class="hab-grupo">
        <h4>${esc(g.grupo)}</h4>
        <ul>${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`).join('');
  }

  /* ---------------- Contacto ---------------- */
  function contacto() {
    const mensaje = `Hola ${PERFIL.nombreCorto}, vi tu portafolio y me gustaría conversar contigo.`;
    const tel = `tel:${PERFIL.telefono.replace(/\s/g, '')}`;
    const correo = $('#correo');
    correo.href = `mailto:${PERFIL.email}`;
    correo.textContent = PERFIL.email;
    $('#btnWhatsapp').href = `https://wa.me/${PERFIL.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    $('#btnLlamar').href = tel;

    const aviso = $('#aviso');
    let t;
    const avisar = txt => { aviso.textContent = txt; clearTimeout(t); t = setTimeout(() => { aviso.textContent = ''; }, 3500); };
    $('#btnCopiar').addEventListener('click', () => {
      if (!navigator.clipboard) return avisar('Selecciona el correo y cópialo manualmente.');
      navigator.clipboard.writeText(PERFIL.email)
        .then(() => avisar('Correo copiado'))
        .catch(() => avisar('No se pudo copiar. Selecciona el correo y cópialo manualmente.'));
    });

    const filas = [
      { dt: 'Teléfono', dd: `<a href="${tel}">${esc(PERFIL.telefono)}</a>` },
      { dt: 'Ciudad', dd: esc(PERFIL.ciudad) },
      ...PERFIL.redes.map(r => ({ dt: esc(r.nombre), dd: r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.texto || 'Ver perfil')}</a>` : esc(r.texto) }))
    ];
    $('#contactoDatos').innerHTML = filas.map(f => `<div><dt>${f.dt}</dt><dd>${f.dd}</dd></div>`).join('');
  }

  /* ---------------- Navegación ---------------- */
  function navegacion() {
    const cabecera = $('#cabecera');
    new IntersectionObserver(([en]) => cabecera.classList.toggle('con-borde', !en.isIntersecting),
      { rootMargin: '-68px 0px 0px 0px' }).observe($('#cabezote'));

    const enlaces = $$('.nav a[href^="#"]');
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(en => {
        if (!en.isIntersecting) return;
        enlaces.forEach(a => {
          if (a.getAttribute('href') === `#${en.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => obs.observe(s));

    const btn = $('#menuBtn');
    const nav = $('#nav');
    const cerrar = () => { nav.classList.remove('abierta'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menú'; };
    btn.addEventListener('click', () => {
      const abierto = nav.classList.toggle('abierta');
      btn.setAttribute('aria-expanded', String(abierto));
      btn.textContent = abierto ? 'Cerrar' : 'Menú';
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) cerrar(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
  }

  /* ---------------- Intro estilo Marvel, versión periodismo ---------------- */
  function crearCuadro(tipo, p, i) {
    const c = document.createElement('div');
    c.className = `cuadro cuadro-${tipo}`;
    c.setAttribute('aria-hidden', 'true');
    let html = '';
    if (tipo === 'foto') {
      html = `<div class="c-foto trama">${p.foto ? `<img src="${esc(p.foto)}" alt="">` : ''}</div>
              <div class="c-franja">${esc(p.titular)}</div>`;
    } else if (tipo === 'titular') {
      html = `<p class="c-cabezote">${esc(p.periodico)}</p>
              <div class="c-fecha"><span>${esc(fechaLarga)}</span><span>Edición ${1200 + i}</span></div>
              <div class="c-titular">${esc(p.titular)}</div>`;
    } else if (tipo === 'cita') {
      html = `<div class="c-columnas"><div class="c-texto"></div><div class="c-cita">«${esc(p.titular)}»</div><div class="c-texto"></div></div>`;
    } else {
      html = `<div class="c-titular">${esc(p.titular)}</div><p class="c-firma">Por ${esc(PERFIL.nombre)}</p>`;
    }
    c.innerHTML = `<div class="c-lienzo">${html}</div>`;
    const img = c.querySelector('img');
    if (img) img.addEventListener('error', () => img.remove());
    return c;
  }

  function intro() {
    const el = $('#intro');
    let vista = false;
    try { vista = sessionStorage.getItem('introVista') === '1'; } catch (e) { /* sin acceso */ }
    if (reducir || vista) {
      el.remove();
      document.body.classList.remove('intro-activa');
      return;
    }

    const escenario = $('#escenario');
    const fuente = PORTADAS.length ? PORTADAS : LOGROS.map(l => ({ periodico: 'El Diario', titular: l }));
    const conFoto = fuente.filter(p => p.foto);
    if (PERFIL.foto) conFoto.push({ periodico: 'Portafolio', titular: PERFIL.cargo, foto: PERFIL.foto });
    const tipos = ['foto', 'titular', 'foto', 'cita', 'foto', 'negativo'];
    const TOTAL = 36;
    let kFoto = 0;
    let kTexto = 0;

    const cuadros = Array.from({ length: TOTAL }, (_, i) => {
      const tipo = tipos[i % tipos.length];
      const p = tipo === 'foto' && conFoto.length
        ? conFoto[kFoto++ % conFoto.length]
        : fuente[kTexto++ % fuente.length];
      const c = crearCuadro(tipo, p, i);
      escenario.appendChild(c);
      return c;
    });
    $('#logoNombre').textContent = PERFIL.nombre;
    $('#logoCargo').textContent = PERFIL.cargo;

    const timers = [];
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    let t = 200;
    let anterior = null;

    // Cortes que empiezan lentos y se aceleran, como la entrada de Marvel
    cuadros.forEach((c, i) => {
      const progreso = i / (TOTAL - 1);
      const dur = Math.round(45 + 420 * Math.pow(1 - progreso, 2.6));
      T(() => {
        if (anterior) anterior.classList.remove('activo');
        const lienzo = c.firstElementChild;
        lienzo.style.setProperty('--t',
          `scale(${azar(1, 1.35).toFixed(2)}) rotate(${azar(-4, 4).toFixed(1)}deg) translate(${azar(-4, 4).toFixed(1)}%, ${azar(-4, 4).toFixed(1)}%)`);
        lienzo.style.setProperty('--dx', `${azar(-3, 3).toFixed(1)}%`);
        c.classList.add('activo');
        anterior = c;
      }, t);
      t += dur;
    });

    // Aparece el nombre
    T(() => {
      if (anterior) anterior.classList.remove('activo');
      $('#introLogo').classList.add('visible');
    }, t);
    t += 1800 + 1400;
    T(salir, t);

    function salir() {
      if (el.classList.contains('saliendo')) return;
      timers.forEach(clearTimeout);
      try { sessionStorage.setItem('introVista', '1'); } catch (e) { /* sin acceso */ }
      el.classList.add('saliendo');
      document.body.classList.remove('intro-activa');
      setTimeout(() => el.remove(), 850);
    }

    $('#introSaltar').addEventListener('click', salir);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && el.isConnected) salir(); });
  }

  /* ---------------- Arranque ---------------- */
  perfil();
  showreel();
  trabajos();
  modal();
  trayectoria();
  contacto();
  navegacion();

  const fuentes = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fuentes, new Promise(r => setTimeout(r, 1500))]).then(intro);
})();
