document.getElementById('date').textContent=new Date().toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
const grid=document.getElementById('grid'),q=document.getElementById('q');let apps=[];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function render(){const t=q.value.trim().toLowerCase();const list=apps.filter(a=>(a.name+' '+a.desc).toLowerCase().includes(t));
grid.innerHTML=list.length?list.map(a=>{const on=!!a.url;return `<article class="card${on?'':' off'}" style="--c:${esc(a.color)}">
<div class="top">${a.icon?`<img src="${esc(a.icon)}" alt="">`:`<div class="ph">${esc(a.name[0])}</div>`}
<div><h2>${esc(a.name)}</h2><span class="chip${on?'':' hold'}">${esc(a.status)}</span></div></div>
<p class="desc">${esc(a.desc)}</p>${on?`<a class="btn" href="${esc(a.url)}" target="_blank" rel="noopener">Open</a>`:`<span class="btn" aria-disabled="true">Unavailable</span>`}</article>`}).join(''):'<p class="empty">No apps match.</p>';}
q.addEventListener('input',render);
fetch('apps.json').then(r=>r.json()).then(d=>{apps=d;render()});
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js');
