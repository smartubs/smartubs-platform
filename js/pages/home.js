// js/pages/home.js
import { svg } from '../utils/icons.js';
import { navigate } from '../router.js';

export function render(container){
  container.innerHTML = `
    <div class="kiosk-bg">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="glass-card home-card">
        <div class="brand">
          <div class="brand-mark">${svg('logo')}</div>
          <span class="brand-name">Smart<b>UBS</b></span>
        </div>
        <span class="home-eyebrow">Sistema Operacional da Atenção Primária</span>
        <h1 class="home-title">A inteligência que transforma a porta de entrada da saúde pública.</h1>
        <p class="home-sub">Organize sua chegada à unidade de forma simples e rápida. Vamos te acompanhar em cada etapa do atendimento.</p>
        <button class="btn btn-primary btn-lg" id="btn-start">
          Iniciar Atendimento
          ${svg('arrowRight', 'width="18" height="18"')}
        </button>
        <p class="footnote">A SmartUBS não realiza diagnóstico médico e não substitui a avaliação de um profissional de saúde.</p>
        <button class="btn-ghost" id="btn-staff" style="margin-top:18px;">Sou da equipe da unidade →</button>
      </div>
    </div>
  `;

  container.querySelector('#btn-start').addEventListener('click', () => navigate('/cadastro'));
  container.querySelector('#btn-staff').addEventListener('click', () => navigate('/login'));
}
