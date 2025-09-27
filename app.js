// PWA L1: consumo básico de API + paginación simple
const API_BASE = 'https://dragonball-api.com/api/characters';

// Registro SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

// Instalar
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.style.display = 'inline-block';
});
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });
}

// UI
const $grid = document.getElementById('grid');
const $status = document.getElementById('status');
const $search = document.getElementById('search');
const $prev = document.getElementById('prev');
const $next = document.getElementById('next');

let page = 1;
let lastQuery = '';

async function fetchCharacters({query = '', pageNum = 1} = {}){
  const params = new URLSearchParams();
  if (query) params.set('name', query);
  params.set('page', pageNum);
  const url = `${API_BASE}?${params.toString()}`;

  $status.textContent = 'Cargando...';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error de red');
    const data = await res.json();
    render(data);
    $status.textContent = `Mostrando página ${pageNum}${query ? ` — filtro: "${query}"` : ''}`;
  } catch (err) {
    $status.textContent = 'No se pudo cargar la información.';
  }
}

function render(data){
  // Estructura esperada según documentación: lista en data.items o data, variará según versión.
  // Intentamos soportar ambos formatos comunes.
  const items = Array.isArray(data) ? data : (data.items || data.characters || data.results || []);
  $grid.innerHTML = '';
  if (!items || items.length === 0){
    $grid.innerHTML = '<p class="meta">Sin resultados.</p>';
    return;
  }
  for (const ch of items){
    const name = ch.name || ch.nombre || 'Desconocido';
    const image = ch.image || ch.img || ch.photo || ch.avatar || ch.photoUrl || '';
    const race = ch.race || ch.raza || '—';
    const ki = ch.ki || ch.power || ch.powerLevel || '—';
    const div = document.createElement('div');
    div.className = 'cardx';
    div.innerHTML = `
      <img src="${image}" alt="${name}" loading="lazy">
      <div class="title"><h3>${name}</h3><span class="badge">${race}</span></div>
      <div class="meta">Ki: ${ki}</div>
    `;
    $grid.appendChild(div);
  }
}

$search.addEventListener('input', (e)=>{
  const q = (e.target.value || '').trim().toLowerCase();
  lastQuery = q;
  page = 1;
  fetchCharacters({query: q, pageNum: page});
});

$prev.addEventListener('click', ()=>{
  if (page > 1){
    page -= 1;
    fetchCharacters({query: lastQuery, pageNum: page});
  }
  $prev.disabled = page <= 1;
});
$next.addEventListener('click', ()=>{
  page += 1;
  fetchCharacters({query: lastQuery, pageNum: page});
  $prev.disabled = page <= 1;
});

// Inicial
fetchCharacters({pageNum: page});
