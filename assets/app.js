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
  { n: '13', t: 'casos graves registrados, 2022 → oct-2026', f: '5 confirmados o reconocidos · 3 con alerta oficial · 3 sin verificar · 2 negados' },
  { n: '15 M', t: 'ciudadanos consultados en masa desde RENIEC (abr-2025)', f: 'Reconocido por la jefa de RENIEC. Acceso vía convenio del Mininter.' },
  { n: '21 M', t: 'registros de Movistar ofrecidos en venta (jun-2025)', f: 'DNI, nombre, dirección, plan. Telefónica investiga.' },
  { n: '4 de 13', t: 'casos salieron por un acceso legítimo mal controlado', f: 'PIDE 2022, RENIEC-Mininter 2025, DIRIN 2025, padrón 2025.' },
  { n: '7', t: 'casos en los últimos 16 meses', f: 'Jun-2025 → oct-2026. Cuatro son afirmaciones de la última semana.' },
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
  const W=900, lh=38, padL=250, padR=90, H=rows.length*lh+30;
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
  document.getElementById('lista').innerHTML = rows.length? rows.map(i=>`<div class="card inc">
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

// Contexto
document.getElementById('contexto').innerHTML = window.CONTEXTO.map(c=>`<div class="card stat"><div class="n" style="font-size:clamp(26px,3.6vw,36px)">${c.n}</div><div class="t">${c.t}</div><div class="f"><a href="${c.u}" target="_blank" rel="noopener">${c.f}</a></div></div>`).join('');
})();
