// js/main.js
// Ponto de entrada da aplicação. Registra as rotas e inicializa o router.
// Nenhuma lógica de página deve viver aqui — este arquivo só "liga os fios".

import { registerRoute, startRouter } from './router.js';

import * as home from './pages/home.js';
import * as cadastro from './pages/cadastro.js';
import * as triagem from './pages/triagem.js';
import * as resultado from './pages/resultado.js';
import * as login from './pages/login.js';
import * as dashboardRecepcao from './pages/dashboardRecepcao.js';
import * as dashboardProfissional from './pages/dashboardProfissional.js';
import * as dashboardGestor from './pages/dashboardGestor.js';
import * as painelAdministrativo from './pages/painelAdministrativo.js';

registerRoute('/', home.render);
registerRoute('/cadastro', cadastro.render);
registerRoute('/triagem', triagem.render);
registerRoute('/resultado', resultado.render);
registerRoute('/login', login.render);
registerRoute('/recepcao', dashboardRecepcao.render);
registerRoute('/profissional', dashboardProfissional.render);
registerRoute('/gestor', dashboardGestor.render);
registerRoute('/admin', painelAdministrativo.render);

startRouter();
initAccessibilityBar();

/** Barra fixa de acessibilidade: aumentar/diminuir fonte e alternar alto contraste.
 *  Preferências ficam salvas no localStorage para persistir entre sessões. */
function initAccessibilityBar(){
  const root = document.documentElement;
  const FONT_KEY = 'smartubs_font_scale';
  const CONTRAST_KEY = 'smartubs_high_contrast';

  let scale = parseFloat(localStorage.getItem(FONT_KEY) || '1');
  applyScale(scale);

  if (localStorage.getItem(CONTRAST_KEY) === 'true') {
    root.classList.add('high-contrast');
  }

  document.getElementById('a11y-increase').addEventListener('click', () => {
    scale = Math.min(1.3, scale + 0.1);
    applyScale(scale);
  });
  document.getElementById('a11y-decrease').addEventListener('click', () => {
    scale = Math.max(0.9, scale - 0.1);
    applyScale(scale);
  });
  document.getElementById('a11y-contrast').addEventListener('click', () => {
    root.classList.toggle('high-contrast');
    localStorage.setItem(CONTRAST_KEY, root.classList.contains('high-contrast'));
  });

  function applyScale(value){
    root.style.setProperty('--font-scale', value);
    localStorage.setItem(FONT_KEY, value);
  }
}
