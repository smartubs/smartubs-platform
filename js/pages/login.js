// js/pages/login.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';
import { login } from '../services/authService.js';
import { ROLES } from '../state/mockData.js';

const ROLE_ICONS = { recepcao: 'reception', profissional: 'professional', gestor: 'manager', admin: 'admin' };
const ROLE_TARGET = { recepcao: '/recepcao', profissional: '/profissional', gestor: '/gestor', admin: '/admin' };

let selectedRole = 'recepcao';

export function render(container){
  selectedRole = 'recepcao';

  container.innerHTML = `
    <div class="kiosk-bg">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="glass-card login-card">
        <div class="brand">
          <div class="brand-mark">${svg('logo')}</div>
          <span class="brand-name">Smart<b>UBS</b></span>
        </div>
        <div class="form-header" style="text-align:center;">
          <h2>Acesso da equipe</h2>
          <p>Selecione seu perfil e entre com suas credenciais</p>
        </div>

        <div class="role-tabs" id="role-tabs">
          ${Object.values(ROLES).map(r => `
            <button class="role-tab ${r.key === selectedRole ? 'active' : ''}" data-role="${r.key}">
              ${svg(ROLE_ICONS[r.key])}
              <span>${r.label}</span>
            </button>
          `).join('')}
        </div>

        <div class="login-error" id="login-error"></div>

        <div class="field">
          <label for="l-user">Usuário ou matrícula</label>
          <input id="l-user" type="text" placeholder="Ex: recepcao.ubs01">
        </div>
        <div class="field">
          <label for="l-pass">Senha</label>
          <input id="l-pass" type="password" placeholder="••••••••">
        </div>

        <button class="btn btn-primary btn-block" id="btn-login">Entrar</button>
        <button class="btn-ghost" id="btn-back" style="margin-top:10px;width:100%;">← Voltar para a tela do paciente</button>

        <div class="login-demo-note">Protótipo/MVP: qualquer usuário e senha entram no perfil selecionado acima. A validação real de credenciais será feita pelo backend.</div>
      </div>
    </div>
  `;

  container.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      selectedRole = tab.dataset.role;
      container.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  container.querySelector('#btn-back').addEventListener('click', () => navigate('/'));

  container.querySelector('#btn-login').addEventListener('click', () => {
    const username = container.querySelector('#l-user').value;
    const password = container.querySelector('#l-pass').value;
    const result = login({ username, password, role: selectedRole });
    const errorBox = container.querySelector('#login-error');

    if (!result.ok) {
      errorBox.textContent = result.message;
      errorBox.style.display = 'block';
      return;
    }
    navigate(ROLE_TARGET[selectedRole]);
  });
}
