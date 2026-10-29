(function(){
const I = window.INCIDENTES.slice().sort((a,b)=> b.fecha.localeCompare(a.fecha));
const E = window.ESTADOS, T = window.TIPOS_DATO;
const col = s => getComputedStyle(document.documentElement).getPropertyValue('--st-'+s).trim();
const fmtM = n => n>=1e6 ? (n/1e6).toLocaleString('es-PE',{maximumFractionDigits:1})+' M' : n>=1e3 ? Math.round(n/1e3)+' mil' : n;
const mes = f => { const [y,m]=f.split('-'); return ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][+m-1]+'-'+y; };
const tip = document.getElementById('tip');
function showTip(e, html){ tip.innerHTML=html; tip.style.display='block'; moveTip(e); }
function moveTip(e){ const x=e.clientX+14, y=e.clientY+14; tip.style.left=Math.min(x, innerWidth-300)+'px'; tip.style.top=Math.min(y, innerHeight-80)+'px'; }
function hideTip(){ tip.style.display='none'; }

// KPIs
const kp = [
  { n: '20', t: 'casos graves registrados, 2022 → oct-2026', f: '5 confirmados o reconocidos · 3 con alerta oficial · 9 sin verificar · 3 negados' },
  { n: '15 M', t: 'ciudadanos consultados en masa desde RENIEC (abr-2025)', f: 'Reconocido por la jefa de RENIEC. Acceso vía convenio del Mininter.' },
  { n: '21 M', t: 'registros de Movistar ofrecidos en venta (jun-2025)', f: 'DNI, nombre, dirección, plan. Telefónica investiga.' },
  { n: '4 de 20', t: 'casos salieron por un acceso legítimo mal controlado', f: 'PIDE 2022, RENIEC-Mininter 2025, DIRIN 2025, padrón 2025.' },
  { n: '15', t: 'casos en los últimos 16 meses', f: 'Jun-2025 → oct-2026. Diez son afirmaciones de los últimos diez días: hospital, colegios, telcos, banco, hosting, EsSalud, RENIEC y la votación de la UNI.' },
  { n: '0', t: 'veces que un DNI, una dirección o una huella se pudieron “resetear”', f: 'Por eso cada filtración vale para siempre. Ver el peor escenario.' }
];
document.getElementById('kpis').innerHTML = kp.map(k=>`<div class="card stat"><div class="n">${k.n}</div><div class="t">${k.t}</div><div class="f">${k.f}</div></div>`).join('');

// Qué datos circulan
const rank = {confirmado:3, alerta:2, sinverificar:1, negado:0};
const datos = Object.keys(T).map(k=>{
  const cases = I.filter(i=>i.datos.includes(k));
  const best = cases.reduce((m,c)=> rank[c.estado]>rank[m]?c.estado:m, 'negado');
  return {k, n:cases.length, best, label:T[k]};
}).filter(d=>d.n>0).sort((a,b)=> rank[b.best]-rank[a.best] || b.n-a.n);
document.getElementById('datos').innerHTML = datos.map(d=>`<div class="card"><div style="font-weight:700;font-size:17px">${d.label}</div><div class="note">${d.n} caso${d.n>1?'s':''}</div><div style="margin-top:8px"><span class="tag ${d.best}"><i>${E[d.best].icon}</i>${E[d.best].label}</span></div></div>`).join('');

// Barras horizontales
(function(){
  const rows = I.filter(i=>i.registros).sort((a,b)=>b.registros-a.registros);
  const W=900, lh=38, padL=250, padR=170, H=rows.length*lh+30;
  const max = Math.max(...rows.map(r=>r.registros));
  const sx = v => padL + (W-padL-padR)*v/max;
  let s = `<defs>`;
  for (const st of Object.keys(E)) s += `<pattern id="hatch-${st}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)"><rect width="8" height="8" fill="${col(st)}" opacity=".25"/><line x1="0" y1="0" x2="0" y2="8" stroke="${col(st)}" stroke-width="3"/></pattern>`;
  s += `</defs>`;
  rows.forEach((r,i)=>{
    const y=10+i*lh, w=Math.max(4, sx(r.registros)-padL);
    const fill = r.registros_tipo==='confirmado' ? col(r.estado) : `url(#hatch-${r.estado})`;
    s += `<g class="bar" data-id="${r.id}"><text x="${padL-10}" y="${y+lh/2+1}" text-anchor="end" class="lbl" dominant-baseline="middle">${r.entidad.replace(' (Telefónica)','').replace(' · padrón electoral',' padrón')}</text>`;
    s += `<rect x="${padL}" y="${y+6}" width="${w}" height="${lh-12}" rx="4" fill="${fill}" stroke="${col(r.estado)}" stroke-width="1.5"/>`;
    s += `<text x="${padL+w+8}" y="${y+lh/2+1}" dominant-baseline="middle" class="mut">${fmtM(r.registros)}${r.registros_tipo!=='confirmado'?' *':''} · ${mes(r.fecha)}</text></g>`;
  });
  s += `<line x1="${padL}" y1="4" x2="${padL}" y2="${H-14}" class="axis"/>`;
  s += `<text x="${padL}" y="${H-2}" class="mut">* cifra afirmada por el atacante o alcance potencial</text>`;
  const svg=document.getElementById('bars'); svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.innerHTML=s;
  svg.querySelectorAll('.bar').forEach(g=>{ const r=I.find(x=>x.id===g.dataset.id);
    g.addEventListener('mousemove', e=>showTip(e, `<b>${r.titulo}</b><br>${r.escala_txt}<br>${E[r.estado].label}`));
    g.addEventListener('mouseleave', hideTip);
  });
})();

// Casos por año (stacked)
(function(){
  const years=[2022,2023,2024,2025,2026], order=['confirmado','alerta','sinverificar','negado'];
  const W=900, H=230, padL=40, padB=36, top=16, cw=(W-padL-20)/years.length, bw=Math.min(90, cw*0.55);
  const counts = years.map(y=>order.map(st=>I.filter(i=>i.anio===y&&i.estado===st).length));
  const max = Math.max(...counts.map(c=>c.reduce((a,b)=>a+b,0)), 1);
  const sy = v => (H-padB-top)*v/max;
  let s='';
  years.forEach((y,i)=>{
    const x=padL+i*cw+(cw-bw)/2; let acc=0; const tot=counts[i].reduce((a,b)=>a+b,0);
    order.forEach((st,k)=>{ const n=counts[i][k]; if(!n) return; const h=sy(n);
      s+=`<rect x="${x}" y="${H-padB-acc-h}" width="${bw}" height="${Math.max(h-2,2)}" rx="${acc===0?0:0}" fill="${col(st)}" class="seg" data-y="${y}" data-st="${st}" data-n="${n}"/>`; acc+=h; });
    s+=`<text x="${x+bw/2}" y="${H-padB+18}" text-anchor="middle" class="lbl">${y}${y===2026?' *':''}</text>`;
    if(tot) s+=`<text x="${x+bw/2}" y="${H-padB-acc-6}" text-anchor="middle" class="mut">${tot}</text>`;
    else s+=`<text x="${x+bw/2}" y="${H-padB-8}" text-anchor="middle" class="mut">0 registrados</text>`;
  });
  s+=`<line x1="${padL}" y1="${H-padB}" x2="${W-10}" y2="${H-padB}" class="axis"/>`;
  s+=`<text x="${W-10}" y="${H-4}" text-anchor="end" class="mut">* hasta el 28-oct-2026</text>`;
  const svg=document.getElementById('years'); svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.innerHTML=s;
  svg.querySelectorAll('.seg').forEach(r=>{ r.addEventListener('mousemove', e=>showTip(e, `<b>${r.dataset.y}</b> · ${E[r.dataset.st].label}: ${r.dataset.n}`)); r.addEventListener('mouseleave', hideTip); });
})();

// Filtros + lista
const sectores=[...new Set(I.map(i=>i.sector))];
let fEstado='todos', fSector='todos';
function renderFiltros(){
  const b=(k,v,lbl,on)=>`<button data-k="${k}" data-v="${v}" aria-pressed="${on}">${lbl}</button>`;
  let h = b('estado','todos','Todos', fEstado==='todos');
  for (const st of Object.keys(E)) h += b('estado',st, E[st].icon+' '+E[st].label, fEstado===st);
  h += '<span style="width:100%"></span>';
  h += b('sector','todos','Todos los sectores', fSector==='todos');
  for (const sc of sectores) h += b('sector',sc,sc, fSector===sc);
  const f=document.getElementById('filtros'); f.innerHTML=h;
  f.querySelectorAll('button').forEach(x=>x.onclick=()=>{ if(x.dataset.k==='estado') fEstado=x.dataset.v; else fSector=x.dataset.v; renderFiltros(); renderLista(); });
}
function renderLista(){
  const rows=I.filter(i=>(fEstado==='todos'||i.estado===fEstado)&&(fSector==='todos'||i.sector===fSector));
  document.getElementById('lista').innerHTML = rows.length? rows.map(i=>`<div class="card inc" id="${i.id}">
    <div class="when">${mes(i.fecha)}<small>${i.sector}</small></div>
    <div><h3>${i.titulo}</h3>
      <div><span class="tag ${i.estado}"><i>${E[i.estado].icon}</i>${i.estado_txt}</span> <span class="chip">${i.escala_txt}</span></div>
      <p>${i.resumen}</p>
      <div class="row"><span class="chip"><b>Vector:</b> ${i.vector}</span>${i.datos.map(d=>`<span class="chip">${T[d]}</span>`).join('')}</div>
      <div class="src">Fuentes: ${i.fuentes.map(f=>`<a href="${f[1]}" target="_blank" rel="noopener">${f[0]}</a>`).join('')}</div>
    </div></div>`).join('') : '<p class="note">Sin casos con ese filtro.</p>';
}
renderFiltros(); renderLista();

// Matriz
(function(){
  const cols=Object.keys(T).filter(k=>I.some(i=>i.datos.includes(k)));
  let h='<thead><tr><th>Caso</th><th>Estado</th>'+cols.map(c=>`<th>${T[c]}</th>`).join('')+'</tr></thead><tbody>';
  for (const i of I) h+=`<tr><td><b>${i.entidad}</b><br><span class="note">${mes(i.fecha)}</span></td><td><span class="tag ${i.estado}"><i>${E[i.estado].icon}</i>${E[i.estado].label.split(' ')[0]}</span></td>`+cols.map(c=> i.datos.includes(c)?`<td class="y" style="color:${col(i.estado)}">${E[i.estado].icon}</td>`:`<td class="n">·</td>`).join('')+'</tr>';
  document.getElementById('matriz').innerHTML=h+'</tbody>';
})();

// Yape / Plin
document.getElementById('yape').innerHTML = window.YAPE.map(c=>`<div class="card"><div style="font-weight:700;font-size:18px;line-height:1.25;margin-bottom:6px">${c.h}</div><p style="margin:0;color:var(--ink-2);font-size:15px">${c.p}</p><div class="note" style="margin-top:8px"><a href="${c.u}" target="_blank" rel="noopener">${c.f}</a></div></div>`).join('');

// Contexto
document.getElementById('contexto').innerHTML = window.CONTEXTO.map(c=>`<div class="card stat"><div class="n" style="font-size:clamp(26px,3.6vw,36px)">${c.n}</div><div class="t">${c.t}</div><div class="f"><a href="${c.u}" target="_blank" rel="noopener">${c.f}</a></div></div>`).join('');

// ---------- Ransomware (ransomware.live + Alph4_Sec) ----------
(function(){
  const R=window.RANSOMWARE; if(!R) return;
  const anios=Object.keys(R.por_anio).sort(), n26=R.por_anio['2026']||0, n24=R.por_anio['2024']||0, n23=R.por_anio['2023']||0;
  const estado=(R.sectores.find(s=>s[0]==='Estado y defensa')||[0,0])[1], salud=(R.sectores.find(s=>s[0]==='Salud')||[0,0])[1];
  const kp=[
    { n: String(R.total), t: `organizaciones peruanas reclamadas por bandas de ransomware, 2021 → ${mes(R.ultimo.slice(0,7))}`, f: `${anios.map(a=>`${a}: ${R.por_anio[a]}`).join(' · ')}. Fuente: ransomware.live.` },
    { n: String(n26), t: 'reclamos solo en 2026, hasta octubre', f: n26>n24+n23 ? `Más que 2023 y 2024 juntos (${n23+n24}). ${R.grupos[0][0]} es la banda más activa.` : `${R.grupos[0][0]} es la banda más activa.` },
    { n: String(estado), t: 'entidades del Estado y defensa en las listas', f: `PNP, Ejército, Mindef, Derrama Magisterial, Fondo MIVIVIENDA, SUNAFIL, ANA, gob.pe… Y ${salud} de salud: hospitales, clínicas, laboratorios.` },
  ];
  document.getElementById('rw-kpis').innerHTML = kp.map(k=>`<div class="card stat"><div class="n">${k.n}</div><div class="t">${k.t}</div><div class="f">${k.f}</div></div>`).join('');

  // Reclamos por año (una serie)
  (function(){
    const W=600, H=230, padL=36, padB=36, top=20, cw=(W-padL-16)/anios.length, bw=Math.min(70, cw*0.55);
    const max=Math.max(...anios.map(a=>R.por_anio[a]),1), sy=v=>(H-padB-top)*v/max; let s='';
    anios.forEach((a,i)=>{ const v=R.por_anio[a], x=padL+i*cw+(cw-bw)/2, h=sy(v);
      s+=`<rect x="${x}" y="${H-padB-h}" width="${bw}" height="${Math.max(h,2)}" rx="3" fill="var(--guinda)" class="seg" data-y="${a}" data-n="${v}"/>`;
      s+=`<text x="${x+bw/2}" y="${H-padB+18}" text-anchor="middle" class="lbl">${a}${a==='2026'?' *':''}</text>`;
      s+=`<text x="${x+bw/2}" y="${H-padB-h-6}" text-anchor="middle" class="mut">${v}</text>`; });
    s+=`<line x1="${padL}" y1="${H-padB}" x2="${W-8}" y2="${H-padB}" class="axis"/>`;
    s+=`<text x="${W-8}" y="${H-4}" text-anchor="end" class="mut">* hasta el ${R.ultimo.slice(8,10)}-${mes(R.ultimo.slice(0,7))}</text>`;
    const svg=document.getElementById('rw-years'); svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.innerHTML=s;
    svg.querySelectorAll('.seg').forEach(r=>{ r.addEventListener('mousemove', e=>showTip(e, `<b>${r.dataset.y}</b>: ${r.dataset.n} reclamos`)); r.addEventListener('mouseleave', hideTip); });
  })();

  // Bandas (barras horizontales)
  (function(){
    const g=R.grupos.slice(0,8), W=600, rowH=26, padL=118, padR=36, top=8, H=top+g.length*rowH+8;
    const max=Math.max(...g.map(x=>x[1]),1), sx=v=>(W-padL-padR)*v/max; let s='';
    g.forEach(([name,v],i)=>{ const y=top+i*rowH, w=sx(v);
      s+=`<text x="${padL-8}" y="${y+rowH/2+4}" text-anchor="end" class="lbl" style="font-size:12.5px">${name}</text>`;
      s+=`<rect x="${padL}" y="${y+4}" width="${Math.max(w,2)}" height="${rowH-8}" rx="3" fill="var(--guinda)" class="seg" data-g="${name}" data-n="${v}"/>`;
      s+=`<text x="${padL+w+6}" y="${y+rowH/2+4}" class="mut">${v}</text>`; });
    s+=`<line x1="${padL}" y1="${top}" x2="${padL}" y2="${H-8}" class="axis"/>`;
    const svg=document.getElementById('rw-groups'); svg.setAttribute('viewBox',`0 0 ${W} ${H}`); svg.innerHTML=s;
    svg.querySelectorAll('.seg').forEach(r=>{ r.addEventListener('mousemove', e=>showTip(e, `<b>${r.dataset.g}</b>: ${r.dataset.n} víctimas peruanas`)); r.addEventListener('mouseleave', hideTip); });
  })();

  // Tabla de casos con datos de ciudadanos
  const C=(window.RW_CASOS||[]).slice().sort((a,b)=>b.fecha.localeCompare(a.fecha));
  document.getElementById('rw-tabla').innerHTML = '<thead><tr><th>Listado</th><th>Víctima</th><th>Banda</th><th>Sector</th><th>Qué hay detrás</th></tr></thead><tbody>'
    + C.map(c=>`<tr><td class="rw-f">${mes(c.fecha.slice(0,7))}</td><td><b>${c.victima}</b></td><td class="rw-g">${c.grupo}</td><td class="rw-g">${c.sector}</td><td style="color:var(--ink-2)">${c.nota}</td></tr>`).join('') + '</tbody>';

  document.getElementById('rw-cards').innerHTML = C.map(c=>`<div class="card alph4"><div class="d">${mes(c.fecha.slice(0,7))} · ${c.sector}</div><div class="t">${c.victima}</div><p><b>${c.grupo}</b> · ${c.nota}</p></div>`).join('');

  // Alertas Alph4_Sec
  document.getElementById('rw-alph4').innerHTML = (window.ALPH4||[]).map(a=>`<div class="card alph4"><div class="d">${mes(a.fecha)}</div><div class="t">${a.titulo}</div><p>${a.texto}</p><a href="${a.url}" target="_blank" rel="noopener">Ver el post en X →</a></div>`).join('');
})();
})();
