// js/components/sidebar.js
// Barra lateral usada pelas 4 telas de equipe (recepção, profissional,
// gestor, administrativo). Recebe a rota ativa para destacar o item atual.

import { svg, icons } from '../utils/icons.js';
import { getCurrentUser, logout } from '../services/authService.js';
import { navigate } from '../router.js';

const NAV_ITEMS = [
  { path: '/recepcao', label: 'Recepção', icon: 'reception' },
  { path: '/profissional', label: 'Profissional', icon: 'professional' },
  { path: '/gestor', label: 'Gestor', icon: 'manager' },
  { path: '/admin', label: 'Administrativo', icon: 'admin' }
];

/** Retorna o HTML da sidebar. `activePath` deve ser algo como '/recepcao'. */
export function sidebarHTML(activePath){
  const user = getCurrentUser();
  const navHtml = NAV_ITEMS.map(item => `
    <button class="nav-item ${item.path === activePath ? 'active' : ''}" data-nav="${item.path}">
      ${svg(item.icon)}
      ${item.label}
    </button>
  `).join('');

  return `
    <div class="brand">
      <div class="brand-mark">${svg('logo')}</div>
      <span class="brand-name">Smart<b>UBS</b></span>
    </div>
    <div class="user-chip">
      <div class="avatar">${user?.initials || '--'}</div>
      <div>
        <div class="u-name">${user?.name || 'Usuário'}</div>
        <div class="u-role">${user?.sub || ''}</div>
      </div>
    </div>
    ${navHtml}
    <div class="sidebar-footer">
      <button class="nav-item" data-nav="/">
        ${svg('home')}
        Tela do paciente
      </button>
      <button class="nav-item" id="btn-logout">
        ${svg('logout')}
        Sair
      </button>
    </div>
  `;
}

/** Liga os eventos de clique da sidebar. Chamar após inserir sidebarHTML no DOM. */
export function bindSidebarEvents(root){
  root.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.nav));
  });
  const logoutBtn = root.querySelector('#btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      navigate('/login');
    });
  }
}

/** Monta o "shell" padrão (sidebar + topbar mobile + main) usado pelas 4 telas de equipe. */
export function renderStaffShell(container, activePath, title, subtitle, mainHTML){
  container.innerHTML = `
    <div class="staff-shell">
      <aside class="sidebar">${sidebarHTML(activePath)}</aside>
      <main class="staff-main">
        <div class="staff-topbar"><span class="brand-name">Smart<b>UBS</b></span></div>
        <div class="staff-header">
          <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
          <div id="staff-header-actions"></div>
        </div>
        <div id="staff-content">${mainHTML}</div>
      </main>
    </div>
  `;
  bindSidebarEvents(container.querySelector('.sidebar'));
}
