// js/router.js
// -----------------------------------------------------------------------
// Router simples baseado em hash (#/rota), sem dependências externas.
// Cada página é um módulo com uma função render(container) que monta o
// HTML e liga os eventos. Isso mantém HTML/CSS/JS desacoplados: este
// arquivo só decide "qual página mostrar", cada página cuida de si mesma.
// -----------------------------------------------------------------------

import { isAuthenticated } from './services/authService.js';

const routes = {}; // preenchido via registerRoute()
const STAFF_ROUTES = new Set(['/recepcao', '/profissional', '/gestor', '/admin']);

export function registerRoute(path, renderFn){
  routes[path] = renderFn;
}

function currentPath(){
  const hash = window.location.hash.replace('#', '');
  return hash || '/';
}

export function navigate(path){
  window.location.hash = path;
}

function resolve(){
  const app = document.getElementById('app');
  let path = currentPath();

  // Rotas de equipe exigem login — protótipo de guarda de rota.
  if (STAFF_ROUTES.has(path) && !isAuthenticated()) {
    window.location.hash = '/login';
    return;
  }

  const render = routes[path] || routes['/'];
  app.innerHTML = ''; // limpa a página anterior
  const container = document.createElement('div');
  container.className = 'page';
  app.appendChild(container);
  render(container);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function startRouter(){
  window.addEventListener('hashchange', resolve);
  resolve();
}
